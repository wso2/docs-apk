# Timeouts

You can use timeouts to gracefully handle connections that take an unusual amount of time to respond. Timeouts mainly ensure that the client gets a success or an error response within the specified amount of time, and thereby the client does not hang indefinitely. Timeouts also enable both the client and the backend to free its resources, allocated for the connection, within the time gap defined.

<table>
    <thead>
      <tr>
        <th>Configuration</th>
        <th>Description</th>
        <th>Default Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="white-space: nowrap;"><code>downstreamRequestIdleTimeout</code></td>
        <td>DownstreamRequestIdleTimeout bounds the amount of time (in seconds) the request's stream may be idle. A value of 0 will completely disable the route's idle timeout.</td>
        <td>300</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>upstreamResponseTimeout</code></td>
        <td>UpstreamResponseTimeout spans between the point at which the entire downstream request (i.e. end-of-stream) has been processed and when the upstream response has been completely processed. A value of 0 will disable the route’s timeout. If the timeout fires, the stream is terminated with a 504 Gateway Timeout error code.</td>
        <td>15</td>
      </tr>
    </tbody>
</table>

You can configure timeout to a backend endpoint using following methods:

## Via Rest API Interface

When deploying APIs add the configurations to the `apk-conf` file as shown in the following sample.

```
endpointConfigurations:
 production:
  endpoint: "http://backend-service.ns:443"
  resiliency:
      timeout:
        downstreamRequestIdleTimeout: 45
        upstreamResponseTimeout: 10
```

An example `apk-conf` file with the above configurations is shown below.

```
name: "EmployeeServiceAPI"
basePath: "/test"
version: "4.0"
type: "REST"
defaultVersion: true
endpointConfigurations:
  production:
    endpoint: "http://backend-service.ns:443"
    resiliency:
      timeout:
        downstreamRequestIdleTimeout: 45
        upstreamResponseTimeout: 10
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

You can then deploy this API by following the steps in the <a href="../../../get-started/quick-start-guide#deploy-the-api-in-apk" target="_blank">Deploy the API in APK</a> documentation.

## Via CRs

**Step 1 - Define the CRs**

Define the Backend resource for the API as below.
```
apiVersion: dp.wso2.com/v1alpha1
kind: Backend
metadata:
  name: sample-backend
spec:
  protocol: http
  timeout:
    downstreamRequestIdleTimeout: 45
    upstreamResponseTimeout: 10
  services:
  - host: backend-service
    port: 443
```

For more in-depth information on how the above configurations affect the router, refer to the Timeouts in the official <a href="https://www.envoyproxy.io/docs/envoy/v1.24.1/faq/configuration/timeouts" target="_blank">Envoy documentation</a>.


**Step 2 - Apply the CRs**

{!includes/apply-cr.md!}