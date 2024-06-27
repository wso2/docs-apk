### Rate Limit for Resource

The following defines a Rate Limiting policy at the Resource (HTTPRoute) level.

```
apiVersion: dp.wso2.com/v1alpha1
kind: RateLimitPolicy
metadata:
  name: sand-http-bin-ratelimit
spec:
  override:
    api:
      requestsPerUnit: 5
      unit: Minute
  targetRef:
    kind: Resource
    name: sand-http-route-http-bin-api
    group: gateway.networking.k8s.io
```
