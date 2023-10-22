import request from './request';

export const fetchData = () => {
  return request({
    url: 'data',
    method: 'get'
  });
};