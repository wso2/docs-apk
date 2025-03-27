This guide shows you how to create a gRPC API using Kubernetes Custom Resources.

This approach requires four CRs.

- API CR
- GRPCRoute CR
- ConfigMap CR
- Backend CR

### Sample Backend for Student Service API

We will use the sample Student Service backend for this guide, which can be created using the following command.

```
kubectl apply -f https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/student-sample-backend.yaml -n <namespace>
```

You can check the status of the pods by using 
```
kubectl get pods -n <namespace>
```

!!! note
    - This guide uses the Student Service API, which has a single proto file for its definition. 
    - You can also use the [Order Service API](../../../assets/files/get-started/OrderDefinition.zip), which has **multiple proto files**. The backend for this API can be found at [https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/order-sample-backend.yaml](https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/order-sample-backend.yaml).

### API CR 

In the following CR, we have defined the gRPC API giving the name, context, and version information for the API. We have also referred to `GRPCRoute` resource in `spec.production.routeRefs[0]` path as well as `ConfigMap` resource in `spec.definitionFileRef` which we create in the next steps.

```yaml
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
  definitionFileRef: "student-service-definition"
  production:
  - routeRefs:
    - "student-service-api-route"
```

### GRPCRoute CR 

This is the CR where you define resources of your API. This `GRPCRoute` is linked to the API by referring to this resource name from the `API` resource. The given `GRPCRoute` only points to some of the methods in the Student Service API.

```yaml
apiVersion: "gateway.networking.k8s.io/v1"
kind: "GRPCRoute"
metadata:
  name: "student-service-api-route"
spec:
  hostnames:
  - "default.gw.example.com"
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
### ConfigMap CR

This resource contains the gRPC definition file for the API found in <a href="https://raw.githubusercontent.com/wso2/docs-apk/refs/heads/1.3.0/en/docs/assets/files/get-started/student.proto" target="_blank">Student.proto</a> encoded in Base64 format.

```yaml
kind: "ConfigMap"
apiVersion: "v1"
metadata:
  name: "student-service-definition"
binaryData:
  definition: "H4sIAAAAAAAA/5WRu27DMAxFd30FkSlZDCQejQ6ZutcfYAg2Y6ixKVWkjBZB/j3yI21ebpBJFO69hwTJPyT6G95g4bwVmy4ypZwu97pGsL5OtNsn3TphCRWSFIy+MyVGk3ViLMGn7nTRhkaMa7DYmQY5wsSH6Lm0nJmx0Ty2bz6VkI9SPn0PCsC7Et5RJmU5vR/4FZBlBR4leGL4E9hZYlzB4ZjdxXPxqNt5CA86/MPKkapr2G3mhcF62Jaqu/meIefHVEelWmTut34dH5ZpSNINmCpeJM0eekfUYI5dDNVAuu0vuM5+8+NJNxFwAoO6PZ9JAgAA"
```

### Backend CR 

In the above created `GRPCRoute` resource we have referred to a `Backend` resource in `spec.rules[0].backendRefs[0]` path. That `Backend` should be created as below:

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

The `host`, `port`, `basepath` fields should point to your gRPC backend.
If your backend is a Kubernetes-native `Service`, then derive the following value according to your `Service` and use it as the `host`. 

```
<spec.metadata.name>.<spec.metadata.namespace>
```

Once you have designed your APIs using these essential CRs, the next step is to apply them to the Kubernetes API server. APK will process and deploy your APIs seamlessly, taking full advantage of the Kubernetes infrastructure.

```
kubectl apply -f <path_to_CR_files> -n <namespace>
```

### Invoking a gRPC API

You will need a gRPC backend in order to invoke the API and get a correct response. A sample backend for the Student Service API has been provided under [this section.](#sample-backend-for-student-service-api)

Once your gRPC API has been deployed, you can invoke it either via Postman, a custom client, or the `grpcurl` command-line tool. You can download the grpcurl tool from <a href="https://github.com/fullstorydev/grpcurl" target="_blank">here</a>. Code for custom clients can be <a href="https://grpc.io/docs/" target="_blank">generated</a> by providing the modified proto file to the Protocol buffer Compiler.

If you are using grpcurl, you can view the various flags needed for sending requests <a href="https://github.com/fullstorydev/grpcurl" target="_blank">here</a>.

<a href="../../../../develop-and-deploy-api/security/generate-access-token" target="_blank">Generate an access token</a> and invoke the sample gRPC call for the Student Service API provided below.

=== "Sample Request"
    ```
    grpcurl -insecure \
    -import-path /Users/User/proto-files \
    -proto Student.proto \
    -d '{"id": 1}' \
    -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWI' \
    default.gw.example.com:9095 org.apk.v1.student_service.StudentService/GetStudent
    ```
=== "Request Format"
    ```
    grpcurl -insecure \
    -import-path <path-to-folder-containing-proto-file> \
    -proto <proto-file-name> \
    -d '{"argument": value}' \
    -H 'Authorization: Bearer <Access-Token>' \
    <Host>:9095 <complete-service-and-method-name>
    ```