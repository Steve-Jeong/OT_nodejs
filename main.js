var http = require('http');
var fs = require('fs');
var url = require('url')
var no_cycle = 1;
var template = null;
var app = http.createServer(function (request, response) {
  //   console.log('########### number of cycle : '+(no_cycle++)+'  ###########')
  //   console.log('1. request.url : ', request.url)
  var _url = url.parse(request.url, true);
  //   console.log('2. parsed url : ', _url);
  //   console.log('2-1. query : ', _url.query)
  var title = _url.query.id;
  var pathname = _url.pathname;
  if (pathname === '/') {
    // console.log('3. inside if', pathname)
    if(title=== undefined) {
      title = 'Welcome';
      description = 'Hello NodeJS';
      template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ul>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
      `;
      response.writeHead(200);
      response.end(template);
    } else {
      fs.readFile(`data/${title}`, 'utf8', (err, description) => {
        // console.log('title : ', title);
        // console.log('description : ', description);
        template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ul>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
        `;
        response.writeHead(200);
        response.end(template);
      })
    }
  } else {
    response.writeHead(404);
    response.end('<h1><a href="/">WEB</a></h1><p>Page Not Found.</p>');
  }
  //   console.log('5. dirname : ', __dirname);
  //   console.log('6. url after if: ', _url.pathname);


});

app.listen(3000);