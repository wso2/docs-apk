# Add Basic Auth Backend Security via the REST API Interface


You can secure access to your backend via the Basic Authentication scheme. 
For that, you can refer to an already created K8 `Secret`.


## Refer an already created  K8 `Secret`

  You can create a k8 secret using the follwing format including your username and password in base64 encoded format.

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
        endpoint:
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
