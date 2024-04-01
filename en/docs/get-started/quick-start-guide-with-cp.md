# Quick Start Guide With Control Plane

This section is a step-by-step guide to creating, deploying, and invoking an API using the WSO2 API Platform For Kubernetes integrate with Control Plane.

## Before you begin...

Install the [prerequisites](../../setup/prerequisites) that are required to run the WSO2 API Platform For Kubernetes.

!!!NOTE
    If you have already installed the pre-release version of the APK into your cluster please remove the installation by following the steps specified in <a href="{{base_path}}/en/latest/about-apk/FAQs/#q2-how-to-uninstall-apk-from-my-cluster">FAQs</a> section.

## Step 1 - Setup WSO2 API Platform For Kubernetes With Control Plane

{!includes/start-apk-cp.md!}

## Step 2 - Create and Deploy the API From Dataplane

1. Save and download the sample [EmployeeServiceDefinition.json](../assets/files/get-started/EmployeeServiceDefinition.json) file. This is the OAS definition of the API that we are going to deploy in APK.
2. Add a hostname mapping to the ```/etc/hosts``` file as follows.

    | IP        | Domain name         |
    | --------- | ------------------- |
    | 127.0.0.1 | api.am.wso2.com     |
    | 127.0.0.1 | idp.am.wso2.com     |
    | 127.0.0.1 | default.gw.wso2.com |

!!! info "(Optional) To access the deployment through your local machine"

    1. Identify the `gateway-service` external IP address.
        ```console
        kubectl get svc | grep gateway-service
        ```
    2. Port forward router service to localhost.
        ```console
        kubectl port-forward svc/apk-wso2-apk-gateway-service 9095:9095
        ```

### Generate APK configuration file from the OpenAPI definition

Apart from the above API definition file, we also need an `apk-conf` file that defines the configurations and metadata for this API. We have a configuration service that can be used to generate this apk-conf file when the OpenAPI definition is provided. 


1. Execute the following request to generate the APK configuration. Use the values provided in the table below in the body of your request. 

    | Field      | Value                                                                                                                     |
    | ---------- | ------------------------------------------------------------------------------------------------------------------------- |
    | definition | `EmployeeServiceDefinition.json` file that was downloaded at the beginning of [Step 2](#step-2-create-and-deploy-the-api) |

    === "Sample Request"
        ```
        curl -k --location 'https://api.am.wso2.com:9095/api/configurator/1.1.0/apis/generate-configuration' \
        --header 'Host: api.am.wso2.com' \
        --form 'definition=@"/Users/user/EmployeeServiceDefinition.json"'
        ```

    === "Sample Response"
        ```
        ---
        name: "EmployeeServiceAPI"
        basePath: "/RW1wbG95ZWVTZXJ2aWNlQVBJMy4xNA"
        version: "3.14"
        type: "REST"
        defaultVersion: false
        endpointConfigurations:
            production:
                endpoint: "http://employee-service:80"
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

    === "Request Format"
        ```
        curl --location 'https://<host>:9095/api/configurator/1.1.0/apis/generate-configuration' \
        --header 'Host: <host>' \
        --form 'apiType="<api-type>"' \
        --form 'definition=@"<path/to/EmployeeServiceDefinition.json>"'
        ```


2. You will get the apk-conf file content as the response. Save this content into a file named `EmployeeService.apk-conf`.

!!! Important
    We recommend installing the [APK Config Language Support Visual Studio Code (VS Code) extension](../create-api/create-and-deploy-apis/apk-conf-lang-support.md) to edit the APK Configuration file.


### Generate an access token to invoke APIs

To invoke the system APIs such as for deploying, we need a valid access token issued by an identity provider (IdP). While APK supports third-party IdPs such as Asgardeo and Auth0, it also supports an inbuilt non-production identity provider as well, which is only meant for testing purposes. We are going to use the non-production inbuilt IdP for this guide.

!!!NOTE
    If you are using a different organization to the one used in this guide, you will have to create a TokenIssuer with the relevant organization name in APK before proceeding to the next step. You can use the [Add Token Issuer](../develop-and-deploy-api/token-issuers/token-issuers.md) to create a new token issuer.

1. We will be using the client credentials grant type to generate the token.

    === "Sample Request"
        ```
        curl -k --location 'https://idp.am.wso2.com:9095/oauth2/token' \
        --header 'Host: idp.am.wso2.com' \
        --header 'Authorization: Basic NDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyOjRmYmQ2MmVjLWE5MmUtMTFlZC1hZmExLTAyNDJhYzEyMDAwMg==' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'grant_type=client_credentials' \
        --data-urlencode 'scope=apk:api_create'
        ```

    === "Sample Response"
        ```
        {"access_token":"eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ", "token_type":"Bearer", "expires_in":3600, "scope":"default"}
        ```
    === "Request Format"
        ```
        curl --location 'https://<host>:9095/oauth2/token' \
        --header 'Host: <host>' \
        --header 'Authorization: Basic <Base64Encoded(clientId:clientSecret)>' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'grant_type=client_credentials'
        ```

    !!!Important
        These credentials and access tokens are from the inbuilt non-production sample application, and should only be used for testing purposes.

    Now you can use this access token to invoke the Resources and APIs that follow.

### Deploy the API in APK

You now have the API Definition (`EmployeeServiceDefinition.json`) and the apk-conf file (`EmployeeService.apk-conf`) corresponding to the API. We can use these files to deploy the API in APK. 

1. Use the values provided in the table below in the body of your request.

    | Field            | Value                                 | Required         |
    | ---------------- | ------------------------------------- | ---------------- |
    | apkConfiguration | `EmployeeService.apk-conf` file       | :material-check: |
    | definitionFile   | `EmployeeServiceDefinition.json` file | :material-check: |

2. Set the access token in the Authorization header as a bearer token. This is the access token received by following the steps under the ["Generate an access token to invoke APIs"](#generate-an-access-token-to-invoke-apis) section above.

3. Once the backend service you created is up and running, execute the API deployment request. You will receive a successful response with an autogenerated id for the API.

    === "Sample Request"
        ```
        curl -k --location 'https://api.am.wso2.com:9095/api/deployer/1.1.0/apis/deploy' \
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
        basePath: "/RW1wbG95ZWVTZXJ2aWNlQVBJMy4xNA"
        version: "3.14"
        type: "REST"
        defaultVersion: false
        endpointConfigurations:
            production:
                endpoint: "http://employee-service:80"
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
    === "Request Format"
        ```
        curl --location 'https://<host>:9095/api/deployer/1.1.0/apis/deploy' \
        --header 'Host: <host>' \
        --header 'Authorization: bearer <access-token>' \
        --form 'apkConfiguration=@"path/to/EmployeeService.apk-conf"' \
        --form 'definitionFile=@"path/to/EmployeeServiceDefinition.json"'
        ```


4. Execute the command below. You will be able to see that the `EmployeeServiceAPI` is successfully deployed as shown in the image.


    === "Command"
        ```
        kubectl get apis
        ```

    [![Deployed API](../assets/img/get-started/deployed-api.png)](../assets/img/get-started/deployed-api.png)

## Step 3 - Create the Backend

The endpoint "http://employee-service:80" provided in the above files points to a backend deployed on a kubernetes service. Prior to invoking the API, you will need to have this backend up. 

We have provided the file containing this sample backend [here](../assets/files/get-started/employee-service-backend.yaml). Download it and create the backend service using the following command.

```
kubectl apply -f ./employee-service-backend.yaml
```

Wait for this pod to spin up. You can check its status using the following command.

```
kubectl get pods
```

## Step 4 - Manage API From Control Plane

1. Login to the Publisher Console [API Publisher](https://am.wso2.com/publisher) of the WSO2 API Manager.

    you can see the deploy EmployeeService API as below.

    [![ControlPlane API](../assets/img/control-plane/cp-overview.png)](../assets/img/control-plane/cp-overview.png)

2. Once you click the API you will redirect to overciew page.

    [![ControlPlaneOverview API](../assets/img/control-plane/main-overview.png)](../assets/img/control-plane/main-overview.png)

3. Now you can edit portal cnfigurations such as basic info, documentation etc.

    [![ControlPlaneBasic API](../assets/img/control-plane/portal-conf.png)](../assets/img/control-plane/portal-conf.png)

4. Finally publish to developer portal.


## Step 5 - Create Application and Subscribe to the API

1. Login to the Developer Portal[API Developer Portal](https://am.wso2.com/devportal) of the WSO2 API Manager.
2. Click on the `Applications` tab and then use `ADD NEW APPLICATION` option.
3. Provide the information as given below and click `Save`.

     <html>
        <table>
        <th>Field</th><th>Value</th>
        <tr><td>Application Name</td><td>EmpolyeeServiceApp</td></tr>
        <tr><td>Per Token Quota</td><td>10PerMin</td></tr>
        <tr><td>Description</td><td>Petstore Application</td></tr>
        </table>
     </html>

4. Click **Subscriptions** to subscribe to the created SwaggerPetstore API.
5. Click **Production Keys** or **Sandbox Keys** based on the environment for which you need to generate keys.
   Let's assume that you are working in a production environment. Therefore, click **Production Keys**.
5. Click **Generate Keys** to create an application Access Token with relevant scopes.
6. To verify the Application and Subscription creation in the APK Gateway, execute the following command. You will see the status of the deployed application as follows once completed.

    ```bash
    kubectl get subscriptions
    kubectl get applications
    ```

### Set JWKS URL

1. Login to Admin Portal
2. Click on the `Key Managers` tab.
3. Click on the `Edit` button of the `Resident Key Manager` key manager.
4. Set the `JWKS URL` as `https://apim-wso2am-cp-1-service:9443/oauth2/jwks` and Save.

## Step 6 - Invoke the API

1. Use the following command to invoke the API using the access token generated in the previous step.

    ```bash
    curl -X GET "https://default.gw.wso2.com:9095/RW1wbG95ZWVTZXJ2aWNlQVBJMy4xNA/3.14/employee" -H "Authorization: Bearer <access-token>"
    ```

You will now be able to see a successful response with the details of the Employees from the mock backend that we used for this guide.

