# Add Rate Limiting Policy via the REST API Interface

!!! Tip
    
    To get familiar with the concept of Rate Limiting, see [Rate Limiting Overview](./rate-limiting-policy-overview.md).

You need to define the Rate Limiting Policies in the API payload when creating an API using the REST API Interface. You can define either API-level or Operation-level Rate Limiting Policies. Let's get familiar with the [API-level](#api-level) and [Operation-level (Resource-Level)](#operation-level-resource-level-rate-limiting) configurations and the [configuration definitions](#configuration-definitions).

## API-Level Rate Limiting

**Sample code snippets**

The following is a sample code snippet that defines how you can define Rate Limiting policies at the API-level within an API configuration.

```
rateLimit:
  requestsPerUnit: 5
  unit: "Minute"
```

??? note "Sample API Configuration"
    
    The following is a sample apk-conf file with an API-Level Rate Limiting Policy defined in it.
    ```
    name: "EmployeeServiceAPI"
    basePath: "/test"
    version: "3.14"
    type: "REST"
    defaultVersion: false
    endpointConfigurations:
      production:
        endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
    operations:
      - target: "/employee"
        verb: "GET"
        secured: true
        scopes: []
    rateLimit:
      requestsPerUnit: 5
      unit: "Minute"
    ```

## Operation-Level (Resource-Level) Rate Limiting

**Sample code snippets**

The following is a sample code snippet that defines how you can define Rate Limiting policies at the Operation-level within an API configuration.

```
rateLimit:
  requestsPerUnit: 10
  unit: "Minute"
```

??? note "Sample API Configuration"
    
    The following is a sample apk-conf file with an Operation-Level Rate Limiting Policy defined in it.
    ```
    name: "EmployeeServiceAPI"
    basePath: "/test"
    version: "3.14"
    type: "REST"
    defaultVersion: false
    endpointConfigurations:
      production:
        endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
    operations:
      - target: "/employee"
        verb: "GET"
        secured: true
        scopes: []
        rateLimit:
          requestsPerUnit: 10
          unit: "Minute"
    ```

## Configuration definitions

The following are the configurations that you need when defining Rate Limiting Policies to an API when working with the REST API interface.

<table>
<thead>
  <tr>
    <th><b>Configuration</b></th>
    <th><b>Description</b></th>
  </
</thead>
<tbody>
  <tr>
    <td><code>rateLimit</code></td>
    <td>Used to define API-Level Rate Limit Policies within the OpenAPI Specification (OAS) that you use to define the API.</td>
  </tr>
  <tr>
    <td style="white-space: nowrap;"><code>rateLimit</code></td>
    <td>Used to define Operation-Level Rate Limit Policies within the OpenAPI Specification (OAS) that you use to define the API.</td>
  </tr>
  <tr>
    <td><code>requestsPerUnit</code></td>
    <td>This defines the number of API requests that are allowed per unit.<br><b>Example</b>:<br> If <code>unit</code> is Minute and <code>requestsPerUnit</code> is 5, then only 5 API requests are allowed per minute.</td>
  </tr>
  <tr>
    <td><code>unit</code></td>
    <td>Defines the measurement unit used to define Rate Limits.<br><b>Possible Values:</b> <code>Minute</code>, <code>Hour</code>, <code>Day</code><br><b>Example:</b> If <code>unit</code> is Minute, then how many API requests are allowed per minute.</td>
  </tr>
</tbody>
</table>

## Create an API with API-level Rate Limiting Policies

Follow the instructions below to add an API-level Rate Limiting Policy to an API using the REST API Interface:

!!! note "Before you begin"
    
    - Install the [prerequisites](../../../setup/prerequisites) that are required to run WSO2 APK.
    - [Start WSO2 APK](../../../get-started/quick-start-guide/#step-1-start-wso2-apk).

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
      endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
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

### Update the API configuration with the Rate Limit Policy.

Add following API level rate limit policy.

```
rateLimit:
  requestsPerUnit: 5
  unit: "Minute"
```

Sample content after the modification is shown below.

  ```
  name: "EmployeeServiceAPI"
  basePath: "/test"
  version: "1.0.0"
  type: "REST"
  defaultVersion: false
  rateLimit:
    requestsPerUnit: 5
    unit: "Minute"
  endpointConfigurations:
    production:
      endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
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

### Generate an access token to deploy API.

To invoke the system APIs such as for deploying, we need a valid access token issued by an identity provider (IdP). Follow the ["Generate Access Token"](../../develop-and-deploy-api/security/generate-access-token.md) documentation to generate an access token.

### Deploy the API with API level rate limit policy.

You now have the API Definition (`EmployeeServiceDefinition.json`) and the updated apk-conf file (`EmployeeServiceV2.apk-conf`) corresponding to the API. We can use these files to deploy the new API in APK.

Use the values provided in the table below in the body of your request.

   |    Field        | Value                                 |
       |---------------------------------------|---------------------------------------------|
   | apkConfiguration       | `EmployeeServiceV2.apk-conf` file     |
   | definitionFile   | `EmployeeServiceDefinition.json` file |

1.  Set the access token in the Authorization header as a bearer token. This is the access token received by following the steps under ["Generate an access token to invoke APIs"](#generate-an-access-token-to-invoke-apis) section above.
2.  Execute the API deployment request. You will receive a successful response with an Id for the API.

    === "Request"

        ```
        curl --location 'https://<host>:9095/api/deployer/1.0.0/apis/deploy' \
        --header 'Host: <host>' \
        --header 'Authorization: bearer <access-token>' \
        --form 'apkConfiguration=@"path/to/EmployeeServiceV2.apk-conf"' \
        --form 'definitionFile=@"path/to/EmployeeServiceDefinition.json"'
        ```

    === "Sample Request"

        ```
        curl -k --location 'https://api.am.wso2.com:9095/api/deployer/1.0.0/apis/deploy' \
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
        version: "1.0.0"
        type: "REST"
        defaultVersion: false
        rateLimit:
          requestsPerUnit: 5
          unit: "Minute"
        endpointConfigurations:
          production:
            endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
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

By now you have deployed a new API with API level rate limit policies. You can invoke the API multiple times using the access token generated in the previous step to monitor requests getting throttled out after 5 requests per minute.

!!!NOTE
    Once the ratelimit is enforced, the ratelimited requests will receive a 429 response code with no content as the response.

## Create an API with Resource-level Rate Limiting Policies

Follow the instructions below to add an Resource-level Rate Limiting Policy to an API using the REST API Interface:

!!! note "Before you begin"
    
    - Install the [prerequisites](../../../setup/prerequisites) that are required to run WSO2 APK.
    - [Start WSO2 APK](../../../get-started/quick-start-guide/#step-1-start-wso2-apk).

### Retrieve existing API configuration.

Here, you can use the apk-conf file which is created in [Create an API](../../get-started/quick-start-guide.md) documentation and save this content into a file named `EmployeeServiceV3.apk-conf`.

Sample content before the modification is shown below.

  ```
  name: "EmployeeServiceAPI"
  basePath: "/test"
  version: "3.14"
  type: "REST"
  defaultVersion: false
  endpointConfigurations:
    production:
      endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
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

### Update the API configuration with the Rate Limit Policy.

Add following API level rate limt policy.

```
rateLimit:
  requestsPerUnit: 10
  unit: "Minute"
```

Sample content after the modification is shown below.

  ```
  name: "EmployeeServiceAPI"
  basePath: "/test"
  version: "2.0.0"
  type: "REST"
  defaultVersion: false
  endpointConfigurations:
    production:
      endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
  operations:
  - target: "/employee"
    verb: "GET"
    secured: true
    scopes: []
    rateLimit:
      requestsPerUnit: 10
      unit: "Minute"
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

### Generate an access token to deploy API.

To invoke the system APIs such as for deploying, we need a valid access token issued by an identity provider (IdP). Follow the ["Generate Access Token"](../../develop-and-deploy-api/security/generate-access-token.md) documentation to generate an access token.

### Deploy the API with resource level rate limit policy.

You now have the API Definition (`EmployeeServiceDefinition.json`) and the updated apk-conf file (`EmployeeServiceV2.apk-conf`) corresponding to the API. We can use these files to deploy the new API in APK.

Use the values provided in the table below in the body of your request.

   |    Field        | Value                                 |
       |---------------------------------------|---------------------------------------------|
   | apkConfiguration       | `EmployeeServiceV3.apk-conf` file     |
   | definitionFile   | `EmployeeServiceDefinition.json` file |

1.  Set the access token in the Authorization header as a bearer token. This is the access token received by following the steps under ["Generate an access token to invoke APIs"](#generate-an-access-token-to-invoke-apis) section above.
2.  Execute the API deployment request. You will receive a successful response with an Id for the API.

    === "Request"

        ```
        curl --location 'https://<host>:9095/api/deployer/1.0.0/apis/deploy' \
        --header 'Host: <host>' \
        --header 'Authorization: bearer <access-token>' \
        --form 'apkConfiguration=@"path/to/EmployeeServiceV3.apk-conf"' \
        --form 'definitionFile=@"path/to/EmployeeServiceDefinition.json"'
        ```

    === "Sample Request"

        ```
        curl -k --location 'https://api.am.wso2.com:9095/api/deployer/1.0.0/apis/deploy' \
        --header 'Host: api.am.wso2.com' \
        --header 'Authorization: bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ' \
        --form 'apkConfiguration=@"/Users/user/EmployeeServiceV3.apk-conf"' \
        --form 'definitionFile=@"/Users/user/EmployeeServiceDefinition.json"'
        ```

    === "Sample Response"

        ```
        ---
        id: "a70e538aeaab278437dc4c3199dbaf6fcb7df2d9"
        name: "EmployeeServiceAPI"
        basePath: "/test"
        version: "2.0.0"
        type: "REST"
        defaultVersion: false
        endpointConfigurations:
          production:
            endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
        operations:
        - target: "/employee"
          verb: "GET"
          secured: true
          scopes: []
          rateLimit:
            requestsPerUnit: 10
            unit: "Minute"
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

By now you have deployed the new API with resouce level rate limit policies. You can invoke the GET /employee endpoint API multiple times using the access token generated in the previous step to monitor requests getting throttled out after 10 requests per minute.

!!!NOTE
    Once the ratelimit is enforced, the ratelimited requests will receive a 429 response code with no content as the response.

