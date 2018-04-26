module.exports = stream => {
  stream.respond({ ':status': 200 })
  stream.pushStream({ ':path': '/' }, (err, pushStream, headers) => {
    if (err) throw err
    pushStream.respond({ ':status': 200 })
    pushStream.end('some pushed data')
    pushStream.on('close', () => console.log('close'))
  })
  stream.end('some data')
}
