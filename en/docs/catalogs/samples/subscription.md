## Subscription Sample

The following is a sample `Subscription` CR.

```
apiVersion: cp.wso2.com/v1alpha2
kind: Subscription
metadata:
  name: sample-subscription
spec:
  subscriptionStatus: ACTIVE
  organization: carbon.super
  api:
    name: AppSubTestAPI
    version: ^1.*|^v1$
```
