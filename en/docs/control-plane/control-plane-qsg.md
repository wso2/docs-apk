# Quick Start Guide
This section is a step-by-step guide to creating, deploying, and invoking an API using the WSO2 APK with APIM Control Plane.

## Step 1 - Setup APIM Control Plane with APK

There are 3 components which you need to setup to get the APK working with APIM. They are,

### Setup WSO2 API Manager Control Plane 4.3.0

Setup WSO2 API Manager 4.3.0 in K8s cluster using Helm Charts.

1. Create a new helm repository with the latest apim release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apim```.

    ```console
    helm repo add wso2apim https://github.com/wso2/helm-apim/releases/download/cp-4.3.0-rc
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Consider ```apim``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

    === "Mac Command"
        ```
        helm install apim wso2apim/wso2am-cp --version 4.3.0-rc -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apim/cp/arm-values.yaml -n apk
        ```
    === "AMD Command"
        ```
        helm install apim wso2apim/wso2am-cp --version 4.3.0-rc -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apim/cp/amd-values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/wso2am-cp --version <verison-of-APIM> -f <path-to-values.yaml-file>
        ```

4. Install NGINX Ingress Controller using the following command. Please refer to the [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/) for more information.

    ```console
    helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
    helm install nginx-ingress ingress-nginx/ingress-nginx
    ```

!!! Note
    Please refer to the [Advance Configuration for APIM](../control-plane/apim-deploy.md) for more information.

### Setup WSO2 APK Dataplane 1.1.0

1. Create a new helm repository with the latest apk release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apk```.

    ```console
    helm repo add wso2apk https://github.com/wso2/apk/releases/download/1.1.0-rc
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```
   
3. Install the APK components and start WSO2 API Platform For Kubernetes. Consider ```apk``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apk wso2apk/apk-helm --version 1.1.0-rc -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apk/cp-enabled-values.yaml -n apk
        ``` 
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apk-helm --version <verison-of-APK> -f <path-to-values.yaml-file>
        ```

!!! Note
    Please refer to the [Advance Configuration for APK](../control-plane/apk-deploy.md) for more information.


### Setup WSO2 APIM-APK Agent 1.1.0

1. Create a new helm repository with the latest apim apk agent release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apkagent``` for this guide.

    ```console
    helm repo add wso2apkagent https://github.com/wso2/product-apim-tooling/releases/download/1.1.0-rc
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Install the APIM APK Agent components and start WSO2 API Platform For Kubernetes. Consider ```apk``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apim-apk-agent wso2apkagent/apim-apk-agent --version 1.1.0-rc -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apim-apk-agent/values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apim-apk-agent --version <verison-of-APK-Agent> -f <path-to-values.yaml-file>
        ```

!!! Note
    Please refer to the [Advance Configuration for agent](../control-plane/apim-apk-agent-deploy.md) for more information.

### Verify the deployment

Now you can verify the deployment by executing the following command. You will see the status of the pods as follows once completed.

=== "Command"
    ```
    kubectl get pods
    ```

## Step 2 - Create and Deploy the API

### Create Deploy and Publish the API

{!control-plane/api-management/control-plane-create-and-deploy-rest-apis.md!}

### Create Application and Subscribe to the API

{!control-plane/api-management/control-plane-create-application-and-subscription.md!}


## Step 3 - Invoke the API

Use the following command to invoke the API using the access token generated in the previous step.

```bash
    curl -X GET "https://default.gw.wso2.com:9095/petstore/1.0.0/pet/findByStatus?status=available" -H "Authorization: Bearer <access-token>"
```