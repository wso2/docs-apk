# Production Deployment Guidelines

This document provide the steps for APK production deployment.

WSO2 APK can be configured through `values.yaml` file.  Please refer to [Customize Configurations](../setup/Customize-Configurations.md) for information on how to use a customized values file for APK deployment. When deploying WSO2 APK in a production environment, we strongly recommend following these guidelines. 

## Choose the correct deployment pattern

Please refer this [document](deployment/deployment-patterns-overview.md) on how to choose the correct pattern for you

## Change the hostnames and vhosts

By default, APK uses wso2.com for its hostnames and vhosts for the gateway. You need to change these values to your own domain, which you plan to use for production. The following values.yaml values should be modified:

| Configuration                           | Description                                                                                                                                                                                                 |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wso2.apk.listener.hostname`            | This configuration is used to specify the hostname for listening to API requests related to the APK system. It should be set to your desired domain for production.                                         |
| `wso2.apk.dp.gateway.listener.hostname` | This configuration is used to specify the hostname for listening to API requests made by users deploying their APIs. It should be set to your desired domain for production.                                |
| `wso2.apk.dp.configdeployer.vhosts`     | This configuration is utilized by the Config Deployer Service to create API Custom Resources (CRs) in response to user API creation requests. It should be set to the appropriate value for production use. |

By modifying these configurations, you can ensure that APK operates with the correct hostnames and vhosts for your production environment.

For example if you want to deploy a production environment and you have a domain name example.com and you want to expose your API's through prod.gw.example.com and expose APK system APIs through prod.apk.example.com then

- wso2.apk.listener.hostname: 'prod.apk.example.com'
- wso2.apk.dp.gateway.listener.hostname: 'gw.example.com'
- wso2.apk.dp.configdeployer.vhosts: [{"hosts":["gw.example.com"],"name":"prod","type":"production"}]

For further clarification on the keys, please refer to the description and default values [here](https://github.com/wso2/apk/blob/main/helm-charts/README.md)

## Change certificates

The default APK deployment uses a self-signed certificate for APK components. Default APK configuration installs [cert-manager](https://cert-manager.io/) in the cluster. 

For a production environment, it is recommended to use CA-validated public certificates for internet-facing services. In APK, certificates are used for servers and listeners. Listeners are responsible for exposing services to the internet, while servers are not directly accessible from the internet. In a production environment, it's crucial to configure CA-validated `public` certificates for listeners. Non-public or self-signed certificates can be used for servers, as these server names are internal. Let's explore how to configure these certificates.

| Listeners               | Description and hostnames                                                                                                                                                                                   |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gateway listener        | Listens for for API invocation requests. Hostname can be configures through values.yaml's `wso2.apk.dp.gateway.listener.dns`. Default value is ["*.gw.wso2.com","*.sandbox.gw.wso2.com","prod.gw.wso2.com"] |
| APK system api listener | Listens for for APK system related requests(Ex: API creation rest request). Hostname can be configures through values.yaml's `wso2.apk.listener.hostname`. Default value is "api.am.wso2.com"               |

| Servers                  | Hostnames                                                                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Adapter server           | `<helm-installation-name>-adapter-service.<namespace-name>.svc`, `<helm-installation-name>-adapter-service.<namespace-name>.svc.cluster.local`                     |
| Common controller server | `<helm-installation-name>-common-controller-service.<namespace-name>.svc`, `<helm-installation-name>-common-controller-service.<namespace-name>.svc.cluster.local` |
| Config deployer server   | `<helm-installation-name>-config-ds-service.<namespace-name>.svc`, `<helm-installation-name>-config-ds-service.<namespace-name>.svc.cluster.local`                 |
| Enforcer server          | `<helm-installation-name>-enforcer-service.<namespace-name>.svc`, `<helm-installation-name>-enforcer-service.<namespace-name>.svc.cluster.local`                   |
| Gateway server           | `<helm-installation-name>-gateway-service.<namespace-name>.svc`, `<helm-installation-name>-gateway-service.<namespace-name>.svc.cluster.local`                     |
| Ratelimitter server      | `<helm-installation-name>-ratelimiter-service.<namespace-name>.svc`, `<helm-installation-name>-ratelimiter-service.<namespace-name>.svc.cluster.local`             |

### 1. Use cert manager

By default, APK installs cert manager in your cluster and employs a SelfSigned issuer for certificate validations. To utilize cert manager for handling the certificates, you will need to create [Issuers](https://cert-manager.io/docs/configuration/). Choose the type of Issuer you are going to use for listeners and servers, and create the Issuers in accordance with the [cert-manager documentation](https://cert-manager.io/docs/configuration/) document. You will need to create two issuers: one for listeners and one for servers. 

Once created, update the values.yaml configuration as follows. This configuration is to be placed at the same indentation level as the `wso2` configuration in the values.yaml file.

```yaml
wso2:
  ...
certmanager:
  listeners:
    issuerName: "<issuer-name-created-for-listeners>"
    issuerKind: "ClusterIssuer" # or "Issuer" Refer to cert-manager's issuer doc
  servers: 
    issuerName: "<issuer-name-created-for-servers>"
    issuerKind: "ClusterIssuer" # or "Issuer" Refer to cert-manager's issuer doc
```

### 2. Use the certificate files

<b>Prerequisites</b>

For all the components(Listeners and servers) prepare the following required files.

1. TLS certificate verified by a Ceriticate Authority (tls.crt)
2. Private key associated with the TLS certificate(tls.key)
3. Certificate Authority's (CA) root certificate(ca.crt)

For each component create a secret in the same namespace as APK is deployed with the following key-value pairs:

- tls.crt - Base64 encoded value of tls.crt file
- tls.key - Base64 encoded value of tls.key file
- ca.crt - Base64 encoded value of ca.crt file

You can use the following command to create the secret from the files

```
kubectl create secret generic <SECRET_NAME> --from-file=tls.crt=path/to/tls.crt --from-file=tls.key=path/to/tls.key --from-file=ca.crt=path/to/ca.crt -n <NAMESPACE>
```

- To update the gateway listener certificates, update the following values.yaml config

```yaml
wso2:
  ...
  apk:
    ...
    dp:
      ...
      gateway:
        ... 
        listener:
          secretName: <created-secret-name-for-gateway-listener>
```

- To update the APK system listener certificates, update the following values.yaml configuration.

```yaml
wso2:
  ...
  apk:
    ...
    listener:
      secretName: <created-secret-name-for-apk-system-listener>
```

- To update the APK system servers certificates, update the following values.yaml config. The relevant location for each of these configs have been provided in the table below.

```yaml
configs:
  tls:
    secretName: "<Name of the created secret>"
    certKeyFilename: "tls.key"
    certFilename: "tls.crt"
    certCAFilename: "ca.crt"
```

Servers and their `configs` location in the value.yaml are listed below.

| Servers                  | Config location                                            |
| ------------------------ | ---------------------------------------------------------- |
| Adapter server           | wso2.apk.dp.adapter.configs.tls                            |
| Common controller server | wso2.apk.dp.configdeployer.deployment.configs.tls          |
| Config deployer server   | wso2.apk.dp.configdeployer.deployment.configs.tls          |
| Enforcer server          | wso2.apk.dp.gatewayRuntime.deployment.enforcer.configs.tls |
| Gateway server           | wso2.apk.dp.gatewayRuntime.deployment.router.configs.tls   |
| Ratelimitter server      | wso2.apk.dp.ratelimiter.deployment.configs.tls             |

## Remove default IdP

APK comes with a default IdP which is not production-ready and is only to be used for testing purposes. Disable the default IDP and use a production-ready IDP solution. Please follow these guidelines to  [setup the production ready IDP](https://apk.docs.wso2.com/en/latest/setup/identity-platform/idp/idp-overview/)

Disable the default IdP by changing the enabled value or idp to `false` in values.yaml.

```yaml
wso2:
  ...
  apk:
    ...
    idp:
      enabled: false
```

## Use a production grade Redis

APK uses a built-in standalone Redis service which is not suitable for production usage. Please use a production grade Redis. You can update the following values to configure the Redis configuration in APK:

```yaml
  redis:
    enabled:
    type:
    url:
    tls:
    auth:
      certificatesSecret:
      secretKey:
    poolSize:
```

Open the `values.yaml` file, and add the above configuration to the `redis` section under `dp`. Your values.yaml file should have a structure as follows.

```yaml
wso2:
  ...
  apk:
    ...
    dp:
      ...
      redis:
        enabled:
        type:
        url:
        tls:
        auth:
          certificatesSecret:
          secretKey:
        poolSize:
```
Then redeploy the helm chart with the changes in `values.yaml`.

## Configure Horizontal Pod Autoscaling (HPA)

When the traffic to your pods increase, the deployment may need to scale horizontally. Kubernetes allows you to define the resource limits and policy in a way that the deployment can auto scale based on resource usage. You can check the [Kubernetes documentation](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) for more information on HPA.

To configure HPA for gateway, follow this [document.](./configure-hpa.md)



In conclusion, following these guidelines is essential for a smooth and secure production deployment of WSO2 APK. By carefully selecting the deployment pattern, customizing hostnames and vhosts, configuring CA-validated public certificates, using a production-grade Redis and autoscaling your deployment to suit your needs, you can ensure a robust environment for your APIs. Additionally, disabling the default IDP and opting for a production-ready solution adds an extra layer of security. By adhering to these best practices, you'll be well-prepared to handle the demands of a production environment. If you have any further questions or need additional assistance, please don't hesitate to reach out to our support team. Happy deploying!