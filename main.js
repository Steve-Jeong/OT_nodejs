var http = require('http');
var fs = require('fs');
var url = require('url');
const qs = require('querystring');

function templateList(filelist) {
  var contents = ``;
  for (var list of filelist) {
    contents += `<li><a href ="/?id=${list}">${list}</a></li>`
  }

  return contents;
}

function templateHTML(title, contents, body) {
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
    <a href="/create">create</a>
    ${body}
  </body>
  </html>
`;
}

function templateBody(title, description) {
  return `<h2>${title}</h2><p>${description}</p>`
}

function templateCreate() {
  return `
    <form action="http://localhost:3000/create_process" method="POST">
      <p><input type="text" name='title' placeholder="title"></p>
      <p><textarea name="description" id="" cols="30" rows="5"  \
        placeholder="Description"></textarea></p>
      <p><input type="submit" value="send"></p>
    </form>
  `
}

function makePage(filelist, title, contents, body, response) {
  template = templateHTML(title, contents, body);
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
        makePage(filelist, title, contents, templateBody(title, description), response)
      })

    } else {
      fs.readdir('data', 'utf8', (err, filelist) => {
        fs.readFile(`data/${title}`, 'utf8', (err, description) => {
          var contents = templateList(filelist);
          makePage(filelist, title, contents, templateBody(title, description), response)
        })
      })
    }

  } else if (pathname === '/create') {
    title = 'Welcome';
    description = 'Hello NodeJS';
    fs.readdir('data', 'utf8', (err, filelist) => {
      var contents = templateList(filelist);
      makePage(filelist, title, contents, templateCreate(), response)
    })

  } else if (pathname === '/create_process') {
    var body = '';
    request.on('data', function(data){
      body += data;
    })

    request.on('end',function(){
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
        response.writeHead(302,{Location:`/?id=${title}`});
        response.end();
      })
    })
    
  } else {
    response.writeHead(404);
    response.end('<h1><a href="/">WEB</a></h1><p>Page Not Found.</p>');
  }
});

app.listen(3000);