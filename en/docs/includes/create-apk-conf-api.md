## Step 1. Develop a backend service
   
To begin, it's essential to have a backend service that your API will interact with. The Kubernetes Gateway Configuration file is generated based on the API schema, which, in turn, relies on the functionality of your backend service. 

This guide utilizes a pre-existing backend service hosted in the cloud. When using your own backend deployed in a Kubernetes cluster, ensure that backend is up and running prior to invoking the API.

## Step 2. Generate an API schema file for your service. 

You will need an OpenAPI Specification 3.x that describes the structure and behavior of your API. This file serves as the foundation for configuring your API and is essential for generating the Kubernetes Gateway Configuration file.

Download and save the sample <a href="https://raw.githubusercontent.com/wso2/docs-apk/refs/heads/1.3.0/en/docs/assets/files/get-started/SampleAPIDefinition.json" target="_blank">SampleAPIDefinition.json</a> file. This is the OAS definition of the API that we are going to deploy in Kubernetes Gateway.

## Step 3. Generate Kubernetes Gateway configuration file.
    
This service generates a Kubernetes Gateway configuration file by providing your 3.x OpenAPI specification file. Kubernetes Gateway configuration file includes important API metadata, rate limiting details, security settings, and other necessary information about your API.

The OpenAPI specification file can be provided as a local file or as a URL containing a definition file.

1. As a local file

    ```bash
    curl -k --location 'https://api.example.com:9095/api/configurator/1.3.0/apis/generate-configuration' \
    --header 'Host: api.example.com' \
    --form 'definition=@"/Users/user/SampleAPIDefinition.json"'
    ```

2. As a URL

    The following URLs contain valid sample definitions that you can use.

    OpenAPI Specification for REST API:

    ```bash
    curl -k --location 'https://api.example.com:9095/api/configurator/1.3.0/apis/generate-configuration' \
    --header 'Host: api.example.com' \
    --form 'url="https://raw.githubusercontent.com/wso2/docs-apk/refs/heads/1.3.0/en/docs/assets/files/get-started/SampleAPIDefinition.json"' \
    --form 'apiType="REST"'
    ```

    The sample output of the generated Kubernetes Gateway Configuration (apk-conf) file will be as follows.

    ```yaml
    name: "Sample API"
    basePath: "/sample-api"
    version: "0.1.0"
    type: "REST"
    defaultVersion: false
    endpointConfigurations:
        production:
          - endpoint: "https://dev-tools.wso2.com/gs/helpers/v1.0"
    operations:
      - target: "/ai/spelling"
        verb: "POST"
        secured: true
        scopes: []
      - target: "/base64/decode/{value}"
        verb: "POST"
        secured: true
        scopes: []
      - target: "/base64/encode/{value}"
        verb: "POST"
        secured: true
        scopes: []
      - target: "/ip"
        verb: "GET"
        secured: true
        scopes: []
      - target: "/user-agent"
        verb: "GET"
        secured: true
        scopes: []
      - target: "/uuid"
        verb: "GET"
        secured: true
        scopes: []
    ```

## Step 4. Save the response to a file with the extension .apk-conf. 

For example, you can save under the name SampleService.apk-conf.

## Step 5. Update the Kubernetes Gateway configuration file.

Review the content inside the apk-conf file and update it with additional API configurations as needed, such as rate limits, CORS configurations, etc.

!!! note
    To optimize the configuration process, Kubernetes Gateway presents a VS Code plugin designed to offer syntax highlighting and intelligent suggestions. This plugin simplifies the incorporation of rate limitations, new resources, and security configurations into your API. Adapt the contents of the Kubernetes Gateway Configuration file as needed. For further details, refer to the section on <a href="../../../../api-management-overview/apk-conf-lang-support" target="_blank">Enhance Configuration with Kubernetes Gateway Config Language Support</a>.