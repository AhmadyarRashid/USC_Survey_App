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

export const getNRTCItems = (userId, storeId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/nrtc/${userId}/${storeId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error.response.data))
  })
}

export const getPTCLItems = (userId, storeId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/ptcl/${userId}/${storeId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error.response.data))
  })
}

export const getERPItems = (userId, storeId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/erp/${userId}/${storeId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error.response.data))
  })
}

export const submitReportAPI = (userId, storeId, company, submitedData ) => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseEndPointUrl}/area/submitReport`, {
      userId,
      storeId,
      company,
      submitedData
    })
      .then(response => resolve(response.data))
      .catch(error => reject(error.response.data))
  })
}
