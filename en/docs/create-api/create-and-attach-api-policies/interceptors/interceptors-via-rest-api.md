## Before you begin

- [Create an API](../../get-started/quick-start-guide.md)
  
You can use the apk-conf file which is created in [Quick Start Guide](../../get-started/quick-start-guide.md) documentation and save this content into a file named `EmployeeServiceEndpoints.apk-conf`.

Sample content before the modification is shown below.

```yaml
name: "EmployeeServiceAPI"
context: "/test"
version: "3.14"
type: "REST"
defaultVersion: false
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
```

## Adding API-level interceptors

**Sample code snippets**

The following is a sample code snippet that defines how you can attach Interceptor API Policies at the API-level within an API APK configuration file.

```yaml
name: "EmployeeServiceAPI"
context: "/test"
version: "3.14"
type: "REST"
defaultVersion: false
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
apiPolicies:
  request:
    - policyName: "Interceptor"
      policyVersion: v1
      parameters:
        backendUrl: "http://interceptor-service.ns.svc.cluster.local:8443"
        headersEnabled: true
        bodyEnabled: false
        trailersEnabled: false
        contextEnabled: true
  response:
    - policyName: "Interceptor"
      policyVersion: v1
      parameters:
        backendUrl: "http://interceptor-service.ns.svc.cluster.local:8443"       
        headersEnabled: true       
        bodyEnabled: false      
        trailersEnabled: false      
        contextEnabled: true
```

??? note "Attach an Interceptor API Policy to the Request Flow Only"

    ```
    apiPolicies:
      request:
        - policyName: "Interceptor"
          policyVersion: v1
          parameters:
            backendUrl: "http://interceptor-service.ns.svc.cluster.local:8443"
            headersEnabled: true
            bodyEnabled: false
            trailersEnabled: false
            contextEnabled: true
    ```

??? note "Attach an Interceptor API Policy to the Response Flow Only"

    ```
    apiPolicies:
      response:
        - policyName: "Interceptor"
          policyVersion: v1
          parameters:
            backendUrl: "http://interceptor-service.ns.svc.cluster.local:8443"
            headersEnabled: true
            bodyEnabled: false
            trailersEnabled: false
            contextEnabled: true
    ```

??? note "Attach an Interceptor API Policy to Request and Response Flows"

    ```
    apiPolicies:
      request:
        - policyName: "Interceptor"
          policyVersion: v1
          parameters:
            backendUrl: "http://interceptor-service.ns.svc.cluster.local:8443"
            headersEnabled: true
            bodyEnabled: false
            trailersEnabled: false
            contextEnabled: true
      response:
        - policyName: "Interceptor"
          policyVersion: v1
          parameters:
            backendUrl: "http://interceptor-service.ns.svc.cluster.local:8443"
            headersEnabled: true
            bodyEnabled: false
            trailersEnabled: false
            contextEnabled: true
    ```

## Adding operation-level interceptors

**Sample code snippets**

The following is a sample code snippet that defines how you can attach Interceptor API Policies at the Operation-level within an API APK configuration file.

```yaml
name: "EmployeeServiceAPI"
context: "/test"
version: "3.14"
type: "REST"
defaultVersion: false
endpointConfigurations:
 production:
   endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
operations:
- target: "/employee"
  verb: "GET"
  authTypeEnabled: true
  scopes: []
  operationPolicies:
    request:
      - policyName: "Interceptor"
        policyVersion: v1
        parameters:
          backendUrl: "http://interceptor-service.ns.svc.cluster.local:8443"
          headersEnabled: true
          bodyEnabled: false
          trailersEnabled: false
          contextEnabled: true
    response:
      - policyName: "Interceptor"
        policyVersion: v1
        parameters:
          backendUrl: "http://interceptor-service.ns.svc.cluster.local:8443"
          headersEnabled: true
          bodyEnabled: false
          trailersEnabled: false
          contextEnabled: true
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

??? note "Attach an Interceptor API Policy to the Request Flow Only"

    ```
    operationPolicies:
      request:
        - policyName: "Interceptor"
          policyVersion: v1
          parameters:
            backendUrl: "http://interceptor-service.ns.svc.cluster.local:8443"
            headersEnabled: true
            bodyEnabled: false
            trailersEnabled: false
            contextEnabled: true
    ```

??? note "Attach an Interceptor API Policy to the Response Flow Only"

    ```
    operationPolicies:
      response:
        - policyName: "Interceptor"
          policyVersion: v1
          parameters:
            backendUrl: "http://interceptor-service.ns.svc.cluster.local:8443"
            headersEnabled: true
            bodyEnabled: false
            trailersEnabled: false
            contextEnabled: true
    ```

??? note "Attach an Interceptor API Policy to Request and Response Flows"

    ```
    operationPolicies:
      request:
        - policyName: "Interceptor"
          policyVersion: v1
          parameters:
            backendUrl: "http://interceptor-service.ns.svc.cluster.local:8443"
            headersEnabled: true
            bodyEnabled: false
            trailersEnabled: false
            contextEnabled: true
      response:
        - policyName: "Interceptor"
          policyVersion: v1
          parameters:
            backendUrl: "http://interceptor-service.ns.svc.cluster.local:8443"
            headersEnabled: true
            bodyEnabled: false
            trailersEnabled: false
            contextEnabled: true
    ```

## Configuration definitions

The following are the configurations that you need when attaching API Policies to an API when working with the REST API interface.

<table>
<thead>
  <tr>
    <th><b>Configuration</b></th>
    <th><b>Description</b></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td style="white-space: nowrap;"><code>operationPolicies</code></td>
    <td>This defines that the API Policy will be applied as an operation Policy, which will be only applicable to the specific operation within the API.</td>
  </tr>
  <tr>
    <td><code>apiPolicies</code></td>
    <td>This defines that the API Policy will be applied as an API-level Policy, which will be global to all the operations within the specific API.</td>
  </tr>
  <tr>
    <td><code>request</code></td>
    <td>Defines that the API Policies should be attached to the Request Flow.</td>
  </tr>
  <tr>
    <td><code>response</code></td>
    <td>Defines that the API Policies need to be attached to the Response Flow</td>
  </tr>
  <tr>
    <td><code>policyName</code></td>
    <td>Defines the default policy names. For interceptor API policies this should equal to <code>Interceptor</code>.</td>
  </tr>
  <tr>
    <td><code>policyVersion</code></td>
    <td>Defines the version of the API policy.</td>
  </tr>
  <tr>
    <td><code>parameters</code></td>
    <td>This defines the request/response interceptor parameters</td>
  </tr>
  <tr>
    <td><code>headersEnabled</code></td>
    <td>Indicates whether request/response header details should be sent to the interceptor service</td>
  </tr>
    <tr>
    <td><code>bodyEnabled</code></td>
    <td>Indicates whether request/response body details should be sent to the interceptor service</td>
  </tr>
    <tr>
    <td><code>contextEnabled</code></td>
    <td>Indicates whether context details should be sent to the interceptor service</td>
  </tr>
    <tr>
    <td><code>trailersEnabled</code></td>
    <td>Indicates whether request/response trailer details should be sent to the interceptor service</td>
  </tr>
    <tr>
    <td><code>backendUrl</code></td>
    <td>Backend URL of the interceptor service</td>
  </tr>
</tbody>
</table>

## Deploy APK configuration

Refer [Quick Start Guide](../../get-started/quick-start-guide.md) to deploy the API using APK configuration.