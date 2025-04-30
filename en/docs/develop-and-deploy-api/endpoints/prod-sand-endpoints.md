# Define production and sandbox endpoints

## Before you begin

- [Create an API](../../get-started/quick-start-guide.md)


You can use the apk-conf file which is created in [Create an API](../../get-started/quick-start-guide.md) documentation and save this content into a file named `SampleServiceEndpoints.apk-conf`.

!!! note
        Add `default.sandbox.gw.wso2.com` to your `/etc/hosts` file in order to try the sandbox endpoints.

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


## API level

It is mandatory to define at least one of the production endpoint or sandbox endpoint at the API level. Let's add different endpoints for sandbox and production.

Update the APK configuration as the following to add different endpoints to sandbox and production endpoints. You can use your own endpoints. In this example, we have used two different mocky endpoints; these endpoints might not work when you test. 

```yaml
  name: "Sample API"
  basePath: "/sample-api"
  version: "0.1.0"
  type: "REST"
  defaultVersion: false
  endpointConfigurations:
      production:
        - endpoint: "https://dev-tools.wso2.com/gs/helpers/v1.0"
      sandbox:
        - endpoint: "https://run.mocky.io/v3/4bf0062b-042e-4adf-b8c9-7be0cf8745cb"
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

Deploy the APK configuration, and now you can send requests to different endpoints based on your environments, either production or sandbox.

- https://default.gw.wso2.com:9095/sample-api/0.1.0/uuid/
- https://default.sandbox.gw.wso2.com:9095/sample-api/0.1.0/uuid/

## Resource level

You can define different endpoint URLs for different resources. The following is an example APK configuration to configure different production and sandbox endpoint for `/uuid` GET Resource.


```yaml
  name: "Sample API"
  basePath: "/sample-api"
  version: "0.1.0"
  type: "REST"
  defaultVersion: false
  endpointConfigurations:
      production:
        - endpoint: "https://dev-tools.wso2.com/gs/helpers/v1.0"
      sandbox:
        - endpoint: "https://run.mocky.io/v3/4bf0062b-042e-4adf-b8c9-7be0cf8745cb"
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
      endpointConfigurations:
        production:
          - endpoint: "https://run.mocky.io/v3/4bf0062b-042e-4adf-b8c9-7be0cf8745cb"
        sandbox:
          - endpoint: "https://run.mocky.io/v3/1327c339-354b-4080-8296-f6268365e67b"
```

Deploy the APK configuration and invoke the following get requests

- https://default.gw.wso2.com:9095/sample-api/0.1.0/uuid/
- https://default.sandbox.gw.wso2.com:9095/sample-api/0.1.0/uuid/

You will notice that the request goes to the appropriate endpoint based on the URL used. 