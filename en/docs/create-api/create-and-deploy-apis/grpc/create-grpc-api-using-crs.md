Similar to the approach for [REST APIs](../rest/create-rest-api-using-crs.md), this approach requires three CRs.

- API CR
- GRPCRoute CR
- Backend CR

For this guide, you can create a sample backend for the gRPC API using the following command.
```
kubectl apply -f https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/grpc-sample-backend.yaml -n <namespace>
```

The proto file used for this guide is available at https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/definitions/Student.proto.

#### API CR 

In the following CR, we have defined the gRPC API giving the name, context, and version information for the API. We have also referred to `GRPCRoute` resource in `spec.production.routeRefs[0]` path which we create in the next step.

```yaml
apiVersion: dp.wso2.com/v1alpha2
kind: API
metadata:
  name: demo-grpc-api
spec:
  apiName: "Demo gRPC API"
  apiType: GRPC
  apiVersion: v1
  basePath: /grpc.base.path.v1
  isDefaultVersion: false
  organization: default
  production:
  - routeRefs:
    - demo-grpc-route
```

#### GRPCRoute CR 

This is the resource where you define resources of your API. This `GRPCRoute` is linked to the API by referring to this resource name from the `API` resource. 

```yaml
apiVersion: gateway.networking.k8s.io/v1alpha2
kind: GRPCRoute
metadata:
  name: demo-grpc-route
  namespace: default
spec:
  hostnames:
    - default.gw.wso2.com
  parentRefs:
    - group: gateway.networking.k8s.io
      kind: Gateway
      name: wso2-apk-default
      sectionName: httpslistener
  rules:
    - matches:
        - method:
            service: student.StudentService
            method: GetStudent
        - method:
            service: student.StudentService
            method: SendStudentStream
        - method:
            service: student.StudentService
            method: GetStudentStream
        - method:
            service: student.StudentService
            method: SendAndGetStudentStream
      backendRefs:
        - name: demo-grpc-backend
          kind: Backend
          port: 6565

```

#### Backend CR 

In the above created GQLRoute resource we have referred to a `Backend` resource in `spec.rules[0].backendRefs[0]` path. That `Backend` should be created as below:

```yaml
apiVersion: dp.wso2.com/v1alpha1
kind: Backend
metadata:
  name: demo-grpc-backend
  namespace: default
spec:
  services:
  - host: grpc-backend
    port: 6565
  basePath: ""
  protocol: http

```

This Backend CR points to the backend that can be created using the following command. Replace <namespace> with the relevant name of the namespace.

```
kubectl apply -f https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/grpc-sample-backend.yaml -n <namespace>
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