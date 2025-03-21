In this section, we'll explore Kubernetes Native API Development in WSO2 APK. Learn how to define APIs using Kubernetes resources for streamlined API management.

## Develop a backend service
   
To begin, it's essential to have a backend service that your API will interact with. In this guide, we will be using a backend deployed in a Kubernetes cluster. Prior to invoking the API, you will need to have this backend up and running.

You can create this sample backend with the following command.

``` bash
kubectl apply -f https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/qsg-sample-backend.yaml
```

Wait for this pod to spin up. You can check its status using the following command.

``` bash
kubectl get pods
```

## Create the CRs

A single API is defined using a set of combined Kubernetes custom resources (CRs) in WSO2 Kubernetes Gateway.

- <b>API</b> - With the `API` CRs, you can effortlessly design and manage APIs using Kubernetes-native tools. Simplify the deployment process and focus on what matters most – crafting outstanding APIs. This is the root level resource for an API. API related metadata are also defined in this CR.

- <b>HTTPRoute</b> -  The `HTTPRoute` CR empowers you to configure HTTP routes and filters for your API efficiently. You have to refer to `HTTPRoute` resources from  `API` CRs.

- <b>Backend</b> - Elevate your endpoint configurations, including resiliency settings, using the `Backend` CR. Ensure the reliability and availability of your API backends for uninterrupted service.

These are the basic resource you need to use specifically for APK. We have other resources for complex use cases which are described under separate sections.

Let's create a simple API with following steps:

- [Create API CR](#create-api-cr)
- [Create HTTPRoute CR](#create-httproute-cr)
- [Create Backend CR](#create-backend-cr)

### Create API CR 

In the following CR, we have defined a REST API giving the name, context, and version information for the API. We have also referred to the `HTTPRoute` resource (which we create in the next step) in the `spec.production.httpRouteRefs[0]` path.

```
apiVersion: dp.wso2.com/v1alpha1
kind: API
metadata:
  name: employee-service-api
spec:
  apiName: Employee Service API
  apiType: REST
  apiVersion: 3.14
  basePath: /employees-info/3.14/
  organization: default
  production:
  - httpRouteRefs:
    - prod-http-route-employee-service-api
```

!!! Info
    If your API has many resources and cannot be defined within a single `HTTPRoute` resource, then you have to create two or more `HTTPRoute`s and list them under `spec.production.httpRouteRefs`.

### Create HTTPRoute CR

This is the resource where you define resources of your API. This `HTTPRoute` is linked to the API by referring to this resource name from the `API` resource.

```
apiVersion: gateway.networking.k8s.io/v1beta1
kind: HTTPRoute
metadata:
  name: prod-http-route-employee-service-api
spec:
  hostnames:
    - default.gw.example.com
  parentRefs:
    - group: gateway.networking.k8s.io
      kind: Gateway
      name: wso2-apk-default
      sectionName: httpslistener
  rules:
  - backendRefs:
    - group: dp.wso2.com
      kind: Backend
      name: employee-service-backend
    matches:
    - path:
        type: PathPrefix
        value: /
```

Here, we have used `default.gw.example.com` as the virtual hostname for this API. The `spec.parentRefs[0]` parameter defines the Gateway to which this `HTTPRoute` is deployed. We have defined a single rule with a `PathPrefix` match type, and the `URLRewrite` filter with `ReplacePrefixMatch` to rewrite the API context prefix so that only the remainder of the path is sent to the actual backend.

### Create Backend CR

In the above created HTTPRoute resource we have referred to a `Backend` resource in `spec.rules[0].backendRefs[0]` path. That `Backend` should be created as below:

```
apiVersion: dp.wso2.com/v1alpha2
kind: Backend
metadata:
  name: employee-service-backend
spec:
  services:
  - host: employee-service.default
    port: 8080
```

!!! Info
    In order to make the endpoint a TLS-secured endpoint, refer to the <a href="../../../manage-service-endpoint/manage-certificate/" target="_blank">Manage Certificate</a> section.

If your backend is a Kubernetes-native `Service` as in this example, then derive the following value according to your `Service` and use it as the `host`. 

```
<spec.metadata.name>.<spec.metadata.namespace>
```

## Apply the CRs and Invoke the API

Once you have designed your APIs using these essential CRs, the next step is to apply them to the Kubernetes API server. APK will process and deploy your APIs seamlessly, taking full advantage of the Kubernetes infrastructure.

```
kubectl apply -f <path_to_CR_files>
```

Now the API is ready to be invoked. Let’s get the list of employees by invoking the `/employees` resource in the `EmployeeServiceAPI`.

=== "Sample Request"
    ```
    curl -k --location 'https://default.gw.example.com:9095/employees-info/3.14/employees' \
    --header 'Host: default.gw.example.com' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ'
    ```

=== "Sample Response"
    ```
    [
        {
            "id": "1234123",
            "name": "Mrs. Heily Feyers",
            "department": "IT"
        },
        {
            "id": "23451234",
            "name": "Mr. Brendon MacSmith",
            "department": "Sales"
        },
        {
            "id": "34561234",
            "name": "Mr. Peter Queenslander",
            "department": "IT"
        },
        {
            "id": "45671243",
            "name": "Miss. Liza MacAdams",
            "department": "Finance"
        }
    ]
    ```
=== "Request Format"
    ```
    curl --location 'https://<host>:9095/<basePath>/3.14/employees' \
    --header 'Host: <host>' \
    --header 'Authorization: Bearer <access-token>'
    ```