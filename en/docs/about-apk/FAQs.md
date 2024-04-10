# Frequently Asked Questions (FAQs)

## Installation Related FAQs

### Q1: Why is my installation failing with an "ensure CRDs are installed first" error?

**A:** If you are seeing errors similar to the ones below:

```plaintext
ensure CRDs are installed first, resource mapping not found for name: "apk-wso2-apk-dcr-api" namespace: "default" from "": no matches for kind "API" in version "dp.wso2.com/v1alpha1"
```

It is likely due to a limitation in Helm when installing the Custom Resource Definitions (CRDs). To resolve this, follow the steps below.

Step 1: Obtain the CRDs from the chart

First, obtain the Custom Resource Definitions (CRDs) for the specific version of APK you want to install. Replace `<version>` with the actual version number of the APK you are installing.

```bash
helm show crds wso2apk/apk-helm --version 1.0.0 > apk-crds.yaml
```

Step 2: Apply the CRDs manually

Next, apply the CRDs using the following command.

```bash
kubectl apply -f apk-crds.yaml
```

Step 3: Reinstall APK

Finally, reinstall APK using the Helm installation command as provided in the relevant quick start guide.

```bash
helm install apk wso2apk/apk-helm --version 1.0.0
```

### Q2: Why is my installation failing with an "ensure CRDs are installed first" error?

**A:** If you are seeing errors similar to the ones below:

```plaintext
ensure CRDs are installed first, resource mapping not found for name: "apk-wso2-apk-dcr-api" namespace: "default" from "": no matches for kind "API" in version "dp.wso2.com/v1alpha1"
```

It is likely due to a limitation in Helm when installing the Custom Resource Definitions (CRDs). To resolve this, follow the steps below.

Step 1: Obtain the CRDs from the chart

First, obtain the Custom Resource Definitions (CRDs) for the specific version of APK you want to install. Replace `<version>` with the actual version number of the APK you are installing.

```bash
helm show crds wso2apk/apk-helm --version <version> > apk-crds.yaml
```

Step 2: Apply the CRDs manually

Next, apply the CRDs using the following command.

```bash
kubectl apply -f apk-crds.yaml
```

Step 3: Reinstall APK

Finally, reinstall APK using the Helm installation command as provided in the relevant quick start guide.

```bash
helm install apk wso2apk/apk-helm --version <version>
```

## Troubleshooting

### Q1: Why am I encountering 'Unknown field' errors during the installation process?

**A:** If you are seeing errors similar to the ones below:

```plaintext
W0907 12:33:54.079420 1181879 warnings.go:70] unknown field "spec.someName"
...
Error: INSTALLATION FAILED: 7 errors occurred:
   * API.dp.wso2.com "apk-wso2-apk-oauth-api" is invalid: [spec.apiDisplayName: Required value, spec.context: Required value]
   ...
```

It is likely due to a limitation in Helm when updating Custom Resource Definitions (CRDs). Helm does not automatically redeploy existing CRDs, which can lead to conflicts. Downloading the chart and applying the CRDs manually will resolve the issue. Here are the steps to follow

1.  Download chart to local

    === "Command"

        ```
        curl -L -o apk.tar.gz "https://github.com/wso2/apk/archive/refs/tags/1.0.0.tar.gz" && tar -zxvf apk.tar.gz
        ```

2.  Go to the apk-1.0.0/helm-charts/crds folder and apply the CRDs manually

    === "Command"

        ```
        cd apk-1.0.0/helm-charts/crds
        kubectl apply -f .
        ```

3. Now uninstall the previous faulty deployment and reinstall the APK using helm.


### Q2: How to uninstall APK from my cluster?

1.  List down the helm installation in your cluster using the following command, and copy the APK release name and the namespace
    ``` 
    helm list -A
    ```

2.  Uninstall the APK 

    === "Sample command"

        ```
        helm uninstall apk
        ```

    === "Command template"

        ```
        helm uninstall <apk-name> -n <namespace>
        ```

3.  Cleanup CRs created for APK. You can use the below commands to delete all the CRs created for APK

    ```
    kubectl delete apipolicies.dp.wso2.com --all --all-namespaces
    kubectl delete apis.dp.wso2.com --all --all-namespaces
    kubectl delete authentications.dp.wso2.com --all --all-namespaces
    kubectl delete backendjwts.dp.wso2.com --all --all-namespaces
    kubectl delete backends.dp.wso2.com --all --all-namespaces
    kubectl delete certificaterequests.cert-manager.io --all --all-namespaces
    kubectl delete certificates.cert-manager.io --all --all-namespaces
    kubectl delete challenges.acme.cert-manager.io --all --all-namespaces
    kubectl delete clusterissuers.cert-manager.io --all --all-namespaces
    kubectl delete gatewayclasses.gateway.networking.k8s.io --all --all-namespaces
    kubectl delete gateways.gateway.networking.k8s.io --all --all-namespaces
    kubectl delete grpcroutes.gateway.networking.k8s.io --all --all-namespaces
    kubectl delete httproutes.gateway.networking.k8s.io --all --all-namespaces
    kubectl delete interceptorservices.dp.wso2.com --all --all-namespaces
    kubectl delete issuers.cert-manager.io --all --all-namespaces
    kubectl delete orders.acme.cert-manager.io --all --all-namespaces
    kubectl delete ratelimitpolicies.dp.wso2.com --all --all-namespaces
    kubectl delete referencegrants.gateway.networking.k8s.io --all --all-namespaces
    kubectl delete scopes.dp.wso2.com --all --all-namespaces
    kubectl delete tcproutes.gateway.networking.k8s.io --all --all-namespaces
    kubectl delete tlsroutes.gateway.networking.k8s.io --all --all-namespaces
    kubectl delete tokenissuers.dp.wso2.com --all --all-namespaces
    kubectl delete udproutes.gateway.networking.k8s.io --all --all-namespaces
    ```

4. Delete all the APK related CRDs
   ```
   curl -L -o apk.tar.gz "https://github.com/wso2/apk/archive/refs/tags/1.0.0.tar.gz" && tar -zxvf apk.tar.gz
   cd apk-1.0.0/helm-charts/crds
   kubectl delete -f .
   ```

5. Verify you do not have any CRs in the cluster using this command
   ```
    kubectl get apipolicies.dp.wso2.com -A
    kubectl get apis.dp.wso2.com -A
    kubectl get authentications.dp.wso2.com -A
    kubectl get backendjwts.dp.wso2.com -A
    kubectl get backends.dp.wso2.com -A
    kubectl get certificaterequests.cert-manager.io -A
    kubectl get certificates.cert-manager.io -A
    kubectl get challenges.acme.cert-manager.io -A
    kubectl get clusterissuers.cert-manager.io -A
    kubectl get gatewayclasses.gateway.networking.k8s.io -A
    kubectl get gateways.gateway.networking.k8s.io -A
    kubectl get grpcroutes.gateway.networking.k8s.io -A
    kubectl get httproutes.gateway.networking.k8s.io -A
    kubectl get interceptorservices.dp.wso2.com -A
    kubectl get issuers.cert-manager.io -A
    kubectl get orders.acme.cert-manager.io -A
    kubectl get ratelimitpolicies.dp.wso2.com -A
    kubectl get referencegrants.gateway.networking.k8s.io -A
    kubectl get scopes.dp.wso2.com -A
    kubectl get tcproutes.gateway.networking.k8s.io -A
    kubectl get tlsroutes.gateway.networking.k8s.io -A
    kubectl get tokenissuers.dp.wso2.com -A
    kubectl get udproutes.gateway.networking.k8s.io -A
   ```

    You should not see any resources. If seen use this command to delete them

    ```
    kubectl delete <kind> <name> -n <namespace>
    ```

### Q3: Why are pods not transitioning to the running state for a long time?

If pods are taking an extended amount of time to transition to the running state, it is likely due to slow image pulling. This can occur when there are network connectivity issues, or if the image repository is experiencing high load.

You can troubleshoot the problem by running the following command
```
kubectl describe pods <pod-name>
```

If you see `ImagePullBackOff` error or the image is still in the pulling stage it most likely due to a network problem. 

---

These FAQs should guide you through resolving the installation errors. If you still encounter difficulties, please feel free to contact our support team for further assistance.