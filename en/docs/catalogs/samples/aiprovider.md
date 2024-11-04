## AI Provider Sample

In the following CR, we have defined a AI Provider by giving the name, version, organization, model, and rate limit fields information for the AI Provider.

```yaml
apiVersion: dp.wso2.com/v1alpha3
kind: AIProvider
metadata:
  name: ai-provider-azure-ai
  namespace: apk
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
      value: "$usage.promptTokens"
    completionToken:
      in: "Body"
      value: "$usage.completionTokens"
    totalToken:
      in: "Body"
      value: "$usage.totalTokens"
```

Refer [Manage AI Providers](../../administration/aiproviders/configure-ai-providers-overview.md) for more information on how to configure APIs.