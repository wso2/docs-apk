# Add JWT Issuers

This section explains how to add a new JWT Issuer to the APK.

Follow the steps below to add JWT Issuers to APK.

1. Create a file named `new-jwt-issuer.yaml` and add the following content to it.

```
apiVersion: dp.wso2.com/v1alpha1
kind: JWTIssuer
metadata:
  name: new-jwt-issuer
  namespace: apk
spec:
  consumerKeyClaim: azp
  issuer: https://idp.am.wso2.com/token
  name: new-service-provider
  organization: new-org
  scopesClaim: scope
  signatureValidation:
    certificate:
      secretRef:
        key: wso2carbon.pem
        name: apk-test-wso2-apk-enforcer-truststore-secret
  targetRef:
    group: gateway.networking.k8s.io
    kind: Gateway
    name: default
```

2. Run the following command to add the JWT Issuer to APK.

```
kubectl apply -f new-jwt-issuer.yaml -n <namespace>
```