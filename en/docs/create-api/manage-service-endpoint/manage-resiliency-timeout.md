# Timeouts

You can use timeouts to gracefully handle connections that take an unusual amount of time to respond. Timeouts mainly ensure that the client gets a success or an error response within the specified amount of time, and thereby the client does not hang indefinitely. Timeouts also enable both the client and the backend to free its resources, allocated for the connection, within the time gap defined.

maxRouteTimeoutSeconds: Specifies the maximum timeout for a route (in seconds). This is the maximum time allowed for processing the entire request-response cycle for an API route.
routeIdleTimeoutSeconds: Specifies the maximum idle time (in seconds) allowed for a route. If no data is received or sent within this timeout, the connection will be closed.
routeTimeoutSeconds: Specifies the timeout (in seconds) for a single request-response cycle of a route. If the backend response is not received within this time, the request will be considered timed-out.


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
        <td style="white-space: nowrap;"><code>maxRouteTimeoutSeconds</code></td>
        <td>Maximum value accepted as the Endpoint Level Upstream Timeout.</td>
        <td>60</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>routeIdleTimeoutSeconds</code></td>
        <td>The backend (upstream) connection idle timeout. The amount of time the request’s stream may be idle.</td>
        <td>300</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>routeTimeoutSeconds</code></td>
        <td>The time duration that the Router waits for the response from the backend, starting from the time the request arrived at the router. This value always should be lower than <code>maxRouteTimeoutSeconds</code></td>
        <td>60</td>
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
        maxRouteTimeoutSeconds: 20
        routeIdleTimeoutSeconds: 30
        routeTimeoutSeconds: 10
```

## Via CRs

Define the Backend resource for the API as below and apply to the respective namespace.
```
apiVersion: dp.wso2.com/v1alpha1
kind: Backend
metadata:
  name: sample-backend
  namespace: ns
spec:
  protocol: http
  timeout:
    maxRouteTimeoutSeconds: 20
    routeIdleTimeoutSeconds: 30
    routeTimeoutSeconds: 10
  services:
  - host: backend-service.ns
    port: 443
```

For more in-depth information on how the above configurations affect the router, refer to the Timeouts in the official [Envoy documentation](https://www.envoyproxy.io/docs/envoy/v1.24.1/faq/configuration/timeouts).

