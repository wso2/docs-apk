# Model based round robin via APK Conf

This functionality enables Model-based round-robin which can be used to route requests to different LLM backends with a specific AI model. This guide explains how to enable model based round robin via the APK-Conf file.

### Step 1 - Add the request Model Based Round Robin policy to the apk-conf file

A sample Model Based Round Robin Policy configuration is given below.

```
apiPolicies:
  request:
    - policyName: "ModelBasedRoundRobin"
      policyVersion: v1
      parameters:
        onQuotaExceedSuspendDuration: 60
        productionModels:
          - model: "gpt-4o"
            endpoint: "https://api.openai.com/v1"
            weight: 1
          - model: "o1-mini"
            endpoint: "https://api.openai.com/v1"
            weight: 1
          - model: "gpt-4o-mini"
            endpoint: "https://api.openai.com/v1"
            weight: 1
        sandboxModels:
          - model: "gpt-4o"
            endpoint: "https://api.openai.com/v1"
            weight: 1
          - model: "o1-mini"
            endpoint: "https://api.openai.com/v1"
            weight: 1
          - model: "gpt-4o-mini"
            endpoint: "https://api.openai.com/v1"
            weight: 1
```

This policy does the round robin based on the given weights and in between the configured models.

!!! note
    To optimize the configuration process, APK presents a VS Code plugin designed to offer syntax highlighting and intelligent suggestions. This plugin simplifies the incorporation of rate limitations, new resources, and security configurations into your API. Adapt the contents of the APK Configuration file as needed. For further details, refer to the section on <a href="../../../../api-management-overview/apk-conf-lang-support" target="_blank">Enhance Configuration with APK Config Language Support</a>.

!!! note
    - The `OnQuotaExceedSuspendDuration` parameter specifies the duration in seconds to suspend the AI Model for round robin when the quota is exceeded.
    - The `productionModels` parameter specifies the list of models to be used in the production environment.
    - The `sandboxModels` parameter specifies the list of models to be used in the sandbox environment.
    - The `model` parameter specifies the model name.
    - The `endpoint` parameter specifies the endpoint of the model.
    - The `weight` parameter specifies the weight of the model.

The complete apk-conf file with this configuration is given below.

```
name: "chat-service-api-prod-sand"
basePath: "/chat-service-prod-sand"
version: "1.0"
type: "REST"
defaultVersion: false
subscriptionValidation: false
aiProvider:
  name: "OpenAI"
  apiVersion: "v1"
endpointConfigurations:
  production:
    - endpoint: "https://api.openai.com/v1"
      endpointSecurity:
        enabled: true
        securityType:
          secretName: "open-ai-secret"
          in: "Header"
          apiKeyNameKey: "Authorization"
          apiKeyValueKey: "apiKey"
  sandbox:
    - endpoint: "https://api.openai.com/v1"
      endpointSecurity:
        enabled: true
        securityType:
          secretName: "open-ai-secret"
          in: "Header"
          apiKeyNameKey: "Authorization"
          apiKeyValueKey: "apiKey"
operations:
- target: "/chat/completions"
  verb: "POST"
  secured: true
  scopes: []
apiPolicies:
  request:
    - policyName: "ModelBasedRoundRobin"
      policyVersion: v1
      parameters:
        onQuotaExceedSuspendDuration: 60
        productionModels:
          - model: "gpt-4o"
            endpoint: "https://api.openai.com/v1"
            weight: 1
          - model: "o1-mini"
            endpoint: "https://api.openai.com/v1"
            weight: 1
          - model: "gpt-4o-mini"
            endpoint: "https://api.openai.com/v1"
            weight: 1
        sandboxModels:
          - model: "gpt-4o"
            endpoint: "https://api.openai.com/v1"
            weight: 1
          - model: "o1-mini"
            endpoint: "https://api.openai.com/v1"
            weight: 1
          - model: "gpt-4o-mini"
            endpoint: "https://api.openai.com/v1"
            weight: 1
```

### Step 2. Create Secret CR to store LLM Service API Key

Create a secret containing the API Key of the LLM Service Provider using the following command. Replace the ```api key of LLM Service``` value with your API Key generated for LLM Service Provider.

=== "Sample Command"
```bash
kubectl create secret generic open-ai-secret --from-literal=apiKey='xxxxxxxxxxxxxxxxxxx'
```
=== "Command Format"
```bash
kubectl create secret generic open-ai-secret --from-literal=apiKey='<<api key of LLM Service>>' --namespace=<<namespace>>
```

### Step 3 - Deploy the API in APK

Follow rest of the steps in the<a href="../../../../create-api/create-and-deploy-apis/ai/create-ai-api-using-rest-api" target="_blank">Develop and Deploy a AI API via REST API</a> documentation to deploy the AI API using APK configuration.

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


