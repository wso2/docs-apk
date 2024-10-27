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
- [Create AIRatelimitPolicy CR](#create-airatelimitpolicy-cr)

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

In the above created HTTPRoute resource we have referred to a `Backend` resource in `spec.rules[0].backendRefs[0]` path. That `Backend` should be created as below:

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

## Create AIRatelimitPolicy CR

The following AIRatelimitPolicy CR defines the token-based rate limit to be applied to the AI API. This is optional and should only be configured if token-based rate limiting is required for your AI requests.

```
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

## Deploy the CRs
Once you have designed your APIs using these essential CRs, the next step is to apply them to the Kubernetes API server. APK will process and deploy your APIs seamlessly, taking full advantage of the Kubernetes infrastructure.

```
kubectl apply -f <path_to_CR_files> -n apk
```

## Verify the API Invocation

[Generate an Access Token](../../../develop-and-deploy-api/security/generate-access-token.md) and invoke the API using the following command:

=== "Sample Request"
    ```
    curl -X POST "https://default.gw.wso2.com:9095/QXp1cmUgT3BlbkFJIFNlcnZpY2UgQVBJMjAyNC0wNi0wMQ/1.0.0/chat/completions?api-version=2024-06-01" \
    -H "Content-Type: application/json" \
    -H 'Authorization: bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiYXVkIjoiYXVkMSIsICJleHAiOjE3MzAwMTU0NDIsICJuYmYiOjE3MzAwMTE4NDIsICJpYXQiOjE3MzAwMTE4NDIsICJqdGkiOiIwMWVmOTQyZi1jODgwLTE0ZDYtYTMzNC0yNTMyMDEzNzhkOWUiLCAiY2xpZW50SWQiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAic2NvcGUiOiJhcGs6YXBpX2NyZWF0ZSJ9.Lumx8tBDTNhwgfUHWwgiSQEwcjz6ZF-5f3UJfJlCNv7feAnIEsdGmb5sFw6wRQBZklSVsZYffj1uK7ManfSR6gfws-W1qo5itwYFixvkoOMU5HcxtVdTsYOl8CzN4u76hbbk_r7I3vov-2g4iMT2Lfu45g1u1sEj1JgjbpOnTZdZ2c2jWHal35idLSEBhULMElGPjce1uCwTS2zsEZQond1q3HvMouIJ58q2oGaD4qpcx-FTlbYKsBD5_h4v4U2PV3kGkxLzos4eXoeM88vbVhIew-z8NxZuxiuP3dS4AAIbHevkQgmueMdN6E0Y5xXoYbcTDVuB8dMYAuctof6b4A' \
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
=== "Request Format"
    ```
    curl -X POST "https://<host>:9095/<basePath>/chat/completions" \
    -H "Content-Type: application/json" \
    -H 'Authorization: bearer <access-token>' \
    -d <data> -k     
    ```
=== "Sample Response"
    ```JSON
    {"choices":[{"content_filter_results":{"hate":{"filtered":false,"severity":"safe"},"self_harm":{"filtered":false,"severity":"safe"},"sexual":{"filtered":false,"severity":"safe"},"violence":{"filtered":false,"severity":"safe"}},"finish_reason":"stop","index":0,"logprobs":null,"message":{"content":"Arr, me matey, ye be in luck! I can surely give ye some tips on carin' for a parrot like a true buccaneer!\n\n1. Provide a Spacious Cage: Make sure ye parrot has plenty o' space to spread its wings and move about. The cage should be big enough for 'em to exercise, with perches, toys, and different levels or branches to hop on.\n\n2. Nourish 'em Properly: Parrots be eatin' a variety o' foods, includin' fresh fruits, vegetables, nuts, and quality parrot pellets. Avoid salty or sugary snacks, and be sure to provide fresh water at all times.\n\n3. Give 'em a Balanced Diet: Aye, parrots have specific nutritional needs! So, consult with a vet or avian expert to make a proper meal plan for yer feathery friend. They may also need supplements like vitamin D or calcium, depending on their species.\n\n4. Socialize, me hearties! Parrots be social creatures and thrive with a bit o' company. Spend time with yer parrot, playin', talkin', and even teachin' 'em tricks. They be lovin' the stimulation and the chance to bond with ye.\n\n5. Environmental Enrichment: Parrots be curious by nature, so fill their cage with interactive toys, puzzles, and chewable objects. This will keep 'em entertained, mentally stimulated, and prevent boredom. Just make sure all the toys be safe and parrot-friendly.\n\n6. Regular Exercise: Let yer parrot out o' the cage for some free-flight or supervised playtime. They need to stretch their wings and exercise their muscles daily. But beware of open windows or doors, as parrots be clever flyers and can escape.\n\n7. Keep it Clean, matey! Clean the cage regularly, removin' droppings and old food. Provide fresh bedding or liners, and sanitize the cage to prevent any health issues. Also, make sure to clean their dishes and toys to keep 'em shipshape.\n\n8. Avast, ye scurvy! Parrots need regular avian vet visits to stay healthy. Schedule routine check-ups and vaccinations, and keep an eye out for any signs of illness or distress. If ye notice any changes in behavior or plumage, seek a vet's help right away.\n\nRemember, me matey, carin' for a parrot be a responsibility, so give 'em the love, attention, and care they deserve. Keep these tips in mind, and ye be on yer way to bein' a great parrot caretaker, arr!","role":"assistant"}}],"created":1730011875,"id":"chatcmpl-AMrPH1JwGkiYDKnFvGNlyxT9RITzr","model":"gpt-35-turbo","object":"chat.completion","prompt_filter_results":[{"prompt_index":0,"content_filter_results":{"hate":{"filtered":false,"severity":"safe"},"self_harm":{"filtered":false,"severity":"safe"},"sexual":{"filtered":false,"severity":"safe"},"violence":{"filtered":false,"severity":"safe"}}}],"system_fingerprint":null,"usage":{"completion_tokens":545,"prompt_tokens":33,"total_tokens":578}}
    ```
