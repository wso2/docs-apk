# Message Transformation using Interceptor APIPolicy

You can use `APIPolicy` CR with interceptor configurations to carry out transformations and mediation on the requests and responses. Request interceptor gets triggered before sending the request to the backend. Response interceptor gets triggered before responding to the client. Here, an interceptor is a separate microservice that handles the request, response, or both request and response transformations.

##### Sample Interceptor APIPolicy
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
    
    - [Attach Interceptor APIPolicy via REST API](../interceptors-via-rest-api)
    - [Attach Interceptor APIPolicy via CR](../interceptors-via-crs)
