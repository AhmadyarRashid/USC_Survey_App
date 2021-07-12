import axios from "axios";
import {baseEndPointUrl} from "../utils/constant"

export const getAllHeadOffices = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/headOffices`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const getZones = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/zones`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const getRegions = zoneId => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/regions?zoneId=${zoneId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const getCities = regionId => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/cities?regionId=${regionId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

export const getStores = cityId => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseEndPointUrl}/area/stores?cityId=${cityId}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
