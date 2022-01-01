import Axios, { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useRouter } from 'vue-router'

const router = useRouter()

NProgress.configure({ showSpinner: false })

let baseURL
switch (process.env.VITE_MODE_NAME) {
  case 'development':
    baseURL = '/api'
    break
  case 'test':
    baseURL = process.env.VITE_RES_URL
    break
  default:
    baseURL = process.env.VITE_RES_URL
}

const axios: AxiosInstance = Axios.create({
  baseURL,
  timeout: 20000 // 请求超时 20s
})

// 正在进行中的请求列表
let reqList = [] as Array<string | undefined>
/**
 * 阻止重复请求
 * @param {Array<string>} req - 请求缓存列表
 * @param {string} url - 当前请求地址
 * @param {function} cancel - 请求中断函数
 * @param { string} errorMessage - 请求中断时需显示的错误信息
 * */

const stopRepeatRequest = (
  req: Array<string | undefined>,
  url: string | undefined,
  cancel: Function,
  errorMessage: string
) => {
  const errorMsg = errorMessage || ''
  for (let i = 0; i < req.length; i += 1) {
    if (req[i] === url) {
      cancel(errorMsg)
      return
    }
  }
  req.push(url)
}

/**
 * 允许某个请求可以继续进行中
 * @param {Array<string>} req 全部请求列表
 * @param { string} url 请求地址
 * */
const allowRequest = (req: Array<string | undefined>, url: string | undefined) => {
  for (let i = 0; i < req.length; i += 1) {
    if (req[i] === url) {
      req.splice(i, 1)
      break
    }
  }
}

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (config) => {
    NProgress.start()

    /*
       抓取token，携带到响应头
       显示loading
    */
    // let token = window.sessionStorage.getItem('token')
    // token = token ? JSON.parse(token) : ''
    // config.headers = { token } // 携带到请求头
    let cancel: Function = () => {}
    // 设置cancelToken对象
    config.cancelToken = new Axios.CancelToken((c: Function) => {
      cancel = c
    })
    // 阻止重复请求。当山哥哥请求未完成是，相同的请求不会进行
    stopRepeatRequest(reqList, config.url, cancel, `${config.url}请求被中断`)
    /**
     * 根据你的项目实际情况来对 config 做处理
     * 这里对 config 不做任何处理，直接返回
     */
    return config
  },
  (error) => {
    NProgress.done()
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    // /*
    //   token过期，跳转login，保留当前地址
    //   关闭loading
    // */
    // // 判断如果有错误（token过期），并且当前路径不是login，则跳转到login页面，并且将当前的全路径带过去
    // if (response.data.err == 2 && !router.currentRoute.fullPath.includes('/login')) {
    //   router.push({ path: '/login', query: { path: router.currentRoute.fullPath } })
    // }
    // 增加延迟，相同请求不得在短时间内重复发送
    setTimeout(() => {
      allowRequest(reqList, response.config.url)
    }, 1000)
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    NProgress.done()
    return response.data
  },
  (error) => {
    if (Axios.isCancel(error)) {
      console.log(error.message)
    } else {
      // 增加延迟，相同请求不得在短时间内重复发送
      setTimeout(() => {
        allowRequest(reqList, error.config.url)
      }, 1000)
    }
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      ElMessage.error(`Code: ${code}, Message: ${msg}`)
      console.error(`[Axios Error]`, error.response)
    } else {
      ElMessage.error(`${error}`)
    }
    NProgress.done()
    return Promise.reject(error)
  }
)

export default axios
