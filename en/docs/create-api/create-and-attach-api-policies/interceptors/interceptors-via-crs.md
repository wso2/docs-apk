There are three levels you can attach Interceptor APIPolicy:

* [Configuring Operation level Interceptors](#configuring-operation-level-interceptors)
* [Configuring API level Interceptors](#configuring-api-level-interceptors)
* [Configuring Gateway level Interceptors](#configuring-gateway-level-interceptors)

## Configuring Operation level Interceptors

You need to create the `APIPolicy` with `targetRef.kind` property set to `Resource` for that and give the `targetRef.name` as the name of the `HTTPRoute`resource. Then you need to define a filter in that `HTTPRoute` with `ExtensiomRef` type which refers the `APIPolicy` you created. Refer the following example which describes the full example.

### Create your API

#### API resource

```
apiVersion: dp.wso2.com/v1alpha1
kind: API
metadata:
  name: interceptor-api
spec:
  apiName: Interceptor API
  apiType: REST
  apiVersion: 1.0.0
  basePath: /interceptor-api/1.0.0
  production:
  - httpRouteRefs:
    - interceptor-http-route
  organization: default
```

#### HTTPRoute resource

Note that the first `rule` in this `HTTPRoute` has a `filter` defined using filter type `ExtensionRef` which refers to the Interceptor `APIPolicy` we have defined below. This makes the Interceptor serivce applicable in the operation level.

```
apiVersion: gateway.networking.k8s.io/v1beta1
kind: HTTPRoute
metadata:
  name: interceptor-http-route
spec:
  hostnames:
  - default.gw.wso2.com
  parentRefs:
  - group: gateway.networking.k8s.io
    kind: Gateway
    name: default
    sectionName: httpslistener
  rules:
  - backendRefs:
    - group: dp.wso2.com
      kind: Backend
      name: legacy-xml-backend
    matches:
    - path:
        type: RegularExpression
        value: /books/with-interceptors
      method: POST
    filters:
    - type: URLRewrite
      urlRewrite:
        path:
          type: ReplaceFullPath
          replaceFullPath: /books
    - type: ExtensionRef
      extensionRef:
        group: dp.wso2.com
        kind: APIPolicy
        name: interceptor-api-policy-operation-level
  - backendRefs:
    - group: dp.wso2.com
      kind: Backend
      name: legacy-xml-backend
    matches:
    - path:
        type: RegularExpression
        value: /books/without-interceptors
      method: POST
    filters:
    - type: URLRewrite
      urlRewrite:
        path:
          type: ReplaceFullPath
          replaceFullPath: /books
```

#### Backend resource for API backend

```
apiVersion: dp.wso2.com/v1alpha1
kind: Backend
metadata:
  name: legacy-xml-backend
spec:
  services:
  - host: legacy-xml-backend
    port: 9082
```

### Create Interceptor APIPolicy

#### APIPolicy resource with operation level interceptors

```
apiVersion: dp.wso2.com/v1alpha1
kind: APIPolicy
metadata:
  name: interceptor-api-policy-operation-level
spec:
  override:
    requestInterceptors:
    - name: request-interceptor-service-operation-level
    responseInterceptors:
    - name: response-interceptor-service-operation-level
  targetRef:
    group: dp.wso2.com
    kind: Resource
    name: interceptor-api
```

#### InterceptorService resource for Interceptor API policy

```
apiVersion: dp.wso2.com/v1alpha1
kind: InterceptorService
metadata:
  name: request-interceptor-service-operation-level
spec:
  backendRef:
    name: interceptor-backend
  includes:
    - request_headers
    - request_body
    - invocation_context
---
apiVersion: dp.wso2.com/v1alpha1
kind: InterceptorService
metadata:
  name: response-interceptor-service-operation-level
spec:
  backendRef:
    name: interceptor-backend
  includes:
    - response_headers
    - response_body
    - invocation_context
```

#### Backend resource for Interceptor service backend

```
apiVersion: dp.wso2.com/v1alpha1
kind: Backend
metadata:
  name: interceptor-backend
spec:
  protocol: https
  services:
  - host: interceptor-backend
    port: 9081
  tls:
    secretRef:
      name: interceptor-cert-secret
      key: ca.crt
```

Here `interceptor-cert-secret` refers to a Kubernetes `Secret` resource which contains the tls certificate information for the interceptor service.

!!! Tip

    You can define CA certificate of interceptor service using three different ways. If you have the certificate on your hand use `certificateInline` to define it inline. Or you can use `secretRef` or `configMapRef` fields to read them from a `Secret` resource or a `ConfigMap` resource respectively. Check the <a href="../../../manage-service-endpoint/manage-certificate" target="_blank">Manage Certificate</a> section for more information.

## Configuring API level Interceptors

When you want to apply the Interceptor `APIPolicy` for the `API`, you can create a `APIPolicy` with `targetRef.kind` property set to `API` and give the `targetRef.name` as the name of the `API`resource. Refer the following example which describes a complete example.

### Create your API

#### API resource

```
apiVersion: dp.wso2.com/v1alpha1
kind: API
metadata:
  name: interceptor-api
spec:
  apiName: Interceptor API
  apiType: REST
  apiVersion: 1.0.0
  basePath: /interceptor-api/1.0.0
  production:
  - httpRouteRefs:
    - interceptor-http-route
  organization: default
```

#### HTTPRoute resource

Note that we do not define filter with `ExtensionRef` type as we did for operation level interceptors.

```
apiVersion: gateway.networking.k8s.io/v1beta1
kind: HTTPRoute
metadata:
  name: interceptor-http-route
spec:
  hostnames:
  - default.gw.wso2.com
  parentRefs:
  - group: gateway.networking.k8s.io
    kind: Gateway
    name: default
    sectionName: httpslistener
  rules:
  - backendRefs:
    - group: dp.wso2.com
      kind: Backend
      name: legacy-xml-backend
    matches:
    - path:
        type: RegularExpression
        value: /books
      method: POST
    filters:
    - type: URLRewrite
      urlRewrite:
        path:
          type: ReplaceFullPath
          replaceFullPath: /books
  - backendRefs:
    - group: dp.wso2.com
      kind: Backend
      name: legacy-xml-backend
    matches:
    - path:
        type: RegularExpression
        value: /offers
      method: POST
    filters:
    - type: URLRewrite
      urlRewrite:
        path:
          type: ReplaceFullPath
          replaceFullPath: /offers
```

#### Backend resource for API backend

```
apiVersion: dp.wso2.com/v1alpha1
kind: Backend
metadata:
  name: legacy-xml-backend
spec:
  services:
  - host: legacy-xml-backend
    port: 9082
```

### Create Interceptor APIPolicy

#### APIPolicy resource with API level interceptors

Since the `targetRef.kind` is for the `API`, interceptor is applicable for all the `HTTPRoute`s reffered from that `API`.

```
apiVersion: dp.wso2.com/v1alpha1
kind: APIPolicy
metadata:
  name: interceptor-api-policy-api-level
spec:
  override:
    requestInterceptors:
      - name: request-interceptor-service-api-level
    responseInterceptors:
      - name: response-interceptor-service-api-level
  targetRef:
    group: dp.wso2.com
    kind: API
    name: interceptor-api
```

#### InterceptorService resource for Interceptor API policy

```
apiVersion: dp.wso2.com/v1alpha1
kind: InterceptorService
metadata:
  name: request-interceptor-service-api-level
spec:
  backendRef:
    name: interceptor-backend
  includes:
    - request_headers
    - request_body
    - invocation_context
---
apiVersion: dp.wso2.com/v1alpha1
kind: InterceptorService
metadata:
  name: response-interceptor-service-api-level
spec:
  backendRef:
    name: interceptor-backend
  includes:
    - response_headers
    - response_body
    - invocation_context
```

#### Backend resource for Interceptor service backend

```
apiVersion: dp.wso2.com/v1alpha1
kind: Backend
metadata:
  name: interceptor-backend
spec:
  protocol: https
  services:
  - host: interceptor-backend
    port: 9081
  tls:
    secretRef:
      name: interceptor-cert-secret
      key: ca.crt
```

## Configuring Gateway level Interceptors

If you want all of your requests coming to the Gateway (from all the APIs deployed in the Gateway) to be intercepted, then you can target the Interceptor `APIPolicy` to your `Gateway` resource like below:

```
apiVersion: dp.wso2.com/v1alpha1
kind: APIPolicy
metadata:
  name: gateway-interceptor-policy
spec:
  default:
    requestInterceptors:
      - name: request-interceptor-service-gateway-level
    responseInterceptors:
      - name: response-interceptor-service-gateway-level
  targetRef:
    group: gateway.networking.k8s.io
    kind: Gateway
    name: default
```

#### InterceptorService resource for Interceptor API policy

```
apiVersion: dp.wso2.com/v1alpha1
kind: InterceptorService
metadata:
  name: request-interceptor-service-gateway-level
spec:
  backendRef:
    name: interceptor-backend
  includes:
    - request_headers
    - request_body
    - invocation_context
```

#### Backend resource for Interceptor service backend

```
apiVersion: dp.wso2.com/v1alpha1
kind: Backend
metadata:
  name: interceptor-backend
spec:
  protocol: https
  services:
  - host: interceptor-backend
    port: 9081
  tls:
    secretRef:
      name: interceptor-cert-secret
      key: ca.crt
```

!!! Info

    This global interceptor is a separate execution from API/Operation level interceptors as we discussed above and they works independently.
