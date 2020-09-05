var http = require('http');
var fs = require('fs');
var url = require('url')

var app = http.createServer(function (request, response) {
  var _url = url.parse(request.url, true);
  var title = _url.query.id;
  var pathname = _url.pathname;
  if (pathname === '/') {
    if (title === undefined) {
      title = 'Welcome';
      description = 'Hello NodeJS';
      fs.readdir('data', 'utf8', (err, filelist) => {
        var contents = ``;
        // filelist.forEach(list => {
        //   contents += `<li><a href ="/?id=${list}">${list}</a></li>`
        // })

        // for(var list in filelist) {
        //   contents += `<li><a href ="/?id=${filelist[list]}">${filelist[list]}</a></li>`
        // }

        for(var list of filelist) {
          contents += `<li><a href ="/?id=${list}">${list}</a></li>`
        }
        
        template = `
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
        response.writeHead(200);
        response.end(template);
      })

    } else {
      fs.readdir('data', 'utf8', (err, filelist) => {
        var contents = ``;
        // filelist.forEach(list => {
        //   contents += `<li><a href ="/?id=${list}">${list}</a></li>`
        // })

        // for(var list in filelist) {
        //   contents += `<li><a href ="/?id=${filelist[list]}">${filelist[list]}</a></li>`
        // }

        for(var list of filelist) {
          contents += `<li><a href ="/?id=${list}">${list}</a></li>`
        }
        
        fs.readFile(`data/${title}`, 'utf8', (err, description) => {
          template = `
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
          response.writeHead(200);
          response.end(template);
        })
      })
    }
  } else {
    response.writeHead(404);
    response.end('<h1><a href="/">WEB</a></h1><p>Page Not Found.</p>');
  }
});

app.listen(3000);