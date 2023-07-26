# Interceptors

```
apiVersion: dp.wso2.com/v1alpha1
kind: APIPolicy
metadata:
  name: interceptor-api-policy-resource-level
  namespace: ns
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

## Configuration Definition

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
        <td>Determines the list of references of <code>InterceptorService</code> custom resources for intercepting requests to the targeted resource.</td>
        <td></td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>responseInterceptors</code></td>
        <td>Determines the list of references of <code>InterceptorService</code> custom resources for intercepting responses from the targeted resource.</td>
        <td></td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>name</code></td>
        <td>Determines the name of the <code>InterceptorService</code> custom resource.</td>
        <td>request-interceptor, response-interceptor </td>
      </tr>
    </tbody>
</table>