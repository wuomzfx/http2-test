const http = require('http')
const fs = require('fs')


http.createServer((request, response) => {
  try {
    if (request.url.indexOf('static') >= 0) {
      const file = fs.readFileSync(`./src${request.url}`)
      const fileType = request.url.split('.').pop()
      const contentType = fileType === 'js' ? 'application/javascript' : 'text/css'
      response.writeHead(200, { 'Content-Type': contentType })
      response.end(file)
    } else {
      const indexHtml = fs.readFileSync('./src/index.html')
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      response.end(indexHtml)
    }
  } catch (error) {
    response.statusCode = 404;
    response.end()
  }
}).listen(8124)
