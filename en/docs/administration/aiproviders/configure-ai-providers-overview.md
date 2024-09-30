# AI Providers Overview

AI Providers are external LLM services that provide AI capabilities through their APIs. APK supports the following AI Providers by default:

- [Azure AI](https://azure.microsoft.com/en-us/services/cognitive-services/)
- [OpenAI](https://www.openai.com/)
- [Mistral AI](https://www.mistral.ai/)

APK has already defined the default CRs for these AI Providers. You can use these CRs to configure your AI APIs. Follow the create AI API [guide](../../create-api/create-and-deploy-apis/ai/ai-api-overview.md) to learn how to create AI APIs using these AI Providers.

## Azure AI Default CR:

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

## OpenAI Default CR:

```yaml
apiVersion: dp.wso2.com/v1alpha3
kind: AIProvider
metadata:
  name: ai-provider-open-ai
  namespace: apk
spec:
  providerName : "OpenAI"
  providerAPIVersion : "v1"
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

## Mistra AI Default CR:

```yaml
apiVersion: dp.wso2.com/v1alpha3
kind: AIProvider
metadata:
  name: ai-provider-mistral-ai
  namespace: apk
spec:
  providerName : "MistralAI"
  providerAPIVersion : "v1"
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

You can customize these CRs according to your requirements.

## Next Steps

Custom AI Providers can be configured in APK. Follow the [guide](configure-ai-providers-customai.md) to learn how to configure custom AI Providers in APK.