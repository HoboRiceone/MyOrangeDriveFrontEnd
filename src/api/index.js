import axios from 'axios';

let http = axios.create({
  baseURL: 'http://34.204.85.79:8081',      //'https://www.fastmock.site/mock/69644aa3b3492c307c28e8f212610ff9/test','http://34.204.85.79:8081'
  withCredentials: true,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  // },
  transformRequest: [function (data) {
    let newData = '';
    for (let k in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
      }
    }
    return newData;
  }]
});

function apiAxios(method, url, headers, params, response) {
  http({
    method: method,
    url: url,
    headers: headers,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  }).then(function (res) {
    response(res);
  }).catch(function (err) {
    response(err.response);
  })
}

export default {
  get: function (url,  headers, params, response) {
    return apiAxios('GET', url,  headers, params, response)
  },
  post: function (url, headers, params, response) {
    return apiAxios('POST', url,  headers, params, response)
  },
  put: function (url,  headers, params, response) {
    return apiAxios('PUT', url,  headers, params, response)
  },
  delete: function (url,  headers, params, response) {
    return apiAxios('DELETE', url,  headers, params, response)
  }
}