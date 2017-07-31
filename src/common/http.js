import _ from 'lodash';
import formUrlencoded from 'form-urlencoded'
import constants from './constants'

let events = {};

function http(url, options) {
  // console.log(`url: ${url}`, options);
  return fetch(url, options).then(function (response) {
    // 服务端没有正常响应
    if (response.status !== constants.HTTP_STATUS.SUCCESS) {
      http.trigger(response.status);
      return response.json().then(res => {
        console.log('Hello哦偶偶偶', res);
        throw res;
      },err=>{
        throw err;
      });
    }
    return response.json().then(function (res) {
      // 判断业务逻辑
      if (res.code !== constants.RESPONSE_CODES.SUCCESS) {
        http.trigger(res.code);
        throw res;
      }
      if (options.notTransformResponse) return res;
      return res.result;
    }, function (err) {
      // response data 转换失败
      http.trigger(constants.RESPONSE_CODES.INVALID_DATA);
      throw err;
    })
  }, function (err) {
    // HTTP请求异常
    http.trigger(constants.HTTP_STATUS.NETWORK_ERROR);
    throw err;
  });
}

http.defaults = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
};

http.get = function (url, options) {
  options = options || {};
  options.method = "GET";
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};

http.post = function (url, data, options) {
  options = options || {};
  if (data) options.body = JSON.stringify(data);
  options.method = "POST";
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};

http.put = function (url, data, options) {
  options = options || {};
  if (data) options.body = JSON.stringify(data);
  options.method = "PUT";
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};

http.patch = function (url, data, options) {
  options = options || {};
  if (data) options.body = JSON.stringify(data);
  options.method = "PATCH";
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};

http.delete = function (url, options) {
  options = options || {};
  options.method = "DELETE";
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};

http.on = function (name, handler) {
  if (!events[name]) events[name] = [];
  events[name].push(handler);
};

http.trigger = function (name, data) {
  let handlers = events[name];
  if (handlers) {
    handlers.forEach((handler) => handler(data));
  }
};

// 特殊请求
http.postForm = function (url, data, options) {
  options = options || {};
  options.body = formUrlencoded(data);
  options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  };
  options.method = "POST";
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};

export default http;