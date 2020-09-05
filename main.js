var http = require('http');
var fs = require('fs');
var url = require('url')

function templateList(filelist) {
  var contents = ``;
  for(var list of filelist) {
    contents += `<li><a href ="/?id=${list}">${list}</a></li>`
  }

  return contents;
}

function templateHTML(title, contents, description) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    <ul>${contents}</ul>
    <h2>${title}</h2>
    <p>${description}</p>
  </body>
  </html>
`;
}

function makePage(filelist, title, contents, description, response) {
  template = templateHTML(title, contents, description);
  response.writeHead(200);
  response.end(template);
}

var app = http.createServer(function (request, response) {
  var _url = url.parse(request.url, true);
  var title = _url.query.id;
  var pathname = _url.pathname;
  if (pathname === '/') {
    if (title === undefined) {
      title = 'Welcome';
      description = 'Hello NodeJS';
      fs.readdir('data', 'utf8', (err, filelist) => {
        var contents = templateList(filelist);
        makePage(filelist, title, contents, description, response)
      })

    } else {
      fs.readdir('data', 'utf8', (err, filelist) => {
        fs.readFile(`data/${title}`, 'utf8', (err, description) => {
          var contents = templateList(filelist);
          makePage(filelist, title, contents, description, response)
        })
      })
    }

  } else {
    response.writeHead(404);
    response.end('<h1><a href="/">WEB</a></h1><p>Page Not Found.</p>');
  }
});

app.listen(3000);