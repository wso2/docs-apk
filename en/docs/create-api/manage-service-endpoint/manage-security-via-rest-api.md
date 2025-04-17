# Add Basic Auth Backend Security via the REST API Interface

You can secure access to your backend via the Basic Authentication scheme. 
For that, you can refer to an already created K8s `Secret`.

## Create a K8s `Secret`

You can create a K8s secret using the following format including your username and password in base64 encoded format.

```
  apiVersion: v1
  kind: Secret
  metadata:
    name: backend-creds
  data:
    username: YWRtaW4=
    password: YWRtaW4=
  type: Opaque
```
  You can apply this CR using kubectl.
=== "Format"
    ```
    kubectl apply -f <path-to-crs>
    ```

=== "Command"
    ```
    kubectl apply -f .
    ```
  Then you can add the secret name `backend-creds` via REST APIs in the following way.

  The following is a sample code snippet that defines how you can define Basic auth endpoint security within an API `apk-conf` file.

#### Direct Endpoints

  ```
    endpointConfigurations:
      production:
        - endpoint: "https://dev-tools.wso2.com/gs/helpers/v1.0"
          endpointSecurity:
            enabled: true
            securityType:
              secretName: "backend-creds"
              userNameKey: "username"
              passwordKey: "password"
  ```

#### Service Endpoints

  ```
    endpointConfigurations:
      production:
        - endpoint: "https://dev-tools.wso2.com/gs/helpers/v1.0"
            name: "backend-service"
            port: 80
            protocol: "http"
          endpointSecurity:
            enabled: true
            securityType:
              secretName: "backend-creds"
              userNameKey: "username"
              passwordKey: "password"
  ```

A sample `apk-conf` file with direct endpoints and basic authentication is shown below.

```
name: "Sample API"
basePath: "/sample-api"
version: "0.1.0"
type: "REST"
defaultVersion: false
endpointConfigurations:
  production:
    - endpoint: "https://dev-tools.wso2.com/gs/helpers/v1.0"
      endpointSecurity:
        enabled: true
        securityType:
          secretName: "backend-creds"
          userNameKey: "username"
          passwordKey: "password"
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

You can then deploy this API by following the steps in [Create an API](../../get-started/quick-start-guide.md) documentation.