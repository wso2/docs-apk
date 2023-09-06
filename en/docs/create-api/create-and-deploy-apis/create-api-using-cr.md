A single API in APK project is defined using a set of combined Kubernetes resources.

- <b>API</b> - With the `API` CRD, you can effortlessly design and manage APIs using Kubernetes-native tools. Simplify the deployment process and focus on what matters most – crafting outstanding APIs.This is the root level resource for an API. API related metadata are also defined in this CR.

- <b>HTTPRoute</b> -  The `HTTPRoute` CRD empowers you to configure HTTP routes and filters for your APIs efficiently. You refer to `HTTPRoute` resources from  `API`.

- <b>Backend</b> - Elevate your endpoint configurations, including resiliency settings, using the `Backend` CRD. Ensure the reliability and availability of your API backends for uninterrupted service.

These are the basic resource you need to use specifically for APK. We have other resources for complex use cases which are described under separate sections.

Let's create a simple API with following steps:

- [Create API CR](#create-api-cr)
- [Create HTTPRoute CR](#create-httproute-cr)
- [Create Backend CR](#create-backend-cr)

## Create API CR 

In the following CR, we have defined a REST API giving the name, context, and version information for the API. We have also refers to `HTTPRoute` resource in `spec.production.httpRouteRefs[0]` path which we create in the next step.

```
apiVersion: dp.wso2.com/v1alpha1
kind: API
metadata:
  name: http-bin-api
spec:
  apiDisplayName: HTTP Bin API
  apiType: REST
  apiVersion: 1.0.0
  basePath: /http-bin-api/1.0.0
  production:
  - httpRouteRefs:
    - prod-http-route-http-bin-api
```

!!! Info
    If your API has many resources and cannot define within a single `HTTPRoute` resource, then you have to create two or more `HTTPRoute`s and list them under `spec.production.httpRouteRefs`.

## Create HTTPRoute CR

This is the resource where you define resources of your API. This `HTTPRoute` is linked to the API by referring to this resource name from the `API` resource.

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
  - backendRefs:
    - group: dp.wso2.com
      kind: Backend
      name: http-bin-backend
    matches:
    - path:
        type: PathPrefix
        value: /http-bin-api/1.0.0
    filters:
      - type: URLRewrite
        urlRewrite:
          path:
            type: ReplacePrefixMatch
            replacePrefixMatch: /
```

Here, we have used `http-bin.gw.wso2.com` as the virtual hostname for this API. The `spec.parentRefs[0]` parameter defines the Gateway to which this `HTTPRoute` is deployed. We have defined a single rule with a `PathPrefix` match type, and the `URLRewrite` filter with `ReplacePrefixMatch` to rewrite the API context prefix so that only the remainder of the path is sent to the actual backend.

## Create Backend CR

In the above created HTTPRoute resource we have reffered to a `Backend` resource in `spec.rules[0].backendRefs[0]` path. That `Backend` should be created as below:

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

Here, we have set the httpbin.org domain name as the host with port 80, which is an insecure port. To make it a TLS-secured endpoint, refer to the [Manage Certificate](../manage-service-endpoint/manage-certificate.md) section.

If your backend is a Kubernetes-native `Service`, then derive the following value accoriding to your `Service` and use it as the `host`. 

```
<spec.metadata.name>.<spec.metadata.namespace>
```

Once you have designed your APIs using these essential CRDs, the next step is to apply them to the Kubernetes API server. APK will process and deploy your APIs seamlessly, taking full advantage of the Kubernetes infrastructure.

```
kubectl apply -f <path_to_CR_files>
```
