# HttpRoute Custom Resource

This is the resource where you define resources of your API. This HTTPRoute is linked to the API by referring to this resource name from the API resource.

Refer the [Kubernetes Gateway API documentation](https://gateway-api.sigs.k8s.io/references/spec/#gateway.networking.k8s.io/v1beta1.HTTPRoute) for more information on how to configure HTTPRoute.
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