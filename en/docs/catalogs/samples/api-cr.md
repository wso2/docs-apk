## API Sample


A single API in the APK project is defined using a set of combined Kubernetes resources.

This is the root level resource for an API. API related metadata are also defined in this CR.

In the following CR, we have defined a REST API by giving the name, context, and version information for the API. We have also referred to the HTTPRoute resource in spec.production.httpRouteRefs[0] path.

```
apiVersion: dp.wso2.com/v1alpha1
kind: API
metadata:
  name: http-bin-api
spec:
  apiName: HTTP Bin API
  apiType: REST
  apiVersion: 1.0.0
  basePath: /http-bin-api/1.0.0
  isDefaultVersion: true
  production:
  - httpRouteRefs:
    - prod-http-route-http-bin-api
  sandbox:
  - httpRouteRefs:
    - sand-http-route-http-bin-api
  organization: apk-org
```

Refer [Manage API](../../create-api/create-api-overview.md) for more information on how to configure API.