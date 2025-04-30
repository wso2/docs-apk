# Enable CORS for APIs via REST API

Cross-Origin Resource Sharing (CORS) is a mechanism that allows accessing restricted resources (i.e., fonts, images, scripts, videos, and iframes) from domains outside the domain from which the requesting resource originated. Browsers define the origin as a combination of Scheme (http://, https://), Host, and Port. By default, web browsers apply the same-origin policy to avoid interactions between different origins. CORS defines a way in which a browser and a server can interact to determine whether or not it is safe to allow the cross-origin requests. This document illustrate how to enable CORS for APIs via REST API. 

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

### Retrieve existing API configuration.

Here, you can save the following content into a file named `SampleServiceCORS.apk-conf` to use for the rest of this guide.

```yaml
name: "Sample API"
basePath: "/sample-api"
version: "0.1.0"
type: "REST"
defaultVersion: false
subscriptionValidation: false
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

```yaml
name: "Sample API"
basePath: "/sample-api"
version: "0.1.0"
type: "REST"
defaultVersion: false
subscriptionValidation: false
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