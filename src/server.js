const http = require('http');
const url = require('url');
const query = require('querystring');
const html = require('./htmlHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': html.getIndex,
  '/style.css': html.getCSS,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  if (urlStruct[parsedUrl.pathname]) {
    return urlStruct[parsedUrl.pathname](request, response);
  }
  return html.getIndex(request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
