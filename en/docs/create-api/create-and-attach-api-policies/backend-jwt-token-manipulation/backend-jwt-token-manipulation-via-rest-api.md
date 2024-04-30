# Backend JWT Manipulation Policy via APK Conf

### Before you begin

- [Create an API](../../../get-started/quick-start-guide.md)

### Step 1 - Retrieve existing API configuration

Here, you can use the apk-conf file which is created in [Create an API](../../../get-started/quick-start-guide.md) documentation and save this content into a file named `EmployeeService.apk-conf`.

### Step 2 - Add the API Policy for Backend JWT

A sample API Policy used for sending a JWT to the backend is given below.
```
apiPolicies:
  request:
   - policyName: "BackendJwt"
     parameters:
       encoding: Base64
       signingAlgorithm: SHA256withRSA
       header: X-JWT-Assertion
       tokenTTL: 3600
       customClaims:
       - claim: claim1
         value: value1
       - claim: claim2
         value: value2
```

The configurations that you need when attaching API Policies for Backend JWT manipulation are available in [Backend JWT Configurations section.](#backend-jwt-api-policy-configuration)

The above policy will send the following claims to the backend under the header "X-JWT-Assertion".

```
{
  claim1: value1
  claim2: value2
}
```

The sample APK configuration content after the modification is shown below.

```
name: "test-backend-jwt"
basePath: "/backend-jwt"
version: "1.0"
type: "REST"
defaultVersion: false
endpointConfigurations:
 production:
   endpoint: "https://httpbin.org/anything"
operations:
   - target: "/test"
     verb: "GET"
     secured: true
     scopes: []
apiPolicies:
 request:
   - policyName: "BackendJwt"
     parameters:
       encoding: Base64
       signingAlgorithm: SHA256withRSA
       header: X-JWT-Assertion
       tokenTTL: 3600
       customClaims:
       - claim: claim1
         value: value1
       - claim: claim2
         value: value2
```
### Step 3 - Deploy the API in APK

Refer to the [Deploy the API in APK](../../../get-started/quick-start-guide.md#deploy-the-api-in-apk) to deploy the API using APK configuration.

### Step 4 - Generate an Acess Token

Follow the [Generate Access Token](../../../develop-and-deploy-api/security/generate-access-token.md) documentation to generate an access token.

### Step 5 - Invoke the API

You can invoke the API using the following command.

```
curl --location 'https://default.gw.wso2.com:9095/backend-jwt/1.0/test' \
--header 'Host: default.gw.wso2.com' \
--header 'Authorization: Bearer <accessToken>
```

Since this guide uses the [httpbin service](https://httpbin.org/anything) which echoes the request and all of its headers, when you invoke the API, you will see a response similar to the following. The header "X-Jwt-Assertion" contains the JWT generated containing the claims.

```
"headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Host": "httpbin.org",
        "X-Jwt-Assertion": "eyJraWQiOiI4.....9UcOovptvkajf6xUqUbIJfMQp9g"
    }
```

### Backend JWT API Policy configuration

The configurable fields of the above API policy have been described below.

| Field            | Description                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------- |
| encoding         | The encoding mechanism used to encode the Backend JWT.                                    |
| signingAlgorithm | The signing algorithm used to sign the Backend JWT.                                       |
| header           | The name of the HTTP header to which the Backend JWT is attached and sent to the backend. |
| tokenTTL         | The expiry time of the Backend JWT.                                                       |
| customClaims     | List of custom claims that needs to be added to the Backend JWT.                          |
| claim            | Name of the claim to send in the BackendJWT.                                              |
| value            | Value of the claim to send in the BackendJWT.                                             |

