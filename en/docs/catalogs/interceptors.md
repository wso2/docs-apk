# Interceptors

```
apiVersion: dp.wso2.com/v1alpha1
kind: APIPolicy
metadata:
  name: interceptor-api-policy-resource-level
  namespace: ns
spec:
  override:
    requestInterceptor:
      backendRef:
         name: interceptor-backend
      includes:
      - request_body
      - request_headers
    responseInterceptor:
      backendRef:
         name: interceptor-backend
  targetRef:
    group: gateway.networking.k8s.io
    kind: Resource
    name: my-http-route
```