# Immutable Web App

At the aws-lambda-edge.

## Initial Setup

0. Setup [Serverless Credentials for AWS].
1. Add a hosted zone in Route53 for `example.com`.
2. Create a certificate with Certificate Manager for
   `app.example.com` and `*.subdomin.example.com`.

[Serverless Credentials for AWS]: https://serverless.com/framework/docs/providers/aws/guide/credentials/

### Immutable Asset Deployment

Cut a new version with

```
npm version minor
```

Then locally or on CI, publish and deploy the assets

```
npm install
npm run build
npm publish
npm deploy:assets
```

### App Deployment

Update the version number in `serverless.yml`, then run

```
npm run deploy:app
```

### Source code

The [source code] is hosted on GitHub.
Clone the project with

```
$ git clone git@github.com:immutablewebapps/aws-lambda-edge.git
```

[source code]: https://github.com/immutablewebapps/aws-lambda-edge

### Requirements

You will need [Node.js] with [npm].

Be sure that all commands run under the correct Node version, e.g.,
if using [nvm], install the correct version with

```
$ nvm install
```

Set the active version for each shell session with

```
$ nvm use
```

Install the development dependencies with

```
$ npm install
```

[Node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[nvm]: https://github.com/creationix/nvm

## Contributing

Please submit and comment on bug reports and feature requests.

To submit a patch:

1. Fork it (https://github.com/immutablewebapps/aws-lambda-edge/fork).
2. Create your feature branch (`git checkout -b my-new-feature`).
3. Make changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin my-new-feature`).
6. Create a new Pull Request.

## License

This npm package is licensed under the MIT license.

## Warranty

This software is provided by the copyright holders and contributors "as is" and
any express or implied warranties, including, but not limited to, the implied
warranties of merchantability and fitness for a particular purpose are
disclaimed. In no event shall the copyright holder or contributors be liable for
any direct, indirect, incidental, special, exemplary, or consequential damages
(including, but not limited to, procurement of substitute goods or services;
loss of use, data, or profits; or business interruption) however caused and on
any theory of liability, whether in contract, strict liability, or tort
(including negligence or otherwise) arising in any way out of the use of this
software, even if advised of the possibility of such damage.
