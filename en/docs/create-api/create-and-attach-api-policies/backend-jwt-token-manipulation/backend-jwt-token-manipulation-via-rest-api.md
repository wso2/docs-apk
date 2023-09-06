# Attach Backend JWT Token manipulation Policy to APIs via REST API

There can be scenarios where a backend service needs to make different decisions or respond with different data, depending on the application end-user that consumes an API. This can be facilitated by APK by sending the attributes in a JWT via an HTTP header, to the backend service when the API call is being forwarded.

To find more information about backend JWT generation, please refer to the [Passing End User Attributes to the Backend](https://apim.docs.wso2.com/en/latest/deploy-and-publish/deploy-on-gateway/choreo-connect/passing-enduser-attributes-to-the-backend-via-choreo-connect/#enabling-the-default-backend-jwt-generator).

## Before you begin

- [Create an API](../../../get-started/quick-start-guide.md)

### Backend JWT configuration

<table>
    <tbody>
        <tr>
            <th colspan="2">Field</th>
            <th>Description</th>
        </tr>
        <tr>
            <td colspan="2" class="confluenceTd"><pre>encoding</pre></td>
            <td class="confluenceTd">The encoding mechanism used to encode the Backend JWT.</td>
        </tr>
        <tr>
            <td colspan="2" class="confluenceTd"><pre>signingAlgorithm</pre></td>
            <td class="confluenceTd">The signing algorithm used to sign the Backend JWT.</td>
        </tr>
        <tr>
            <td colspan="2" class="confluenceTd"><pre>header</pre></td>
            <td class="confluenceTd">The name of the HTTP header to which the Backend JWT is attached.</td>
        </tr>
        <tr>
            <td colspan="2" class="confluenceTd"><pre>tokenTTL</pre></td>
            <td class="confluenceTd">The expiry time of the Backend JWT.</td>
        </tr>
        <tr>
            <td colspan="2" class="confluenceTd"><pre>customClaims</pre></td>
            <td class="confluenceTd">List of custom claims that needs to be added to the Backend JWT.</td>
        </tr>
    </tbody>
</table>


   Sample APK configuration content after the modification is shown below.

   ```
   name: "test-backend-jwt"
   basePath: "/backend_jwt"
   version: "1.0.0"
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
