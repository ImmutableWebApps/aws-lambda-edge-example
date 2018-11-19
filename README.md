# Lambda@Edge Immutable Web App

Deploys an immutable single page web app to [AWS] with [Serverless].
All assets are served through [CloudFront]
and `index.html` is generated dynamically using [Lambda@Edge].
Each Serverless stage selects an app version using
[AWS Systems Manager] Parameter Store.
Immutable app versions are built, uploaded to S3, and published to npm.
Deployment of a published version is done by updating a parameter in the store.

[AWS Systems Manager]: https://aws.amazon.com/systems-manager/
[AWS]: https://aws.amazon.com/
[CloudFront]: https://aws.amazon.com/cloudfront/
[Lambda@Edge]: https://aws.amazon.com/lambda/edge/
[Serverless]: https://serverless.com/

## Development

### Requirements

You will need [AWS CLI], [jq] and [Node.js] with [npm].

Be sure that all commands run under the correct Node version, e.g.,
if using [nvm], install the correct version with

```
$ nvm install
```

[AWS CLI]: https://aws.amazon.com/cli/
[Node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[nvm]: https://github.com/creationix/nvm
[jq]: https://stedolan.github.io/jq/

### Source code

The [source code] is hosted on GitHub.
Clone the project with

```
$ git clone git@github.com:immutablewebapps/aws-lambda-edge.git
```

[source code]: https://github.com/immutablewebapps/aws-lambda-edge

### Initial Setup

_Note: find and replace the following values in this repo
with custom values to setup a completely independent project:
`immutablewebapps`, `immutableweb.app` and `aws-lambda-edge`._

0. Setup [Serverless Credentials for AWS] and login to [npm]
   and add the organization name to the parameter store
   ```
   aws ssm put-parameter --type "String" \
     --name "/app/aws-lambda-edge/organization" \
     --value "immutablewebapps"
   ```
1. Add a hosted zone in Route53 for `immutableweb.app` and
   add the Zone ID and app domain to the parameter store with
   ```
   aws ssm put-parameter --type "String" \
     --name "/app/aws-lambda-edge/hostedZoneId" \
     --value "<zone-id>"

   aws ssm put-parameter --type "String" \
     --name "/app/aws-lambda-edge/domain" \
     --value "aws-lambda-edge.immutableweb.app"
   ```
2. Create a certificate with Certificate Manager for
   `aws-lambda-edge.immutableweb.app` and
   `*.aws-lambda-edge.immutableweb.app`
   and add the certificate identifier to the parameter store with
   ```
   aws ssm put-parameter --type "String" \
     --name "/app/aws-lambda-edge/certificateId" \
     --value "<certificate-identifier>"
   ```
3. Create the parameters for the test stage with
   ```
   aws ssm put-parameter --type "String" \
     --name "/app/aws-lambda-edge/test/appDomain" \
     --value "test.aws-lambda-edge.immutableweb.app"

   aws ssm put-parameter --type "String" \
     --name "/app/aws-lambda-edge/test/assetDomain" \
     --value "test-assets.aws-lambda-edge.immutableweb.app"

   aws ssm put-parameter --type "String" \
     --name "/app/aws-lambda-edge/test/appVersion" \
     --value "0.0.1"

   aws ssm put-parameter --type "String" \
     --name "/app/aws-lambda-edge/test/appConfig" \
     --value '{"title":"Lambda@Edge Immutable Web App"}'
   ```
4. Build and deploy the initial version with
   ```
   nvm install
   npm install
   npm run build
   npm publish
   npm deploy:assets
   npm deploy:app
   ```

[Serverless Credentials for AWS]: https://serverless.com/framework/docs/providers/aws/guide/credentials/

## Development Flow

### Immutable asset deployment

Cut a new version with, e.g.,

```
npm version minor
```

Then either locally or on CI, publish and deploy the assets

```
npm install
npm run build
npm publish
npm deploy:assets
```

### App deployment

Deploy the app to Lambda@Edge with

```
npm run deploy:app
```

### Version deployment

Once the app and assets are deployed,
deploy any version to any stage by updating the corresponding parameter.

For example, use version 1.0.0 on test with

```
aws ssm put-parameter --type "String" \
  --name "/aws-lambda-edge/test/appVersion" \
  --value "1.0.0"
```

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
