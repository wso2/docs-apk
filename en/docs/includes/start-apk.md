
Follow the instructions below to deploy APK in the Kubernetes cluster.

### Install APK

1. Create a new helm repository with the latest apk release using the following command. Let’s consider the ```<repository-name>``` as ```wso2apk``` for this guide.

    ```console
    helm repo add wso2apk https://github.com/wso2/apk/releases/download/1.3.0-alpha
    ```

2. Execute the following command to update the helm repositories.

    ```console
    helm repo update
    ```
   
3. Install the APK components and start WSO2 API Platform For Kubernetes. Consider ```apk``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

=== "Command"
    ```
    helm install apk wso2apk/apk-helm --version 1.3.0-alpha
    ```

=== "Format"
    ```
    helm install <chart-name> <repository-name>/apk-helm --version <version-of-APK>
    ```

!!! Optional
    {!./includes/customize-installation.md!}


### Verify the deployment

Now you can verify the deployment by executing the following command. You will see the status of the pods as follows once completed.

=== "Command"
    ```
    kubectl get pods
    ```

    [![Pod Status](../assets/img/get-started/pod-status.png)](../assets/img/get-started/podstatus.png)

    !!! Important
        Except for the `gateway-apim-admission` and `gateway-apim-admission-patch` (which will run as soon as APK is installed and then complete), all other pods should transition to the running state. If they have not, please refer the <a href="../../about-apk/FAQs/#4-why-are-pods-not-transitioning-to-the-running-state-for-a-long-time" target="_blank">FAQs</a> to troubleshoot the problem.


