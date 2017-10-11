import 'babel-polyfill'

import axios from 'axios'

const IPCode = 'http://120.76.55.111:8550'

/**
 * 公共的接口调用方法
 * @param  {String}   url  请求的URL(部分)
 * @param  {String}   authorization  授权
 * @param  {String}   code 显示屏code
 * @param  {Function} cb   响应成功处理方法
 * @param  {Function} eb   错误处理方法
 */
const commonAPI = (url, authorization, code, cb, eb) => {
  axios.post(`${IPCode}${url}/${authorization}/${code}`)
  .then(reponse => cb(reponse))
  .catch(err => eb(err))
}

// 保健室电子班排API

/**
 * 查询特殊学生身体情况
 */
export function findHealthRoom (authorization,code, cb, eb) {
  commonAPI('/base/ElectronicClassBrand/post/findHealthRoom', authorization, code, cb, eb)
}
/**
 * 以学校/班级为单位查询接送信息
 */
export function findPickUpNumber (authorization,code, cb, eb) {
  commonAPI('/base/ElectronicClassBrand/post/findPickUpNumber', authorization, code, cb, eb)
}
/**
 * 以学校/班级为单位查询晨检信息
 */
export function findStudentNumber (authorization,code, cb, eb) {
  commonAPI('/base/ElectronicClassBrand/post/findStudentNumber', authorization, code, cb, eb)
}

// 厨房电子班排API

/**
 * 查询特殊学生套餐情况
 * @param  {[type]}   code [description]
 * @param  {Function} cb   [description]
 * @param  {[type]}   eb   [description]
 * @return {[type]}        [description]
 */
export function findKitchenBrand (authorization,code, cb, eb) {
  commonAPI('/base/ElectronicClassBrand/post/findKitchenBrand', authorization, code, cb, eb)
}

// 班级电子班排API

/**
 * 接送信息
 */
export function findAwayRecord (authorization,code, cb, eb) {
  commonAPI('/base/ElectronicClassBrand/post/findAwayRecord', authorization, code, cb, eb)
}
/**
 * 查询班级晨检/离校接送信息
 */
export function findStudentDetectionInfo (authorization,code, cb, eb) {
  commonAPI('/base/ElectronicClassBrand/post/findStudentDetectionInfo', authorization, code, cb, eb)
}
/**
 * 根据班级id进行查询教师风采
 */
export function teacherCharm (authorization,code, cb, eb) {
  commonAPI('/base/ElectronicClassBrand/post/teacherCharm', authorization, code, cb, eb)
}
/**
 * 查询老师推送
 */
export function staffPush (authorization,code, cb, eb) {
  commonAPI('/base/ElectronicClassBrand/post/staffPush', authorization, code, cb, eb)
}
