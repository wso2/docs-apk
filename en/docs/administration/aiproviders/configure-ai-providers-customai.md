# Custom AI Providers

To configure custom AI Providers in APK, you need to create a custom AI Provider CR. The following is a sample CR for a custom AI Provider:

```yaml
apiVersion: dp.wso2.com/v1alpha3
kind: AIProvider
metadata:
  name: ai-provider-custom-ai
  namespace: apk
spec:
  providerName : "CustomAI"
  providerAPIVersion : "1.0.0"
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

In the CR based approach when attaching the custom AI Provider to an API, you need to specify the custom AI Provider name in the API policy CR. The following is a sample API Policy CR that uses the custom AI Provider:

```yaml
apiVersion: dp.wso2.com/v1alpha3
kind: APIPolicy
metadata:
  name: ai-custom-api-policy
  namespace: apk
spec:
  override:
    aiProvider:
      name: "ai-provider-custom-ai"   
  targetRef:
    group: gateway.networking.k8s.io
    kind: API
    name:  APIName
```

In the APK configuration file based approach, you can specify the custom AI Provider as shown below:

```yaml
name: "Custom AI Service API"
basePath: "/custom-ai"
version: "1.0.0"
type: "REST"
defaultVersion: false
subscriptionValidation: false
aiProvider:
  name: "ai-provider-custom-ai"
  apiVersion: "1.0.0"
```
      
