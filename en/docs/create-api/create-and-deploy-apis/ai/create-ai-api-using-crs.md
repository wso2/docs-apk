Similar to the approach for [REST APIs](../rest/create-rest-api-using-crs.md), this approach requires several CRs as mentioned below.

- API CR
- HTTPRoute CR
- Backend CR
- APIPolicy CR
- Secret CR

Let's create an AI API with following steps:

- [Create API CR](#create-api-cr)
- [Create HTTPRoute CR](#create-httproute-cr)
- [Create Backend CR](#create-backend-cr)
- [Create APIPolicy CR](#create-apipolicy-cr)
- [Create Secret CR](#create-secret-cr)

These sample CRs are created for an AI API using the Azure OpenAI service. You can modify these CRs according to any other LLM Provider as per your requirements.

## Create API CR 

In the following CR, we have defined a REST API giving the name, context, and version information for the API. We have also referred to `HTTPRoute` resource in `spec.production.httpRouteRefs[0]` path which we create in the next step.

```
apiVersion: dp.wso2.com/v1alpha3
kind: API
metadata:
  name: azure-open-ai
spec:
  apiName: "Azure OpenAI Service API"
  apiType: "REST"
  apiVersion: "1.0.0"
  basePath: "/QXp1cmUgT3BlbkFJIFNlcnZpY2UgQVBJMjAyNC0wNi0wMQ/1.0.0"
  organization: "default"
  isDefaultVersion: false
  definitionPath: "/docs"
  production:
  - routeRefs:
    - "8bcdea77634e2d4c827a7ea88f8075c4dd538834-production-httproute-1"
  apiProperties: []
```

!!! Info
    If your API has many resources and cannot be defined within a single `HTTPRoute` resource, then you have to create two or more `HTTPRoute`s and list them under `spec.production.routeRefs`.

## Create HTTPRoute CR

This is the resource where you define resources of your API. This `HTTPRoute` is linked to the API by referring to this resource name from the `API` resource.

```
---
apiVersion: "gateway.networking.k8s.io/v1beta1"
kind: "HTTPRoute"
metadata:
  name: "8bcdea77634e2d4c827a7ea88f8075c4dd538834-production-httproute-1"
spec:
  hostnames:
  - "default.gw.wso2.com"
  rules:
  - matches:
    - path:
        type: "RegularExpression"
        value: "/completions"
      method: "POST"
    filters:
    - type: "URLRewrite"
      urlRewrite:
        path:
          type: "ReplaceFullPath"
          replaceFullPath: "/completions"
    backendRefs:
    - group: "dp.wso2.com"
      kind: "Backend"
      name: "backend-33eb53282e93f5fd3f26935311af727d58bd42c3-api"
  - matches:
    - path:
        type: "RegularExpression"
        value: "/embeddings"
      method: "POST"
    filters:
    - type: "URLRewrite"
      urlRewrite:
        path:
          type: "ReplaceFullPath"
          replaceFullPath: "/embeddings"
    backendRefs:
    - group: "dp.wso2.com"
      kind: "Backend"
      name: "backend-33eb53282e93f5fd3f26935311af727d58bd42c3-api"
  - matches:
    - path:
        type: "RegularExpression"
        value: "/chat/completions"
      method: "POST"
    filters:
    - type: "URLRewrite"
      urlRewrite:
        path:
          type: "ReplaceFullPath"
          replaceFullPath: "/chat/completions"
    backendRefs:
    - group: "dp.wso2.com"
      kind: "Backend"
      name: "backend-33eb53282e93f5fd3f26935311af727d58bd42c3-api"
  - matches:
    - path:
        type: "RegularExpression"
        value: "/audio/transcriptions"
      method: "POST"
    filters:
    - type: "URLRewrite"
      urlRewrite:
        path:
          type: "ReplaceFullPath"
          replaceFullPath: "/audio/transcriptions"
    backendRefs:
    - group: "dp.wso2.com"
      kind: "Backend"
      name: "backend-33eb53282e93f5fd3f26935311af727d58bd42c3-api"
  - matches:
    - path:
        type: "RegularExpression"
        value: "/audio/translations"
      method: "POST"
    filters:
    - type: "URLRewrite"
      urlRewrite:
        path:
          type: "ReplaceFullPath"
          replaceFullPath: "/audio/translations"
    backendRefs:
    - group: "dp.wso2.com"
      kind: "Backend"
      name: "backend-33eb53282e93f5fd3f26935311af727d58bd42c3-api"
  - matches:
    - path:
        type: "RegularExpression"
        value: "/images/generations"
      method: "POST"
    filters:
    - type: "URLRewrite"
      urlRewrite:
        path:
          type: "ReplaceFullPath"
          replaceFullPath: "/images/generations"
    backendRefs:
    - group: "dp.wso2.com"
      kind: "Backend"
      name: "backend-33eb53282e93f5fd3f26935311af727d58bd42c3-api"
  parentRefs:
  - group: "gateway.networking.k8s.io"
    kind: "Gateway"
    name: "wso2-apk-default"
    sectionName: "httpslistener"

```

Here, we have used `default.gw.wso2.com` as the virtual hostname for this API. The `spec.parentRefs[0]` parameter defines the Gateway to which this `HTTPRoute` is deployed. We have defined a single rule with a `PathPrefix` match type, and the `URLRewrite` filter with `ReplacePrefixMatch` to rewrite the API context prefix so that only the remainder of the path is sent to the actual backend.

## Create Backend CR

In the above created HTTPRoute resource we have reffered to a `Backend` resource in `spec.rules[0].backendRefs[0]` path. That `Backend` should be created as below:

```
apiVersion: "dp.wso2.com/v1alpha2"
kind: "Backend"
metadata:
  name: "backend-33eb53282e93f5fd3f26935311af727d58bd42c3-api"
spec:
  services:
  - host: "xxxx.openai.azure.com"
    port: 443
  basePath: "/openai/deployments/yyyyyy"
  protocol: "https"
  security:
    apiKey:
      in: "Header"
      name: "api-key"
      valueFrom: 
        name: "mysecret"
        valueKey: "apiKey"
```

Here, we have set the openai.azure.com domain name as the host with port 443.

## Create APIPolicy CR

The following CR defines the API policy for the API. In this CR, we have overridden the default AI provider with the Azure AI provider.

```
apiVersion: dp.wso2.com/v1alpha3
kind: APIPolicy
metadata:
  name: ai-provider-8bcdea77634e2d4c827a7ea88f8075c4dd538834-api-policy
  namespace: apk
spec:
  override:
    aiProvider:
      name: "ai-provider-azure-ai"   
  targetRef:
    group: gateway.networking.k8s.io
    kind: API
    name:  8bcdea77634e2d4c827a7ea88f8075c4dd538834
```

## Create Secret CR

The following CR defines the secret that contains the API key for the Azure AI provider.

```
apiVersion: v1
kind: Secret
metadata:
  name: mysecret
  namespace: apk
type: Opaque
data:
  apiKey: base64_encoded_api_key
```

Once you have designed your APIs using these essential CRs, the next step is to apply them to the Kubernetes API server. APK will process and deploy your APIs seamlessly, taking full advantage of the Kubernetes infrastructure.

```
kubectl apply -f <path_to_CR_files> -n apk
```

Generate an access token and invoke the API using the following command:

```
curl -X POST "https://default.gw.wso2.com:9095/QXp1cmUgT3BlbkFJIFNlcnZpY2UgQVBJMjAyNC0wNi0wMQ/1.0.0/chat/completions?api-version=2024-06-01" \
  -H "Content-Type: application/json" \
  -H 'Authorization: bearer XXXXXXX' \
  -d '{
  "messages": [
    {
      "role": "system",
      "content": "you are a helpful assistant that talks like a pirate"
    },
    {
      "role": "user",
      "content": "can you tell me how to care for a parrot?"
    }
  ]
}' -k
```
