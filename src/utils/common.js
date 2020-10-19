//js运行环境
export function jsRuntimeEnv () {
  const inBrowser = typeof window !== 'undefined'
  const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
  const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
  const UA = inBrowser && window.navigator.userAgent.toLowerCase()

  return Object.keys(
    [
      { ie: UA && /msie|trident/.test(UA) },
      { ie9: UA && UA.indexOf('msie 9.0') > 0 },
      { edge: UA && UA.indexOf('edge/') > 0 },
      { android: (UA && UA.indexOf('android') > 0) || weexPlatform === 'android' },
      { ios: (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === 'ios' },
      { chrome: UA && /chrome\/\d+/.test(UA) && !(UA && UA.indexOf('edge/') > 0) },
      { phantomjs: UA && /phantomjs/.test(UA) },
      { firefox: UA && UA.match(/firefox\/(\d+)/) }
    ].find(ele => {
      return Object.values(ele)[0] == true
    })
  )[0]
}

// 生成唯一随机字符串，可以指定长度
export function generateRandom (length = 16) {
  let radom13chars = function () {
    return Math.random()
      .toString(16)
      .substring(2, 15)
  }
  let loops = Math.ceil(length / 13)
  return new Array(loops)
    .fill(radom13chars)
    .reduce((string, func) => {
      return string + func()
    }, '')
    .substring(0, length)
}

// 确定一个函数是不是用户自定义的
export function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

// 只执行一次的函数
export function once (fn) {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}

// 缓存执行结果
export function cached (fn) {
  const cache = Object.create(null);
  return function cachedFn (str) {
    if (!cache[str]) {
      let result = fn(str);
      cache[str] = result;
    }
    return cache[str]
  }
}

// 确定对象类型
export function toRawType (value) {
  const _toString = Object.prototype.toString
  return _toString.call(value).slice(8, -1)
}