# Default Version

This documentation explains how to make an API version the default version in WSO2 APK. The default version option means that you make this version the default in a group of different versions of the API. You can invoke a default API without specifying the version number in the URL. Follow the steps below to create an API default version.

## Before you begin

- <a href="../../../get-started/quick-start-guide" target="_blank">Create an API</a>

## Using APK configuration

### Retrieve existing API configuration.
Here, you can use the apk-conf file which is created in <a href="../../../get-started/quick-start-guide" target="_blank">Create an API</a> documentation and save this content into a file named `SampleServiceDefaultVersion.apk-conf`.

Sample content before the modification is shown below.
```yaml
name: "Sample API"
basePath: "/sample-api"
version: "0.1.0"
type: "REST"
defaultVersion: false
endpointConfigurations:
    production:
      - endpoint: "https://dev-tools.wso2.com/gs/helpers/v1.0"
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
```yaml
name: "Sample API"
basePath: "/sample-api"
version: "0.1.0"
type: "REST"
defaultVersion: true
endpointConfigurations:
    production:
      - endpoint: "https://dev-tools.wso2.com/gs/helpers/v1.0"
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
   
Here, you can do any other related changes to the API configuration as well.

### Generate an access token to deploy and invoke an API

To deploy and invoke the system APIs, we need a valid access token issued by an identity provider (IdP). Follow the <a href="../../../develop-and-deploy-api/security/generate-access-token" target="_blank">Generate Access Token</a> documentation to generate an access token.


### Deploy the default version API.

You now have the API Definition (`SampleAPIDefinition.json`) and the updated apk-conf file (`SampleServiceDefaultVersion.apk-conf`) corresponding to the API. We can use these files to deploy the new API in APK.

Use the values provided in the table below in the body of your request.

   | Field            | Value                                       | Required         |
   | ---------------- | ------------------------------------------- | ---------------- |
   | apkConfiguration | `SampleServiceDefaultVersion.apk-conf` file | :material-check: |
   | definitionFile   | `SampleAPIDefinition.json` file             | :material-check: |

1.  Set the access token in the Authorization header as a bearer token. This is the access token received by following the steps under [Generate an access token to deploy and invoke an API](#generate-an-access-token-to-deploy-and-invoke-an-api) section above.
2.  Execute the API deployment request. You will receive a successful response with an Id for the API.

    === "Request"

        ```
          curl --location 'https://<host>:9095/api/deployer/1.3.0/apis/deploy' \
          --header 'Host: <host>' \
          --header 'Authorization: Bearer <access-token>' \
          --form 'apkConfiguration=@"path/to/SampleServiceDefaultVersion.apk-conf"' \
          --form 'definitionFile=@"path/to/SampleAPIDefinition.json"'
        ```

    === "Sample Request"

        ```
          curl -k --location 'https://api.am.wso2.com:9095/api/deployer/1.3.0/apis/deploy' \
          --header 'Host: api.am.wso2.com' \
          --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ' \
          --form 'apkConfiguration=@"/Users/user/SampleServiceDefaultVersion.apk-conf"' \
          --form 'definitionFile=@"/Users/user/SampleAPIDefinition.json"'
        ```

    === "Sample Response"
        ```
        id: "2d43a29159fbc77652b687243d545a7038c3abd6"
        name: "Sample API"
        basePath: "/sample-api"
        version: "0.1.0"
        type: "REST"
        defaultVersion: true
        endpointConfigurations:
            production:
            - endpoint: "https://dev-tools.wso2.com/gs/helpers/v1.0"
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
   
By now, you have deployed the default version of the API. You can invoke the API using URLs both with and without the versions. Please try out the following URLs, and you will receive the same response:

- https://default.gw.wso2.com:9095/sample-api/0.1.0/uuid/
- https://default.gw.wso2.com:9095/sample-api/uuid/

Let's first send a request to the URL with the API version in it.

=== "Sample Request"
    ```
    curl -k --location 'https://default.gw.wso2.com:9095/sample-api/0.1.0/uuid' \
    --header 'Host: default.gw.wso2.com' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ'
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

Now, let's send a request to the URL **without** the API version in it.

=== "Sample Request"
    ```
    curl -k --location 'https://default.gw.wso2.com:9095/sample-api/uuid' \
    --header 'Host: default.gw.wso2.com' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ'
    ```

=== "Sample Response"
    ```
    {
        "uuid":"f4a38d31-21e8-4b5d-9c26-792e6805dd54"
    }
    ```
=== "Request Format"
    ```
    curl --location 'https://<host>:9095/<basePath>/uuid' \
    --header 'Host: <host>' \
    --header 'Authorization: Bearer <access-token>'
    ```

As you can see, both requests return the same response.

Both of these requests are directed to the same backend and utilize the same API policies. For example, if you set up a rate limit for a particular operation, the rate limit will be applied for both invocations, and the same rate limit counter will be used.
