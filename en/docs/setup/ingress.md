## Configuring Ingress for WSO2 Kubernetes Gateway

There may be scenarios in which you wish to expose WSO2 Kubernetes Gateway endpoints via an Ingress resource. You can achieve this with the following steps.

1. (Optional) If you wish to make the gateway service a ClusterIP type service, update the following configuration in the values.yaml file.
```
    dp:
        .
        .
        service:
          type: "ClusterIP" 
```
2. Install an Ingress Controller like [Nginx](https://kubernetes.github.io/ingress-nginx/deploy/)

3. Obtain the name of the gateway service that was created when you installed WSO2 Kubernetes Gateway. This can be done using the `kubectl get svc -n <namespace>` command. You will need to update this name in the Ingress CR created in step 4.

4. Obtain the hostnames exposed during the  WSO2 Kubernetes Gateway installation. You can view this information using the `kubectl get gateway -n <namespace>` command.

5. Create the relevant Ingress CR **in the namespace that the WSO2 Kubernetes Gateway was installed in**. The following is a sample Ingress CR for the Nginx Controller.

- Ensure that you update the **hosts list**, the **name of the gateway service** and the **proxy-ssl-secret** annotation in the Ingress CR below.
- The root-ca-secret-name can be configured in the following section in the certManager section values.yaml file. The default value is `apk-root-certificate`.

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: wso2-k8sgateway-nginx-ingress
  annotations:
    nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"
    nginx.ingress.kubernetes.io/proxy-ssl-name: "$host"
    nginx.ingress.kubernetes.io/proxy-ssl-server-name: "on"
    nginx.ingress.kubernetes.io/proxy-ssl-secret: "<namespace>/<root-ca-secret-name>"
spec:
  ingressClassName: "nginx"
  tls:
    - hosts:
        - "api.am.example.com"
        - "gw.example.com"
        - "idp.am.example.com"
  rules:
    - host: api.am.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: wso2-gateway-service
                port:
                  number: 9095
    - host: gw.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: wso2-gateway-service
                port:
                  number: 9095
    - host: idp.am.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: wso2-gateway-service
                port:
                  number: 9095
```
6. Create the Ingress CR using `kubectl apply -f ingress.yaml -n <namespace>`