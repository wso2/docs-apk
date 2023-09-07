# Add Basic Auth Backend Security via CRs


You can secure the access to your backend via Basic Authentication scheme. For that you need to specify the Basic Auth credentials in the `Backend` resource. You have to have a `Secret` resource containing `usename` and `password` data.

Let's say you have the following `Secret` which contains the credentials:

```
apiVersion: v1
kind: Secret
metadata:
  name: backend-creds
data:
  usr: YWRtaW4K
  pwd: YWRtaW4K
type: Opaque
```

You can refer to the above `Secret` data from your `Backend` as below:

```
apiVersion: dp.wso2.com/v1alpha1
kind: Backend
metadata:
  name: sample-backend
spec:
  protocol: https
  services:
  - host: backend-service
    port: 443
  security:
  - type: Basic
    basic:
      secretRef: 
        name: backend-creds
        usernameKey: usr
        passwordKey: pwd
```

We use security with `spec.security[0].type` as `Basic`. Note that you have to refer the data names in the `Secret` resource in `spec.security[0].basic.secretRef.usernameKey` and `security[0].basic.secretRef.passwordKey` fields.
