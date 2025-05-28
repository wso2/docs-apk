# Configuring the Kubernetes Gateway per Cluster

It is possible to deploy the Kubernetes Gateway per Cluster in two ways.

1. <a href="#1-using-the-default-helm-chart">Using the default Helm chart provided by WSO2</a>
2. <a href="#2-manually-configuring-permissions">Manually configuring permissions</a>



## 1.  Using the default Helm chart

When deploying the Kubernetes Gateway using the default Helm chart, it automatically creates a ClusterRole and ClusterRoleBinding with the necessary permissions. The default configuration is as follows:

**ClusterRole**
<div style="width:100%;height:400px;line-height:1.5em;overflow:auto;padding:0px 0px 5px 0px;background:#f7f7f7;border:1px solid #ccc;">
<pre><code>
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: wso2apk-role
rules:
  - apiGroups: ["discovery.k8s.io"]
    resources: ["endpointslices"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: [""]
    resources: ["services","configmaps","secrets", "namespaces", "serviceaccounts", "events", "nodes"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["autoscaling"]
    resources: ["horizontalpodautoscalers"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  - apiGroups: ["gateway.networking.k8s.io"]
    resources: ["httproutes","gateways","gatewayclasses","grpcroutes", "referencegrants"]
    verbs: ["get","list","watch","update","delete","create", "patch"]
  - apiGroups: [ "gateway.networking.k8s.io" ]
    resources: [ "gateways/status","gatewayclasses/status","httproutes/status" ]
    verbs: [ "get","patch","update" ]
  - apiGroups: ["dp.wso2.com"]
    resources: ["apis"]
    verbs: ["get","list","watch","update","delete","create", "patch"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["apis/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["apis/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["authentications"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["authentications/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["authentications/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backends"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backends/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backends/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["apipolicies"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["apipolicies/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["grpcroutes"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["grpcroutes/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["grpcroutes/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["apipolicies/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["interceptorservices"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["interceptorservices/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["interceptorservices/status"]
    verbs: ["get","patch","update"]
  - apiGroups: [ "dp.wso2.com" ]
    resources: [ "scopes" ]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["scopes/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["scopes/status"]
    verbs: ["get","patch","update"]
  - apiGroups: [ "dp.wso2.com" ]
    resources: [ "ratelimitpolicies" ]
    verbs: [ "get","list","watch","update","delete","create" ]
  - apiGroups: [ "dp.wso2.com" ]
    resources: [ "ratelimitpolicies/finalizers" ]
    verbs: [ "update" ]
  - apiGroups: [ "dp.wso2.com" ]
    resources: [ "ratelimitpolicies/status" ]
    verbs: [ "get","patch","update" ]
  - apiGroups: [ "dp.wso2.com" ]
    resources: [ "airatelimitpolicies" ]
    verbs: [ "get","list","watch","update","delete","create" ]
  - apiGroups: [ "dp.wso2.com" ]
    resources: [ "airatelimitpolicies/finalizers" ]
    verbs: [ "update" ]
  - apiGroups: [ "dp.wso2.com" ]
    resources: [ "airatelimitpolicies/status" ]
    verbs: [ "get","patch","update" ]
  - apiGroups: [ "coordination.k8s.io" ]
    resources: [ "leases" ]
    verbs: [ "get","list","watch","update","patch","create","delete" ]
  - apiGroups: ["dp.wso2.com"]
    resources: ["tokenissuers"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["tokenissuers/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["tokenissuers/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backendjwts"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backendjwts/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backendjwts/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["gqlroutes"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["gqlroutes/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["gqlroutes/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["aiproviders"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["aiproviders/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["aiproviders/finalizers"]
    verbs: ["update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applications"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applications/finalizers"]
    verbs: ["update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applications/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["subscriptions"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["subscriptions/finalizers"]
    verbs: ["update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["subscriptions/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applicationmappings"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applicationmappings/finalizers"]
    verbs: ["update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applicationmappings/status"]
    verbs: ["get","patch","update"]
{{- else }}
  - apiGroups: [""]
    resources: ["services","configmaps","secrets"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["gateway.networking.k8s.io"]
    resources: ["httproutes","gateways","gatewayclasses","grpcroutes"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: [ "gateway.networking.k8s.io" ]
    resources: [ "gateways/status","gatewayclasses/status","httproutes/status" ]
    verbs: [ "get","patch","update" ]
  - apiGroups: ["dp.wso2.com"]
    resources: ["apis"]
    verbs: ["get","list","watch","update","delete","create", "patch"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["apis/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["apis/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["authentications"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["authentications/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["authentications/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backends"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backends/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backends/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["apipolicies"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["apipolicies/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["grpcroutes"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["grpcroutes/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["grpcroutes/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["apipolicies/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["interceptorservices"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["interceptorservices/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["interceptorservices/status"]
    verbs: ["get","patch","update"]
  - apiGroups: [ "dp.wso2.com" ]
    resources: [ "scopes" ]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["scopes/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["scopes/status"]
    verbs: ["get","patch","update"]
  - apiGroups: [ "dp.wso2.com" ]
    resources: [ "ratelimitpolicies" ]
    verbs: [ "get","list","watch","update","delete","create" ]
  - apiGroups: [ "dp.wso2.com" ]
    resources: [ "ratelimitpolicies/finalizers" ]
    verbs: [ "update" ]
  - apiGroups: [ "dp.wso2.com" ]
    resources: [ "ratelimitpolicies/status" ]
    verbs: [ "get","patch","update" ]
  - apiGroups: [ "dp.wso2.com" ]
    resources: [ "airatelimitpolicies" ]
    verbs: [ "get","list","watch","update","delete","create" ]
  - apiGroups: [ "dp.wso2.com" ]
    resources: [ "airatelimitpolicies/finalizers" ]
    verbs: [ "update" ]
  - apiGroups: [ "dp.wso2.com" ]
    resources: [ "airatelimitpolicies/status" ]
    verbs: [ "get","patch","update" ]
  - apiGroups: [ "coordination.k8s.io" ]
    resources: [ "leases" ]
    verbs: [ "get","list","watch","update","patch","create","delete" ]
  - apiGroups: ["dp.wso2.com"]
    resources: ["tokenissuers"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["tokenissuers/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["tokenissuers/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backendjwts"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backendjwts/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["backendjwts/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["gqlroutes"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["gqlroutes/finalizers"]
    verbs: ["update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["gqlroutes/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["aiproviders"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["aiproviders/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["dp.wso2.com"]
    resources: ["aiproviders/finalizers"]
    verbs: ["update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applications"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applications/finalizers"]
    verbs: ["update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applications/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["subscriptions"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["subscriptions/finalizers"]
    verbs: ["update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["subscriptions/status"]
    verbs: ["get","patch","update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applicationmappings"]
    verbs: ["get","list","watch","update","delete","create"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applicationmappings/finalizers"]
    verbs: ["update"]
  - apiGroups: ["cp.wso2.com"]
    resources: ["applicationmappings/status"]
    verbs: ["get","patch","update"]
</code></pre>
</div>

**ClusterRoleBinding**
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: apk-wso2-apk-cluster-role-binding
  namespace: apk
roleRef:
  kind: ClusterRole
  name: wso2-apk-role
  apiGroup: rbac.authorization.k8s.io
subjects:
  - kind: ServiceAccount
    name:  wso2apk-platform
    namespace: apk

```

You can proceed with the default setup using the following command:
```bash
helm install apk wso2apk/apk-helm --version 1.3.0 -n apk # Install the Kubernetes Gateway
```


## 2. Manually configuring permissions

If you wish to manually configure the permissions and then deploy the Kubernetes Gateway, you can do so by following the steps below. 


1. In the `helm-charts/values.yaml` file, update the following section by setting the `enableClusterRoleCreation` to `false` and `enableServiceAccountCreation` to `false` to prevent the Helm chart from creating the permissions automatically.
```yaml
wso2:
  apk:
     .
     .
    auth:
      enabled: true
      enableServiceAccountCreation: false
      enableClusterRoleCreation: false
      serviceAccountName: wso2apk-platform
      roleName: wso2apk-role
```
3. Create and apply your own ClusterRole, ClusterRoleBinding, and ServiceAccount as per your requirements. Set the `serviceAccountName` and `roleName` in the `values.yaml` file to match the names you used in your configurations.

4. Install Kubernetes Gateway with the following command using the local helm-chart and templates.
```bash
helm install apk . -f values.yaml -n apk
```


5. Optionally you can also configure the ClusterRole and ClusterRoleBinding that are created by default to support the Kubernetes Gateway API admission webhook server. 
This can be disabled in the values.yaml file in the following section by setting `gatewaySystem.enabled` to `false`.
```yaml
gatewaySystem:
  enabled: true
  enableServiceAccountCreation: true  # Creates the ServiceAccount
  enableClusterRoleCreation: true  # Creates the ClusterRole
  serviceAccountName: gateway-api-admission # Configures the name of the ServiceAccount
  applyGatewayWehbhookJobs: true
``` 

The default configuration is as follows:
<div style="width:100%;height:400px;line-height:1.5em;overflow:auto;padding:0px 0px 5px 0px;background:#f7f7f7;border:1px solid #ccc;">
<pre><code>
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

</code></pre>
</div>
