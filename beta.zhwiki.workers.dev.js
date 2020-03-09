/**
 * https://********************************.cloudflareworkers.com/
 * https://beta.zhwiki.workers.dev/
 **/
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
      replyCallback(new Response('', {status: 301, headers: {'Location': u.href}}))
    }

    h = (new Headers(request.headers))
    ua = h.get('User-Agent')

    ual = ua.toLowerCase()

    host = u.hostname
    path = u.pathname

    argv = u.search

    if(path == '/'){
      replyCallback(new Response('', {status: 302, headers: {'Location': '/wiki/'}}))
    }

    if(path == '/w/api.php'){
      replyCallback(new Response('Api error', {status: 403, statusText: 'Error : https://beta.zhwiki.workers.dev/ can\'t not use MediaWiki Api'}))
    }

    url = path + argv

    fetch(`https://zh.wikipedia.beta.wmflabs.org${url}`, {
      method : request.method,
      body: request.body
    }).then(function(d){
      replyCallback(new Response(d.body, {status: d.status, headers: d.headers}))
    })
  } catch(e){
    replyCallback(new Response(e, {status: 500}))
  }
}
