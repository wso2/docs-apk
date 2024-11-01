# Uninstall APK Components

**NOTE**: Uninstalling APK and any other components from the cluster involves deleting APK related data, configurations and CRDs from the cluster. Ensure that you back up any important data or configurations before proceeding with the rest of this guide.

## Uninstall APK

### Check Status of Current Installation

To view details about your existing APK installation, use the following command.

```
helm list -A
```

This will give you an output similar to the following.
[![Helm List Output](../assets/img/setup/apk-helm-list-output.png)](../assets/img/setup/apk-helm-list-output.png)

This will give you information regarding your existing APK helm installation. 
For this guide, `chart-name` is the `NAME` of the installation, and the `namespace` is the `NAMESPACE` of the installation.
The version of your installation is the 3 digit suffix in the `CHART` field.

For example, in the above image, the values are as follows.

- chart-name: apk
- namespace: apk
- version: 1.1.0

### Instructions for Uninstalling APK

To completely remove APK from your Kubernetes cluster, follow the steps given below.

1. Uninstall the APK Helm chart:

   ```
   helm uninstall <chart-name> -n <namespace>
   ```

   For example:
   ```
   helm uninstall apk -n apk
   ```

2. Delete the APK-specific CRDs:

   ```
   kubectl delete crd apis.dp.wso2.com
   kubectl delete crd applications.dp.wso2.com
   kubectl delete crd authentications.dp.wso2.com
   kubectl delete crd backends.dp.wso2.com
   kubectl delete crd gatewayclasses.gateway.networking.k8s.io
   kubectl delete crd gateways.gateway.networking.k8s.io
   kubectl delete crd httproutes.gateway.networking.k8s.io
   kubectl delete crd interceptorservices.dp.wso2.com
   kubectl delete crd ratelimitpolicies.dp.wso2.com
   kubectl delete crd scopes.dp.wso2.com
   kubectl delete crd subscriptions.dp.wso2.com
   kubectl delete crd tokenissuers.dp.wso2.com
   ```

3. Delete the validating and mutating webhook configurations:

   ```
   kubectl delete mutatingwebhookconfigurations.admissionregistration.k8s.io -n apk --all
   kubectl delete validatingwebhookconfigurations.admissionregistration.k8s.io -n apk --all
   ```

This will clear the APK installation from your Kubernetes cluster.

## Uninstall APIM APK Agent

### Check Status of Current Installation

To view details about your APIM APK Agent installation, use the following command.

```
helm list -A
```

This will give you an output similar to the following.
[![Helm List Output](../assets/img/setup/apim-apk-agent-helm-list-output.png)](../assets/img/setup/apim-apk-agent-helm-list-output.png)

This will give you information regarding your Agent helm installation. 
For this guide, `chart-name` is the `NAME` of the installation, and the `namespace` is the `NAMESPACE` of the installation.
The version of your installation is the 3 digit suffix in the `CHART` field.

For example, in the above image, the values are as follows.

- chart-name: apim-apk-agent
- namespace: apk
- version: 1.1.0

### Instructions for Uninstalling APIM APK Agent

To remove the APIM APK Agent from your Kubernetes cluster, apply the following command.

```
helm uninstall <chart-name> -n <namespace>
```

For example:
```
helm uninstall apim-apk-agent -n apk
```
