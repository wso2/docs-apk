# Backend Custom Resource

 This is the CR which is used to describe the actual backend and it's configurations

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

Refer [Manage Service Endpoint](../../create-api/manage-service-endpoint/manage-certificate) for more information on how to configure backend services.