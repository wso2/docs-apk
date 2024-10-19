# Create an API Version

This documentation explains how to create an API version in WSO2 APK. Follow the steps below to create an API version.

## Before you begin

- [Create an API](../../get-started/quick-start-guide.md)

## Create an API version

### Retrieve existing API configuration.
Here, you can use the apk-conf file which is created in [Create an API](../../get-started/quick-start-guide.md) documentation and save this content into a file named `EmployeeServiceV2.apk-conf`.

Sample content before the modification is shown below.
   ```
   name: "EmployeeServiceAPI"
   basePath: "/test"
   version: "3.14"
   type: "REST"
   defaultVersion: false
   endpointConfigurations:
   production:
   endpoint: "https://run.mocky.io/v3/1327c339-354b-4080-8296-f6268365e67b"
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

### Update the API configuration with the new version.
<table>
        <tbody>
            <tr>
                <th colspan="2" >Parameter</th>
                <th>Description</th>
            </tr>
            <tr>
                <td colspan="2" class="confluenceTd"><pre>version: "3.14"</pre></td>
                <td class="confluenceTd">Change the version parameter to "4.0"</td>
            </tr>
        </tbody>
</table>

   Sample content after the modification is shown below.
   ```
   name: "EmployeeServiceAPI"
   basePath: "/test"
   version: "4.0"
   type: "REST"
   defaultVersion: false
   endpointConfigurations:
   production:
   endpoint: "https://run.mocky.io/v3/1327c339-354b-4080-8296-f6268365e67b"
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
   
Here, you can do any other related changes to the API configuration as well.


### Generate an access token to deploy and invoke an API

To deploy and invoke the system APIs, we need a valid access token issued by an identity provider (IdP). Follow the ["Generate Access Token"](../../develop-and-deploy-api/security/generate-access-token.md) documentation to generate an access token.

### Deploy the new version API.

You now have the API Definition (`EmployeeServiceDefinition.json`) and the updated apk-conf file (`EmployeeServiceV2.apk-conf`) corresponding to the API. We can use these files to deploy the new API in APK.

Use the values provided in the table below in the body of your request.

   |    Field        | Value                                 | Required|
   |---------------------------------------|---------------------------------------------|---------------------------------------------|
   | apkConfiguration       | `EmployeeServiceV2.apk-conf` file     |:material-check:|
   | definitionFile   | `EmployeeServiceDefinition.json` file |:material-check:|

1.  Set the access token in the Authorization header as a bearer token. This is the access token received by following the steps under ["Generate an access token to deploy and invoke an API"](#generate-an-access-token-to-deploy-and-invoke-an-api) section above.
2.  Execute the API deployment request. You will receive a successful response with an Id for the API.

    === "Request"

        ```
        curl --location 'https://<host>:9095/api/deployer/1.2.0/apis/deploy' \
        --header 'Host: <host>' \
        --header 'Authorization: bearer <access-token>' \
        --form 'apkConfiguration=@"path/to/EmployeeServiceV2.apk-conf"' \
        --form 'definitionFile=@"path/to/EmployeeServiceDefinition.json"'
        ```

    === "Sample Request"

        ```
        curl -k --location 'https://api.am.wso2.com:9095/api/deployer/1.2.0/apis/deploy' \
        --header 'Host: api.am.wso2.com' \
        --header 'Authorization: bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ' \
        --form 'apkConfiguration=@"/Users/user/EmployeeServiceV2.apk-conf"' \
        --form 'definitionFile=@"/Users/user/EmployeeServiceDefinition.json"'
        ```

    === "Sample Response"

        ```
        ---
        id: "a70e538aeaab278437dc4c3199dbaf6fcb7df2d9"
        name: "EmployeeServiceAPI"
        basePath: "/test"
        version: "4.0"
        type: "REST"
        defaultVersion: false
        endpointConfigurations:
        production:
        endpoint: "https://run.mocky.io/v3/1327c339-354b-4080-8296-f6268365e67b"
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

By now, you have deployed the new version of the API. You can invoke the new version of the API using the access token generated in the previous step.

