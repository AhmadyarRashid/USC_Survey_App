import axios from "axios"
import {baseEndPointUrl} from "../utils/constant"

export const loginAPI = (email, password) => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseEndPointUrl}/user/login`, {
      email, password
    }).then(response => resolve(response.data))
      .catch(error => reject(error.response.data))
  })
}
