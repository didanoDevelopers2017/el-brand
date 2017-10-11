/**
 * 格式化时间
 * @param  {Date} date             需要格式化的时间
 * @param  {String} [fmt='YYYY-MM-DD HH:mm:ss']    时间的格式
 * @return {String}                  格式化后的时间
 */
export function format (date, fmt = 'EEEE YYYY-MM-DD HH:mm:ss') {
  let o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  const week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
/**
 * 获取每页数据
 * @param  {Array}  arr         信息列表
 * @param  {Object} pageInfo    分页信息
 * @param  {Number} currentPage 当前页数
 * @return {Array}              当前页列表
 */
export function getEveryPageList (arr, currentPage, pageInfo) {
  if (!(arr instanceof Array)) {
    throw new Error('arr must be a Array')
  }
  if (currentPage < 0) {
    throw new Error('currentPage must gt zero')
  }
  if (currentPage > pageInfo.pageTotal) {
    throw new Error('currentPage must lt pageTotal')
  }
  return arr.filter(function (data, index) {
    if (currentPage === pageInfo.pageTotal) {
      return index >= (currentPage - 1) * pageInfo.pageSize
    }
    return index >= (currentPage - 1) * pageInfo.pageSize && index < currentPage * pageInfo.pageSize
  })
}
/**
 * 获取分页的信息
 * @param  {Number} total    总条数
 * @param  {Number} pageSize 每页条数
 * @return {Object}          {pageTotal: 分页总数， pageSize: 每页条数}
 */
export function getPageInfo (total, pageSize) {
  if (typeof pageSize !== 'number') {
    throw new Error('pageSize must be a number')
  }
  if (pageSize < 0) {
    throw new Error('pageSize must gt zero')
  }
  return {
    pageTotal: Math.ceil(total / pageSize),
    pageSize: pageSize
  }
}