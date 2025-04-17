# Mirroring Requests via APK Conf

This functionality enables request mirroring, where a request can be duplicated and sent to multiple backends for testing and monitoring. This guide explains how to enable request mirroring via the APK-Conf file.

### Step 1 - Get the API configuration

Save the following content into a file named `SampleService.apk-conf`. You can use this apk-conf file for the rest of this guide.

```
id: "header-modifier-api"
name: "Sample API"
basePath: "/sample-api"
version: "0.1.0"
type: "REST"
defaultVersion: false
subscriptionValidation: false
endpointConfigurations:
    production:
      - endpoint: `WEBHOOK_URL`
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

### Step 2 - Add the request mirroring policy to the apk-conf file

A sample request mirror configuration is given below.
For this guide, it's best to use a webhook.site URL for both the production and request mirroring endpoints to view the duplicate requests. Replace the `WEBHOOK_URL` with a relevant webhook url from the site `https://webhook.site`. Ensure that you keep this webpage open to view the incoming requests.

```
  - target: "/uuid"
    verb: "GET"
    secured: false
    scopes: []
    operationPolicies:
      request:
        - policyName: RequestMirror
          policyVersion: v1
            parameters:
              urls:
                - `WEBHOOK_URL`
```

This policy mirrors the request to the production/sandbox endpoint, as well as the relevant mirror URL.

The complete apk-conf file with this configuration is given below.

```
id: "header-modifier-api"
name: "Sample API"
basePath: "/sample-api"
version: "0.1.0"
type: "REST"
defaultVersion: false
subscriptionValidation: false
endpointConfigurations:
    production:
      - endpoint: `WEBHOOK_URL`
operations:
  - target: "/uuid"
    verb: "GET"
    secured: false
    scopes: []
    operationPolicies:
      request:
        - policyName: RequestMirror
          policyVersion: v1
            parameters:
              urls:
                - `WEBHOOK_URL`
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
--header 'Authorization: Bearer <accessToken>
```

Once you have invoked the above, you can view the duplicated requests in the webhook.site page as follows.

[![Request Mirroring](../../../assets/img/api-management/api-policies/webhook-site-request-mirroring.png)](../../../assets/img/api-management/api-policies/webhook-site-request-mirroring.png)


