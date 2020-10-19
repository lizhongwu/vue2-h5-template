/*
IE不支持 promise, 解决方案:
npm install es6-promise
在 main.js 引入即可
ES6的polyfill
require("es6-promise").polyfill();
*/

import axios from 'axios'
import qs from 'qs'
import { toRawType } from './common.js'
// import { MessageBox } from 'mint-ui'

const mCode = {
  original: 200,
  toObject: 201,
  noData: 202
}

// 创建axios 实例
const service = axios.create({
  // api的base_url
  baseURL: process.env.BASE_API,
  // 请求超时时间
  timeout: 20000
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  // }
})

const CancelToken = axios.CancelToken
const requestMap = new Map()

// request 拦截器
service.interceptors.request.use(
  config => {
    //防重复提交
    const keyString = qs.stringify(
      Object.assign({},
        {
          url: config.url,
          method: config.method
        },
        config.data
      )
    )

    if (requestMap.get(keyString)) {
      config.cancelToken = new CancelToken(cancel => {
        cancel('Please slow down a little')
      })
    }

    requestMap.set(keyString, true)
    Object.assign(config, { _keyString: keyString })

    /*
    axios默认是 json 格式提交,确认后台是否做了对应的支持;
    npm install qs -S
    config.data = qs.stringify(config.data);
    */
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }

    return config
  },
  error => {
    //这里处理一些请求出错的情况
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  /*
  自定义mCode
  200 完全正常
  201 返回数据为字符串，包装成对象
  202 返回正常，无数据
  */
  response => {
    // 重置requestMap
    const config = response.config
    requestMap.set(config._keyString, false)

    // 这里处理一些response 正常放回时的逻辑
    if (response.hasOwnProperty('data') && response.data) {
      const data = response.data
      //保证返回结果一定为对象
      switch (toRawType(data)) {
        case 'Object':
          //如果是对象，添加自定义mCode并直接返回
          return Promise.resolve(Object.assign({}, data, { mCode: mCode.original }))
        default:
          //如果不是对象，则包装成对象返回
          return Promise.resolve({ data, mCode: mCode.toObject })
      }
    } else {
      //无数据
      return Promise.resolve({ mCode: mCode.noData })
    }
  },
  error => {
    //这里处理一些response 出错时的逻辑
    //断网或者请求超时状态
    if (!error.response) {
      //请求超时状态
      if (error.toString().includes('timeout')) {
        //MessageBox.alert('请求超时，请检查网络是否连接正常')
      } else {
        //可以展示断网组件
        //MessageBox.alert('请求失败，请检查网络是否已连接')
      }
    }
    return Promise.reject(error)
  }
)

export default service
