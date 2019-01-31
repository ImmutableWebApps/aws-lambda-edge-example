# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/)
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.0] / 2019-01-31

### Added

- Content security policy headers.
- New app config parameters `reportUri` and `api`.
- Use [httpbin.org] to fetch data in React component.

## [0.4.0] / 2018-11-28

### Added

- Cache template.

### Fixed

- Reading cookie header on Lambda.

## [0.3.0] / 2018-11-28

### Changed

- New stage names: experimental and live.
- Use separate asset bucket per-stage.
- Use live stage by default.
- Load `public/index.html.mustache` template from asset CDN to render index.
- Remove `.bucket` before building.

### Added

- Use `appVersion` cookie to select version if set.
- Restrict bucket access to CloudFront origin access identity.
- Version number to page title.

### Fixed

- TTL settings in CloudFront.

## 0.2.0

- Initial release.

[httpbin.org]: https://httpbin.org/

[Unreleased]: https://github.com/immutablewebapps/aws-lambda-edge-example/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/immutablewebapps/aws-lambda-edge-example/compare/v0.4.0...v1.0.0
[0.4.0]: https://github.com/immutablewebapps/aws-lambda-edge-example/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/immutablewebapps/aws-lambda-edge-example/compare/v0.2.0...v0.3.0
