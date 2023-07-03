# Quick Start Guide

This section is a step-by-step guide to create, deploy and invoke an API using the WSO2 API Platform For Kubernetes.

## Before you begin...

Install the [prerequisites](../../setup/prerequisites) that are required to run WSO2 API Platform For Kubernetes.

## Step 1 - Start WSO2 API Platform For Kubernetes

{!includes/start-apk.md!}

## Step 2 - Create and Deploy the API

1. Download the sample [![EmployeeServiceDefinition.json](../assets/files/get-started/EmployeeServiceDefinition.json)](../assets/files/get-started/EmployeeServiceDefinition.json) file. This is the OAS definition of the API that we are going to deploy in APK.
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
        endpointConfigurations:
            production:
                endpoint: "https://6492bf1f428c3d2035d09c18.mockapi.io/"
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

2. You will get the apk-conf file content as the response. Save this content into a file named `EmployeeService.apk-conf`. Modify the content to add the `context`, `organization` and `vhosts`. The specific changes you have to make are indicated in the table below.

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
            <tr>
                <td colspan="2" class="confluenceTd"><pre>organization: "apk-org"</pre></td>
                <td class="confluenceTd">Add the "organization" parameter with a value you prefer. We are using "apk-org" in this case.</td>
            </tr>
            <tr>
                <td colspan="2" class="confluenceTd">
                    <pre>
    vhosts:
        production:
            - "default.gw.wso2.com"
                    </pre>
                </td>
                <td class="confluenceTd">Add the vhosts parameter with a production hostname of "default.gw.wso2.com"</td>
            </tr>
        </tbody>
    </table>

    Sample content after the modification is shown below.
        ```
        name: "EmployeeServiceAPI"
        context: "/test"
        version: "3.14"
        type: "REST"
        organization: "apk-org"
        vhosts:
            production:
                - "default.gw.wso2.com"
        endpointConfigurations:
            production:
                endpoint: "https://6492bf1f428c3d2035d09c18.mockapi.io/"
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

You now have the API Definition (`EndpointServiceDefinition.json`) and the apk-conf file (`EmployeeService.apk-conf`) corresponding to the API. We can use these files to deploy the API in APK. 

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
        organization: "apk-org"
        endpointConfigurations:
            production:
                endpoint: "https://6492bf1f428c3d2035d09c18.mockapi.io/"
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
        vhosts:
            production:
                - "default.gw.wso2.com"
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
        [{"createdAt":"2023-06-21T04:55:23.581Z","name":"Mandy Hayes","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/960.jpg","id":"1"},{"createdAt":"2023-06-21T14:03:03.687Z","name":"Mrs. Brandy Hoppe","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1042.jpg","id":"2"},{"createdAt":"2023-06-21T20:06:39.331Z","name":"Terence McLaughlin","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1044.jpg","id":"3"},{"createdAt":"2023-06-21T14:45:40.991Z","name":"Mr. Nina Keebler","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/955.jpg","id":"4"},{"createdAt":"2023-06-21T23:06:52.136Z","name":"Sergio Paucek","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/674.jpg","id":"5"},{"createdAt":"2023-06-21T04:42:41.388Z","name":"Mrs. Jerry Wiza","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/796.jpg","id":"6"},{"createdAt":"2023-06-21T10:32:37.753Z","name":"Yolanda Becker","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/357.jpg","id":"7"},{"createdAt":"2023-06-21T21:29:08.315Z","name":"Renee Berge","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1011.jpg","id":"8"},{"createdAt":"2023-06-21T15:19:26.606Z","name":"Sergio Rohan","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/726.jpg","id":"9"},{"createdAt":"2023-06-21T11:08:47.194Z","name":"Genevieve Stoltenberg","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/601.jpg","id":"10"},{"createdAt":"2023-06-21T16:50:00.119Z","name":"Alicia Wiegand","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/193.jpg","id":"11"},{"createdAt":"2023-06-21T15:49:23.731Z","name":"Constance Grady","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/388.jpg","id":"12"},{"createdAt":"2023-06-22T03:25:52.248Z","name":"Genevieve Dooley","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/466.jpg","id":"13"},{"createdAt":"2023-06-22T00:04:51.711Z","name":"Sadie Collier","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/976.jpg","id":"14"},{"createdAt":"2023-06-21T10:08:54.889Z","name":"Laurence Green","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1148.jpg","id":"15"},{"createdAt":"2023-06-21T16:31:37.505Z","name":"Mr. Moses Crona PhD","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/434.jpg","id":"16"},{"createdAt":"2023-06-21T17:23:44.525Z","name":"Aaron Ortiz","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/639.jpg","id":"17"},{"createdAt":"2023-06-22T00:26:44.641Z","name":"Eileen Sawayn","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/366.jpg","id":"18"},{"createdAt":"2023-06-21T12:07:49.226Z","name":"Nora Adams II","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1128.jpg","id":"19"},{"createdAt":"2023-06-21T16:32:35.940Z","name":"Mr. Jodi Farrell","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/233.jpg","id":"20"},{"createdAt":"2023-06-21T19:42:36.587Z","name":"Miss Brandi McCullough IV","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/164.jpg","id":"21"},{"createdAt":"2023-06-21T16:24:22.520Z","name":"Dr. Mildred Mertz","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/27.jpg","id":"22"},{"createdAt":"2023-06-22T02:54:22.644Z","name":"Mr. Edward Miller","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1143.jpg","id":"23"},{"createdAt":"2023-06-21T23:39:43.412Z","name":"Bernadette Ratke Sr.","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/144.jpg","id":"24"},{"createdAt":"2023-06-21T10:45:34.494Z","name":"Bobby Pollich","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/885.jpg","id":"25"},{"createdAt":"2023-06-21T06:24:19.163Z","name":"Ms. Darnell Willms","avatar":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1111.jpg","id":"26"}]
        ```

You will now be able to see a successful response with the details of the Employees from the mock backend that we used for this guide.

