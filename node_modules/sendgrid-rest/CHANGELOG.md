# Change Log
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

## [2.3.0] - 2016-10-12
### Added
- Pull #6, Solves #5
- Invoke the API callback with a mocked response upon Error
- Thanks [Dan Foley](https://github.com/cantremember)!

## [2.2.2] - 2016-09-27
### Fixed
- Fix GitHub URLs in package.json #4: https://github.com/sendgrid/sendgrid-nodejs/pull/4
- Thanks [Guilherme Souza](https://github.com/sitegui)!

## [2.2.1] - 2016-06-15
### Fixed
- Sending email with accents: https://github.com/sendgrid/sendgrid-nodejs/issues/239
- Thanks [eaparango](https://github.com/eaparango)!

## [2.2.0] - 2016-06-10
### Added
- Automatically add Content-Type: application/json when there is a request body

## [2.1.0] - 2016-06-08
### Added
- Cleaner request object initialization
- Ability to use http for testing

## [2.0.0] - 2016-06-06
### Changed
- Made the Request and Response variables non-redundant. e.g. request.requestBody becomes request.body

## [1.0.1] - 2016-04-08
### Added
- We are live!