# AI Ratelimit Policies Overview

`AIRateLimitPolicy` Custom Resource (CR) defines the specific rate-limiting rules for AI requests, including limits based on token usage and request count. Below is a breakdown of the key fields:

### organization
Defines the organization or tenant for which the rate limit applies.

### tokenCount
Specifies limits based on token usage within a defined time unit.

  - `unit`: Time unit for the rate limit.
  - `requestTokenCount`: Limit on the number of tokens for processing requests within the time unit.
  - `responseTokenCount`: Limit on the number of tokens for responses within the time unit.
  - `totalTokenCount`: Combined total limit on tokens for both requests and responses within the time unit.

### requestCount
Defines rate limits based on the number of requests.

  - `requestsPerUnit`: Limit on the number of requests that can be processed within the time unit.
  - `unit`: Time unit for the request limit.

### targetRef
Specifies the backend to which the rate limit applies.

## Example AIRatelimitPolicy CR:

```yaml
apiVersion: dp.wso2.com/v1alpha3
kind: AIRateLimitPolicy
metadata:
  name: llm-backend-rl
  namespace: apk
spec:
  override:
    organization: default
    tokenCount:
      unit: Minute
      requestTokenCount: 5000
      responseTokenCount: 10000
      totalTokenCount: 15000
    requestCount:
      requestsPerUnit: 6000
      unit: Minute
  targetRef:
    kind: Backend
    name: backend-33eb53282e93f5fd3f26935311af727d58bd42c3-api
    group: gateway.networking.k8s.io
```
