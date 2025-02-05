# Model based round robin via APK Conf

This functionality enables Model-based round-robin which can be used to route requests to different LLM backends with a specific AI model. This guide explains how to enable model based round robin via the APK-Conf file.

### Step 1 - Get the AI API APK Conf

Here, you can follow the steps in <a href="../../../../create-api/create-and-deploy-apis/ai/create-ai-api-using-rest-api" target="_blank">Develop and Deploy a AI API via REST API</a> documentation and create and deploy an AI API from scratch.

### Step 2 - Add the request Model Based Round Robin policy to the apk-conf file

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
            endpoint: "https://{endpoint}/openai/deployments/{deployment-id}"
            weight: 1
          - model: "gpt-3.5"
            endpoint: "https://{endpoint}/openai/deployments/{deployment-id}"
            weight: 1
          - model: "gpt-4.5"
            endpoint: "https://{endpoint}/openai/deployments/{deployment-id}"
            weight: 1
        sandboxModels:
          - model: "gpt-4o"
            endpoint: "https://{endpoint}/openai/deployments/{deployment-id}"
            weight: 1
          - model: "gpt-3.5"
            endpoint: "https://{endpoint}/openai/deployments/{deployment-id}"
            weight: 1
          - model: "gpt-4.5"
            endpoint: "https://{endpoint}/openai/deployments/{deployment-id}"
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
name: "Azure OpenAI Service API"
basePath: "/QXp1cmUgT3BlbkFJIFNlcnZpY2UgQVBJMjAyNC0wNi0wMQ"
version: "1.0.0"
type: "REST"
defaultVersion: false
subscriptionValidation: false
aiProvider:
  name: "AzureAI"
  apiVersion: "2021-06-01"
endpointConfigurations:
  production:
    endpoint: "https://{endpoint}/openai/deployments/{deployment-id}"
    endpointSecurity:
      enabled: true
      securityType:
        secretName: "azure-ai-secret"
        in: "Header"
        apiKeyNameKey: "api-key"
        apiKeyValueKey: "apiKey"
    aiRatelimit: 
      enabled: true
      token:
        promptLimit: 5000
        completionLimit: 10000
        totalLimit: 15000
        unit: Minute
      request:
        requestLimit: 6000
        unit: Minute
operations:
- target: "/completions"
  verb: "POST"
  secured: true
  scopes: []
- target: "/embeddings"
  verb: "POST"
  secured: true
  scopes: []
- target: "/chat/completions"
  verb: "POST"
  secured: true
  scopes: []
- target: "/audio/transcriptions"
  verb: "POST"
  secured: true
  scopes: []
- target: "/audio/translations"
  verb: "POST"
  secured: true
  scopes: []
- target: "/images/generations"
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
            endpoint: "https://{endpoint}/openai/deployments/{deployment-id}"
            weight: 1
          - model: "gpt-3.5"
            endpoint: "https://{endpoint}/openai/deployments/{deployment-id}"
            weight: 1
          - model: "gpt-4.5"
            endpoint: "https://{endpoint}/openai/deployments/{deployment-id}"
            weight: 1
        sandboxModels:
          - model: "gpt-4o"
            endpoint: "https://{endpoint}/openai/deployments/{deployment-id}"
            weight: 1
          - model: "gpt-3.5"
            endpoint: "https://{endpoint}/openai/deployments/{deployment-id}"
            weight: 1
          - model: "gpt-4.5"
            endpoint: "https://{endpoint}/openai/deployments/{deployment-id}"
            weight: 1
```

### Step 3 - Deploy the API in APK

Follow rest of the steps in the<a href="../../../../create-api/create-and-deploy-apis/ai/create-ai-api-using-rest-api" target="_blank">Develop and Deploy a AI API via REST API</a> documentation to deploy the AI API using APK configuration.

### Step 4 - Verify the API Invocation

<a href="../../../../develop-and-deploy-api/security/generate-access-token" target="_blank">Generate an access token</a> and invoke the API using the following command:

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

Once you invoked the above request multiple time, you can view the response coming from different configured models.


