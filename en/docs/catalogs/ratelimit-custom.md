# Custom Rate Limit Policy

The following defines a Custom Rate Limiting Policy via a Rate Limiting Policy Custom Resource (CR) definition.

```
apiVersion: dp.wso2.com/v1alpha1
kind: RateLimitPolicy
metadata:
  name: http-bin-ratelimit-usergroup
spec:
  override:
    custom:
      key: org_key
      value: admin
      requestsPerUnit: 20
      unit: Minute
      organization: default
  targetRef:
    kind: Gateway
    name: default
    group: gateway.networking.k8s.io
```

## Configuration Definitions

The following are the configurations that you need when defining Custom Rate Limiting Policies.

<table>
<thead>
  <tr>
    <th><b>Configuration</b></th>
    <th><b>Description</b></th>
  </
</thead>
<tbody>
  <tr>
    <td><code>requestsPerUnit</code></td>
    <td>This defines the number of API requests that are allowed per unit.<br><b>Example</b>:<br> If <code>unit</code> is Minute and <code>requestsPerUnit</code> is 5, then only 5 API requests are allowed per minute.</td>
  </tr>
  <tr>
    <td><code>unit</code></td>
    <td>Defines the measurement unit used to define Rate Limits.<br><b>Possible Values:</b> <code>Minute</code>, <code>Hour</code>, <code>Day</code><br><b>Example:</b> If <code>unit</code> is Minutes, then how many API requests are allowed per minute.</td>
  </tr>
  <tr>
    <td><code>targetRef</code></td>
    <td>Determines the references of resource to apply the rate limit policy to.</td>
  </tr>
</tbody>
</table>