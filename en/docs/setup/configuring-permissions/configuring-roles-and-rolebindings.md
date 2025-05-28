# Configuring the Kubernetes Gateway per Namespace 

The Kubernetes Gateway can be configured to be deployed at the Namespace level using Roles and RoleBindings, instead of providing cluster level permissions . This is useful if you want to limit the permissions of the Kubernetes Gateway components to a specific namespace. The following settings in the `values.yaml` file enable this configuration:

```yaml
wso2:
  apk:
    auth:
      enabled: true
      enableServiceAccountCreation: true
      enableClusterRoleCreation: false
      serviceAccountName: wso2apk-platform
      roleName: wso2apk-role
      resourceLevelPermissions: 
        scope: Namespaced
        roleName: wso2apk-role
```
The `resourceLevelPermissions` section configures the scope of a Role and RoleBinding. The `scope` can be set to either `Namespaced` or `Cluster`:

- **Cluster**: Creates a `ClusterRole` and `ClusterRoleBinding`, granting permissions across all namespaces.
- **Namespaced**: Creates a `Role` and `RoleBinding`, granting permissions only within the specified namespace.

When `scope` is set to `Namespaced`, the default configuration grants Kubernetes Gateway components permissions only within the namespace where Kubernetes Gateway is installed.

This can be changed in the `values.yaml` file under the following section and more namespaces can be added as needed.

```yaml
      adapter:
        deployment:
          configs: 
            apiNamespaces:
              - "apk-v12"
```
```yaml
      commonController:
        deployment:
          configs:
            apiNamespaces:
              - "apk-v12"
```

If you wish to deploy the Kubernetes Gateway at the Namespace level using only Roles and Rolebindings, you can do so by following the steps below. 

1. Download the following Custom Resource Definitions (CRDs) and install them in your Kubernetes cluster. 
```bash
kubectl apply -f https://raw.githubusercontent.com/wso2/kubernetes-gateway/main/charts/wso2-apk/crds/wso2-apk-adapter-crd.yaml
```

2. Add the following key to the `values.yaml` file to skip the default installation of CRDs.
```yaml
skipCrds: true
```

3. Change `values.yaml` file by adding the following configurations under the `wso2.apk.auth` section.
```yaml
resourceLevelPermissions: 
        scope: Namespaced
        roleName: wso2apk-role
```

4. By default, the helm installation creates a Service Account, Role, and RoleBinding for the Kubernetes Gateway components only within the namespace in which you install it. Optionally you may add other namespaces as desired to the `apiNamespaces` in the `values.yaml` file under the `adapter` and `commonController` sections. This will allow the Kubernetes Gateway to manage APIs in those namespaces as well. However, you will need to create additional Roles and RoleBindings for those namespaces as well.
```yaml
apiNamespaces:
  - "apk-v12"
  - "testing-v2"
```

5. Disable the ClusterRole and ClusterRoleBinding that are created by default to support the Kubernetes Gateway API admission webhook server. This can be done by modifying the `values.yaml` file as follows: 
```yaml
gatewaySystem:
  enabled: false # Disables the Gateway API admission webhook server 
```
4. Install the Kubernetes Gateway with the following command using the local helm-chart and templates.
```bash
helm install apk . -f values.yaml -n apk --skip-crds
```