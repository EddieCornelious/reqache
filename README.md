Do you have to use an API that gives you an unbearably low amount of calls per day? 

Reqache caches get requests so even when the page reloads you don't waste any of your calls on refreshs during development.


## Reqache.fetch(url, options)

#options (object) 

#url (string) 

#options.env - If you choose the 'dev' option, then results will be cached. Use 'prod' for normal fetch requests. 

#options.type - The type of data you wish to receive json, text...etc. 

#Other options are the normal fetch compliant options

```javascript
// default is dev env
fetch(url)
.then(data=>console.log(data));
```
