# Pattern 1: Standalone Kubernetes Gateway

* [Kubernetes Gateway per cluster](../../setup/deployment/apk-dataplane-per-cluster.md) <p> Install a single gateway instance that serves all namespaces in the cluster—ideal for shared infrastructure and centralized traffic management.</p>
* [Multi Gateways per cluster with cluster-scoped permissions](../../setup/deployment/apk-dataplane-per-namespace.md)<p>Deploy one gateway instance in each namespace for stronger isolation, separate configuration, and per-team autonomy with cluster-scoped permissions.</p>
* [Multi Gateways per cluster with Namespaced-scoped permissions](../../setup/deployment/apk-dataplane-per-namespace_permission.md)<p>Deploy one gateway instance in each namespace for stronger isolation, separate configuration, and per-team autonomy with namespace-scoped permissions.</p>

!!!Important
    Upon installation, the Kubernetes Gateway creates Roles and ClusterRoles to manage permissions. If you install it at the cluster level, the necessary RBAC resources are generated automatically. If you don’t have cluster-wide permissions in your production setup, choose the per-namespace installation option instead.