# Quick Start Guide

This section is a step-by-step guide to create, deploy and invoke an API using the WSO2 API Platform For Kubernetes.

## Before you begin...

Install the [prerequisites](../../setup/prerequisites) that are required to run WSO2 API Platform For Kubernetes.

## Step 1 - Start WSO2 API Platform For Kubernetes

{!includes/start-apk.md!}

## Step 2 - Create and Deploy the API

1. Save and download the sample [EmployeeServiceDefinition.json](../assets/files/get-started/EmployeeServiceDefinition.json) file. This is the OAS definition of the API that we are going to deploy in APK.
2. Add a hostname mapping to the ```/etc/hosts``` file as follows.

    |     IP      |     Domain name     |
    |-------------|---------------------|
    | 127.0.0.1   | api.am.wso2.com     |
    | 127.0.0.1   | idp.am.wso2.com     |
    | 127.0.0.1   | default.gw.wso2.com |

### Generate APK configuration file for the API

Apart from the above API definition file, we also need an `apk-conf` file which defines the configurations and metadata for this API. We have a configuration service which can be used to generate this apk-conf file given the API definition. 

1. Execute the following request to generate the apk configuration. Use the values provided in the table below in the body of your request. 

    |    Field     |                               Value                                                      |
    |--------------|------------------------------------------------------------------------------------------|
    | apiType      | REST                                                                                     |
    | definition   | `EmployeeServiceDefinition.json` file that was downloaded at the beginning of [Step 2](#step-2-create-and-deploy-the-api)     |

    === "Request"
        ```
        curl --location 'https://<host>:9095/api/configurator/1.0.0/apis/generate-configuration' \
        --header 'Host: <host>' \
        --form 'apiType="<api-type>"' \
        --form 'definition=@"<path/to/EmployeeServiceDefinition.json>"'
        ```

    === "Sample Request"
        ```
        curl -k --location 'https://api.am.wso2.com:9095/api/configurator/1.0.0/apis/generate-configuration' \
        --header 'Host: api.am.wso2.com' \
        --form 'apiType="REST"' \
        --form 'definition=@"/Users/user/EmployeeServiceDefinition.json"'
        ```

    === "Sample Response"
        ```
        ---
        name: "EmployeeServiceAPI"
        context: ""
        version: "3.14"
        type: "REST"
        defaultVersion: false
        endpointConfigurations:
            production:
                endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
        operations:
        - target: "/employee"
            verb: "GET"
            authTypeEnabled: true
            scopes: []
        - target: "/employee"
            verb: "POST"
            authTypeEnabled: true
            scopes: []
        - target: "/employee/{employeeId}"
            verb: "PUT"
            authTypeEnabled: true
            scopes: []
        - target: "/employee/{employeeId}"
            verb: "DELETE"
            authTypeEnabled: true
            scopes: []
        ```

2. You will get the apk-conf file content as the response. Save this content into a file named `EmployeeService.apk-conf`. Modify the content to add the `context`. The specific changes you have to make are indicated in the table below.

    <table>
        <tbody>
            <tr>
                <th colspan="2" >Parameter</th>
                <th>Description</th>
            </tr>
            <tr>
                <td colspan="2" class="confluenceTd"><pre>context: "/test"</pre></td>
                <td class="confluenceTd">Change the context parameter to "/test"</td>
            </tr>
        </tbody>
    </table>

    Sample content after the modification is shown below.
        ```
        name: "EmployeeServiceAPI"
        context: "/test"
        version: "3.14"
        type: "REST"
        defaultVersion: false
        endpointConfigurations:
            production:
                endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
        operations:
        - target: "/employee"
            verb: "GET"
            authTypeEnabled: true
            scopes: []
        - target: "/employee"
            verb: "POST"
            authTypeEnabled: true
            scopes: []
        - target: "/employee/{employeeId}"
            verb: "PUT"
            authTypeEnabled: true
            scopes: []
        - target: "/employee/{employeeId}"
            verb: "DELETE"
            authTypeEnabled: true
            scopes: []
        ```

!!!NOTE
    If you are using a different organization to the one used in this guide, you will have to create a JWTIssuer with relevant organization name in APK before proceeding to the next step. You can use the [Add JWT Issuer](../develop-and-deploy-api/jwt-issuers/jwt-issuers.md) to create a new jwt issuer.

### Generate an access token to invoke APIs

To invoke the system APIs such as for deploying, we need a valid access token issued by an identity provider (IdP). While APK supports third party IdPs such as Asgardeo and Auth0, it supports an inbuilt non-production identity provider as well, which is only meant for testing purposes. We are going to use the non-production inbuilt IdP for this guide.

1. Execute the following request to generate the access token. Use the base64 encoded value of the colon separated client Id and client secret provided in the table below in the Authorization header of the request. We will be using the client credentials grant type to generate the token.

    |    Field        |                    Value                    |
    |-----------------|---------------------------------------------|
    | Client ID       | 45f1c5c8-a92e-11ed-afa1-0242ac120002        |
    | Client Secret   | 4fbd62ec-a92e-11ed-afa1-0242ac120002        |

    === "Request"
        ```
        curl --location 'https://<host>:9095/oauth2/token' \
        --header 'Host: <host>' \
        --header 'Authorization: Basic <Base64Encoded(clientId:clientSecret)>' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'grant_type=client_credentials'
        ```

    === "Sample Request"
        ```
        curl -k --location 'https://idp.am.wso2.com:9095/oauth2/token' \
        --header 'Host: idp.am.wso2.com' \
        --header 'Authorization: Basic NDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyOjRmYmQ2MmVjLWE5MmUtMTFlZC1hZmExLTAyNDJhYzEyMDAwMg==' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'grant_type=client_credentials'
        ```

    === "Sample Response"
        ```
        {"access_token":"eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ", "token_type":"Bearer", "expires_in":3600, "scope":"default"}
        ```

Now you can use this access token to invoke the Resources and APIs that follow.

### Deploy the API in APK

You now have the API Definition (`EmployeeServiceDefinition.json`) and the apk-conf file (`EmployeeService.apk-conf`) corresponding to the API. We can use these files to deploy the API in APK. 

1. Use the values provided in the table below in the body of your request.

    |    Field        |                    Value                    |
    |-----------------|---------------------------------------------|
    | apkConfiguration       | `EmployeeService.apk-conf` file       |
    | definitionFile   | `EmployeeServiceDefinition.json` file        |

2. Send the access token in the Authorization header as a bearer token. This is the access token received by following the steps under ["Generate an access token to invoke APIs"](#generate-an-access-token-to-invoke-apis) section above.
3. Execute the API deployment request. You will receive a successful response with an Id for the API.

    === "Request"
        ```
        curl --location 'https://<host>:9095/api/deployer/1.0.0/apis/deploy' \
        --header 'Host: <host>' \
        --header 'Authorization: bearer <access-token>' \
        --form 'apkConfiguration=@"path/to/EmployeeService.apk-conf"' \
        --form 'definitionFile=@"path/to/EmployeeServiceDefinition.json"'
        ```

    === "Sample Request"
        ```
        curl -k --location 'https://api.am.wso2.com:9095/api/deployer/1.0.0/apis/deploy' \
        --header 'Host: api.am.wso2.com' \
        --header 'Authorization: bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ' \
        --form 'apkConfiguration=@"/Users/user/EmployeeService.apk-conf"' \
        --form 'definitionFile=@"/Users/user/EmployeeServiceDefinition.json"'
        ```

    === "Sample Response"
        ```
        ---
        id: "3940857a942e08686e58b511d43d046a7168281e"
        name: "EmployeeServiceAPI"
        context: "/test"
        version: "3.14"
        type: "REST"
        defaultVersion: false
        endpointConfigurations:
            production:
                endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
        operations:
        - target: "/employee"
            verb: "GET"
            authTypeEnabled: true
            scopes: []
        - target: "/employee"
            verb: "POST"
            authTypeEnabled: true
            scopes: []
        - target: "/employee/{employeeId}"
            verb: "PUT"
            authTypeEnabled: true
            scopes: []
        - target: "/employee/{employeeId}"
            verb: "DELETE"
            authTypeEnabled: true
            scopes: []
        ```

4. Execute the command below. You will be able to see that the `EmployeeServiceAPI` is successfully deployed as shown in the image.

    === "Format"
        ```
        kubectl get apis -n <namespace>
        ```

    === "Command"
        ```
        kubectl get apis -n apk
        ```

    [![Deployed API](../assets/img/get-started/deployed-api.png)](../assets/img/get-started/deployed-api.png)

## Step 3 - Invoke the API

Now the API is ready to be invoked. Let’s get the list of Employees by invoking the `/employee` resource in the `EmployeeServiceAPI`.

1. Execute the following request to invoke the API. Make sure to provide the access token obtained in the previous step under ["Generate an access token to invoke APIs"](#generate-an-access-token-to-invoke-apis) section as the `Authorization` header in this request.

    === "Request"
        ```
        curl --location 'https://<host>:9095/test/3.14/employee' \
        --header 'Host: <host>' \
        --header 'Authorization: bearer <access-token>'
        ```

    === "Sample Request"
        ```
        curl -k --location 'https://default.gw.wso2.com:9095/test/3.14/employee' \
        --header 'Host: default.gw.wso2.com' \
        --header 'Authorization: bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ'
        ```

    === "Sample Response"
        ```
        [{"name":"Mrs. Heily Feyers","id":"1234123","department":"IT"},{"name":"Mr. Brendon MacSmith","id":"23451234","department":"Sales"},{"name":"Mr. Peter Queenslander","id":"34561234","department":"IT"},{"name":"Miss. Liza MacAdams","id":"45671243","department":"Finance"}]
        ```

You will now be able to see a successful response with the details of the Employees from the mock backend that we used for this guide.
