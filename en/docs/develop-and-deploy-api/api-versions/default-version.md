# Default Version

This documentation explains how to make an API version the default version in WSO2 APK. The default version option means that you make this version the default in a group of different versions of the API. You can invoke a default API without specifying the version number in the URL. Follow the steps below to create an API default version.

## Before you begin

- <a href="../../../get-started/quick-start-guide" target="_blank">Create an API</a>

## Using APK configuration

### Retrieve existing API configuration.
Here, you can use the apk-conf file which is created in <a href="../../../get-started/quick-start-guide" target="_blank">Create an API</a> documentation and save this content into a file named `EmployeeServiceDefaultVersion.apk-conf`.

Sample content before the modification is shown below.
```
name: "EmployeeServiceAPI"
basePath: "/employees-info"
version: "3.14"
type: "REST"
defaultVersion: false
endpointConfigurations:
    production:
        endpoint: "http://employee-service:8080"
operations:
- target: "/employees
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

### Change the 'defaultVersion' configuration.
<table>
        <tbody>
            <tr>
                <th colspan="2" >Parameter</th>
                <th>Description</th>
            </tr>
            <tr>
                <td colspan="2" class="confluenceTd"><pre>defaultVersion</pre></td>
                <td class="confluenceTd">true</td>
            </tr>
        </tbody>
</table>

   Sample content after the modification is shown below.
```
name: "EmployeeServiceAPI"
basePath: "/employees-info"
version: "3.14"
type: "REST"
defaultVersion: true
endpointConfigurations:
    production:
        endpoint: "http://employee-service:8080"
operations:
- target: "/employees
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

To deploy and invoke the system APIs, we need a valid access token issued by an identity provider (IdP). Follow the <a href="../../../develop-and-deploy-api/security/generate-access-token" target="_blank">Generate Access Token</a> documentation to generate an access token.


### Deploy the default version API.

You now have the API Definition (`EmployeeServiceDefinition.json`) and the updated apk-conf file (`EmployeeServiceDefaultVersion.apk-conf`) corresponding to the API. We can use these files to deploy the new API in APK.

Use the values provided in the table below in the body of your request.

   | Field            | Value                                         | Required         |
   | ---------------- | --------------------------------------------- | ---------------- |
   | apkConfiguration | `EmployeeServiceDefaultVersion.apk-conf` file | :material-check: |
   | definitionFile   | `EmployeeServiceDefinition.json` file         | :material-check: |

1.  Set the access token in the Authorization header as a bearer token. This is the access token received by following the steps under [Generate an access token to deploy and invoke an API](#generate-an-access-token-to-deploy-and-invoke-an-api) section above.
2.  Execute the API deployment request. You will receive a successful response with an Id for the API.

    === "Request"

        ```
          curl --location 'https://<host>:9095/api/deployer/1.3.0/apis/deploy' \
          --header 'Host: <host>' \
          --header 'Authorization: bearer <access-token>' \
          --form 'apkConfiguration=@"path/to/EmployeeServiceDefaultVersion.apk-conf"' \
          --form 'definitionFile=@"path/to/EmployeeServiceDefinition.json"'
        ```

    === "Sample Request"

        ```
          curl -k --location 'https://api.am.wso2.com:9095/api/deployer/1.3.0/apis/deploy' \
          --header 'Host: api.am.wso2.com' \
          --header 'Authorization: bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ' \
          --form 'apkConfiguration=@"/Users/user/EmployeeServiceDefaultVersion.apk-conf"' \
          --form 'definitionFile=@"/Users/user/EmployeeServiceDefinition.json"'
        ```

    === "Sample Response"
        ```
        name: "EmployeeServiceAPI"
        basePath: "/employees-info"
        version: "3.14"
        type: "REST"
        defaultVersion: true
        endpointConfigurations:
            production:
                endpoint: "http://employee-service:8080"
        operations:
        - target: "/employees
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
   
By now, you have deployed the default version of the API. You can invoke the API using URLs both with and without the versions. Please try out the following URLs, and you will receive the same response:

- https://default.gw.wso2.com:9095/employees-info/3.14/employees/
- https://default.gw.wso2.com:9095/employees-info/employees/

Let's first send a request to the URL with the API version in it.

=== "Sample Request"
    ```
    curl -k --location 'https://default.gw.wso2.com:9095/employees-info/3.14/employees' \
    --header 'Host: default.gw.wso2.com' \
    --header 'Authorization: bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ'
    ```
=== "Sample Response"
    ```
    [
        {
            "id": "1234123",
            "name": "Mrs. Heily Feyers",
            "department": "IT"
        },
        {
            "id": "23451234",
            "name": "Mr. Brendon MacSmith",
            "department": "Sales"
        },
        {
            "id": "34561234",
            "name": "Mr. Peter Queenslander",
            "department": "IT"
        },
        {
            "id": "45671243",
            "name": "Miss. Liza MacAdams",
            "department": "Finance"
        }
    ]
    ```
=== "Request Format"
    ```
    curl --location 'https://<host>:9095/<basePath>/3.14/employees' \
    --header 'Host: <host>' \
    --header 'Authorization: bearer <access-token>'
    ```

Now, let's send a request to the URL **without** the API version in it.

=== "Sample Request"
    ```
    curl -k --location 'https://default.gw.wso2.com:9095/employees-info/employees' \
    --header 'Host: default.gw.wso2.com' \
    --header 'Authorization: bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ'
    ```

=== "Sample Response"
    ```
    [
        {
            "id": "1234123",
            "name": "Mrs. Heily Feyers",
            "department": "IT"
        },
        {
            "id": "23451234",
            "name": "Mr. Brendon MacSmith",
            "department": "Sales"
        },
        {
            "id": "34561234",
            "name": "Mr. Peter Queenslander",
            "department": "IT"
        },
        {
            "id": "45671243",
            "name": "Miss. Liza MacAdams",
            "department": "Finance"
        }
    ]
    ```
=== "Request Format"
    ```
    curl --location 'https://<host>:9095/<basePath>/employees' \
    --header 'Host: <host>' \
    --header 'Authorization: bearer <access-token>'
    ```

As you can see, both requests return the same response.

Both of these requests are directed to the same backend and utilize the same API policies. For example, if you set up a rate limit for a particular operation, the rate limit will be applied for both invocations, and the same rate limit counter will be used.
