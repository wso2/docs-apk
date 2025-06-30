
#### Create Kubernetes Namespace

``` 
kubectl create ns apk
```

#### Configure the Hosts File

Add a hostname mapping to the ```/etc/hosts``` file as follows.

| IP        | Domain name         |
| --------- | ------------------- |
| 127.0.0.1 | api.am.wso2.com     |
| 127.0.0.1 | am.wso2.com         |
| 127.0.0.1 | idp.am.wso2.com     |
| 127.0.0.1 | default.gw.wso2.com |

#### Set Up WSO2 API Manager Control Plane 4.5.0

Set up WSO2 API Manager 4.5.0 in a Kubernetes cluster using Helm Charts.

1. Create a new Helm repository with the latest APIM release using the following command. Let’s consider `<repository-name>` as `wso2apim`.

    ```console
    helm repo add wso2apim https://github.com/wso2/helm-apim/releases/download/acp-4.5.0
    ```

2. Execute the following command to update the Helm repositories.

    ```console
    helm repo update
    ```

3. Consider `apim` as the `<chart-name>` for this guide. For the `--version` of this command, use the version of the release you used in Step 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apim wso2apim/wso2am-acp --version 4.5.0-1 -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apim/cp/apk-cp/4.5.0-values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/wso2am-acp --version <version-of-APIM> -f <path-to-values.yaml-file>
        ```

4. Install NGINX Ingress Controller. Please refer to the <a href="https://kubernetes.github.io/ingress-nginx/deploy/#local-development-clusters" target="_blank">NGINX Ingress Controller</a> documentation for more information.

!!! Note
    Please refer to the <a href="../../control-plane/apim-deploy/" target="_blank">Advanced Configuration for APIM</a> for more information.

#### Set Up WSO2 Kubernetes Gateway 1.3.0

1. Create a new Helm repository with the latest Kubernetes Gateway release using the following command. Let’s consider `<repository-name>` as `wso2apk`.

    ```console
    helm repo add wso2apk https://github.com/wso2/apk/releases/download/1.3.0
    ```

2. Execute the following command to update the Helm repositories.

    ```console
    helm repo update
    ```

3. Install the Kubernetes Gateway components and start the WSO2 API Platform For Kubernetes. Consider `apk` as the `<chart-name>` for this guide. For the `--version` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apk wso2apk/apk-helm --version 1.3.0 -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apk/1.3.0-values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apk-helm --version <version-of-APK> -f <path-to-values.yaml-file>
        ```

!!! Note
    If you wish to change the default hostname and vhost, modify the following `values.yaml` configurations. For example, if you want to deploy a production environment with the domain name `example.com`, and you want to expose your APIs through `prod.gw.example.com` and expose Kubernetes Gateway system APIs through `prod.apk.example.com`, then configure:
       
    - `wso2.apk.listener.hostname: 'prod.apk.example.com'`
    - `wso2.apk.dp.gateway.listener.hostname: 'gw.example.com'`
    - `wso2.apk.dp.configdeployer.vhosts: [{"hosts":["gw.example.com"],"name":"prod","type":"production"}]`

!!! Note
    If you wish to specify a predefined set of namespaces for monitoring, you can configure the `wso2.apk.dp.adapter.configs.apiNamespaces` variable in the `values.yaml` file. For example, if you want the data plane to monitor only the `ns-1` and `ns-2` namespaces, you can set it as follows:
    ```yaml
    Wso2:
      apk:
        dp:
          adapter:
            configs:
              apiNamespaces:
              - "ns-1"
              - "ns-2"
          commonController:
            configs:
              apiNamespaces:
              - "ns-1"
              - "ns-2"
    ```

!!! Note
    Please refer to the <a href="../../control-plane/apim-deploy/" target="_blank">Advanced Configuration for APIM</a> for more information.


#### Set Up WSO2 Kubernetes Gateway Agent 1.3.0

1. Create a new Helm repository with the latest Kubernetes Gateway Agent release using the following command. Let’s consider `<repository-name>` as `wso2apkagent` for this guide.

    ```console
    helm repo add wso2apkagent https://github.com/wso2/product-apim-tooling/releases/download/1.3.0
    ```

2. Execute the following command to update the Helm repositories.

    ```console
    helm repo update
    ```

3. Install the Kubernetes Gateway Agent components and start the WSO2 API Platform For Kubernetes. Consider `apim-apk-agent` as the `<chart-name>` for this guide. For the `--version` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apim-apk-agent wso2apkagent/apim-apk-agent --version 1.3.0 -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apim-apk-agent/cp/1.3.0-values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apim-apk-agent --version <version-of-APK-Agent> -f <path-to-values.yaml-file>
        ```

!!! Note
    Please refer to the <a href="../../control-plane/apim-apk-agent-deploy/" target="_blank">Advanced Configuration for Agent</a> for more information.

#### Verify the Deployment

Now you can verify the deployment by executing the following command. You will see the status of the pods as follows once completed:

=== "Command"