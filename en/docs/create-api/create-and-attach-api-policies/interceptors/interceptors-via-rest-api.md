## API-level

**Sample code snippets**

The following is a sample code snippet that defines how you can attach Interceptor API Policies at the API-level within an API APK configuration file.

```
apiPolicies:
  request:
    - policyName: "addInterceptor"
      policyVersion: v1
      parameters:
        backendUrl: "http://interceptor-service.ns.svc.cluster.local:8443"
        headersEnabled: true
        bodyEnabled: false
        trailersEnabled: false
        contextEnabled: true
  response:
    - policyName: "addInterceptor"
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
        - policyName: "addInterceptor"
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
        - policyName: "addInterceptor"
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
        - policyName: "addInterceptor"
          policyVersion: v1
          parameters:
            backendUrl: "http://interceptor-service.ns.svc.cluster.local:8443"
            headersEnabled: true
            bodyEnabled: false
            trailersEnabled: false
            contextEnabled: true
      response:
        - policyName: "addInterceptor"
          policyVersion: v1
          parameters:
            backendUrl: "http://interceptor-service.ns.svc.cluster.local:8443"
            headersEnabled: true
            bodyEnabled: false
            trailersEnabled: false
            contextEnabled: true
    ```

## Operation-level (Resource-level)

**Sample code snippets**

The following is a sample code snippet that defines how you can attach Interceptor API Policies at the Operation-level within an API APK configuration file.

```
    operationPolicies:
      request:
        - policyName: "addInterceptor"
          policyVersion: v1
          parameters:
            backendUrl: "http://interceptor-service.ns.svc.cluster.local:8443"
            headersEnabled: true
            bodyEnabled: false
            trailersEnabled: false
            contextEnabled: true
      response:
       - policyName: "addInterceptor"
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
    operationPolicies:
      request:
        - policyName: "addInterceptor"
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
        - policyName: "addInterceptor"
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
        - policyName: "addInterceptor"
          policyVersion: v1
          parameters:
            backendUrl: "http://interceptor-service.ns.svc.cluster.local:8443"
            headersEnabled: true
            bodyEnabled: false
            trailersEnabled: false
            contextEnabled: true
      response:
       - policyName: "addInterceptor"
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
    <td>Defines the default policy names. Possible values are <code>addInterceptor</code>.</td>
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
