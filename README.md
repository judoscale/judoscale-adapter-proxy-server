This is a very basic proxy server that adds an `X-Request-Start` header to
each request, similar to [Heroku's router](https://devcenter.heroku.com/articles/http-routing#heroku-headers).

The `X-Request-Start` header is needed to calculate request queue time in [Judoscale](https://elements.heroku.com/addons/judoscale) web adapter libraries, so we use this proxy with sample apps to test the adapters.

## Running the proxy server

The proxy server expects to be run via the Heroku CLI, which runs multiple processes via a `Procfile` and manages the `PORT` environment variable for us.

Create a `Procfile`:

```
proxy: npx judoscale-adapter-proxy-server
web: my-web-application
```

Run via Heroku CLI:

```
heroku local
```
