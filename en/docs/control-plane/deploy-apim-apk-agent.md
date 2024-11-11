# Deploy APIM APK Agent

Follow the instructions below to deploy the APIM APK Agent.

## Prerequisites
 
### Resources Requirements

- RAM: 0.5 GB
- CPU: 1 Cores
- Storage: 5GB

## Deploy APIM APK Agent


1. Create a new helm repository with the latest apim apk agent release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apk``` for this guide.

    ```console
    helm repo add wso2apkagent https://github.com/wso2/product-apim-tooling/releases/download/1.2.0
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```

3. Install the APK components and start WSO2 API Platform For Kubernetes. Consider ```apk``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

=== "Command"
    ```
    helm install apim-apk-agent wso2apkagent/apk-agent-helm --version 1.2.0
    ```
=== "Format"
    ```
    helm install <chart-name> <repository-name>/apk-agent-helm --version <version-of-APK-Agent>
    ```

!!! Optional
To commence the installation while making use of the customization capabilities inherent in the `values.yaml` file, follow the subsequent command format. Instructions in [Customize Configurations](../setup/Customize-Configurations.md) will guide you through the process of acquiring the `values.yaml` file.

=== "Command"
    ```
    helm install apk wso2apkagent/apk-agent-helm --version 1.2.0 -f values.yaml
    ```
=== "Format"
    ```
    helm install <chart-name> <repository-name>/apk-agent-helm --version <version-of-APK-Agent> -f <path-to-values.yaml-file>
    ```
