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

function fetch(url, options = {}) {
  const {env = 'dev', responseType = 'json'} = options;
  const cache = localStorage;

  if (env === 'prod') {
    return setFetchResponseType(fetchPolly(url, options), responseType);
  }

  if (!cache.getItem(url)) {
    return setFetchResponseType(fetchPolly(url, options), responseType).then(
      result => {
        cache.setItem(url, Json.stringify(result));

        return Promise.resolve(result);
      }
    );
  }

  return Promise.resolve(Json.parse(cache.getItem(url)));
}

module.exports = fetch;
