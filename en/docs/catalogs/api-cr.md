# API Custom Resource

A single API in APK project is defined using a set of combined Kubernetes resources.

This is the root level resource for an API. API related metadata are also defined in this CR.

In the following CR, we have defined a REST API giving the name, context, and version information for the API. We have also refers to HTTPRoute resource in spec.production.httpRouteRefs[0] path.

```
apiVersion: dp.wso2.com/v1alpha1
kind: API
metadata:
  name: http-bin-api
spec:
  apiDisplayName: HTTP Bin API
  apiType: REST
  apiVersion: 1.0.0
  context: /http-bin-api/1.0.0
  production:
  - httpRouteRefs:
    - prod-http-route-http-bin-api
```

Refer [Manage API](../../create-api/create-api-overview/) for more information on how to configure API.