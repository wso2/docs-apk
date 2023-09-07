# Add Token Issuers

This section explains how to add a new Token issuer to the APK.

Follow the steps below to add token issuers to APK.

1. Create a file named `new-token-issuer.yaml` and add the following content to it.

```
apiVersion: dp.wso2.com/v1alpha1
kind: TokenIssuer
metadata:
  name: new-jwt-issuer
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

2. Run the following command to add the token Issuer to APK.

```
kubectl apply -f new-token-issuer.yaml
```