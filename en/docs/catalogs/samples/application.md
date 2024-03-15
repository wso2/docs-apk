## Application Sample

The following is a sample `Application` CR.

```
kind: Application
apiVersion: cp.wso2.com/v1alpha2
metadata:
  name: sample-application
spec:
  name: sample-app1
  owner: admin
  organization: default
  securitySchemes:
    oauth2:
      environments:
        - envId: Default
          appId: 45f1c5c8-a92e-11ed-afa1-0242ac120008
          keyType: PRODUCTION
        - envId: Default
          appId: 45f1c5c8-a92e-11ed-afa1-0242ac120009
          keyType: SANDBOX
```