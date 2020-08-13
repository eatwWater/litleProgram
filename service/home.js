import request from '../service/network'
import {baseUrl} from './config'

export function getMultiData() {
  return request({
    url: baseUrl + '/home/multidata'
  })
}

export function getGoodsData(type, page) {
  return request({
    url: baseUrl + '/home/data',
    data: {
      type,
      page
    }
  })
}