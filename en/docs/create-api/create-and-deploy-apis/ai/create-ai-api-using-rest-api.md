Follow the instructions below to create a REST API using the APK deployer REST API.

## Step 1. Select OAS Definition for LLM Provider 

You can use the following sample OpenAPI Specification (OAS) definition for the OpenAI service.

- [OpenAI OAS Definition](https://raw.githubusercontent.com/wso2/apk/refs/heads/main/samples/llm-providers-oas-definitions/openai/openai_api.yaml)
- [Azure OpenAI OAS Definition](https://raw.githubusercontent.com/wso2/apk/refs/heads/main/samples/llm-providers-oas-definitions/azure/azure_api.yaml)
- [Mistral AI OAS Definition](https://raw.githubusercontent.com/wso2/apk/refs/heads/main/samples/llm-providers-oas-definitions/mistral/mistral_api.yaml)

Save and download the selected sample file. This is the OAS definition of the AI API that we are going to deploy in APK.

## Step 2. Generate APK configuration file.

This service generates an APK configuration file by providing your OAS file. APK configuration file includes important API metadata, rate limiting details, security settings, and other necessary information about your API.

The OpenAPI specification file can be provided as a local file or as a URL containing a definition file. For this usecase, we will use the Azure OpenAI OAS definition.

1. As a local file

```bash
curl -k --location 'https://api.am.wso2.com:9095/api/configurator/1.2.0/apis/generate-configuration' \
--header 'Host: api.am.wso2.com' \
--form 'definition=@"/Users/user/azure_api.yaml"'
```

2. As a URL

The following URLs contain valid sample definitions that you can use.

OpenAPI Specification for REST API:

```bash
curl -k --location 'https://api.am.wso2.com:9095/api/configurator/1.1.0/apis/generate-configuration' \
--header 'Host: api.am.wso2.com' \
--form 'url="https://raw.githubusercontent.com/wso2/apk/refs/heads/main/samples/llm-providers-oas-definitions/azure/azure_api.yaml"' \
--form 'apiType="REST"'
```

The sample output of the generated APK Configuration (apk-conf) file will be as follows.

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

## Step 3. Save the response to a file with the extension .apk-conf.

For example, you can save under the name, azure.apk-conf.

## Step 4. Update the APK configuration file.

Review the content inside the apk-conf file and update it with additional API configurations as needed, such as configuring AI Provider, LLM Service URl, API Key provided from LLM Service and rate limits, CORS configurations, etc.

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

## Step 5. Create Secret CR to store LLM Service API Key

Create a secret containing the API Key of the LLM Service Provider using the following command. Replace the ```api key of LLM Service``` value with your API Key generated for LLM Service Provider.

=== "Sample Command"
```bash
    kubectl create secret generic azure-ai-secret --from-literal=apiKey='xxxxxxxxxxxxxxxxxxx' --namespace=apk
```
=== "Command Format"
```bash
    kubectl create secret generic azure-ai-secret --from-literal=apiKey='<<api key of LLM Service>>' --namespace=apk
```

## Step 6. Deploy the API to a Kubernetes cluster.

Once you have crafted your APK Configuration File, you have two convenient options for deploying them. Choose the deployment option that best suits your development workflow. Whether you prefer the customization capabilities of the Config Generator and CI/CD pipeline or the simplicity and speed of the Config Deployer, APK empowers you with flexible and efficient API deployment methods in the Kubernetes ecosystem.

### Option 1 - Deploy API using APK Config Deployer tool

You can deploy the API directly into APK using API Schema definition and APK configuration file using the command below.

```
curl --location 'https://api.am.wso2.com:9095/api/deployer/1.2.0/apis/deploy' \
--header 'Content-Type: multipart/form-data' \
--header 'Accept: application/yaml' \
--header 'Authorization: Bearer <Access Token From IDP>' \
--form 'apkConfiguration=@"/Users/user/azure.apk-conf"' \
--form 'definitionFile=@"/Users/user/azure-api.yaml"'
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
