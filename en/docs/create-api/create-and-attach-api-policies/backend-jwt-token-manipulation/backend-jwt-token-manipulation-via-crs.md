# Attach Backend JWT Token manpulation Policy to APIs via CRs

You need to create the `APIPolicy` with `backendJwtToken` property under o`override` or `default` sections in `APIPolicy.spec`. Then you need to enable the backend JWT token generation from the property `backendJwtToken.enabled=true` in order to generate JWT token per API on request. This propert can be used on both the `SYSTEM_API` and non system APIs separately. TO find more information about backend JWT generation, please refer to the [Passing End User Attributes to the Backend](https://apim.docs.wso2.com/en/latest/deploy-and-publish/deploy-on-gateway/choreo-connect/passing-enduser-attributes-to-the-backend-via-choreo-connect/#enabling-the-default-backend-jwt-generator).


## Sample code snippet

The following is a code snippet of sample API Policy CR.

```yml
    backendJwtToken:
      enabled: true
      encoding: "base64"
      signingAlgorithm: "SHA256withRSA"
      header: "X-JWT-Assertion"
      tokenTTL: 3600
      customClaims:
        - claim: "admin"
          value: "http://wso2.org/claims/enduser"
```

## Configuration definitions

The following are the configurations that you need when attaching API Policies to an API when working with CRs:

- **`backendJwtToken`**

     `backendJwtToken` defines the properties for backend JWT token generation. If this property is not defined in the configuration file, backend jwt token generation won't get executed.

    <table>
    <thead>
      <tr>
        <th>Possible Value</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="white-space: nowrap;"><a href="#enabled"><code>Enabled</code></a></td>
        <td> 
        <td>You can use value to enable/disable backend jwt token generation</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><a href="#encoding"><code>Encoding</code></a></td>
        <td>You can use this value to configure token encoding mechanism</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><a href="#signingAlgorithm"><code>SigningAlgorithm</code></a></td>
        <td>You can use this value to configure the signing algorithm for the token</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><a href="#header"><code>Header</code></a></td>
        <td>You can use this value to configure the header which carries the token in the backend reques</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><a href="#tokenTTL"><code>TokenTTL</code></a></td>
        <td>You can use this value to configure the time to live propery on the jwt token</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><a href="#customClaims"><code>CustomClaims</code></a></td>
        <td>You can use this value to configure the claims that needs to be sent to the backend</td>
      </tr>
    </tbody>
    </table>

**Step 2 - Apply the CRs**

{!includes/apply-cr.md!}
