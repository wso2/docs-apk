## Authentication Sample

The following is a sample CR for adding authentication to an API.
```
apiVersion: "dp.wso2.com/v1alpha2"
kind: "Authentication"
metadata:
  name: http-bin-authentication
spec:
  default:
    authTypes:
      oauth2:
        header: "Authorization"
        sendTokenToUpstream: true
        disabled: false
      mtls:
        required: optional
        configMapRefs:
          - name: mtls-test-configmap
            key: tls.crt
    disabled: false
  targetRef:
    group: "gateway.networking.k8s.io"
    kind: "API"
    name: default
```