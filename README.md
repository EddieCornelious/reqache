# Reqache

Reqache is a library that caches get request data specifically for apis that have strict call limits

## Installation

```bash
npm install reqache
```

## API

* fetch(url, options)
    * options is a js object that contains two properties : responseType and env
        * env is the current enviornment you are running in. If you are in a production env, then reqache will not cache.
            * prod or dev are the expected values for env
        * responseType is the type of response you are expecting json, text etc..

## Usage

```javascript
import {fetch} from "reqache"

fetch(url)
.then(data=>console.log(data));
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
