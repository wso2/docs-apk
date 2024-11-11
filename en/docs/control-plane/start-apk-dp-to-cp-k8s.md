
#### Create Kubernetes namespace

``` 
kubectl create ns apk
```

#### Configure the hosts file

Add a hostname mapping to the ```/etc/hosts``` file as follows.

| IP        | Domain name         |
| --------- | ------------------- |
| 127.0.0.1 | api.am.wso2.com     |
| 127.0.0.1 | am.wso2.com         |
| 127.0.0.1 | idp.am.wso2.com     |
| 127.0.0.1 | default.gw.wso2.com |

#### Setup WSO2 API Manager Control Plane 4.3.0

Setup WSO2 API Manager 4.3.0 in K8s cluster using Helm Charts.

1. Create a new helm repository with the latest apim release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apim```.

    ```console
    helm repo add wso2apim https://github.com/wso2/helm-apim/releases/download/cp-4.3.0
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Consider ```apim``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apim wso2apim/wso2am-cp --version 4.3.0 -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apim/cp/apk-cp/values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/wso2am-cp --version <version-of-APIM> -f <path-to-values.yaml-file>
        ```

4. Install NGINX Ingress Controller. Please refer to the <a href="https://kubernetes.github.io/ingress-nginx/deploy/#local-development-clusters" target="_blank">NGINX Ingress Controller</a> documentation for more information.

!!! Note
    Please refer to the <a href="../../control-plane/apim-deploy/" target="_blank">Advanced Configuration for APIM</a> for more information.

#### Setup WSO2 APK Dataplane 1.1.0

1. Create a new helm repository with the latest apk release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apk```.

    ```console
    helm repo add wso2apk https://github.com/wso2/apk/releases/download/1.1.0
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Install the APK components and start WSO2 API Platform For Kubernetes. Consider ```apk``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apk wso2apk/apk-helm --version 1.1.0 -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apk/values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apk-helm --version <version-of-APK> -f <path-to-values.yaml-file>
        ```

!!! Note
    If you wish to change the default hostname and vhost change the following values.yaml configurations. Lets say you want to deploy a production environment and you have a domain name example.com and you want to expose your API's through prod.gw.example.com and expose APK system APIs through prod.apk.example.com then
       
    - wso2.apk.listener.hostname: 'prod.apk.example.com'
    - wso2.apk.dp.gateway.listener.hostname: 'gw.example.com'
    - wso2.apk.dp.configdeployer.vhosts: [{"hosts":["gw.example.com"],"name":"prod","type":"production"}]

!!! Note
    If you wish to specify a predefined set of namespaces for monitoring, you can configure the `wso2.apk.dp.adapter.configs.apiNamespaces` variable in the `values.yaml` file. For example, if you want the dataplane to monitor only the `ns-1` and `ns-2` namespaces, you can set it as follows:
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
    Please refer to the <a href="../../control-plane/apk-deploy/" target="_blank">Advanced Configuration for APK</a> for more information.


#### Setup WSO2 APIM-APK Agent 1.1.0

1. Create a new helm repository with the latest apim apk agent release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apkagent``` for this guide.

    ```console
    helm repo add wso2apkagent https://github.com/wso2/product-apim-tooling/releases/download/1.1.0
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Install the APIM APK Agent components and start WSO2 API Platform For Kubernetes. Consider ```apk``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apim-apk-agent wso2apkagent/apim-apk-agent --version 1.1.0 -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apim-apk-agent/cp/values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apim-apk-agent --version <version-of-APK-Agent> -f <path-to-values.yaml-file>
        ```

!!! Note
    Please refer to the <a href="../../control-plane/apim-apk-agent-deploy/" target="_blank">Advanced Configuration for Agent</a> for more information.

#### Verify the deployment

Now you can verify the deployment by executing the following command. You will see the status of the pods as follows once completed.

=== "Command"
```
kubectl get pods -n apk
```
