### Interceptor Policy

The following is a sample Interceptor API Policy CR.

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
