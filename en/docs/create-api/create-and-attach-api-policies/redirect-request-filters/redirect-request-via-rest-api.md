# Request Redirection via REST API

Request redirection allows you to send clients to a different URL. This can be useful for changing old URLs to new ones or directing traffic based on specific conditions. Request redirection can be configured via the apk-conf file as follows.

### Step 1 - Get the API configuration

Here, you can follow the steps in [Create an API](../../../get-started/quick-start-guide.md) documentation and save this content into a file named `EmployeeService.apk-conf`. You can use this apk-conf file for the rest of this guide.

### Step 2 - Add the request redirection policy to the apk-conf file

A sample request redirection configuration is given below.

```
- target: "/employees"
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

This policy will redirect an incoming request to the GET /employee route with a 301 status code.

The complete apk-conf file with this configuration is given below.

```
id: "redirect-request-api"
name: "EmployeeServiceAPI"
basePath: "/employee"
version: "1.0"
type: "REST"
defaultVersion: false
endpointConfigurations:
    production:
        endpoint: https://httpbin.org/anything
operations:
- target: "/employees"
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
- target: "/employee"
    verb: "POST"
    secured: true
    scopes: []
- target: "/employee/{employeeId}"
    verb: "PUT"
    secured: true
    scopes: []
- target: "/employee/{employeeId}"
    verb: "DELETE"
    secured: true
    scopes: []
```
### Step 3 - Deploy the API in APK

Refer to the [Deploy the API in APK](../../../get-started/quick-start-guide.md#deploy-the-api-in-apk) to deploy the API using APK configuration.

### Step 4 - Generate an access token

Follow the [Generate Access Token](../../../develop-and-deploy-api/security/generate-access-token.md) documentation to generate an access token.

### Step 5 - Invoke the API

You can invoke the API using the following command.

```
curl --location 'https://default.gw.wso2.com:9095/employee/1.0/employee' \
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