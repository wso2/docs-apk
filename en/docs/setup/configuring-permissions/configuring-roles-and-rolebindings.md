# Configuring Roles and RoleBindings

The APK can be configured to be deployed using Roles and RoleBindings, instead of providing cluster level permissions . This is useful if you want to limit the permissions of the APK components to a specific namespace. The following settings in the `values.yaml` file enable this configuration:

```yaml
wso2:
    .
    .
  apk:
    .
    .
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

When `scope` is set to `Namespaced`, the default configuration grants APK components permissions only within the namespace where APK is installed.

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
If you wish to deploy the APK using only Roles and Rolebindings, you can do so by following the steps below. 

1. Download the Helm chart and extract the templates:
```bash
helm pull wso2apk/apk-helm --version 1.2.0 --untar
```
2. Change values.yaml file by adding the following configurations under the `wso2.apk.auth` section.
```yaml
resourceLevelPermissions: 
        scope: Namespaced
        roleName: wso2apk-role
```

3. Optionally add other namespaces as desired to the `apiNamespaces` in the `values.yaml` file under the `adapter` and `commonController` sections. This will allow APK to manage APIs in those namespaces as well.
```yaml
apiNamespaces:
  - "apk-v12"
  - "testing-v2"
```

4. Optionally you can also remove the ClusterRole and ClusterRoleBinding that are created by default to support the Kubernetes Gateway API admission webhook server. 
This can be disabled in the ```values.yaml``` file under the following section to prevent the creation of the ClusterRole and ClusterRoleBinding for the Gateway API admission webhook server.
```yaml
gatewaySystem:
  enabled: false # Disables the Gateway API admission webhook server 
```
5. Install APK with the following command using the local helm-chart and templates.
```bash
helm install apk . -f values.yaml -n apk
```