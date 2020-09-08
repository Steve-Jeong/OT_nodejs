var http = require('http');
var fs = require('fs');
var url = require('url');
const qs = require('querystring');
var template = require('./lib/template.js');

var app = http.createServer(function (request, response) {
  var _url = url.parse(request.url, true);
  var title = _url.query.id;
  var pathname = _url.pathname;
  if (pathname === '/') {
    if (title === undefined) {
      title = 'Welcome';
      description = 'Hello NodeJS';
      fs.readdir('data', 'utf8', (err, filelist) => {
        var contents = template.List(filelist);
        template.makePage(title, contents, template.Body(title, description), `<a href="/create">create</a>`, response)
      })

    } else {
      fs.readdir('data', 'utf8', (err, filelist) => {
        fs.readFile(`data/${title}`, 'utf8', (err, description) => {
          var contents = template.List(filelist);
          template.makePage(title, contents, template.Body(title, description),
            `<a href="/create">create</a> 
            <a href="/update?id=${title}">update</a>
            <form action="/delete_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <input type="submit" value="delete">
            </form>
            `, response)
        })
      })
    }

  } else if (pathname === '/create') {
    title = 'Welcome';
    description = 'Hello NodeJS';
    fs.readdir('data', 'utf8', (err, filelist) => {
      var contents = template.List(filelist);
      template.makePage(title, contents, template.Create(), '', response)
    })

  } else if (pathname === '/create_process') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    })

    request.on('end', function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
      })
    })

  } else if (pathname === '/update') {
    fs.readdir('data', 'utf8', (err, filelist) => {
      fs.readFile(`data/${title}`, 'utf8', (err, description) => {
        var contents = template.List(filelist);
        template.makePage(title, contents, `
            <form action="http://localhost:3000/update_process" method="POST">
              <input type="hidden" name="id" value="${title}">
              <p><input type="text" name='title' placeholder="title" value=${title}></p>
              <p><textarea name="description" id="" cols="30" rows="5"  \
                placeholder="Description">${description}</textarea></p>
              <p><input type="submit" value="send"></p>
            </form>
          `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`,
          response)
      })
    })

  } else if (pathname === '/update_process') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    })

    request.on('end', function () {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function (error) {
        fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        })
      })
    })

  } else if (pathname === '/delete_process') {
    var body = '';
    request.on('data', function (dataflow) {
      body += dataflow;
    })

    request.on('end', function () {
      var post = qs.parse(body);
      var fn = post.id;
      fs.unlink(`data/${fn}`, (err) => {
        response.writeHead(302, { Location: `/` });
        response.end();
      })
    })

  } else {
    response.writeHead(404);
    response.end('<h1><a href="/">WEB</a></h1><p>Page Not Found.</p>');
  }
});

app.listen(3000);