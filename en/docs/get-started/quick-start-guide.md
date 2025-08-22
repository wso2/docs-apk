# Deploying & Invoking a managed API on WSO2 Kubernetes Gateway

This guide provides a <b>step-by-step</b> approach to installing, deploying, and invoking an API using the <b>WSO2 Kubernetes Gateway </b>.

## Prerequisites

!!!NOTE
    If you already have an installation of the Kubernetes Gateway in your cluster, please remove the installation by following the steps specified in the <a href="../../setup/uninstall" target="_blank">Uninstall Kubernetes Gateway</a> section.

Before setting up Kubernetes Gateway, we need to:

- <b>Set up a Kubernetes cluster</b>
- <b>Install kubectl</b>, a command line tool for communicating with a Kubernetes cluster's control plane using the Kubernetes API
- <b>Install Helm</b> to deploy Kubernetes Gateway components in the Kubernetes cluster we create.

This guide uses <a href="https://rancherdesktop.io" target="_blank">Rancher Desktop</a> for setting up a local Kubernetes cluster, to ensure that you can follow along without needing a cloud-based Kubernetes environment. However, you can use Minikube, Docker Desktop, or any other Kubernetes environment you prefer.

For a streamlined setup on your <b>local desktop environment</b>, follow the steps below:

### Install Kubernetes Locally

Rancher Desktop provides a full Kubernetes environment and can be used for local development.

1. Install <a href="https://rancherdesktop.io/" target="_blank">Rancher Desktop</a> and ensure Kubernetes is enabled in the settings.
2. Install <a href="https://kubernetes.io/docs/tasks/tools/#kubectl" target="_blank">kubectl</a> to interact with your cluster:
3. Verify that Rancher Desktop is running and that kubectl can communicate with the cluster:

=== "Request"
    ```
    kubectl cluster-info
    ```
=== "Sample Response"
    ```
    Kubernetes control plane is running at https://127.0.0.1:6443
    CoreDNS is running at https://127.0.0.1:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
    Metrics-server is running at https://127.0.0.1:6443/api/v1/namespaces/kube-system/services/https:metrics-server:https/proxy
    ```

!!!NOTE
    If you face any issues with the installation, refer to the <a href="https://rancherdesktop.io/docs/troubleshooting/" target="_blank">Rancher Desktop Troubleshooting</a> guide.
    Also, refer to the <a href="../../about-apk/FAQs/#troubleshooting-rancher-desktop-kubernetes" target="_blank">FAQ</a> for more common issues faced on setting up Rancher.

!!!TIP
    If you are using a different Kubernetes environment, ensure that you have a working Kubernetes cluster and kubectl installed.

!!!NOTE
    Please refer to the <a href="../../setup/prerequisites" target="_blank">prerequisites</a> for setting cluster resources.

### Install Helm

<a href="https://helm.sh/docs/intro/install/" target="_blank">Install Helm</a> in order to deploy Kubernetes Gateway.

Ensure that Helm is installed correctly by running the following command:

=== "Request"
    ```
    helm version
    ```
=== "Sample Response"
    ```
    version.BuildInfo{Version:"v3.17.1", GitCommit:"980d8ac1939e39138101364400756af2bdee1da5", GitTreeState:"clean", GoVersion:"go1.23.5"}
    ```


## Step 1: Install & Start WSO2 Kubernetes Gateway

{!includes/start-apk.md!}

## Step 2: Configure the Managed API for a Sample Backend Service

Download and save the <b><a href="../../assets/files/get-started/SampleAPIDefinition.json" target="_blank" download>SampleAPIDefinition.json</a></b> file, which contains the OpenAPI Specification (OAS) definition for the API that corresponds to the backend service that we previously deployed. This definition will be used to deploy the API in Kubernetes Gateway.
Use the following command to download the file:

```
curl -O https://raw.githubusercontent.com/wso2/docs-apk/refs/heads/2.0.0/en/docs/assets/files/get-started/SampleAPIDefinition.json
```

Then, verify the file exists:

=== "Command"
    ```
    cat SampleAPIDefinition.json
    ```
=== "Response"
    ```
    {
        "openapi": "3.0.1",
        "info": {
            "title": "Sample API",
            "description": "A set of helpers inspired by httpbin.org",
            "version": "0.1.0"
        },
        "servers": [
            {
            "url": "https://dev-tools.wso2.com/gs/helpers/v1.0"
            }
        ],
        "tags": [
            {
            "name": "echo",
            "description": "Echo data from the HTTP request"
            },
            {
            "name": "dynamic",
            "description": "Dynamic data generation"
            },
            {
            "name": "convert",
            "description": "Convert data across various formats"
            },
            {
            "name": "AI",
            "description": "Leverage AI to transform and validate data"
            }
        ],
        "paths": {
            "/ai/spelling": {
            "post": {
                "operationId": "postAiSpelling",
                "requestBody": {
                "content": {
                    "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/ai_spelling_payload"
                    }
                    }
                },
                "required": true
                },
                "responses": {
                "200": {
                    "description": "Ok",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/ai_spelling_response"
                        }
                    }
                    }
                },
                "400": {
                    "description": "BadRequest",
                    "content": {
                    "application/json": {
                        "schema": {
                        "oneOf": [
                            {
                            "$ref": "#/components/schemas/error_response"
                            },
                            {
                            "$ref": "#/components/schemas/ErrorPayload"
                            }
                        ]
                        }
                    }
                    }
                },
                "500": {
                    "description": "InternalServerError",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/ErrorPayload"
                        }
                    }
                    }
                }
                }
            }
            },
            "/base64/decode/{value}": {
            "post": {
                "tags": [
                "convert"
                ],
                "summary": "Decodes base64url-encoded string.",
                "parameters": [
                {
                    "name": "value",
                    "in": "path",
                    "required": true,
                    "schema": {
                    "maxLength": 500,
                    "pattern": "^[0-9a-zA-Z=]+$",
                    "type": "string",
                    "default": "QmFsbGVyaW5hIGlzIGF3ZXNvbWUh"
                    }
                }
                ],
                "responses": {
                "200": {
                    "description": "Decoded base64 content.",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/base64_response"
                        }
                    }
                    }
                },
                "400": {
                    "$ref": "#/components/responses/error"
                }
                }
            }
            },
            "/base64/encode/{value}": {
            "post": {
                "tags": [
                "convert"
                ],
                "summary": "Base64 encode input string .",
                "parameters": [
                {
                    "name": "value",
                    "in": "path",
                    "required": true,
                    "schema": {
                    "maxLength": 500,
                    "pattern": "^[0-9a-zA-Z\\s!$-_]+$",
                    "type": "string",
                    "default": "Ballerina is awesome!"
                    }
                }
                ],
                "responses": {
                "200": {
                    "description": "Encoded base64 content.",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/base64_response"
                        }
                    }
                    }
                },
                "400": {
                    "$ref": "#/components/responses/error"
                }
                }
            }
            },
            "/ip": {
            "get": {
                "tags": [
                "echo"
                ],
                "summary": "Returns the client IP address.",
                "responses": {
                "200": {
                    "description": "Get the client IP address.",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/ip_response"
                        }
                    }
                    }
                },
                "404": {
                    "$ref": "#/components/responses/error"
                }
                }
            }
            },
            "/user-agent": {
            "get": {
                "tags": [
                "echo"
                ],
                "summary": "Return the User-Agent header value",
                "responses": {
                "200": {
                    "description": "Get the request User-Agent header value.",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/ua_response"
                        }
                    }
                    }
                },
                "404": {
                    "$ref": "#/components/responses/error"
                }
                }
            }
            },
            "/uuid": {
            "get": {
                "tags": [
                "dynamic"
                ],
                "summary": "Returns a unique ID as per UUID v4 spec",
                "responses": {
                "200": {
                    "description": "Get a UUID V4.",
                    "content": {
                    "application/json": {
                        "schema": {
                        "$ref": "#/components/schemas/uuid_response"
                        }
                    }
                    }
                },
                "default": {
                    "$ref": "#/components/responses/error"
                }
                }
            }
            }
        },
        "components": {
            "schemas": {
            "ip_response": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                "origin": {
                    "maxLength": 64,
                    "pattern": "^[0-9\\.]+$",
                    "type": "string"
                }
                }
            },
            "base64_response": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                "value": {
                    "maxLength": 100,
                    "pattern": "^[0-9\\.]+$",
                    "type": "string"
                }
                }
            },
            "ua_response": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                "user-agent": {
                    "maxLength": 1000,
                    "pattern": "^[0-9a-zA-Z_\\-\\/,();\\.\\s]+$",
                    "type": "string"
                }
                }
            },
            "uuid_response": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                "uuid": {
                    "maxLength": 36,
                    "minLength": 36,
                    "pattern": "^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$",
                    "type": "string"
                }
                }
            },
            "error_response": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                "message": {
                    "maxLength": 50,
                    "type": "string"
                },
                "code": {
                    "maxLength": 10,
                    "type": "string"
                }
                }
            },
            "ai_spelling_payload": {
                "required": [
                "text"
                ],
                "type": "object",
                "properties": {
                "text": {
                    "maxLength": 100,
                    "pattern": "^[\\w\\s]+$",
                    "type": "string"
                }
                }
            },
            "ai_spelling_response": {
                "required": [
                "correctedText"
                ],
                "type": "object",
                "properties": {
                "correctedText": {
                    "maxLength": 150,
                    "pattern": "^[\\w\\s]+$",
                    "type": "string"
                }
                }
            },
            "ErrorPayload": {
                "required": [
                "message",
                "method",
                "path",
                "reason",
                "status",
                "timestamp"
                ],
                "type": "object",
                "properties": {
                "timestamp": {
                    "type": "string"
                },
                "status": {
                    "type": "integer",
                    "format": "int64"
                },
                "reason": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                },
                "path": {
                    "type": "string"
                },
                "method": {
                    "type": "string"
                }
                }
            }
            },
            "responses": {
            "error": {
                "description": "Response for any error",
                "content": {
                "application/json": {
                    "schema": {
                    "$ref": "#/components/schemas/error_response"
                    }
                }
                }
            }
            }
        }
    }
    ```


### Generate Kubernetes Gateway Configuration File from the OpenAPI Definition

In addition to the OpenAPI definition file, we need a Kubernetes Gateway configuration file (apk-conf) that defines metadata and settings for the API. Kubernetes Gateway provides a configuration service that automatically generates this file from the OpenAPI definition.
Execute the following command to generate the apk-conf file. Use the values provided in the table below in the body of your request.

| Field      | Value                                                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------------------------- |
| definition | `SampleAPIDefinition.json` file that was downloaded at the beginning of [Step 3](#step-3-create-and-deploy-the-api) |

=== "Sample Request"
    ```
    curl -k --location 'https://api.example.com:9095/api/configurator/1.3.0/apis/generate-configuration' \
    --header 'Host: api.example.com' \
    --form 'definition=@"SampleAPIDefinition.json"' > SampleService.apk-conf
    ```

=== "Request Format"
    ```
    curl --location 'https://<host>:9095/api/configurator/1.3.0/apis/generate-configuration' \
    --header 'Host: <host>' \
    --form 'apiType="<api-type>"' \
    --form 'definition=@"<path/to/SampleAPIDefinition.json>"'
    ```

The response will contain the Kubernetes Gateway configuration file content, which will be saved as SampleService.apk-conf. You can verify the saved content by running:

=== "Sample Request"
    ```
    cat SampleService.apk-conf
    ```

=== "Sample Response"
    ```
    ---
    name: "Sample API"
    basePath: "/U2FtcGxlIEFQSTAuMS4w"
    version: "0.1.0"
    type: "REST"
    defaultVersion: false
    subscriptionValidation: false
    endpointConfigurations:
        production:
        - endpoint: "https://httpbin.org/"
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

### Customize the API Configuration

The generated apk-conf file can be modified to suit your needs. For instance, you can update the file to create a cleaner base path for the API from the default value to /sample-api. Change the file to include the line basePath: "/sample-api" as shown below:

!!! Important
    We recommend installing the <a href="../../api-management-overview/apk-conf-lang-support/" target="_blank">Kubernetes Gateway Config Language Support Visual Studio Code (VS Code) extension</a> to easily edit and validate the Kubernetes Gateway configuration file.

=== "The Modified SampleService.apk-conf"
    ```
    ---
    name: "Sample API"
    basePath: "/sample-api"
    version: "0.1.0"
    type: "REST"
    defaultVersion: false
    subscriptionValidation: false
    endpointConfigurations:
        production:
        - endpoint: "https://httpbin.org/"
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
    keyManagers:
    - name: local-idp
      issuer: https://your-idp-host
      JWKSEndpoint: https://apk-wso2-kgw-idp-ds-service.default.svc:9443/oauth2/jwks
      claimMappings: []
      k8sBackend:
        name: apk-wso2-kgw-oauth-ds-backend
        port: 9443
    ```

## Step 3: Generate Access Token

To deploy and manage APIs using Kubernetes Gateway, you need a valid access token issued by an identity provider (IdP). Kubernetes Gateway supports third-party IdPs such as <b>Asgardeo</b> and <b>Auth0</b>, but for this guide, we will use the <b>inbuilt non-production IdP</b>, which is only meant to be used for testing purposes.

!!!NOTE
    If you are using a different organization to the one used in this guide, you will have to create a TokenIssuer with the relevant organization name in Kubernetes Gateway before proceeding to the next step. You can use the <a href="../../develop-and-deploy-api/token-issuers/token-issuers" target="_blank">Add Token Issuer</a> to create a new token issuer.

We will use the <a href="https://oauth.net/2/grant-types/client-credentials/" target="_blank">Client Credentials Grant Type</a> to obtain the access token. To do this, you must provide a <b>client ID</b> and <b>client secret</b> that have been generated beforehand.

!!!NOTE
    In this example, we use sample credentials from the built-in non-production identity provider. These should only be used for testing purposes.

Run the following command (with the provided values) to generate your access token:

=== "Sample Request"
    ```
    token=$(curl -s -k --location 'https://idp.example.com:9095/oauth2/1.0.0/token' \
        --header 'Host: idp.example.com' \
        --header 'Authorization: Basic NDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyOjRmYmQ2MmVjLWE5MmUtMTFlZC1hZmExLTAyNDJhYzEyMDAwMg==' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'grant_type=client_credentials' \
        --data-urlencode 'scope=apk:api_create' \
        | jq -r '.access_token')
    ```

=== "Sample Response"
    ```
    {"access_token":"eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ", "token_type":"Bearer", "expires_in":3600, "scope":"apk:api_create"}
    ```
=== "Request Format"
    ```
    curl --location 'https://<host>:9095/oauth2/token' \
    --header 'Host: <host>' \
    --header 'Authorization: Basic <Base64Encoded(clientId:clientSecret)>' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'grant_type=client_credentials'
    --data-urlencode 'scope=apk:api_create'
    ```

!!!Important
    - <b> The provided credentials and tokens are only for non-production use. </b>
    - <b> The token expires after 3600 seconds (1 hour). </b>
    - If you are using a third-party IdP, refer to the <a href="https://apk.docs.wso2.com/en/latest/setup/identity-platform/idp/idp-overview/" target="_blank">Kubernetes Gateway Identity Provider Configuration Guide</a> for setup details.

Now that you have a valid access token, you can proceed to deploy and invoke APIs using Kubernetes Gateway.

## Step 4: Deploy and Invoke the API

You now have the API Definition (`SampleAPIDefinition.json`) and the apk-conf file (`SampleService.apk-conf`) corresponding to the API. We can use these files to deploy the API in Kubernetes Gateway. 

Use the provided values in the table below in the body of your request.

| Field            | Value                           | Required         |
| ---------------- | ------------------------------- | ---------------- |
| apkConfiguration | `SampleService.apk-conf` file   | :material-check: |
| definitionFile   | `SampleAPIDefinition.json` file | :material-check: |

Replace <your-access-token> with the one you obtained from the previous step and run the following command to deploy the API:

=== "Sample Request"
    ```
    curl -k --location 'https://api.example.com:9095/api/deployer/1.3.0/apis/deploy?organization=default' \
    --header 'Host: api.example.com' \
    --header "Authorization: Bearer $token" \
    --form 'apkConfiguration=@"SampleService.apk-conf"' \
    --form 'definitionFile=@"SampleAPIDefinition.json"'
    ```

=== "Sample Response"
    ```
    ---
    id: "2d43a29159fbc77652b687243d545a7038c3abd6"
    name: "Sample API"
    basePath: "/sample-api"
    version: "0.1.0"
    type: "REST"
    defaultVersion: false
    subscriptionValidation: false
    endpointConfigurations:
        production:
        - endpoint: "https://httpbin.org/"
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
    keyManagers:
    - name: local-idp
      issuer: https://your-idp-host
      JWKSEndpoint: https://apk-wso2-kgw-idp-ds-service.default.svc:9443/oauth2/jwks
      claimMappings: []
      k8sBackend:
        name: apk-wso2-kgw-oauth-ds-backend
        port: 9443

    ```
=== "Request Format"
    ```
    curl --location 'https://<host>:9095/api/deployer/1.3.0/apis/deploy' \
    --header 'Host: <host>' \
    --header 'Authorization: Bearer <access-token>' \
    --form 'apkConfiguration=@"path/to/SampleService.apk-conf"' \
    --form 'definitionFile=@"path/to/SampleAPIDefinition.json"'
    ```

Execute the command below. You will be able to see that the HttpRoutes and RouteMetadata related to the `Sample API` is successfully deployed as shown in the image.

=== "HttpRoutes"
    ```
    kubectl get httproutes
    ```

    [![Deployed API](../assets/img/get-started/deployed-api.png)](../assets/img/get-started/deployed-api.png)



=== "RouteMetadata"
    ```
    kubectl get routemetadata
    ```

    [![Deployed API](../assets/img/get-started/deployed-routemetada.png)](../assets/img/get-started/deployed-routemetada.png)

Now the API is ready to be invoked. Let’s get a random UUID by invoking the `/uuid` resource in the `Sample API`.

To invoke the API, replace <your-access-token> with your access token here as well:

=== "Sample Request"
    ```
    curl -k --location 'https://default.gw.example.com:9095/sample-api/0.1.0/uuid' \
    --header 'Host: default.gw.example.com' \
    --header "Authorization: Bearer $token"
    ```

=== "Sample Response"
    ```
    {
        "uuid":"f4a38d31-21e8-4b5d-9c26-792e6805dd54"
    }
    ```
=== "Request Format"
    ```
    curl --location 'https://<host>:9095/<basePath>/0.1.0/uuid' \
    --header 'Host: <host>' \
    --header 'Authorization: Bearer <access-token>'
    ```

## Conclusion

Congratulations! You have successfully:

- Set up your <b>Kubernetes environment</b> and deployed <b>WSO2 Kubernetes Gateway</b>.
- Deployed a <b>backend service</b> inside Kubernetes.
- Configured and deployed a <b>managed API</b> for the backend service.
- Generated an <b>access token</b> to authenticate API requests.
- Successfully <b>invoked the API</b> and received a response.

This Quick Start Guide covered the essential steps to get your first API up and running with WSO2 Kubernetes Gateway.
For advanced topics such as API security, rate limiting, analytics, and custom policies, check out the <a href="https://apk.docs.wso2.com/en/latest/api-management-overview/create-api-overview/" target="_blank">WSO2 Kubernetes Gateway Documentation</a>.