import axios from './axios'

export const apiCs = () => {
  return axios({
    url: '/playlist/hot'
  })
}
export default { apiCs }
