# RateLimitPolicy for API

The following define Rate Limiting Policies at the API-level via a Rate Limiting Policy Custom Resource (CR) definition.

```
apiVersion: dp.wso2.com/v1alpha1
kind: RateLimitPolicy
metadata:
  name: sand-http-bin-ratelimit
spec:
  default:
    api:
      requestsPerUnit: 5
      unit: Minute
  targetRef:
    kind: API
    name: http-bin-api
    group: gateway.networking.k8s.io
```

## Configuration Definitions

The following are the configurations that you need when defining Rate Limiting Policies for an API.

<table>
<thead>
  <tr>
    <th><b>Configuration</b></th>
    <th><b>Description</b></th>
</thead>
<tbody>
  <tr>
    <td style="white-space: nowrap;"><code>requestsPerUnit</code></td>
    <td>This defines the number of API requests that are allowed per unit.<br><b>Example</b>:<br> If <code>unit</code> is Minute and <code>requestsPerUnit</code> is 5, then only 5 API requests are allowed per minute.</td>
  </tr>
  <tr>
    <td style="white-space: nowrap;"><code>unit</code></td>
    <td>Defines the measurement unit used to define Rate Limits.<br><b>Possible Values:</b> <code>Minute</code>, <code>Hour</code>, <code>Day</code><br><b>Example:</b> If <code>unit</code> is Minutes, then how many API requests are allowed per minute.</td>
  </tr>
  <tr>
    <td style="white-space: nowrap;"><code>targetRef</code></td>
    <td>Determines the references of resource to apply the rate limit policy to. Since the above refers to an API level rate limit policy, the targetRef will be an API.</td>
  </tr>
</tbody>
</table>