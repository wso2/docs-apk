# Enable CORS for APIs via REST API

Cross-Origin Resource Sharing (CORS) is a mechanism that allows accessing restricted resources (i.e., fonts, images, scripts, videos, and iframes) from domains outside the domain from which the requesting resource originated. Browsers define the origin as a combination of Scheme (http://, https://), Host, and Port. By default, web browsers apply the same-origin policy to avoid interactions between different origins. CORS defines a way in which a browser and a server can interact to determine whether or not it is safe to allow the cross-origin requests. This document illustrate how to enable CORS for APIs via REST API. 

## Before you begin

- [Create an API](../../../get-started/quick-start-guide.md)

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


   Sample APK configuration content after the modification is shown below.
   ```
   name: "EmployeeServiceAPI"
   context: "/test"
   version: "4.0"
   type: "REST"
   organization: "apk-org"
   defaultVersion: true
   vhosts:
    production:
    - "default.gw.wso2.com"
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
   
You have the flexibility to make any related changes to the API configuration. You can deploy the sample APK configuration and apply the CORS (Cross-Origin Resource Sharing) configuration to your API.