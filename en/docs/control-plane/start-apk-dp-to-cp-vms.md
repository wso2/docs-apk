
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

#### Setup WSO2 API Manager Control Plane 4.4.0

Setup WSO2 API Manager 4.3.0 in VM.

1. Refer to the [APIM Deployment Guide](https://apim.docs.wso2.com/en/latest/install-and-setup/install/installation-options/#2-dockerdocker-compose) to deploy the APIM 4.3.0 in a VM.
2. Change the configurations in the ```deployment.toml``` file in the APIM 4.3.0 VM refer to the [Advanced Configuration for APIM](../../../control-plane/apim-deploy/) for more information.


#### Setup WSO2 APK Dataplane 1.2.0

1. Create a new helm repository with the latest apk release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apk```.

    ```console
    helm repo add wso2apk https://github.com/wso2/apk/releases/download/1.2.0
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Install the APK components and start WSO2 API Platform For Kubernetes. Consider ```apk``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apk wso2apk/apk-helm --version 1.2.0 -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apk/1.2.0-values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apk-helm --version <version-of-APK> -f <path-to-values.yaml-file>
        ```

!!! Note
    You can change the default hostname and vhost. Change the following values.yaml configurations. Lets say you want to deploy a development environment and you have a domain name example.com and you want to expose your API's through dev.gw.example.com and expose APK system APIs through dev.apk.example.com then

    - wso2.apk.listener.hostname: 'dev.apk.example.com'
    - wso2.apk.dp.gateway.listener.hostname: 'dev.gw.example.com'
    - wso2.apk.dp.configdeployer.vhosts: [{"hosts":["gw.example.com"],"name":"dev","type":"production"}]

!!! Note
    Please refer to the [Advance Configuration for APK](../../../control-plane/apk-deploy) for more information.


#### Setup WSO2 APIM-APK Agent 1.2.0

!!! Note
    Ensure that `WSO2 APK` is deployed before installing the `WSO2 APIM-APK Agent`.

1. Create a new helm repository with the latest apim apk agent release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apkagent``` for this guide.

    ```console
    helm repo add wso2apkagent https://github.com/wso2/product-apim-tooling/releases/download/1.2.0
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Change the configurations in the ```values.yaml``` file in the APIM APK Agent Helm Chart, refer to the [Advanced Configuration for agent](../../../control-plane/apim-apk-agent-deploy) for more information.

4. Install the APIM APK Agent components and start WSO2 API Platform For Kubernetes. Consider ```apk``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above and use the changed values.yaml you used in point 3 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apim-apk-agent wso2apkagent/apim-apk-agent --version 1.2.0 -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apim-apk-agent/cp/1.2.0-values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apim-apk-agent --version <version-of-APK-Agent> -f <path-to-values.yaml-file>
        ```

#### Verify the deployment

Now you can verify the deployment by executing the following command. You will see the status of the pods as follows once completed.

=== "Command"
```
kubectl get pods -n apk
```
