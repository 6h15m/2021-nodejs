const http = require('http')
const fs = require('fs')
const url = require('url')

function templateList(fileList) {
    var list = '<ul>'
    var i = 0;
    while (i < fileList.length) {
        list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
        i = i + 1;
    }
    list = list + '</ul>';
    return list;
}

function templateHTML(title, list, body) {
    return `
          <!doctype html>
          <html lang="ko">
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <a href="/create">create</a>
            ${body}
          </body>
          </html>
          `;
}

const app = http.createServer(function (request, response) {
    const _url = request.url
    const queryData = url.parse(_url, true).query
    const pathname = url.parse(_url, true).pathname
    if (pathname === '/') {
        if (queryData.id === undefined) {
            const title = 'Welcome'
            const description = 'Hello, Node.js'
            fs.readdir('data/', function (err, data) {
                let list = templateList(data);
                const template = templateHTML(title, list, `<h2>${title}</h2>${description}`)
                response.writeHead(200)
                response.end(template)
            })
        } else {
            fs.readdir('data/', function (err, data) {
                let list = '<ul>'
                for (let i = 0; i < data.length; i++) {
                    list += `<li><a href="/?id=${data[i]}"> ${data[i]} </a></li>`
                }
                list += '</ul>'
                fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                    const title = queryData.id
                    let list = templateList(data);
                    const template = templateHTML(title, list, `<h2>${title}</h2>${description}`)
                    response.writeHead(200)
                    response.end(template)
                })
            })
        }
    } else if (pathname === '/create') {
        fs.readdir('./data', function (error, filelist) {
            var title = 'WEB - create';
            var list = templateList(filelist);
            var template = templateHTML(title, list, `
            <form action = "http://localhost:3000/process_create" method = "post">
            <p><input type = "text" name = "title" placeholder="title"></p>
            <p>
                <textarea name = "description" placeholder="description"></textarea>
            </p>
            <p>
                <input type = "submit">
            </p>
            </form>
        `);
            response.writeHead(200);
            response.end(template);
        })
    } else {
        response.writeHead(404)
        response.end('Not found')
    }
})
app.listen(3000)