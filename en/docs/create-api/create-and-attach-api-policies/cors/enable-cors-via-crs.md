# Enable CORS for APIs via CRs

You need to attach an `APIPolicy` with the `cORSPolicy` configuration to enable CORS for an API. Make sure the `targetRef` property is set to the `API` that you want to enable CORS. Refer the following example `APIPolicy` that enables CORS for the `sample-api`.

#### APIPolicy Resource with CORS Configuration

```yaml
apiVersion: dp.wso2.com/v1alpha1
kind: APIPolicy
metadata:
  name: sample-api-policy
spec:
  override:
    cORSPolicy:
      enabled: true
      accessControlAllowCredentials: true
      accessControlAllowOrigins:
        - "*"
      accessControlAllowHeaders:
        - authorization
      accessControlAllowMethods:
        - GET
        - POST
      accessControlExposeHeaders:
        - "*"
  targetRef:
    group: dp.wso2.com
    kind: API
    name: sample-api
```

## Configuration Definition

<table>
    <thead>
      <tr>
        <th>Configuration</th>
        <th>Description</th>
        <th>Sample Values</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="white-space: nowrap;"><code>enabled</code></td>
        <td>Determines whether or not the API Gateway should enable CORS for the API. If the value is set to true, the API Gateway will set the CORS headers in the response.</td>
        <td>true, false</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>accessControlAllowCredentials</code></td>
        <td>Determines whether or not the response to the request can be exposed to the page. It can be exposed when the header value is true. The header value can be set to true/false by enabling/disabling the Access Control Allow Credentials configuration.</td>
        <td>true, false</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>accessControlAllowOrigins</code></td>
        <td>Determines whether a resource can be shared with the resource of a given origin. The API Gateway validates the origin request header value against the list of origins defined under the Access Control Allow Origins configuration (this can be All Allow Origins or a specific value like localhost). If the host is in the allowed origin list, it will be set as the Access-Control-Allow-Origin response header in the response.</td>
        <td>* (allow all origins), localhost, *.wso2.com</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>accessControlAllowHeaders</code></td>
        <td>Determines, as part of the response to a preflight request (a request that checks to see if the CORS protocol is understood), which header field names can be used during the actual request. The Gateway will set the header values defined under Access Control Allow Headers configurations.</td>
        <td>authorization, Access-Control-Allow-Origin, Content-type, SOAPAction, apikey, Internal-Key</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>accessControlAllowMethods</code></td>
        <td>Determines the method(s) allowed when accessing the resource in response to a preflight request. Required methods can be defined under the Access Control Allow Method configuration.</td>
        <td>GET, PUT, POST, DELETE, PATCH, OPTIONS</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>accessControlExposeHeaders</code></td>
        <td>Determines the headers that are safe to expose to the API. The Gateway will set the header values defined under Access Control Expose Headers configurations.</td>
        <td>*, Cache-Control, Content-Language, Content-Length, Content-Type</td>
      </tr>
    </tbody>
</table>

## Create an API using CRs with CORS configurations

Follow the instructions below to add CORS configurations to an API via CRs:

!!! note "Before you begin"
    
    - Install the <a href="../../../../setup/prerequisites" target="_blank">prerequisites</a> that are required to run WSO2 APK.
    - <a href="../../../../get-started/quick-start-guide/#step-1-start-wso2-apk" target="_blank">Start WSO2 APK</a>.

**Step 1 - Define the CRs**

1. {!includes/crs-samples.md!}

2. Define the required CORS configurations in an APIPolicy CR. The following is an example CR.
    
```yaml
apiVersion: dp.wso2.com/v1alpha1
kind: APIPolicy
metadata:
  name: sample-api-policy
spec:
  override:
    cORSPolicy:
      enabled: true
      accessControlAllowCredentials: true
      accessControlAllowOrigins:
        - "*"
      accessControlAllowHeaders:
        - authorization
      accessControlAllowMethods:
        - GET
        - POST
      accessControlExposeHeaders:
        - "*"
  targetRef:
    group: dp.wso2.com
    kind: API
    name: sample-api
```

**Step 2 - Apply the CRs**

{!includes/apply-cr.md!}

