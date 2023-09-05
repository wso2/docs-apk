# Attach Backend JWT Token manipulation Policy to APIs via CRs

You need to create an `APIPolicy` with referencing to a `BackendJWT` resource under `override` or `default` sections in `APIPolicy.spec`. Then you need to create the `BackendJWT` custom resource with required properties. This policy can be used on both the `SYSTEM_API` and non system APIs separately. To find more information about backend JWT generation, please refer to the [Passing End User Attributes to the Backend](https://apim.docs.wso2.com/en/latest/deploy-and-publish/deploy-on-gateway/choreo-connect/passing-enduser-attributes-to-the-backend-via-choreo-connect/#enabling-the-default-backend-jwt-generator).

## Step 1 - Create the CRs

### Sample code snippet

The following is a code snippet of sample `APIPolicy` CR.

```yml
  apiVersion: dp.wso2.com/v1alpha1
  kind: APIPolicy
  metadata:
    name: backend-jwt-api-policy
    namespace: ns
  spec:
    default:
      backendJwtPolicy:
        name: backend-jwt
    targetRef:
      group: dp.wso2.com
      kind: API
      name: sample-api-uuid
```

The following is a code snippet of sample `BackendJWT` CR.

```yml
  apiVersion: dp.wso2.com/v1alpha1
  kind: BackendJWT
  metadata:
    name: backend-jwt
    namespace: ns
  spec:
    customClaims:
    - claim: claim1
      type: string
      value: value1
    - claim: claim2
      type: string
      value: value2
    encoding: Base64
    header: X-JWT-Assertion
    signingAlgorithm: SHA256withRSA
    tokenTTL: 3600
```

### Configuration definitions

The following are the configurations that you need when attaching API Policies to an API when working with CRs:

- **`backendJwtPolicy`**

     `backendJwtPolicy` defines the reference for `BackendJWT` CR in the `APIPolicy` CR. If this property is not defined in the configuration file, backend jwt token generation won't get executed.

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
        <td>You can use this value to configure token encoding mechanism</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><a href="#signingAlgorithm"><code>signingAlgorithm</code></a></td>
        <td>You can use this value to configure the signing algorithm for the token</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><a href="#header"><code>header</code></a></td>
        <td>You can use this value to configure the header which carries the token in the backend reques</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><a href="#tokenTTL"><code>tokenTTL</code></a></td>
        <td>You can use this value to configure the time to live propery on the jwt token</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><a href="#customClaims"><code>customClaims</code></a></td>
        <td>You can use this value to configure the claims that needs to be sent to the backend</td>
      </tr>
    </tbody>
    </table>

## Step 2 - Apply the CRs

Apply CRs to the Kubernetes API server using the kubectl.

=== "Format"
    ```command
    kubectl apply -f <path-to-crs>
    ```

=== "Command"
    ```command
    kubectl apply -f developer/tryout/samples/
    ```
