## AIRatelimitPolicy Sample

The following is a sample CR for creating a AIRatelimitPolicy.
```
apiVersion: dp.wso2.com/v1alpha3
kind: AIRateLimitPolicy
metadata:
  name: llm-backend-rl
  namespace: apk-integration-test
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
    name: llm-backend
```
