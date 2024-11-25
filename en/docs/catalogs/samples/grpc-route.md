# GRPCRoute Custom Resource

This is the resource where you define resources of your API. This GRPCRoute is linked to the API by referring to this resource name from the API resource.

Refer the [Kubernetes Gateway API documentation](https://gateway-api.sigs.k8s.io/references/spec/#gateway.networking.k8s.io/v1.GRPCRoute) for more information on how to configure GRPCRoute.
```
apiVersion: gateway.networking.k8s.io/v1alpha2
kind: GRPCRoute
metadata:
  name: grpc-app-1
spec:
  parentRefs:
    - group: gateway.networking.k8s.io
      kind: Gateway
      name: default
      sectionName: httpslistener
  hostnames:
  - "grpc.gw.wso2.com"
  rules:
  - matches:
    - method:
        service: student.StudentService
        method: GetStudent
    backendRefs:
    - kind: Backend
      name: grpc-service1
      port: 50051
  - matches:
      method:
        service: student.StudentService
        method: GetStudentStream
    backendRefs:
    - kind: Backend
      name: grpc-service2
      port: 50051
```