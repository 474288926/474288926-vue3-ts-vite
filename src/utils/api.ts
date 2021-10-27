import axios from './axios'

export const apiCs = () => {
  return axios({
    url: '/playlist/highquality/tags'
  })
}
export default { apiCs }
