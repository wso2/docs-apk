## Application Mapping Sample

The following is a sample `ApplicationMapping` CR.

```
apiVersion: cp.wso2.com/v1alpha2
kind: ApplicationMapping
metadata:
  name: application-mapping-sample
spec:
  applicationRef: sample-application
  subscriptionRef: sample-subscription
```