# Backend Custom Resource

 This is the CR which is used to describe the actual backend and its configurations.

```
apiVersion: dp.wso2.com/v1alpha1
kind: Backend
metadata:
  name: http-bin-backend
spec:
  services:
  - host: httpbin.org
    port: 80
```

## Configuration Definitions

<table>
    <thead>
      <tr>
        <th>Configuration</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="white-space: nowrap;"><code>services</code></td>
        <td>Contains information regarding the hosts and ports.</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>host</code></td>
        <td>The hostname of the service</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>targetRef</code></td>
        <td>The port of the service.</td>
      </tr>
    </tbody>
</table>

Refer [Manage Service Endpoint](../../create-api/manage-service-endpoint/manage-certificate) for more information on how to configure backend services.
