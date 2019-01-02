import Json from 'jsonify';
async function setFetchResponseType(fetchInstance, type) {
  const response = await fetchInstance;

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response[type]();
}

async function _fetch(url, options = {}) {
  const {env = 'dev', responseType = 'json'} = options;
  const cache = localStorage;

  if (env === 'prod') {
    return setFetchResponseType(fetch(url, options), responseType);
  }

  if (!cache.getItem(url)) {
    const result = setFetchResponseType(fetch(url, options));

    cache.setItem(url, Json.stringify(result));
    return result;
  }
  return await Json.parse(cache.getItem(url));
}

module.exports = _fetch;
