# Model Based Round Robin via CRs

This functionality enables Model-based round-robin which can be used to route requests to different LLM backends with a specific AI model. This guide explains how to enable model based round robin for an AI API via Kubernetes CRs.

### Step 1 - Get the CRs for the relevant API configuration

Here, you can the sample CRs provided <a href="https://github.com/wso2/apk/tree/main/developer/tryout/samples/ai-api-model-routing.yaml" target="_blank">here</a>.

Replace the sample secrets ``` base64_encoded_api_key``` value with your API Key generated for LLM Service Provider.

Alternatively, you can follow the steps in <a href="../../../../create-api/create-and-deploy-apis/ai/create-ai-api-using-crs" target="_blank">Develop and Deploy a AI API via CRs</a> documentation and create the CRs to deploy an AI API from scratch. 
Also, you can generate the CRs for a given apk-conf file using the steps as detailed in <a href="../../../../api-management-overview/tools-for-api-development#option-2-generate-k8s-custom-resources-using-config-generator-tool-and-deploy-the-api-using-kubernetes-client" target="_blank">this section</a>.

### Step 2 - Configure Model Based Round Robin to the APIPolicy CR

Model Based Round Robin can be done using an API Policy as follows.

First, create the relevant API Policy to round robin the request to. A sample updated API Policy CR is provided below.

```
apiVersion: dp.wso2.com/v1alpha4
kind: APIPolicy
metadata:
  name: chat-round-robin-prod-sand-api-policy
spec:
  default:
    aiProvider:
      name: "my-openai-ai-new1"
    modelBasedRoundRobin:
      onQuotaExceedSuspendDuration: 60
      productionModels:
        - model: "gpt-4o"
          backendRef: 
            group: "dp.wso2.com"
            kind: "Backend"
            name: "chat-backend-1"
          weight: 1
        - model: "o1-mini"
          backendRef: 
            group: "dp.wso2.com"
            kind: "Backend"
            name: "chat-backend-2"
          weight: 1
        - model: "gpt-4o-mini"
          backendRef: 
            group: "dp.wso2.com"
            kind: "Backend"
            name: "chat-backend-1"
          weight: 1
      sandboxModels:
        - model: "gpt-4o"
          backendRef: 
            group: "dp.wso2.com"
            kind: "Backend"
            name: "chat-backend-1"
          weight: 1
        - model: "o1-mini"
          backendRef: 
            group: "dp.wso2.com"
            kind: "Backend"
            name: "chat-backend-2"
          weight: 1
        - model: "gpt-4o-mini"
          backendRef: 
            group: "dp.wso2.com"
            kind: "Backend"
            name: "chat-backend-2"
          weight: 1
  targetRef:
    group: gateway.networking.k8s.io
    kind: API
    name: chat-service-api-prod-sand
```

!!! note
    To optimize the configuration process, APK presents a VS Code plugin designed to offer syntax highlighting and intelligent suggestions. This plugin simplifies the incorporation of rate limitations, new resources, and security configurations into your API. Adapt the contents of the APK Configuration file as needed. For further details, refer to the section on <a href="../../../../api-management-overview/apk-conf-lang-support" target="_blank">Enhance Configuration with APK Config Language Support</a>.

!!! note
    - The `OnQuotaExceedSuspendDuration` parameter specifies the duration in seconds to suspend the AI Model for round robin when the quota is exceeded.
    - The `productionModels` parameter specifies the list of models to be used in the production environment.
    - The `sandboxModels` parameter specifies the list of models to be used in the sandbox environment.
    - The `model` parameter specifies the model name.
    - The `backendRef` parameter specifies the reference to the backend.
    - The `weight` parameter specifies the weight of the model.

### Step 3 - Deploy the CRs
Once you have designed your APIs using these essential CRs, the next step is to apply them to the Kubernetes API server. APK will process and deploy your APIs seamlessly, taking full advantage of the Kubernetes infrastructure.

```
kubectl apply -f <path_to_CR_files> -n apk
```

### Step 4 - Verify the API Invocation

<a href="../../../../develop-and-deploy-api/security/generate-access-token" target="_blank">Generate an access token</a> and invoke the API using the following command:

=== "Sample Request"
    ```
    curl -k --location 'https://default.gw.wso2.com:9095/chat-service-prod-sand/1.0/chat/completions' \
    --header 'Host: default.gw.wso2.com' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiYXVkIjoiYXVkMSIsICJleHAiOjE3MzkwNzMxOTYsICJuYmYiOjE3MzkwNjk1OTYsICJpYXQiOjE3MzkwNjk1OTYsICJqdGkiOiIwMWVmZTY5MS0wMjk4LTFmNjAtYTdjYy1kOTZiYmQyMTFhNjYiLCAiY2xpZW50SWQiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAic2NvcGUiOiJhcGs6YXBpX2NyZWF0ZSJ9.aTm7WUGWfEk8ZnSgCRZRcas9fNAvBo0Yj3zpo07o8Fq0rE2b8XNUU8GJqujo4DIRupEV6GDxk3ECKs-_BdprQQLVDidU7knUUeaSYsAk6xP0AdYFL1PhNKRS_1XbIPvILc5mLEYgeo9PRjkFbuD0FZKdKgCicY5sWze2tGyxGwiErMuxQTLrTNJdO48HACP4WlvbOIoOKg_xlxwOyYq5a0X6aTA218eZW3KKaxPmJK7kDzMDfm8r-UeEMfDP2go2IaBs4Pz0b8qsFR7jSMiOSjST_Id8ueyLy_EfbFAdd93qL3ByK-NKviqNG9JAUWEq_zbokJnn7a6IDqBq2DG7uw' \
    --header 'Content-Type: application/json' \
    --request POST \
    -d '{
    "model": "gpt-4o-mini",
    "store": true,
    "messages": [
    {"role": "user", "content": "write a haiku about ai"}
    ]
    }'
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
    {
    "id": "chatcmpl-AyrkK7FERTeVJ4vHr29eaWh1laAWC",
    "object": "chat.completion",
    "created": 1739069644,
    "model": "gpt-4o-mini-2024-07-18",
    "choices": [
    {
    "index": 0,
    "message": {
    "role": "assistant",
    "content": "Silent thoughts unfold,  \nLines of code weave minds anew,  \nDreams in circuits hum.",
    "refusal": null
    },
    "logprobs": null,
    "finish_reason": "stop"
    }
    ],
    "usage": {
    "prompt_tokens": 13,
    "completion_tokens": 20,
    "total_tokens": 33,
    "prompt_tokens_details": {
    "cached_tokens": 0,
    "audio_tokens": 0
    },
    "completion_tokens_details": {
    "reasoning_tokens": 0,
    "audio_tokens": 0,
    "accepted_prediction_tokens": 0,
    "rejected_prediction_tokens": 0
    }
    },
    "service_tier": "default",
    "system_fingerprint": "fp_bd83329f63"
    }
    ```

Once you invoked the above request multiple time, you can view the response coming from different configured models.
