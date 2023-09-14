### RateLimitPolicy for API

The following defines a rate limiting policy at the API-level.

```
apiVersion: dp.wso2.com/v1alpha1
kind: RateLimitPolicy
metadata:
  name: sand-http-bin-ratelimit
spec:
  default:
    api:
      requestsPerUnit: 5
      unit: Minute
  targetRef:
    kind: API
    name: http-bin-api
    group: gateway.networking.k8s.io
```