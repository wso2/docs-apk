### Interceptor Service

The following is a sample Interceptor Service CR.

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

#### Configuration Definition

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