Follow the instructions below to create a AI API using the APK deployer REST API.

## Step 1. Select OAS Definition for LLM Provider 

You can use the following sample OpenAPI Specification (OAS) definition for the OpenAI service.

- [OpenAI OAS Definition](https://raw.githubusercontent.com/wso2/apk/refs/heads/main/samples/llm-providers-oas-definitions/openai/openai_api.yaml)
- [Azure OpenAI OAS Definition](https://raw.githubusercontent.com/wso2/apk/refs/heads/main/samples/llm-providers-oas-definitions/azure/azure_api.yaml)
- [Mistral AI OAS Definition](https://raw.githubusercontent.com/wso2/apk/refs/heads/main/samples/llm-providers-oas-definitions/mistral/mistral_api.yaml)

Save and download the selected sample file. This is the OAS definition of the AI API that we are going to deploy in APK.

## Step 2. Obtain the API Key and Endpoint from the LLM Service Provider

You need to obtain the API Key and Endpoint from the LLM Service Provider to configure the API in APK. The API Key is used to authenticate the API requests and the Endpoint is the URL where the API requests are sent.

Refer the following quick start guides to obtain the API Key and Endpoint from the LLM Service Provider.

- [OpenAI Quick Start Guide](https://beta.openai.com/docs/quickstart)
- [Azure OpenAI Quick Start Guide](https://learn.microsoft.com/en-us/azure/ai-services/openai/chatgpt-quickstart)
- [Mistral AI Quick Start Guide](https://console.mistral.ai)

For this use case, we will use the Azure OpenAI service and will use the API Key and the Endpoint obtained from the Azure Open AI Service. 

## Step 3. Generate APK configuration file.

This service generates an APK configuration file by providing your OAS file. APK configuration file includes important API metadata, rate limiting details, security settings, and other necessary information about your API.

The OpenAPI specification file can be provided as a local file or as a URL containing a definition file. For this use case, we will use the Azure OpenAI OAS definition therefore download and save the azure OAS file as <b>azure_api.yaml</b>.

=== "Sample Request"
    ```
    curl -k --location 'https://api.am.wso2.com:9095/api/configurator/1.2.0/apis/generate-configuration' \
    --header 'Host: api.am.wso2.com' \
    --form 'definition=@"/Users/user/azure_api.yaml"'
    ```
=== "Request Format"
    ```
    curl --location 'https://<host>:9095/api/configurator/1.2.0/apis/generate-configuration' \
    --header 'Host: <host>' \
    --form 'definition=@"<path/to/definition.yaml>"'
    ```
=== "Sample Response"
    ```yaml
    name: "Azure OpenAI Service API"
    basePath: "/QXp1cmUgT3BlbkFJIFNlcnZpY2UgQVBJMjAyNC0wNi0wMQ"
    version: "2024-06-01"
    type: "REST"
    defaultVersion: false
    subscriptionValidation: false
    endpointConfigurations:
        production:
            endpoint: "https://{endpoint}/openai"
    operations:
    - target: "/deployments/{deployment-id}/completions"
      verb: "POST"
      secured: true
      scopes: []
    - target: "/deployments/{deployment-id}/embeddings"
      verb: "POST"
      secured: true
      scopes: []
    - target: "/deployments/{deployment-id}/chat/completions"
      verb: "POST"
      secured: true
      scopes: []
    - target: "/deployments/{deployment-id}/audio/transcriptions"
      verb: "POST"
      secured: true
      scopes: []
    - target: "/deployments/{deployment-id}/audio/translations"
      verb: "POST"
      secured: true
      scopes: []
    - target: "/deployments/{deployment-id}/images/generations"
      verb: "POST"
      secured: true
      scopes: []
    ```

You will get the apk-conf file content as the response, as seen in the above sample response. Save this content into a file with the `.apk-conf` file extension. For example, you can save under the name, azure.apk-conf. 

!!! note 
    You will need to fill in the AI Provider and Endpoint Configuration fields such as endpoint and security, before deploying the API.

## Step 4. Update the APK configuration file.

Review the content inside the apk-conf file and update it with additional API configurations as needed, such as configuring AI Provider, LLM Service URl in the Endpoint Configuration, Secret which stores the API key provided from LLM Service and rate limits, CORS configurations, etc.

Refer to the sample configuration file below:

```yaml
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
```

!!! note
    To optimize the configuration process, APK presents a VS Code plugin designed to offer syntax highlighting and intelligent suggestions. This plugin simplifies the incorporation of rate limitations, new resources, and security configurations into your API. Adapt the contents of the APK Configuration file as needed. For further details, refer to the section on [Enhance Configuration with APK Config Language Support](../../../../api-management-overview/apk-conf-lang-support/)

!!! note
    The 'ai provider' field should be replaced with the actual AI Provider name and API Version.
    Refer the following table for the AI Provider name and API Version.
    
    | AI Provider              | API Version |
    |--------------------------|-------------|
    | AzureAI                  | 2024-06-01  |
    | ai-provider-open-ai      | v1          |
    | ai-provider-mistral-ai   | v1          |

!!! note
    - The `endpoint` and `deployment-id` in the `endpoint` field should be replaced with the actual values provided by the LLM Service Provider.
    - The `secretName` in the `securityType` field should be replaced with the actual Secret name which holds the API Key provided by the LLM Service Provider.
    - The `apiKey` in the `apiKeyValueKey` field should be replaced with the Secrets data Key which holds the actual API Key provided by the LLM Service Provider.
    - The `api-key` in the `apiKeyNameKey` field should be replaced with the actual API Key Header name provided by the LLM Service Provider.

!!! note
    - The `promptLimit`, `completionLimit`, `totalLimit`, `requestLimit` and `unit` in the `aiRatelimit` field should be replaced with the actual rate limit values which you need to restrict this API for this particular Endpoint.

## Step 5. Create Secret CR to store LLM Service API Key

Create a secret containing the API Key of the LLM Service Provider using the following command. Replace the ```api key of LLM Service``` value with your API Key generated for LLM Service Provider.

=== "Sample Command"
    ```bash
        kubectl create secret generic azure-ai-secret --from-literal=apiKey='xxxxxxxxxxxxxxxxxxx' 
    ```
=== "Command Format"
    ```bash
        kubectl create secret generic azure-ai-secret --from-literal=apiKey='<<api key of LLM Service>>' --namespace=<<namespace>>
    ```

## Step 6. Deploy the API to a Kubernetes cluster.

Once you have crafted your APK Configuration File, you have two convenient options for deploying them. Choose the deployment option that best suits your development workflow. Whether you prefer the customization capabilities of the Config Generator and CI/CD pipeline or the simplicity and speed of the Config Deployer, APK empowers you with flexible and efficient API deployment methods in the Kubernetes ecosystem.

### Option 1 - Deploy API using APK Config Deployer tool

To deploy the API, we need a valid access token issued by an identity provider (IdP). Follow the ["Generate Access Token"](../../../develop-and-deploy-api/security/generate-access-token.md) documentation to generate an access token.

After generating the token, you can deploy the API directly into APK using API Schema definition and APK configuration file using the command below.

=== "Sample Request"
    ```
    curl -k --location 'https://api.am.wso2.com:9095/api/deployer/1.2.0/apis/deploy' \
    --header 'Content-Type: multipart/form-data' \
    --header 'Accept: application/yaml' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiYXVkIjoiYXVkMSIsICJleHAiOjE3MzAwMTQ0MjksICJuYmYiOjE3MzAwMTA4MjksICJpYXQiOjE3MzAwMTA4MjksICJqdGkiOiIwMWVmOTQyZC02Y2I0LTFjNDgtYmFmYS04Yzg5NGFlZWZkYzIiLCAiY2xpZW50SWQiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAic2NvcGUiOiJhcGs6YXBpX2NyZWF0ZSJ9.isgFKKbdmIApTpCcZEhn1aWpHPFs4ZRhEva9Hjj6WMQWtwlYYlcgBK_g08p1zA0HOxCOZuAsXBcEMLnJ9HzgBq0bWKegWwAt_oTHCvDu4yi4gNYR0TLPc_8goa6fXS-iLckrG22Csi7ODoj84agW6rwLEq4G62dVWt4dNMSSO91cy2HdYtVjcnbKxefVJ942uwJOqqL4HqDc4a-u1rHeLchvwn_b1ezZIyWHcZQFsY2PP3UBZ30t_5-08V3w2AbkVXvppYpHKNqg647MzdOChz66nF0va5FxmlTr71uY0Q4Gufv-tT6QENWX_GcYhDmdH4OQXTFt9jHgm8lcXxyK7g' \
    --form 'apkConfiguration=@"/Users/user/azure.apk-conf"' \
    --form 'definitionFile=@"/Users/user/azure-api.yaml"'
    ```
=== "Request Format"
    ```
    curl -k --location 'https://<host>:9095/api/deployer/1.2.0/apis/deploy' \
    --header 'Host: <host>' \
    --header 'Authorization: bearer <access-token>' \
    --form 'apkConfiguration=@"path/to/apk-conf-file.apk-conf"' \
    --form 'definitionFile=@"path/to/oas-definition.yaml"'
    ```
=== "Sample Response"
    ```
    id: "8bcdea77634e2d4c827a7ea88f8075c4dd538834"
    name: "Azure OpenAI Service API"
    basePath: "/QXp1cmUgT3BlbkFJIFNlcnZpY2UgQVBJMjAyNC0wNi0wMQ"
    version: "1.0.0"
    type: "REST"
    defaultVersion: false
    subscriptionValidation: false
    endpointConfigurations:
      production:
        endpoint: "https://xxxxx.openai.azure.com/openai/deployments/yyyyyy"
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
            unit: "Minute"
          request:
            requestLimit: 6000
            unit: "Minute"
    aiProvider:
      name: "AzureAI"
      apiVersion: "2021-06-01"
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
    ```

### Option 2 - Generate K8s CRs using config generator tool and Deploy the API using Kubernetes Client

You can generate K8s resources as a zip file from config-deployer service.

```
curl --location 'https://api.am.wso2.com:9095/api/configurator/1.2.0/apis/generate-k8s-resources' \
--header 'Content-Type: multipart/form-data' \
--header 'Accept: application/zip' \
--form 'apkConfiguration=@"/Users/user/azure.apk-conf"' \
--form 'definitionFile=@"/Users/user/azure-api.yaml"' \
-k --output ./api-crds.zip
```

Once you have generated your K8s artifacts, the next step is to apply them to the Kubernetes API server.

```
kubectl apply -f <path_to_extracted_zip_file>
```

## Step 7. Verify the API Invocation

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