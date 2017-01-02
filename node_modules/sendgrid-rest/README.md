[![Build Status](https://travis-ci.org/sendgrid/nodejs-http-client.svg?branch=master)](https://travis-ci.org/sendgrid/nodejs-http-client)

**Quickly and easily access any RESTful or RESTful-like API.**

If you are looking for the SendGrid API client library, please see [this repo](https://github.com/sendgrid/sendgrid-nodejs).

# Announcements

All updates to this library is documented in our [CHANGELOG](https://github.com/sendgrid/nodejs-http-client/blob/master/CHANGELOG.md).

# Installation

## Prerequisites

- Node.js version 0.10, 0.12 or 4

## Install Package

```bash
npm install sendgrid-rest
```

# Quick Start

`GET /your/api/{param}/call`

```javascript
var Client = require('sendgrid-rest').Client
var client = new Client()
var request = client.emptyRequest()
var param = 'myparam'
request.host = 'api.example.com'
request.method = 'GET'
request.path = '/your/api/' + param + '/call'
client.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})
```

`POST /your/api/{param}/call` with headers, query parameters and a request body.

```javascript
var Client = require('sendgrid-rest').Client
var client = new Client()
var request = client.emptyRequest()
request.host = 'api.example.com'
request.headers['Authorization'] = 'Bearer XXXXXX'
request.queryParams['limit'] = 100
request.queryParams['offset'] = 0
request.method = 'POST'
var param = 'myparam'
request.path = '/your/api/' + param + '/call'
requestBody = {
  'some': 0,
  'awesome': 1,
  'data': 3
}
request.body = requestBody
client.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})
```

# Usage

Following is an example using SendGrid. You can get your free account [here](https://sendgrid.com/free?source=nodejs-http-client).

First, update your environment with your [SENDGRID_API_KEY](https://app.sendgrid.com/settings/api_keys).

```bash
echo "export SENDGRID_API_KEY='YOUR_API_KEY'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source ./sendgrid.env
```

Here is the [full working code](https://github.com/sendgrid/nodejs-http-client/blob/master/examples/example.js).

To run the example:

```bash
node examples/example
```

## Roadmap

If you are interested in the future direction of this project, please take a look at our [milestones](https://github.com/sendgrid/nodejs-http-client/milestones). We would love to hear your feedback.

## How to Contribute

We encourage contribution to our libraries, please see our [CONTRIBUTING](https://github.com/sendgrid/nodejs-http-client/blob/master/CONTRIBUTING.md) guide for details.

* [Feature Request](https://github.com/sendgrid/nodejs-http-client/blob/master/CONTRIBUTING.md#feature_request)
* [Bug Reports](https://github.com/sendgrid/nodejs-http-client/blob/master/CONTRIBUTING.md#submit_a_bug_report)
* [Improvements to the Codebase](https://github.com/sendgrid/nodejs-http-client/blob/master/CONTRIBUTING.md#improvements_to_the_codebase)

# About

nodejs-http-client is guided and supported by the SendGrid [Developer Experience Team](mailto:dx@sendgrid.com).

nodejs-http-client is maintained and funded by SendGrid, Inc. The names and logos for nodejs-http-client are trademarks of SendGrid, Inc.

![SendGrid Logo]
(https://uiux.s3.amazonaws.com/2016-logos/email-logo%402x.png)
