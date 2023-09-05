# HttpRoute Custom Resource

This is the resource where you define resources of your API. This HTTPRoute is linked to the API by referring to this resource name from the API resource.

```
apiVersion: gateway.networking.k8s.io/v1beta1
kind: HTTPRoute
metadata:
  name: prod-http-route-http-bin-api
spec:
  hostnames:
    - http-bin.gw.wso2.com
  parentRefs:
    - group: gateway.networking.k8s.io
      kind: Gateway
      name: default
      sectionName: httpslistener
  rules:
    - matches:
      - path:
          type: PathPrefix
          value: /http-bin-api/1.0.0
      filters:
      - type: URLRewrite
        urlRewrite:
          path:
            type: ReplacePrefixMatch
            replacePrefixMatch: /
      backendRefs:
      - group: dp.wso2.com
        kind: Backend
        name: http-bin-backend
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
        <td style="white-space: nowrap;"><code>hostnames</code></td>
        <td>Defines the set of hostnames used to match the Host header on the HTTP request against.</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>parentRefs</code></td>
        <td>Determines the reference of the resource to apply the HTTPRoute to. </td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>rules</code></td>
        <td>Sets rules for matching an HTTP request. This is done based on `matches`, `filters` and `backendRefs`.</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>matches</code></td>
        <td>Specifies the conditions to match the rule against an HTTP request. If there are multiple matches, the rule will be matched if at least one match is satisfied.
        For example, in the above CR, for an incoming request to match against this rule, a request must have a path prefix of /http-bin-api/1.0.0.
        </td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>filters</code></td>
        <td>If a request matches this rule, the defined filters will be applied to this request. 
        For example, in the above CR, a filter of type URLRewrite has been created, whose purpose is to rewrite the URL of the incoming request. The type of the URLRewrite is ReplacePrefixMatch, which will replace any prefix match with the value "/".  <br />
        When combined with the above match, this rule would check for requests with a path starting with `/http-bin-api/1.0.0` and then rewrite that path prefix to `/` using the URLRewrite filter.
        </td>
      </tr>
      <tr>
        <td style="white-space: nowrap;"><code>backendRefs</code></td>
        <td> Refers to the Backend resource to where the HTTP request should be forwarded to after processing the rule. In the above example, an HTTP request satisfying the match will have the filter applied and will then be forwarded to a `Backend` resource named `http-bin-backend`.
        </td>
      </tr>
    </tbody>
</table>

Refer the [Kubernetes Gateway API documentation](https://gateway-api.sigs.k8s.io/references/spec/#gateway.networking.k8s.io/v1beta1.HTTPRoute) for more information on how to configure HTTPRoute.