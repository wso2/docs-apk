## Backend Sample

The following is a sample CR for creating a Backend.
```
apiVersion: "dp.wso2.com/v1alpha2"
kind: "Backend"
metadata:
  name: "backend-sample"
spec:
  services:
  - host: "apim-ai-aus.openai.azure.com"
    port: 443
  basePath: "/openai/deployments/apim-deployment"
  protocol: "https"
  security:
    apiKey:
      in: "Header"
      name: "api-key"
      valueFrom: 
        name: "mysecret"
        valueKey: "apiKey"
```

Refer [Manage Service Endpoint](../../create-api/manage-service-endpoint/manage-certificate.md) for more information on how to configure backend services.
