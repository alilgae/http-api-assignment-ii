const http = require('http');
const url = require('url');
const query = require('querystring');
const html = require('./htmlHandler.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': html.getIndex,
  '/style.css': html.getCSS,
  '/getUsers': responseHandler.getUsers,
};

const parseBody = (request, response, callback) => {
  //storing the post request
  const body = [];

  request.on('error', (error) => {
    //print error to console
    console.dir(error);
    response.statusCode = 400;
    response.end();
  });

  //when data is sent
  request.on('data', (data) => { body.push(data); });

  //when done
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);
    callback(request, response, bodyParams);
  });
};

const handlePost = (request, response, parsedURL) => {
  // /addUser
  if(parsedURL.pathname === '/addUser') { parseBody(request, response, responseHandler.updateUsers); }
}

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  if (urlStruct[parsedUrl.pathname]) {
    return urlStruct[parsedUrl.pathname](request, response);
  }

  

  // default
  return html.getIndex(request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
