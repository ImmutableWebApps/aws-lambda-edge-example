# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/)
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

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

[Unreleased]: https://github.com/immutablewebapps/aws-lambda-edge-example/compare/v0.2.0...HEAD
