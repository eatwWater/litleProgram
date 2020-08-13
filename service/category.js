import request from '../service/network'
import {baseUrl} from './config'

export function getCategory() {
  return request({
    url: baseUrl + '/category'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: baseUrl + '/subcategory',
    data: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url:baseUrl + '/subcategory/detail',
    data: {
      miniWallkey,
      type
    }
  })
}