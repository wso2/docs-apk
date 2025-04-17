# Define API Properties

## Before you begin

- <a href="../../../get-started/quick-start-guide" target="_blank">Create an API</a>

You can use the apk-conf file which is created in <a href="../../../get-started/quick-start-guide" target="_blank">Create an API</a> documentation and save this content into a file named `SampleServiceEndpoints.apk-conf`.

Sample content before the modification is shown below.

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

## Adding API Properties

Update the APK configuration as the following to add API Properties as additionalProperties in apk-conf. 
Here, we have added a property named `enableStore` with the value `true`.

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
    additionalProperties:
      - name: "enableStore"
        value: "true"
   ```

## Deploy APK configuration

Refer <a href="../../../get-started/quick-start-guide" target="_blank">Create an API</a> to deploy the API using APK configuration.