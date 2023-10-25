import request from './request';

// 测试接口
export const fetchTest = () => {
  return request({
    url: 'get',
    method: 'get'
  });
};
// 获取数据
export const fetchGetData = (params: object = {}) => {
  return request({
    url: 'getData',
    method: 'post',
    params
  });
};
// 数据同步
export const fetchSync = () => {
  return request({
    url: 'sync',
    method: 'get',
  });
};
// 是否关注比赛
export const fetchRemoveFocus = (params = {}) => {
  return request({
    url: 'removeFocus',
    method: 'post',
    params
  });
};
// 查看统计详情
export const fetchDetail = () => {
  return request({
    url: 'detail',
    method: 'get',
  });
};