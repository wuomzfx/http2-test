module.exports = (stream, headers) => {
  const path = headers[':path']
  if (path.indexOf('api') >= 0) {
    // 请求api
    stream.respond({ 'content-type': 'application/json', ':status': 200 })
    stream.end(JSON.stringify({ success: true }))

  } else if (path.indexOf('static') >= 0) {
    // 请求静态资源
    const fileType = path.split('.').pop()
    const contentType =
      fileType === 'js' ? 'application/javascript' : 'text/css'

    stream.respondWithFile(`./src${path}`, {
      'content-Type': contentType
    })

  } else {
    // 请求html
    stream.pushStream({ ':path': '/static/js/test.js' }, (err, pushStream, headers) => {
      if (err) throw err
      pushStream.respondWithFile('./src/static/js/test2.js', {
        'content-type:': 'application/javascript'
      })
      pushStream.on('error', console.error)
    });
    stream.respondWithFile('./src/index.html')
  }
}
