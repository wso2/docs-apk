### Interceptor Policy

```
apiVersion: dp.wso2.com/v1alpha1
kind: APIPolicy
metadata:
  name: interceptor-api-policy-resource-level
spec:
  override:
    requestInterceptors:
      - name: request-interceptor
    responseInterceptors:
      - name: response-interceptor
  targetRef:
    group: gateway.networking.k8s.io
    kind: Resource
    name: my-http-route
```

### Configuration Definition

<table>
    <thead>
      <tr>
        <th>Configuration</th>
        <th>Description</th>
        <th>Sample Values</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="white-space: nowrap;"><code>requestInterceptors</code></td>
        <td>Determines the list of names as references of <code>InterceptorService</code> custom resources for intercepting requests to the targeted resource.</td>
        <td>name: request-interceptor</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>responseInterceptors</code></td>
        <td>Determines the list of names as references of <code>InterceptorService</code> custom resources for intercepting responses from the targeted resource.</td>
        <td>name: response-interceptor</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>targetRef</code></td>
        <td>Determines the references of resource to apply the API policy.</td>
        <td></td>
      </tr>
    </tbody>
</table>


### Interceptor Service

```
apiVersion: dp.wso2.com/v1alpha1
kind: InterceptorService
metadata:
  name: request-interceptor-service
spec:
  backendRef:
    name: interceptor-backend
  includes:
    - request_headers
    - request_body
    - invocation_context
```

### Configuration Definition

<table>
    <thead>
      <tr>
        <th>Configuration</th>
        <th>Description</th>
        <th>Sample Values</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="white-space: nowrap;"><code>backendRef</code></td>
        <td>Determines the references of <code>Backend</code> resources for interceptor. This includes the resource name.</td>
        <td></td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>includes</code></td>
        <td>Determines the types of data which can be included in the interceptor request/response path.</td>
        <td>request_headers, request_body, request_trailer, response_headers, response_body, response_trailer, invocation_context</td>
      </tr>
    </tbody>
</table>