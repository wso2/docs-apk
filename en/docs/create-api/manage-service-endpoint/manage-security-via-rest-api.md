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
        endpoint: "https://httpbin.org"
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
        endpoint: "https://httpbin.org"
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
name: "EmployeeServiceAPI"
basePath: "/test"
version: "4.0"
type: "REST"
defaultVersion: true
endpointConfigurations:
  production:
    endpoint: "https://httpbin.org"
    endpointSecurity:
      enabled: true
      securityType:
        secretName: "backend-creds"
        userNameKey: "username"
        passwordKey: "password"
operations:
  - target: "/employee"
    verb: "GET"
    secured: true
    scopes: []
  - target: "/employee"
    verb: "POST"
    secured: true
    scopes: []
  - target: "/employee/{employeeId}"
    verb: "PUT"
    secured: true
    scopes: []
  - target: "/employee/{employeeId}"
    verb: "DELETE"
    secured: true
    scopes: []
```

You can then deploy this API by following the steps in <a href="../../../get-started/quick-start-guide" target="_blank">Create an API</a> documentation.