---

title: "Accept-Encoding, Content-Encoding, and ERR CONTENT DECODING FAILED"
excerpt: An error message in a browser-based app lead to some digging and learning about content encoding and negotiation.
permalink: accept-encoding-content-encoding-err-content-decoding-failed/index.html
layout: post
tags: [ "Site Optimization", "Development", "Best Of" ]
featured_img: /_images/2021/content-negotiation.jpg

---

I was testing an application deployed in a new environment recently and was noticing a difference in behavior between the new environment and the old one. HTTP requests from the browser to our API endpoints were showing a status code of `200` (successful) but failed with an error:

```text 
(failed) net::ERR_CONTENT_DECODING_FAILED
```

It's not an error I had seen before but I assumed it was due to something with ... content decoding. 

Content encoding is a way to send less data over the network, typically resulting in overall faster page loads. This type of performance improvement is fairly cheap in that it's typically just a switch or two on your server. Making this change can do everything from improve SEO and increase conversions to making your application more usable over slow connections.

How it works, in the simplest case is:

1. Your browser, in this case, makes a request with an `Accept-Encoding` header ([MDN ref](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding)) to say what types of encoding your device is capable of decoding. When I request my homepage in Safari, I send the following to say "I can speak `br`, `gzip`, and `deflate` compression algorithms." Implicitly, the browser can also receive plain text responses as well.

```text
Request

:method: GET
:scheme: https
:authority: www.joshcanhelp.com
:path: /

Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Host: www.joshcanhelp.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) ... 
Accept-Language: en-us
👉 Accept-Encoding: br, gzip, deflate 👈
```

2. The server receiving this request reads the header, determines the type of compression that it is able to provide, and then compresses (or doesn't) the response. The response will come with a `Content-Encoding` header ([MDN ref](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding)) to tell the browser what, if any, compression was used. That header will be omitted if no compression was used.

```text
Response

:status: 200

Content-Type: text/html; charset=UTF-8
Date: Tue, 12 Oct 2021 16:59:11 GMT
Cache-Control: public, max-age=0, must-revalidate
Server: Netlify
👉 Content-Encoding: br 👈
```

3. The browser uses this header to decompress and interpret the returned HTML, JSON, etc.

This conversation is called, generally, [content negotiation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation) and it can be quite difficult to troubleshoot. The server receives a number of headers, both standard and custom, and then decides what content to send back. I might send a language of `es-ES` and that I accept a `application/json` content type and I would expect a JSON response in Spanish (if the server was capable of both of those things).

There are a number of layers to look at when figuring out what is going wrong:

* The client, in the form of a browser or API tool like Postman or just direct cURL
* Any intermediaries or caches like Varnish or Cloudflare 
* The server application itself

Even if things are properly configured (which they might not be), there are many variables to take into account.

> Do I know exactly what headers I'm sending with my request?  
> Do I know exactly what headers I'm getting back?  
> Do I know for sure how the content is being compressed or not?

It's a good idea during troubleshooting to reduce as many of these variables as possible and, in this case, the tool for that job is cURL. Postman, Insomnia, and similar are great tools but the definitive answer is the library that is likely doing the work under the hood anyways. It's also much easier to share your results with someone else or document it in the form of a copy/paste command. 

The error I was dealing with was happening in a browser and most browsers have a little feature you can use to get a cURL command from a network request. In Chrome or Safari (and probably others), navigate to the Network tab, find the request, right or CTRL click, and select **Copy as cURL**.

![Copy as cURL in Safari](/_images/2021/safari-copy-as-curl.png)

If you do that in Safari for a request to my homepage, you'll get something like this:

```bash
$ curl 'https://www.joshcanhelp.com/' \
-H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' \
-H 'Accept-Language: en-us' \
-H 'Accept-Encoding: br, gzip, deflate' \
-H 'Connection: keep-alive' \
-I 
```

I added the `-I` flag which tells cURL just to show you the headers of the response.

**Note:** If you're getting a "certificate has expired" message it means that your local cert bundle is not up to date. You can update your local certs by following the link in your terminal or add `--insecure` to the request for testing.

You should get an output similar to the below:

```text
HTTP/2 200 
cache-control: public, max-age=0, must-revalidate
content-type: text/html; charset=UTF-8
date: Tue, 12 Oct 2021 17:27:13 GMT
etag: "8b6a66e4b213afe432cc2fae895a0438-ssl-df"
strict-transport-security: max-age=31536000
vary: Accept-Encoding
server: Netlify
content-encoding: br
```

You can see that we told the server "I can speak `br`" and the server gave us back `br`. Great! Now lets try another experiment:

```bash
$ curl 'https://www.joshcanhelp.com/' -I --compressed
```

You should get a response like this:

```text
HTTP/2 200 
cache-control: public, max-age=0, must-revalidate
content-type: text/html; charset=UTF-8
date: Tue, 12 Oct 2021 17:28:32 GMT
etag: "8b6a66e4b213afe432cc2fae895a0438-ssl-df"
strict-transport-security: max-age=31536000
vary: Accept-Encoding
server: Netlify
content-encoding: gzip
```

See the `content-encoding` header? It's now `gzip`. If you run that same command with a `-v` flag (for verbose output), you'll see that we're sending the following:

```text
Accept-Encoding: deflate, gzip
```

The `--compressed` flag adds the header above and then attempts to decompress the request based on the response header. The `br` encoding is missing in my case because I am not on the latest cURL version ([added in 7.57.0](https://daniel.haxx.se/blog/tag/brotli/)).

So we have a way to easily modify the request we're making and see the response that comes back. That should help us figure out a number of content encoding and negotiation issues we might come across. But there's one problem, the one I was troubleshooting, that we need to test. What if the server tells us that it's sending content compressed one way but it's actually compressing it a different way or not at all?

Using the `--compressed` flag above, we can see if cURL will decompress the response we get. If I remove the `-I` flag from our last request above and run it, I get the HTML of my homepage, as expected. If we point that request at a URL that responds with `content-encoding: gzip` but does not actually return gzipped content, we'll get an error:

```bash
$ curl 'https://joshcanhelp-test-endpoints.glitch.me/no-gzip' --compressed
curl: (61) Error while processing content unencoding: invalid block type
```

This endpoint was built using a few lines of Node.js code:

```js
const app = require("express")();

app.get("/", (req, res) => res.send(`OK: home`));
app.get("/no-gzip", (req, res) => { 
  res.header('Content-Encoding', 'gzip');
  res.send(`OK: no-gzip`);
});

app.listen(process.env.PORT);
```

You can see that the home page just outputs text but the  sets a `Content-Encoding` header before outputting a similar bit of text. If you visit the [homepage](https://joshcanhelp-test-endpoints.glitch.me), you'll see the text just fine and your headers will tell you that you asked for the 3 compression types but the server responded with no content encoding, meaning no compression was used. All is well.

```text
Request
:method: GET
:scheme: https
:authority: joshcanhelp-test-endpoints.glitch.me
:path: /
Accept-Encoding: br, gzip, deflate

Response
:status: 200
Content-Type: text/html; charset=utf-8
Content-Length: 8
x-powered-by: Express
```

If you visit the [test page](https://joshcanhelp-test-endpoints.glitch.me/no-gzip), however, you'll see an error in Safari and no text will be displayed. 

![Safari content decoding error](/_images/2021/safari-content-decoding-error.png)

You just found a misconfigured URL!