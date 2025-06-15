# Add Kubernetes Gateway Helm Repository with Commercial Docker images 


1.  Create WSO2 Kubernetes Gateway image pull secrets with your WSO2 credentials as shown below and apply
    this in K8s.

    ```console
    kubectl create secret docker-registry apk-registry-secret --docker-server=docker.wso2.com --docker-username=<username> --docker-password=<password> --docker-email=<email>
    ```

    !!! Note
        If you don't have a WSO2 user account, we've created one and sent you the details. If you already have an account, just use your existing credentials.

2. Add the WSO2 Kubernetes Gateway Helm repository.

    ```console
    helm repo add wso2 https://helm.wso2.com
    ```

3. Execute the following command to update the helm repositories.

      ```console
      helm repo update
      ```

### Commercial Docker Images

| Component                  | AMD64 Image                                            | ARM64 Image                                               |
|----------------------------|--------------------------------------------------------|-----------------------------------------------------------|
| adapter          | `docker.wso2.com/apk-adapter:1.3.0.0`                         | `docker.wso2.com/apk-adapter:1.3.0.0-arm64`                      |
| commonController  | `docker.wso2.com/apk-common-controller:1.3.0.0`                              | `docker.wso2.com/apk-common-controller:1.3.0.0-arm64`                           |
| ratelimiter                | `docker.wso2.com/apk-ratelimiter:1.3.0.0`                               | `docker.wso2.com/apk-ratelimiter:1.3.0.0-arm64`                            |
| router                 | `docker.wso2.com/apk-router:1.3.0.0`                                | `docker.wso2.com/apk-router:1.3.0.0-arm64`                             |
| enforcer                 | `docker.wso2.com/apk-enforcer:1.3.0.0-arm64`                                | `docker.wso2.com/apk-enforcer:1.3.0.0-arm64`                             |
| configdeployer                | `docker.wso2.com/apk-config-deployer-service:1.3.0.0`                                | `docker.wso2.com/apk-config-deployer-service:1.3.0.0-arm64` 
| idpds                 | `docker.wso2.com/apk-idp-domain-service:1.3.0.0`                                | `docker.wso2.com/apk-idp-domain-service:1.3.0.0-arm64`                             |
| idpui                 | `docker.wso2.com/apk-idp-ui:1.3.0.0`                                | `docker.wso2.com/apk-idp-ui:1.3.0.0-arm64`                             |                            |
| apim-apk-agent                 | `docker.wso2.com/apim-apk-agent:1.3.0.0`                                | `docker.wso2.com/apim-apk-agent:1.3.0.0-arm64`                             | 


### Pulling Commercial Docker Images

From here onward you can use <a href="../../setup/deployment/deployment-patterns-overview" target="_blank">installation patterns</a> to install Kubernetes Gateway and Kubernetes Gateway Agent.
To pull images from the WSO2 registry, add the following to your `values.yaml` before running your Helm install or upgrade.
<p>To obtail `values.yaml` file using helm you can refer to the deployment-patterns.</p>

```yaml
wso2:
  subscription:
    imagePullSecrets: "apk-registry-secret"
```

Change <b>all the images</b> according to your system Architecture. Default we support both AMD and ARM images.

Example image change.

```yaml
configdeployer::
    deployment:
        image: docker.wso2.com/apk-config-deployer-service:1.3.0.0
```

Make sure to change the Repository Name to <b>wso2</b> in helm installation comand.

Example Helm Installation Command

=== "Command"
    ```
    helm install apk wso2/apk-helm --version 1.3.0 -f values.yaml
    ```
=== "Format"
    ```
    helm install <chart-name> <repository-name>/apk-helm --version <version-of-APK> -f <path-to-values-yaml>
    ```
