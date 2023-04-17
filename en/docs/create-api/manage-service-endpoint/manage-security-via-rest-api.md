# Add Basic Auth Backend Security via the REST API Interface


You can secure access to your backend via the Basic Authentication scheme. 
For that, you can use one of the following ways.

1. [Refer an already created  K8 `Secret` resource containing `username` and `password` data](#refer-an-already-created-k8-secret)
2. [Directly Add the username and password via REST API](#directly-add-the-username-and-password)


## Refer an already created  K8 `Secret`

  You can create a k8 secret using the follwing format including your username and password in base64 encoded format.

  ```
  apiVersion: v1
  kind: Secret
  metadata:
    name: backend-creds
    namespace: apk
  data:
    username: YWRtaW4=
    password: YWRtaW4=
  type: Opaque
  ```

  Then you can add the secret name `backend-creds` via REST APIs in the following way.


  The following is a sample code snippet that defines how you can define Basic auth endpoint security within an API definition.

#### Direct Endpoints

  ```
      "endpointConfig": {
          "endpoint_type": "http",
          "production_endpoints": {
              "url": "https://httpbin.org"
          },
          "endpoint_security": {
              "production": {
                  "enabled": true,
                  "type": "Basic",
                  "secretRefName": "backend-creds"
              }
          }
      }
  ```

#### Service Endpoints

  ```
      "serviceInfo": {
          "name": "{{ServiceName}}",
          "namespace": "{{ServiceNamespace}}",
          "endpoint_security": {
              "production": {
                  "enabled": true,
                  "type": "Basic",
                  "secretRefName": "backend-creds"
              }
          }

      }
  ```

## Directly Add the `username` and `password`


The following is a sample code snippet that defines how you can define Basic auth endpoint security within an API definition.

#### Direct Endpoints

```
    "endpointConfig": {
        "endpoint_type": "http",
        "production_endpoints": {
            "url": "https://httpbin.org"
        },
        "endpoint_security": {
            "production": {
                "enabled": true,
                "type": "Basic",
                "username": "admin",
                "password": "admin"
            }
        }
    }
```

#### Service Endpoints

```
    "serviceInfo": {
        "name": "{{ServiceName}}",
        "namespace": "{{ServiceNamespace}}",
        "endpoint_security": {
            "production": {
                "enabled": true,
                "type": "Basic",
                "username": "admin",
                "password": "admin"
            }
        }
    }
```