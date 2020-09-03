var http = require('http');
var fs = require('fs');
var url = require('url')

var no_cycle=1;
var app = http.createServer(function (request, response) {
  console.log('########### number of cycle : '+(no_cycle++)+'  ###########')
  console.log('1. request.url : ', request.url)
  var _url = url.parse(request.url);
  console.log('2. parsed url : ', _url);
  console.log('2-1. query : ', _url.query)
  if (_url.pathname == '/') {
    _url = '/index.html';
    console.log('3. inside if', _url)
  }
  if (_url.pathname == '/favicon.ico') {
    console.log('4. inside favicon.ico')
    // return response.writeHead(404);
  }
  response.writeHead(200);
  console.log('5. dirname : ', __dirname);
  console.log('6. url after if: ', _url.pathname);
  //response.end(fs.readFileSync(__dirname + _url));
  response.end(__dirname);

});

app.listen(3000);