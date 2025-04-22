# Request Redirection via REST API

Request redirection allows you to send clients to a different URL. This can be useful for changing old URLs to new ones or directing traffic based on specific conditions. Request redirection can be configured via the apk-conf file as follows.

### Step 1 - Get the API configuration

Save the following content into a file named `SampleService.apk-conf`. You can use this apk-conf file for the rest of this guide.

```
id: "redirect-request-api"
name: "Sample API"
basePath: "/sample-api"
version: "0.1.0"
type: "REST"
defaultVersion: false
subscriptionValidation: false
endpointConfigurations:
    production:
      - endpoint: "https://dev-tools.wso2.com/gs/helpers/v1.0"
operations:
  - target: "/ai/spelling"
    verb: "POST"
    secured: true
    scopes: []
  - target: "/base64/decode/{value}"
    verb: "POST"
    secured: true
    scopes: []
  - target: "/base64/encode/{value}"
    verb: "POST"
    secured: true
    scopes: []
  - target: "/ip"
    verb: "GET"
    secured: true
    scopes: []
  - target: "/user-agent"
    verb: "GET"
    secured: true
    scopes: []
  - target: "/uuid"
    verb: "GET"
    secured: true
    scopes: []
```

### Step 2 - Add the request redirection policy to the apk-conf file

A sample request redirection configuration is given below.

```
- target: "/uuid"
  verb: "GET"
  secured: false
  scopes: []
  operationPolicies:
      request:
      - policyName: RequestRedirect
          policyVersion: v1
          parameters:
            url: https://httpbin.org/anything
            statusCode: 301
```

This policy will redirect an incoming request to the GET /uuid route with a 301 status code.

The complete apk-conf file with this configuration is given below.

```
id: "redirect-request-api"
name: "Sample API"
basePath: "/sample-api"
version: "0.1.0"
type: "REST"
defaultVersion: false
subscriptionValidation: false
endpointConfigurations:
    production:
      - endpoint: "https://dev-tools.wso2.com/gs/helpers/v1.0"
operations:
  - target: "/uuid"
    verb: "GET"
    secured: false
    scopes: []
    operationPolicies:
        request:
        - policyName: RequestRedirect
            policyVersion: v1
            parameters:
              url: https://httpbin.org/anything
              statusCode: 301
  - target: "/ai/spelling"
    verb: "POST"
    secured: true
    scopes: []
  - target: "/base64/decode/{value}"
    verb: "POST"
    secured: true
    scopes: []
  - target: "/base64/encode/{value}"
    verb: "POST"
    secured: true
    scopes: []
  - target: "/ip"
    verb: "GET"
    secured: true
    scopes: []
  - target: "/user-agent"
    verb: "GET"
    secured: true
    scopes: []
```
### Step 3 - Deploy the API in APK

Refer to the <a href="../../../../get-started/quick-start-guide#deploy-the-api-in-apk" target="_blank">Deploy the API</a> to deploy the API using APK configuration.

### Step 4 - Generate an access token

Follow the <a href="../../../../develop-and-deploy-api/security/generate-access-token" target="_blank">Generate Access Token</a> documentation to generate an access token.

### Step 5 - Invoke the API

You can invoke the API using the following command.

```
curl --location 'https://default.gw.wso2.com:9095/sample-api/0.1.0/uuid' \
--header 'Host: default.gw.wso2.com' \
--header 'Authorization: Bearer <accessToken> -I
```

Once you have invoked the above, you will see the 301 status code and the `Location` header containing the new URL.

```
HTTP/2 301
location: https://httpbin.org/anything?id=1
vary: Accept-Encoding
date: Mon, 08 Jul 2024 08:05:57 GMT
server: envoy
```