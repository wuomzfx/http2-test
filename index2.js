const http2 = require('http2')
const fs = require('fs')
// const streamHandle = require('./streamHandle/sample')
// const streamHandle = require('./streamHandle/index')
// const streamHandle = require('./streamHandle/pushJs')
const streamHandle = require('./streamHandle/pushApi')

const options = {
  key: fs.readFileSync('./ryans-key.pem'),
  cert: fs.readFileSync('./ryans-cert.pem'),
}

const server = http2.createSecureServer(options)

server.on('stream', streamHandle)

server.listen(8125)
