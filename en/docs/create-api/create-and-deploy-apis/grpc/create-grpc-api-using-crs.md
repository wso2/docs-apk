Similar to the approach for [REST APIs](../rest/create-rest-api-using-crs.md), this approach requires three CRs.

- API CR
- GRPCRoute CR
- Backend CR

For this guide, you can create a sample backend for the GraphQL API using the following command.
```
kubectl apply -f https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/student-sample-backend.yaml -n <namespace>
```

The GRPC definition file used for this guide is available at [this link](../../../assets/files/get-started/student.proto).

!!! note
    - This guide uses the Student Service API, which has a single proto file for its definition. 
    - You can also use the [Order Service API](../../../assets/files/get-started/OrderDefinition.zip), which has multiple proto files. The backend for this API can be found at [https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/order-sample-backend.yaml](https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/order-sample-backend.yaml).

#### API CR 

In the following CR, we have defined the GraphQL API giving the name, context, and version information for the API. We have also referred to `GQLRoute` resource in `spec.production.routeRefs[0]` path which we create in the next step.

```yaml
---
kind: "API"
apiVersion: "dp.wso2.com/v1alpha3"
metadata:
  name: "student-service-api"
spec:
  apiName: "student-service-api"
  apiType: "GRPC"
  apiVersion: "v1"
  basePath: "/org.apk.v1"
  organization: "default"
  isDefaultVersion: false
  definitionFileRef: "student-service-api-definition"
  production:
  - routeRefs:
    - "student-service-api-route"
```

You have to provide the GraphQL SDL file as a ConfigMap and refer to it in the `definitionFileRef` field. Your sdl content should be gzipped before mapping it to definition key in a config file. The following is a sample ConfigMap that you can use to create the SDL ConfigMap of the sample graphQL backend used in this guide.

```yaml

kind: "ConfigMap"
apiVersion: "v1"
metadata:
  name: "grpc-basic-api-definition"
binaryData:
  definition: "H4sIAAAAAAAA5WRu27DMAxFd30FkSlZDCQejQ6ZutcfYAg2Y6ixKVWkjBZBj3yI21ebpBJFO69hwTJPyT6G95g4bwVmy4ypZwu97pGsL5OtNsn3TphCRWSFIy+MyVGk3ViLMGn7nTRhkaMa7DYmQY5wsSH6Lm0nJmx0Ty2bz6VkI9SPn0PCsC7Et5RJmU5vR/4FZBlBR4leGL4E9hZYlzB4ZjdxXPxqNt5CA86/MPKkapr2G3mhcF62Jaqu/meIefHVEelWmTut34dH5ZpSNINmCpeJM0eekfUYI5dDNVAuu0vuM5+8+NJNxFwAoO6PZ9JAgAA"
```

#### GRPCRoute CR 

This is the resource where you define resources of your API. This `GRPCRoute` is linked to the API by referring to this resource name from the `API` resource. This GRPCRoute only points to some of the methods in the Student Service API.

```yaml
apiVersion: "gateway.networking.k8s.io/v1alpha2"
kind: "GRPCRoute"
metadata:
  name: "student-service-api-route"
spec:
  hostnames:
  - "default.gw.wso2.com"
  rules:
  - matches:
    - method:
        type: "Exact"
        service: "student_service.StudentService"
        method: "GetStudent"
    backendRefs:
    - group: "dp.wso2.com"
      kind: "Backend"
      name: "student-service-backend"
  - matches:
    - method:
        type: "Exact"
        service: "student_service.StudentService"
        method: "SendStudentStream"
    backendRefs:
    - group: "dp.wso2.com"
      kind: "Backend"
      name: "student-service-backend"
  parentRefs:
  - group: "gateway.networking.k8s.io"
    kind: "Gateway"
    name: "wso2-apk-default"
    sectionName: "httpslistener"

```

#### Backend CR 

In the above created GQLRoute resource we have referred to a `Backend` resource in `spec.rules[0].backendRefs[0]` path. That `Backend` should be created as below:

```yaml
apiVersion: "dp.wso2.com/v1alpha2"
kind: "Backend"
metadata:
  name: "student-service-backend"
spec:
  services:
  - host: "student-backend"
    port: 6565
  basePath: ""
  protocol: "http"

```

This Backend CR points to the backend that can be created using the following command. Replace <namespace> with the relevant name of the namespace.

```
kubectl apply -f https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/student-sample-backend.yaml -n <namespace>
```

The `host`, `port`, `basepath` fields should point to your GRPC backend.
If your backend is a Kubernetes-native `Service`, then derive the following value according to your `Service` and use it as the `host`. 

```
<spec.metadata.name>.<spec.metadata.namespace>
```

Once you have designed your APIs using these essential CRs, the next step is to apply them to the Kubernetes API server. APK will process and deploy your APIs seamlessly, taking full advantage of the Kubernetes infrastructure.

```
kubectl apply -f <path_to_CR_files> -n <namespace>
```