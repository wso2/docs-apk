### Custom Rate Limit Policy

The following defines a custom rate limiting policy.

```
apiVersion: dp.wso2.com/v1alpha1
kind: RateLimitPolicy
metadata:
  name: http-bin-ratelimit-usergroup
spec:
  override:
    custom:
      key: org_key
      value: admin
      requestsPerUnit: 20
      unit: Minute
      organization: default
  targetRef:
    kind: Gateway
    name: default
    group: gateway.networking.k8s.io
```
