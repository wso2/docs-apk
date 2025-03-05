# Portal-Driven Design First API Management 

This section is a step-by-step guide to creating, deploying, and invoking an API using the WSO2 Kuberenetes Gateway with APIM Control Plane. It also covers portal-driven development, including creating an API from the UI.

!!!NOTE
    To set up the Kuberenetes Gateway as an enterprise version, please follow the steps specified in both the <a href="../../setup/enterprise-apk-install" target="_blank">Install Kuberenetes Gateway Enterprise</a> and <a href="../../setup/enterprise-apim-apk-agent-install" target="_blank">Install Kuberenetes Gateway Agent Enterprise</a>.

## Before you begin...

Install the <a href="../../setup/prerequisites" target="_blank">prerequisites</a> that are required to run the WSO2 API Platform for Kubernetes.

!!!NOTE
    If you already have an installation of the Kuberenetes Gateway in your cluster, please remove the installation by following the steps specified in the <a href="../../setup/uninstall" target="_blank">Uninstall Kuberenetes Gateway</a>  section.

### Create Kubernetes namespace

``` 
kubectl create ns apk
```

### Configure the hosts file

Add a hostname mapping to the ```/etc/hosts``` file as follows.

   | IP        | Domain name         |
   | --------- | ------------------- |
   | 127.0.0.1 | api.am.wso2.com     |
   | 127.0.0.1 | am.wso2.com         |
   | 127.0.0.1 | idp.am.wso2.com     |
   | 127.0.0.1 | default.gw.wso2.com |

## Step 1 - Setup APIM Control Plane with Kuberenetes Gateway

There are 3 components which you need to setup to get the Kuberenetes Gateway working with APIM. They are,

### Setup WSO2 API Manager Control Plane 4.5.0

Setup WSO2 API Manager 4.5.0 in K8s cluster using Helm Charts.

1. Create a new helm repository with the latest apim release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apim```.

    ```console
    helm repo add wso2apim https://github.com/wso2/helm-apim/releases/download/acp-4.5.0-rc
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Consider ```apim``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apim wso2apim/wso2am-cp --version 4.5.0-rc -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apim/cp/4.5.0-values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/wso2am-cp --version <version-of-APIM> -f <path-to-values.yaml-file>
        ```

4. Install NGINX Ingress Controller. Please refer to the <a href="https://kubernetes.github.io/ingress-nginx/deploy/#local-development-clusters" target="_blank">NGINX Ingress Controller</a> documentation for more information.

!!! Note
    Please refer to the <a href="../../control-plane/apim-deploy/" target="_blank">Advanced Configuration for APIM</a> for more information.

### Setup WSO2 Kuberenetes Gateway 1.3.0

1. Create a new helm repository with the latest kubernetes gateway release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apk```.

    ```console
    helm repo add wso2apk https://github.com/wso2/apk/releases/download/1.3.0-rc
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```
   
3. Install the Kuberenetes Gateway components and start WSO2 API Platform For Kubernetes. Consider ```apk``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

!!!NOTE
    If you already have an installation of the Kuberenetes Gateway in your cluster, please remove the installation by following the steps specified in the <a href="../../setup/uninstall" target="_blank">Uninstall Kuberenetes Gateway</a> section.


=== "Command"
     ```
     helm install apk wso2apk/apk-helm --version 1.3.0-rc -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apk/1.3.0-cp-enabled-values.yaml -n apk
     ``` 
=== "Format"
     ```
     helm install <chart-name> <repository-name>/apk-helm --version <version-of-APK> -f <path-to-values.yaml-file>
     ```

!!! Note
    Please refer to the <a href="../../control-plane/apk-deploy" target="_blank">Advanced Configuration for APK</a> for more information.


### Setup WSO2 Kuberenetes Gateway Agent 1.3.0 

1. Create a new helm repository with the latest kubernetes gateway agent release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apkagent``` for this guide.

    ```console
    helm repo add wso2apkagent https://github.com/wso2/product-apim-tooling/releases/download/1.3.0-rc
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Install the Kuberenetes Gateway Agent components and start WSO2 API Platform For Kubernetes. Consider ```apk``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

    === "Command"
        ```
        helm install apim-apk-agent wso2apkagent/apim-apk-agent --version 1.3.0-rc -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/samples/apim-apk-agent/1.3.0-values.yaml -n apk
        ```
    === "Format"
        ```
        helm install <chart-name> <repository-name>/apim-apk-agent --version <version-of-APK-Agent> -f <path-to-values.yaml-file>
        ```

!!! Note
    Please refer to the <a href="../../control-plane/apim-apk-agent-deploy" target="_blank">Advanced Configuration for Agent</a> for more information.

### Verify the deployment

Now you can verify the deployment by executing the following command. You will see the status of the pods as follows once completed.

=== "Command"
    ```
    kubectl get pods -n apk
    ```

## Step 2 - Create and Deploy the API

### Create Deploy and Publish the API

{!control-plane/apk-as-gateway-in-apim/api-management/control-plane-create-and-deploy-rest-apis.md!}

### Create Application and Subscribe to the API

{!control-plane/apk-as-gateway-in-apim/api-management/control-plane-create-application-and-subscription.md!}


## Step 3 - Invoke the API

Use the following command to invoke the API using the access token generated in the previous step.

```bash
    curl -X GET "https://default.gw.wso2.com:9095/petstore/1.0.0/pet/findByStatus?status=available" -H "Authorization: Bearer <access-token>" -k
```
