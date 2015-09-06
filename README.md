couter

## Connecting movie makers and property owners to find the best locations for their next film.

## Other Repositories:
* https://github.com/jyxia/PennApps-Scouter-iOS
* https://github.com/pburtchaell/scouter-web

### Getting Started
1. Install dependencies: `npm install`
2. Start locally with nodemon: `npm run development`

#### Technology Stack:
* [React JS] - Facebook view engine for a traditional MVC model
* [Swift] - iOS application programming language
* [Node JS] - Cross-platform runtime environment for server-side and networking applications
* [ElasticSearch] - Database and search engine for our data
* [Microsoft Azure] - VM Hosting

### Application Design
Scouter is a two-phase application, consisting of a RESTful API on the back end, handling all data processing, analysis, and computations. This allows for an additional application phase, the front-end, to be highly customizable and expandible to any platform that can reach the API.

Keeping this in mind, we designed two official user-facing Scouter applications; one for the web browser, and another one for iOS devices. However, anyone can connect to our API and build on top of it.

#### API Endpoints
* [GET] pennapps2015.cloudapp.net/v1/vendor/relationships/authentication
* [GET] pennapps2015.cloudapp.net/v1/vendor/:name/relationships/nearby/:near
* [GET] pennapps2015.cloudapp.net/v1/vendor/:name/relationships/nearby/:near/photos
* [GET] pennapps2015.cloudapp.net/v1/vendor/photos

* [GET/POST] pennapps2015.cloudapp.net/v1/users
* [GET/UPDATE] pennapps2015.cloudapp.net/v1/users/:username
* [GET/POST] pennapps2015.cloudapp.net/v1/locations
* [GET/UPDATE] pennapps2015.cloudapp.net/v1/locations/:location_id

* [GET] pennapps2015.cloudapp.net/v1/search/locations?q=
* [GET] pennapps2015.cloudapp.net/v1/search/users?q=


License
----

MIT
