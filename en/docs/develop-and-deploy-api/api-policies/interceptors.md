# Message Transformation using Interceptor APIPolicy

You can use `APIPolicy` CR with interceptor configurations to carry out transformations and mediation on the requests and responses. Request interceptor gets triggered before sending the request to the backend. Response interceptor gets triggered before responding to the client. Here, an interceptor is a separate microservice that handles the request, response, or both request and response transformations.

## Sample Interceptor APIPolicy
```
apiVersion: dp.wso2.com/v1alpha1
kind: APIPolicy
metadata:
  name: interceptor-api-policy
  namespace: ns
spec:
  override:
    requestInterceptor:
      backendRef:
         name: req-interceptor-backend
         namespace: ns
      includes:
      - request_body
    responseInterceptor:
      backendRef:
         name: res-interceptor-backend
         namespace: ns
      - response_headers
  targetRef:
    group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: sample-http-route
```

If you are an API developer, you can write a custom request/response interceptor microservice in any programming language of your choice by following [the Interceptor OpenAPI Definition](https://github.com/wso2/apk/blob/main/developer/resources/interceptor-service-open-api-v1.yaml). Then you can configure the following spec feilds in the `APIPolicy` CR to wire your interceptor serivce with the `API`.

<table>
<thead>
  <tr>
    <th>Policy Spec Field</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td style="white-space: nowrap;"><a href="#requestInterceptor"><code>requestInterceptor</code></a></td>
    <td>Interceptor service configuration for the request path</td>
  </tr>
  <tr>
    <td style="white-space: nowrap;"><a href="#responseInterceptor"><code>responseInterceptor</code></a></td>
    <td>Interceptor service configuration for the response path</td>
  </tr>
</tbody>
</table>


You can define interceptors on an API level (per API) and at resource level. How to do these are explained below in detail. If a request/response interceptor is on an API level and a resource level, interceptors properties are combined using proirity order defined in the following order. You can define properties under `default` and/or `override` section in API level `APIPolicy` and/or resource level `APIPolicy`. Those values are combined using the priority order defined as below. Priority descreses towards the bottom of the table.

<table>
<tbody>
  <tr>
    <td>API level override</td>
  </tr>
  <tr>
    <td>Resource level override</td>
  </tr>
  <tr>
    <td>Resource level default</td>
  </tr>
  <tr>
    <td>API level default</td>
  </tr>
</tbody>
</table>

When you want the policy only to be defined in a single level, then defining the interceptor configurations in either `default` or `overribe` sections will work.

## Configuring Interceptors

Configuring an interceptor requires the following two steps.

1. [Implement an interceptor microservice adhering to the Interceptor OpenAPI Definition](https://apim.docs.wso2.com/en/latest/deploy-and-publish/deploy-on-gateway/choreo-connect/message-transformation/interceptor-microservice/interceptor-microservice/)

2. Create `APIPolicy` with interceptor configuration and attach it to your `API`. 

## Configuring Resource level Interceptors

You need to create the `APIPolicy` with `targetRef.kind` property set to `Resource` for that and give the `targetRef.name` as the name of the `HTTPRoute`resource. Then you need to define a filter in that `HTTPRoute` with `ExtensiomRef` type which refers the `APIPolicy` you created. Refer the following example which describes the full example.

### Create your API

#### API resource
```
apiVersion: dp.wso2.com/v1alpha1
kind: API
metadata:
  name: my-sample-api
  namespace: ns
spec:
  apiDisplayName: Interceptor API
  apiType: REST
  apiVersion: 1.0.0
  context: /my-sample-api/1.0.0
  definitionFileRef: swagger-definition-file
  prodHTTPRouteRefs: 
  - my-http-route
  organization: wso2-org
```

#### HTTPRoute resource

Note that the first `rule` in this `HTTPRoute` has a `filter` defined using filter type `ExtensionRef` which refers to the Interceptor `APIPolicy` we have defined below. This makes the Interceptor serivce applicable in the resource level.

```
apiVersion: gateway.networking.k8s.io/v1beta1
kind: HTTPRoute
metadata:
  name: my-http-route
  namespace: ns
spec:
  hostnames:
  - interceptor-resource.test.gw.wso2.com
  parentRefs:
  - group: gateway.networking.k8s.io
    kind: Gateway
    name: Default
  rules:
  - backendRefs:
    - group: dp.wso2.com
      kind: Backend
      name: legacy-xml-backend
    matches:
    - path:
        type: RegularExpression
        value: /interceptor/1.0.0/books/with-interceptors
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
        name: interceptor-api-policy-resource-level
  - backendRefs:
    - group: dp.wso2.com
      kind: Backend
      name: legacy-xml-backend
    matches:
    - path:
        type: RegularExpression
        value: /interceptor/1.0.0/books/without-interceptors
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
  namespace: ns
spec:
  services:
  - host: legacy-xml-backend.ns
    port: 9082
```

### Create Interceptor APIPolicy

#### APIPolicy resource with resource level interceptors
```
apiVersion: dp.wso2.com/v1alpha1
kind: APIPolicy
metadata:
  name: interceptor-api-policy-resource-level
  namespace: ns
spec:
  override:
    requestInterceptor:
      backendRef:
         name: interceptor-backend
      includes:
      - request_body
      - request_headers
    responseInterceptor:
      backendRef:
         name: interceptor-backend
  targetRef:
    group: gateway.networking.k8s.io
    kind: Resource
    name: my-http-route
```

#### Backend resource for Interceptor service backend
```
kind: Backend
metadata:
  namespace: ns
  name: interceptor-backend
spec:
  protocol: https
  services:
  - host: interceptor-backend.ns
    port: 9081
  tls:
    secretRef:
      name: interceptor-cert-secret
      key: ca.crt
```

Here `interceptor-cert-secret` refers to a Kubernetes `Secret` resource which contains the tls certificate information for the interceptor service.

!!! Tip
    
    You can define CA certificate of interceptor service using three different ways. If you have the certificate on your hand use `certificateInline` to define it inlien. Or you can use `secretRef` or `configMapRef` feilds to read them from a `Secret` resource or a `ConfigMap` resource respectively.

## Configuring API level Interceptors

When you want to apply the Interceptor `APIPolicy` for the `API`, you can create a `APIPolicy` with `targetRef.kind` property set to `HTTPRoute` and give the `targetRef.name` as the name of the `HTTPRoute`resource. Refer the following example which describes a complete example.

### Create your API

#### API resource
```
apiVersion: dp.wso2.com/v1alpha1
kind: API
metadata:
  name: my-sample-api
  namespace: ns
spec:
  apiDisplayName: Interceptor API
  apiType: REST
  apiVersion: 1.0.0
  context: /my-sample-api/1.0.0
  definitionFileRef: swagger-definition-file
  prodHTTPRouteRefs: 
  - my-http-route
  organization: wso2-org
```

#### HTTPRoute resource

Note that we do not define filter with `ExtensionRef` type as we did for resource level interceptors.

```
apiVersion: gateway.networking.k8s.io/v1beta1
kind: HTTPRoute
metadata:
  name: my-http-route
  namespace: ns
spec:
  hostnames:
  - interceptor-resource.test.gw.wso2.com
  parentRefs:
  - group: gateway.networking.k8s.io
    kind: Gateway
    name: Default
  rules:
  - backendRefs:
    - group: dp.wso2.com
      kind: Backend
      name: legacy-xml-backend
    matches:
    - path:
        type: RegularExpression
        value: /my-sample-api/1.0.0/books
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
        value: /my-sample-api/1.0.0/offers
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
  namespace: ns
spec:
  services:
  - host: legacy-xml-backend.ns
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
  namespace: ns
spec:
  override:
    requestInterceptor:
      backendRef:
         name: interceptor-backend
      includes:
      - request_body
      - request_headers
    responseInterceptor:
      backendRef:
         name: interceptor-backend
  targetRef:
    group: dp.wso2.com
    kind: API
    name: my-sample-api
```

#### Backend resource for Interceptor service backend
```
kind: Backend
metadata:
  namespace: ns
  name: interceptor-backend
spec:
  protocol: https
  services:
  - host: interceptor-backend.ns
    port: 9081
  tls:
    secretRef:
      name: interceptor-cert-secret
      key: ca.crt
```

## Gateway Interceptors

If you want all of your requests coming to the Gateway (from all the APIs deployed in the Gateway) to be intercepted, then you can target the Interceptor `APIPolicy` to your `Gateway` resource like below:

```
apiVersion: dp.wso2.com/v1alpha1
kind: APIPolicy
metadata:
  name: gateway-interceptor-policy
  namespace: apk
spec:
  default:
    requestInterceptor:
      backendRef:
         name: gateway-request-interceptor-backend
      includes:
      - request_body
      - request_headers
      - invocation_context
    responseInterceptor:
      backendRef:
         name: gateway-response-interceptor-backend
      includes:
      - response_body
      - response_headers
  targetRef:
    group: dp.wso2.com
    kind: Gateway
    name: default
```

!!! Info

    This global interceptor is independent from API/Resource level interceptors we discussed above and works independently. 