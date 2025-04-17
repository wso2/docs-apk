# Header Modification via APK Conf

This functionality enables the addition, modification, and removal of request and response headers for APIs. By customizing headers, you can enhance the control and flexibility of API interactions, ensuring that both incoming requests and outgoing responses meet specific requirements.

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

### Step 2 - Add the header modification policy to the apk-conf file

A sample header modification configuration is given below.

```
  - target: "/uuid"
    verb: "GET"
    secured: false
    scopes: []
    operationPolicies:
      request:
        - policyName: AddHeader
          policyVersion: v1
          parameters:
            headerName: "Test-Request-Header"
            headerValue: "Test-Value"
```

This policy adds a header with the name "Test-Request-Header" and value "Test-Value" to the request sent to this particular path.

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
      - endpoint: "https://dev-tools.wso2.com/gs/helpers/v1.0"
operations:
  - target: "/uuid"
    verb: "GET"
    secured: false
    scopes: []
    operationPolicies:
      request:
        - policyName: AddHeader
          policyVersion: v1
          parameters:
            headerName: "Test-Request-Header"
            headerValue: "Test-Value"
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

Similarly, you can do the following to both request and response headers.

1. Add headers
2. Update existing headers
3. Remove headers

Sample configurations for each of them have been provided under the [Sample Configurations](#sample-configurations) section.

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

Since this guide uses the <a href="https://httpbin.org/anything" target="_blank">httpbin service</a> which echoes the request and all of its headers, when you invoke the API, you will see the header "Test-Request-Header" with the value "Test-Value".

### Sample Configurations

#### Operation Level Request Header Modification

##### 1. Add Request Header

```
- target: "/uuid"
  verb: "GET"
  secured: false
  scopes: []
  operationPolicies:
    request:
      - policyName: AddHeader
        policyVersion: v1
        parameters:
          headerName: "Header-Name"
          headerValue: "Header-Value"
```

##### 2. Update Request Header

```
- target: "/uuid"
  verb: "GET"
  secured: false
  scopes: []
  operationPolicies:
    request:
      - policyName: SetHeader
        policyVersion: v1
        parameters:
          headerName: "Header-Name"
          headerValue: "Header-Value"
```

##### 3. Remove Request Header

```
- target: "/uuid"
  verb: "GET"
  secured: false
  scopes: []
  operationPolicies:
    request:
      - policyName: RemoveHeader
        policyVersion: v1
        parameters:
          headerName: "Header-Name"
```

#### Operation Level Response Header Modification

##### 1. Add Response Header

```
- target: "/uuid"
  verb: "GET"
  secured: false
  scopes: []
  operationPolicies:
    response:
      - policyName: AddHeader
        policyVersion: v1
        parameters:
          headerName: "Header-Name"
          headerValue: "Header-Value"
```

##### 2. Update Response Header

```
- target: "/uuid"
  verb: "GET"
  secured: false
  scopes: []
  operationPolicies:
    response:
      - policyName: SetHeader
        policyVersion: v1
        parameters:
          headerName: "Header-Name"
          headerValue: "Header-Value"
```

##### 3. Remove Response Header

```
- target: "/uuid"
  verb: "GET"
  secured: false
  scopes: []
  operationPolicies:
    response:
      - policyName: RemoveHeader
        policyVersion: v1
        parameters:
          headerName: "Header-Name"
```
#### API Level Request Header Modification

##### 1. Add Request Header

```
- target: "/uuid"
  verb: "GET"
  secured: false
  scopes: []
apiPolicies:
  request:
    - policyName: AddHeader
      policyVersion: v1
      parameters:
        headerName: "Header-Name"
        headerValue: "Header-Value"
```

##### 2. Update Request Header

```
- target: "/uuid"
  verb: "GET"
  secured: false
  scopes: []
apiPolicies:
  request:
    - policyName: SetHeader
      policyVersion: v1
      parameters:
        headerName: "Header-Name"
        headerValue: "Header-Value"
```

##### 3. Remove Request Header

```
- target: "/uuid"
  verb: "GET"
  secured: false
  scopes: []
apiPolicies:
  request:
    - policyName: RemoveHeader
      policyVersion: v1
      parameters:
        headerName: "Header-Name"
        
```

#### API Level Response Header Modification

##### 1. Add Response Header

```
- target: "/uuid"
  verb: "GET"
  secured: false
  scopes: []
apiPolicies:
  response:
    - policyName: AddHeader
      policyVersion: v1
      parameters:
        headerName: "Header-Name"
        headerValue: "Header-Value"
```

##### 2. Update Response Header

```
- target: "/uuid"
  verb: "GET"
  secured: false
  scopes: []
apiPolicies:
  response:
    - policyName: SetHeader
      policyVersion: v1
      parameters:
        headerName: "Header-Name"
        headerValue: "Header-Value"
```

##### 3. Remove Response Header

```
- target: "/uuid"
  verb: "GET"
  secured: false
  scopes: []
apiPolicies:
  response:
    - policyName: RemoveHeader
      policyVersion: v1
      parameters:
        headerName: "Header-Name"
```