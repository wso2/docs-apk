## Token Issuer Sample
The following is a sample TokenIssuer CR used to add a new token issuer to the APK.
```
apiVersion: dp.wso2.com/v1alpha2
kind: TokenIssuer
metadata:
  name: token-issuer
  namespace: ns
spec:
  consumerKeyClaim: test
  issuer: https://sample-issuer.com/token
  name: test-key
  organization: org
  scopesClaim: scope
  signatureValidation:
    certificate:
      secretRef:
        key: cert.pem
        name: truststore
  targetRef:
    group: gateway.networking.k8s.io
    kind: Gateway
    name: default
```