import axios from 'axios'
import { Toast } from 'vant'
import { delToken, getToken } from './storage'
import router from '@/router'

// 创建一个新的axios实例
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net/h5/',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    const token = getToken()
    // 在发送请求之前做些什么
    if (token) {
      console.log(config)
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    if (error.response) {
      if (error.response.status === 401) {
        delToken()
        router.push('/login')
      } else {
        Toast(error.response.data.message)
      }
    }
    return Promise.reject(error)
  }
)

export default request
