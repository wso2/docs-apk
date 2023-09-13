```
apiVersion: dp.wso2.com/v1alpha1
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