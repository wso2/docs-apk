## AIProvider Sample

The following is a sample CR for creating a AIRatelimitPolicy.
```
apiVersion: dp.wso2.com/v1alpha3
kind: AIProvider
metadata:
  name: llm-provider-subs
  namespace: apk-integration-test
spec:
  providerName : "AzureAI"
  providerAPIVersion : "2024-06-01"
  organization : "default"
  model:
    in: "Body"
    value: "model"
  rateLimitFields:
    promptTokens:
      in: "Body"
      value: "usage.prompt_tokens"
    completionToken:
      in: "Body"
      value: "usage.completion_tokens"
    totalToken:
      in: "Body"
      value: "usage.total_tokens"
```
