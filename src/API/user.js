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

export const profileAPI = userId => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/user/profile/${userId}`,)
      .then(response => resolve(response.data))
      .catch(error => reject(error.response.data))
  })
}

export const getNRTCItems = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/nrtc`)
      .then(response => resolve(response.data))
      .catch(error => reject(error.response.data))
  })
}

export const getPTCLItems = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/ptcl`)
      .then(response => resolve(response.data))
      .catch(error => reject(error.response.data))
  })
}
