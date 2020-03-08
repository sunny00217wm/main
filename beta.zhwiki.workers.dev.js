var replyCallback

addEventListener('fetch', event => {
  replyCallback = event.respondWith
  handleRequest(event.request)
})

async function handleRequest(request) {
  try{
    u = (new URL(request.url))
    if(u.protocol == 'http:'){
      u.protocol = 'https:'
      replyCallback('', {status: 301, headers: {'Location': u.href}})
    }

    h = (new Headers(request.headers))
    ua = h.get('User-Agent')

    ual = ua.toLowerCase()

    host = u.hostname
    path = u.pathname

    argv = u.search

    if(path == '/'){ replyCallback('', {status: 302, headers: {'Location': '/wiki/'}})}

    if(path == '/w/api.php'){ replyCallback('', {status: 302, headers: {'Location': 'https://zh.wikipedia.beta.wmflabs.org/w/api.php'}})}

    url = path + argv

    replyCallback('https://zh.wikipedia.beta.wmflabs.org' + url, {
      method : request.method,
      body: request.body
    }).then(function(d){

      if (d.url !== 'https://zh.wikipedia.beta.wmflabs.org' + url){
        replyCallback('', {status: 302, headers: {'Location': d.url}})
      }
      replyCallback(d.body, {status: d.status, headers: d.headers})
    })
  } catch(e){
    replyCallback(e, {status: 500})
  }
}
