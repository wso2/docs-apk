# Configuring Roles and RoleBindings

Upon installation, APK creates various Roles and ClusterRoles to manage permissions. While most APK functionalities can be configured using a Role, certain cluster-scoped resources require ClusterRole permissions. 
The necessary permissions are automatically created by the following files in the  `apk-helm/templates/serviceAccount` folder:

  - apk-cluster-role-binding.yaml
  - apk-cluster-role.yaml
  - apk-role-binding.yaml
  - apk-role.yaml 
  - apk-service-account.yaml

The following Service Account is created and the provided Role and ClusterRoles are bound to it via the RoleBinding and ClusterRoleBinding resources. 

**ServiceAccount**

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: wso2apk-platform
  namespace: apk
```

The following section in the `values.yaml` file allows you to configure the permissions for the APK components.

```yaml
wso2:
  apk:
    helmHooks:
      webhooksCleanupEnabled: true
    webhooks:
      validatingwebhookconfigurations: true
      mutatingwebhookconfigurations: true
      conversionwebhookconfigurations: true
    auth:
      enabled: true
      enableServiceAccountCreation: true
      enableClusterRoleCreation: false
      serviceAccountName: wso2apk-platform
      roleName: wso2apk-role
      resourceLevelPermissions: 
        scope: Cluster
        roleName: wso2apk-role
```

Furthermore, by default the following Role, RoleBinding, and ClusterRoleBinding are created to support the Kubernetes Gateway API admission webhook server but can be disabled in the values.yaml file

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: apk-wso2-apk-gateway-api-admission
  annotations:
  labels:
    name: gateway-api-webhook
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: gateway-api-admission
subjects:
  - kind: ServiceAccount
    name: gateway-api-admission
    namespace: apk
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: gateway-api-admission
  annotations:
  labels:
    name: gateway-api-webhook
  namespace: apk
rules:
  - apiGroups:
      - ''
    resources:
      - secrets
    verbs:
      - get
      - create
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: gateway-api-admission
  annotations:
  labels:
    name: gateway-api-webhook
  namespace: apk
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: gateway-api-admission
subjects:
  - kind: ServiceAccount
    name: gateway-api-admission
    namespace: apk
```
Relevant `values.yaml` file section: 
```yaml
gatewaySystem:
  enabled: true
  enableServiceAccountCreation: true  # Creates the ServiceAccount
  enableClusterRoleCreation: true  # Creates the ClusterRole
  serviceAccountName: gateway-api-admission # Configures the name of the ServiceAccount
  applyGatewayWehbhookJobs: true
```
