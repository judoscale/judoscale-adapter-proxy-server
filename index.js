#!/usr/bin/env node

// This is a very basic proxy server that adds an X-Request-Start header to
// each request, similar to Heroku's router: https://devcenter.heroku.com/articles/http-routing#heroku-headers
// The header is needed to calculate request queue time in Judoscale web adapters,
// so we use this proxy with sample apps to test Judoscale adapters.
const http = require("http");

// This assumes we're running the proxy and the target app via `heroku local`,
// which automatically adds 100 to the PORT for each subsequent process in `Procfile`.
// The proxy should be listed first in `Procfile` so the target app's port 100 higher.
const port = Number(process.env.PORT);
const targetPort = port + 100;

function onRequest(req, res) {
  const options = {
    hostname: "127.0.0.1",
    port: targetPort,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      "X-Request-Start": new Date().getTime(),
      "X-Request-ID": "00000000-0000-0000-0000-000000000000",
    },
  };

  const proxy = http.request(options, function (r) {
    res.writeHead(r.statusCode, r.headers);
    r.pipe(res, { end: true });
  });

  req.pipe(proxy, { end: true });
}

http.createServer(onRequest).listen(port);

console.log(`Listening on port ${port}`);
console.log(`Proxying requests to port ${targetPort}`);
