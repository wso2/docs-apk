
Follow the instructions below to deploy APK Data Service (DS) servers and the Cloud Native Postgres(CloudNativePG) in the Kubernetes cluster.

1.  Create WSO2 APK image pull secrets with your WSO2 credentials as shown below and apply
this in K8s.

    ```console
    kubectl create secret docker-registry apk-registry-secret --docker-server=docker.wso2.com --docker-username=<username> --docker-password=<password> --docker-email=<email>
    ```

    !!!Note
        If you don't have a WSO2 user account, we've created one and sent you the details. If you already have an account, just use your existing credentials.

2. Add the WSO2 APK Helm repository.

    ```console
    helm repo add wso2 https://helm.wso2.com
    ```
	
3. Execute the following command to update the helm repositories.

      ```console
      helm repo update
      ```

3. Install the APK components and start WSO2 API Platform For Kubernetes. Consider ```apk``` as the ```<chart-name>``` for this guide. As the ```--version``` of this command, use the version of the release you used in point 1 above. It will take a few minutes for the deployment to complete.

    ### Helm install for Linux(amd64)

    === "Command"
        ```
        helm install apk wso2/apk-helm --version 1.0.0 --set wso2.subscription.imagePullSecrets="apk-registry-secret"
        ```

    === "Format"
        ```
        helm install <chart-name> <repository-name>/apk-helm --version <version-of-APK> --set wso2.subscription.imagePullSecrets=<secret-name>
        ```
	
    ### Helm install for Mac(arm64)

    === "Command"
        ```
        helm install apk wso2/apk-helm --version 1.0.0 --set wso2.subscription.imagePullSecrets="apk-registry-secret" -f https://raw.githubusercontent.com/wso2/apk/main/helm-charts/sample/arm64.yaml
        ```

    === "Format"
        ```
        helm install <chart-name> <repository-name>/apk-helm --version <verison-of-APK> -f <path-to-arm64.yaml-file>
        ```

    !!!Optional
    
        To commence the installation while making use of the customization       capabilities inherent in the `values.yaml` file, follow the subsequent command format. Instructions in [Customize Configurations](../setup/Customize-Configurations.md) will guide you through the process of acquiring the `values.yaml` file.
        === "Command"
            ```
            helm install apk wso2apk/apk-helm --version 1.0.0 -set wso2.subscription.imagePullSecrets="apk-registry-secret" -f values.yaml
            ```

        === "Format"
            ```
            helm install <chart-name> <repository-name>/apk-helm --version <version-of-APK> --set wso2.subscription.imagePullSecrets=<secret-name> -f <path-to-values.yaml-file> 
            ```

4. Now you can verify the deployment by executing the following command. You will see the status of the pods as follows once completed.

    === "Command"
        ```
        kubectl get pods
        ```

    [![Pod Status](../assets/img/get-started/pod-status.png)](../assets/img/get-started/podstatus.png)

    !!! Important
        If pods are not transitioning to running state, please follow the steps in the [FAQs](../../about-apk/FAQs/#q3-why-are-pods-not-transitioning-to-the-running-state-for-a-long-time) to troubleshoot the problem.


