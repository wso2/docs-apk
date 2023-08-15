# Rate Limit for Resource

The following define Rate Limiting Policies at the Operation-level via a Rate Limiting Policy definition.

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