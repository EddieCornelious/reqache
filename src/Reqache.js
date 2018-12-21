import {Promise} from 'es6-promise';
import {fetch as fetchPolly} from 'whatwg-fetch';
import Json from 'jsonify';

function setFetchResponseType(fetchInstance, type) {
  return fetchInstance.then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response[type]();
  });
}

export default function fetch(url, options = {}) {
  let env = options.env || 'dev';
  let responseType = options.responseType || 'json';
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