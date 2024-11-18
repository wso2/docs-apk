# Circuit Breakers

In case of backend failure, it is always better to fail quickly and relieve the back pressure from the actual backend, so it can recover quickly. WSO2 APK supports various types of distributed circuit breakers offered by Envoy. Based on the circuit breaker configuration, the router (i.e. Envoy) will open the circuit and handle the consequent request by itself till the backend recovers.

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
        <td style="white-space: nowrap;"><code>maxConnectionPools</code></td>
        <td>This defines the maximum concurrent initiations of connection pools. When a cluster has exhausted its concurrent connection pools, it will attempt to reclaim an idle one. If it failed to reclaim, then the circuit will be opened.</td>
        <td>1000</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>maxConnections</code></td>
        <td>The maximum number of connections that Router will establish to all endpoints in the cluster. All connections regardless of the active, idle will be counted. Even that the count of this circuit breaker exceeded for an endpoint cluster, router will always allocate at least one connection for the selected load balanced endpoint.</td>
        <td>1024</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>maxPendingRequests</code></td>
        <td>The requests will be added to a pending list when there is no readily available connection to serve the request immediately. This circuit breaker will exercise the maximum number of requests that will be queued while waiting for a ready connection pool connection.</td>
        <td>1024</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>maxRequests</code></td>
        <td>The maximum number of requests that can be outstanding to all endpoints in a cluster at any given time.</td>
        <td>1024</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>maxRetries</code></td>
        <td>The maximum number of retries that can be served to any endpoint in a cluster at any given time concurrently. This will be helpful to avoid cascading failures and overloading endpoints due to undesirable retries.</td>
        <td>3</td>
      </tr>
    </tbody>
</table>

You can configure circuit breaker to a backend using following methods:

## Via Rest API Interface

When deploying APIs add the configurations to the `apk-conf` file as shown in the following sample.

```
endpointConfigurations:
 production:
  endpoint: "http://backend-service.ns:443"
  resiliency:
      circuitBreaker:
        maxConnectionPools: 1000
        maxConnections: 1024
        maxPendingRequests: 35
        maxRequests: 75
        maxRetries: 3
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
      circuitBreaker:
        maxConnectionPools: 1000
        maxConnections: 1024
        maxPendingRequests: 35
        maxRequests: 75
        maxRetries: 3
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
  circuitBreaker:
    maxConnectionPools: 1000
    maxConnections: 1024
    maxPendingRequests: 35
    maxRequests: 75
    maxRetries: 3
  services:
  - host: backend-service
    port: 443
```

For more information on above circuit breakers, refer the <a href="https://www.envoyproxy.io/docs/envoy/v1.24.1/intro/arch_overview/upstream/circuit_breaking" target="_blank">Envoy documentation</a>.

**Step 2 - Apply the CRs**

{!includes/apply-cr.md!}
