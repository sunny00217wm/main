/** 分支 **/
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try{
    u = (new URL(request.url))
    if(u.protocol == 'http:'){
      u.protocol = 'https:'
      return (new Response('', {status: 301, headers: {'Location': u.href}}))
    }

    h = (new Headers(request.headers))
    ua = h.get('User-Agent')

    ual = ua.toLowerCase()

    host = u.hostname
    path = u.pathname

    argv = u.search

    if(path == '/'){ return (new Response('', {status: 302, headers: {'Location': '/wiki/'}}))}
    //if is /w/api.php then return to 'https://zh.wikipedia.beta.wmflabs.org/w/api.php'
    if(path == '/w/api.php'){ return (new Response('', {status: 302, headers: {'Location': 'https://zh.wikipedia.beta.wmflabs.org/w/api.php'}}))}

    url = path + argv

    return fetch('https://zh.wikipedia.beta.wmflabs.org' + url, {
      method : 'POST',
      redirect: 'follow',
    }).then(function(d){
      //var text = d.body
      //new Response(text.replace(/\/\/zh\.wikipedia\.org/, 'www.zhwiki.workers.dev')
      //.replace(/\/\/zh\.wikipedia\.beta\.wmflabs\.org/, 'beta.zhwiki.workers.dev'),
      //  d.body
      //)
      //if d.url and 'https://zh.wikipedia.beta.wmflabs.org' + url isn't same then return to d.url
      if (d.url !== 'https://zh.wikipedia.beta.wmflabs.org' + url){
        return (new Response('', {status: 302, headers: {'Location': d.url}}))
      }
      return (new Response(d.body, {status: d.status, headers: d.headers}))
    })
  } catch(e){
    return (new Response(e, {status: 500}))
  }
}
