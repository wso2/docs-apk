# Enable CORS for APIs via REST API

Cross-Origin Resource Sharing (CORS) is a mechanism that allows accessing restricted resources (i.e., fonts, images, scripts, videos, and iframes) from domains outside the domain from which the requesting resource originated. Browsers define the origin as a combination of Scheme (http://, https://), Host, and Port. By default, web browsers apply the same-origin policy to avoid interactions between different origins. CORS defines a way in which a browser and a server can interact to determine whether or not it is safe to allow the cross-origin requests. This document illustrate how to enable CORS for APIs via REST API. 

## Before you begin

- [Create an API](../../../../get-started/quick-start-guide)

### CORS configuration

<table>
    <tbody>
        <tr>
            <th colspan="2">Field</th>
            <th>Description</th>
            <th>Possible Values</th>
        </tr>
        <tr>
            <td colspan="2" class="confluenceTd"><pre>corsConfigurationEnabled</pre></td>
            <td class="confluenceTd">Determines whether CORS support is enabled or disabled.</td>
            <td class="confluenceTd">true (enabled), false (disabled)</td>
        </tr>
        <tr>
            <td colspan="2" class="confluenceTd"><pre>accessControlAllowCredentials</pre></td>
            <td class="confluenceTd">Indicates whether the browser should include credentials (e.g., cookies, HTTP authentication).</td>
            <td class="confluenceTd">true (enabled), false (disabled)</td>
        </tr>
        <tr>
            <td colspan="2" class="confluenceTd"><pre>accessControlAllowOrigins</pre></td>
            <td class="confluenceTd">Defines the allowed origins (domains) from which cross-origin requests can be made.</td>
            <td class="confluenceTd">A list of strings representing origins. "*" to allow any origin, or specify individual origins.</td>
        </tr>
        <tr>
            <td colspan="2" class="confluenceTd"><pre>accessControlAllowHeaders</pre></td>
            <td class="confluenceTd">Lists the allowed HTTP headers that can be used during the actual request.</td>
            <td class="confluenceTd">A list of strings representing header names.</td>
        </tr>
        <tr>
            <td colspan="2" class="confluenceTd"><pre>accessControlAllowMethods</pre></td>
            <td class="confluenceTd">Specifies the allowed HTTP methods for cross-origin requests.</td>
            <td class="confluenceTd">A list of strings representing HTTP method names.</td>
        </tr>
        <tr>
            <td colspan="2" class="confluenceTd"><pre>accessControlExposeHeaders</pre></td>
            <td class="confluenceTd">Lists the response headers that the browser can expose to the requesting client.</td>
            <td class="confluenceTd">A list of strings representing header names. "*" to expose all headers, or specify individual headers.</td>
        </tr>
        <tr>
            <td colspan="2" class="confluenceTd"><pre>accessControlAllowMaxAge</pre></td>
            <td class="confluenceTd">Indicates how long the results of a preflight request (OPTIONS) can be cached.</td>
            <td class="confluenceTd">A positive integer representing the cache duration in seconds.</td>
        </tr>
    </tbody>
</table>

## Create an API with CORS configurations

Follow the instructions below to add CORS configurations to an API using the REST API Interface:

!!! note "Before you begin"
    
    - Install the [prerequisites](../../../../setup/prerequisites) that are required to run WSO2 APK.
    - [Start WSO2 APK](../../../../get-started/quick-start-guide/#step-1-start-wso2-apk).

### Retrieve existing API configuration.

Here, you can use the apk-conf file which is created in [Create an API](../../../get-started/quick-start-guide.md) documentation and save this content into a file named `EmployeeServiceCORS.apk-conf`.

Sample content before the modification is shown below.
  ```
  name: "EmployeeServiceAPI"
  basePath: "/test"
  version: "3.14"
  type: "REST"
  defaultVersion: false
  endpointConfigurations:
    production:
      endpoint: "http://employee-service:8080"
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
### Update the API configuration with the CORS configurations

Add the necessary CORS configurations to the `apk-conf` file. A possible example is shown below.

```
corsConfiguration:
  corsConfigurationEnabled: true
  accessControlAllowCredentials: true
  accessControlAllowOrigins:
    - "*"
  accessControlAllowHeaders:
    - authorization
  accessControlAllowMethods:
    - GET
  accessControlExposeHeaders:
    - "*"
```

Sample APK configuration content after the modification is shown below.

```
name: "EmployeeServiceAPI"
basePath: "/test"
version: "4.0"
type: "REST"
defaultVersion: true
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
corsConfiguration:
  corsConfigurationEnabled: true
  accessControlAllowCredentials: true
  accessControlAllowOrigins:
    - "*"
  accessControlAllowHeaders:
    - authorization
  accessControlAllowMethods:
    - GET
  accessControlExposeHeaders:
    - "*"
```
   
You have the flexibility to make any related changes to the API configuration. You can deploy the sample APK configuration first and then apply the CORS (Cross-Origin Resource Sharing) configuration to your API.