# BackendJWT Custom Resource

 This is the CR which is used to describe the backend JWT generation and it's configurations.

```
apiVersion: dp.wso2.com/v1alpha1
kind: BackendJWT
metadata:
  name: backendjwt
spec:
  enabled: true
  encoding: "base64"
  signingAlgorithm: "SHA256withRSA"
  header: "X-JWT-Assertion"
  tokenTTL: 3600
  customClaims:
    - claim: "admin"
      value: "http://wso2.org/claims/enduser"
    - claim: "test"
      value: "1"
      type: float
```

## Configuration Definitions

  <table>
    <thead>
      <tr>
        <th>Configuration</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="white-space: nowrap;"><a href="#encoding"><code>encoding</code></a></td>
        <td>Determines the token encoding mechanism.</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><a href="#signingAlgorithm"><code>signingAlgorithm</code></a></td>
        <td>Determines the signing algorithm for the token. The default algorithm is `SHA256withRSA`.</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><a href="#header"><code>header</code></a></td>
        <td>Determines the name of the header which carries the token in the backend request. The default value is `X-JWT-Assertion`.</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><a href="#tokenTTL"><code>tokenTTL</code></a></td>
        <td>Determines the time to live property of the token.</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><a href="#customClaims"><code>customClaims</code></a></td>
        <td>Contains the custom claims that need to be added to the token to be sent to the backend.</td>
      </tr>
    </tbody>
  </table>

Refer [Learn to attach API Policies for Backend JWT Token Manipulation](../create-api/create-and-attach-api-policies/backend-jwt-token-manipulation/backend-jwt-token-manipulation-via-crs.md) for more information on how to configure backend JWT in APK.