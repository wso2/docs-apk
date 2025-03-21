In this section, we'll explore how to define APIs using Kubernetes resources in WSO2 Kubernetes Gateway for streamlined API management.

## Create the CRs

A single API is defined using a set of combined Kubernetes custom resources (CRs) in WSO2 Kubernetes Gateway.

- <b>API</b> - With the `API` CRs, you can effortlessly design and manage APIs using Kubernetes-native tools. Simplify the deployment process and focus on what matters most – crafting outstanding APIs. This is the root level resource for an API. API related metadata are also defined in this CR.

- <b>HTTPRoute</b> -  The `HTTPRoute` CR empowers you to configure HTTP routes and filters for your API efficiently. You have to refer to `HTTPRoute` resources from  `API` CRs.

- <b>Backend</b> - Elevate your endpoint configurations, including resiliency settings, using the `Backend` CR. Ensure the reliability and availability of your API backends for uninterrupted service.

These are the basic resource you need to use specifically for Kubernetes Gateway. We have other resources for complex use cases which are described under separate sections.

Let's create a simple API with following steps:

- [Create API CR](#create-api-cr)
- [Create HTTPRoute CR](#create-httproute-cr)
- [Create Backend CR](#create-backend-cr)

### Create API CR 

In the following CR, we have defined a REST API giving the name, context, and version information for the API. We have also referred to the `HTTPRoute` resource (which we create in the next step) in the `spec.production.httpRouteRefs[0]` path.

```yaml
apiVersion: dp.wso2.com/v1alpha1
kind: API
metadata:
  name: sample-api
spec:
  apiName: Sample API
  apiType: REST
  apiVersion: 0.1.0
  basePath: /sample-api/0.1.0
  organization: default
  production:
  - httpRouteRefs:
    - prod-http-route-sample-api
```

!!! Info
    If your API has many resources and cannot be defined within a single `HTTPRoute` resource, then you have to create two or more `HTTPRoute`s and list them under `spec.production.httpRouteRefs`.

### Create HTTPRoute CR

This is the resource where you define resources of your API. This `HTTPRoute` is linked to the API by referring to this resource name from the `API` resource.

```yaml
apiVersion: gateway.networking.k8s.io/v1beta1
kind: HTTPRoute
metadata:
  name: prod-http-route-sample-api
spec:
  hostnames:
  - default.gw.example.com
  parentRefs:
  - group: gateway.networking.k8s.io
    kind: Gateway
    name: wso2-apk-default
    sectionName: httpslistener
  rules:
  - matches:
    - path:
        type: "RegularExpression"
        value: "/uuid"
      method: "GET"
    filters:
    - type: "URLRewrite"
      urlRewrite:
        path:
          type: "ReplaceFullPath"
          replaceFullPath: "/uuid"
    backendRefs:
    - group: "dp.wso2.com"
      kind: "Backend"
      name: "backend-sample-api"
```

Here, we have used `default.gw.example.com` as the virtual hostname for this API. The `spec.parentRefs[0]` parameter defines the Gateway to which this `HTTPRoute` is deployed. We have defined a single rule with a `RegularExpression` match type for the path, and the `URLRewrite` filter with `ReplaceFullPath` to rewrite the entire path so that the specified path is sent to the actual backend.

### Create Backend CR

In the above created HTTPRoute resource we have referred to a `Backend` resource in `spec.rules[0].backendRefs[0]` path. That `Backend` should be created as below:

```yaml
apiVersion: dp.wso2.com/v1alpha2
kind: Backend
metadata:
  name: backend-sample-api
spec:
  services:
  - host: dev-tools.wso2.com
    port: 443
  basePath: /gs/helpers/v1.0
  protocol: https
```

!!! Info
    In order to make the endpoint a TLS-secured endpoint, refer to the <a href="../../../manage-service-endpoint/manage-certificate/" target="_blank">Manage Certificate</a> section.

If your backend is a Kubernetes-native `Service`, then derive the following value according to your `Service` and use it as the `host`. 

```
<spec.metadata.name>.<spec.metadata.namespace>
```

## Apply the CRs and Invoke the API

Once you have designed your APIs using these essential CRs, the next step is to apply them to the Kubernetes API server. APK will process and deploy your APIs seamlessly, taking full advantage of the Kubernetes infrastructure.

```
kubectl apply -f <path_to_CR_files>
```

Now the API is ready to be invoked. Let’s <a href="../../../../develop-and-deploy-api/security/generate-access-token" target="_blank">Generate an Access Token</a> and get a random UUID by invoking the `/uuid` resource in the `SampleServiceAPI` by invoking the API.

=== "Sample Request"
    ```
    curl -k --location 'https://default.gw.example.com:9095/sample-api/0.1.0/uuid' \
    --header 'Host: default.gw.example.com' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ'
    ```

=== "Sample Response"
    ```
    {
        "uuid":"f4a38d31-21e8-4b5d-9c26-792e6805dd54"
    }
    ```
=== "Request Format"
    ```
    curl --location 'https://<host>:9095/<basePath>/0.1.0/uuid' \
    --header 'Host: <host>' \
    --header 'Authorization: Bearer <access-token>'
    ```