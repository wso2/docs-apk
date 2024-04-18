# Uninstall APK

To completely remove APK from your Kubernetes cluster, follow the steps given below.

1. Apply the following command.

=== "Command"
     ```
     helm uninstall apk -n apk
     ```
=== "Format"
     ```
     helm uninstall <chart-name> -n <namespace>
     ```

2. You will have the APK related CRDs remaining in the cluster. You can pipe them to a yaml file using the command given below.

=== "Command"
     ```
     helm show crds wso2apk/apk-helm --version 1.1.0 > crds.yaml
     ```
=== "Format"
     ```
     helm show crds <chart-name> <repository-name>/apk-helm --version <version> > crds.yaml
     ```

3. Then delete the CRDs using the following command.

    ```
    kubectl delete -f crds.yaml
    ```

4. You will then have to delete the validating and mutating webhook configurations using the following command.

```
kubectl delete mutatingwebhookconfigurations.admissionregistration.k8s.io -n apk --all
kubectl delete validatingwebhookconfigurations.admissionregistration.k8s.io -n apk --all
```

This will clear the APK installation from your Kubernetes cluster.