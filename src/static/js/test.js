const node = document.createElement('h2')
node.innerHTML = 'this is normal js'

document.body.appendChild(node)


window.setTimeout(() => {
  window.fetch('/api/getData').then(result => result.json()).then(rs => {
    console.log('fetch:', rs)
    console.log(+new Date())
  })

  const request = new XMLHttpRequest();
  request.open('GET', '/api/getData', true)

  request.setRequestHeader('user-agent', 'http2-test');

  request.onload = function(result) {
    console.log('ajax:', JSON.parse(this.responseText))
    console.log(+new Date())
  };

  request.send();
}, 1000);

