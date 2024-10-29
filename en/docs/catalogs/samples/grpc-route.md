# GRPCRoute Custom Resource

This is the resource where you define resources of your API. This GRPCRoute is linked to the API by referring to this resource name from the API resource.

Refer the [Kubernetes Gateway API documentation](https://gateway-api.sigs.k8s.io/reference/spec/#gateway.networking.k8s.io%2fv1.GRPCRoute) for more information on how to configure HTTPRoute.
```
apiVersion: gateway.networking.k8s.io/v1
kind: GRPCRoute
metadata:
  name: grpc-app-1
spec:
  parentRefs:
  - name: my-gateway
  hostnames:
  - "example.com"
  rules:
  - matches:
    - method:
        service: com.example.User
        method: Login
    backendRefs:
    - name: my-service1
      port: 50051
  - matches:
    - headers:
      - type: Exact
        name: magic
        value: foo
      method:
        service: com.example.Things
        method: DoThing
    backendRefs:
    - name: my-service2
      port: 50051
```