import Json from 'jsonify';

function setFetchResponseType(fetchInstance, type) {
  return fetchInstance.then(function(response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response[type]();
  });
}

function _fetch(url, options = {}) {
  const {env = 'dev', responseType = 'json'} = options;
  const cache = window.localStorage;
  const fetchNative = fetch;

  if (env === 'prod') {
    return setFetchResponseType(fetchNative(url, options), responseType);
  }

  if (!cache.getItem(url)) {
    return setFetchResponseType(fetchNative(url, options), responseType).then(
      function(result) {
        cache.setItem(url, Json.stringify(result));

        return Promise.resolve(result);
      }
    );
  }

  return Promise.resolve(Json.parse(cache.getItem(url)));
}

module.exports = _fetch;
