import Request from '@/utils/request'

export default {
  //登录
  async login (data) {
    let { code, msg, results } = await Request.post(`/jkp-statistics/ticket/login`, data)

    return new Promise((resolve, reject) => {
      if (code == 1) {
        resolve(results.employee.empname)
      } else {
        reject({ code, msg })
      }
    })
  },
}
