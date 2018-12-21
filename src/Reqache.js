import {Promise} from 'es6-promise';
import {fetch as fetchPolly} from 'whatwg-fetch';
import Json from 'jsonify';

function setFetchResponseType(fetchInstance, type) {
  return fetchInstance.then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response[type]();
  });
}

function fetch(url) {
  const options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const env = options.env || 'dev';
  const responseType = options.responseType || 'json';
  const cache = window.localStorage;
  const request = setFetchResponseType(fetchPolly(url, options), responseType);

  if (env === 'prod') {
    return request;
  }

  if (!cache[url]) {
    request.then(result => cache.setItem(url, Json.stringify(result)));
  }
  return Promise.resolve(Json.parse(cache.getItem(url)));
}

module.exports = fetch;
