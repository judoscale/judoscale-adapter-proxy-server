This is a very basic proxy server that adds an `X-Request-Start` header to
each request, similar to [Heroku's router](https://devcenter.heroku.com/articles/http-routing#heroku-headers).

The `X-Request-Start` header is needed to calculate request queue time in [Judoscale](https://elements.heroku.com/addons/judoscale) web adapter libraries, so we use this proxy with sample apps to test the adapters.
