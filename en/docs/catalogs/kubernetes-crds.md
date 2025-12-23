# Kubernetes Gateway CRD Catalog

WSO2 Kubernetes Gateway 2.x adopts the upstream <a href="https://gateway-api.sigs.k8s.io/" target="_blank">Kubernetes Gateway API</a> for routing (e.g., HTTPRoute, GRPCRoute) and introduces a small set of custom resources for policy and metadata attachment, as well as control-plane integrations.

Data Plane CRDs (dp.wso2.com)
- <a href="../../catalogs/crds/routepolicy_types" target="_blank">RoutePolicy</a>
- <a href="../../catalogs/crds/routemetadata_types" target="_blank">RouteMetadata</a>

Control Plane CRDs (cp.wso2.com)
- <a href="../../catalogs/crds/application_types" target="_blank">Application</a>
- <a href="../../catalogs/crds/application_mapping_types" target="_blank">ApplicationMapping</a>
- <a href="../../catalogs/crds/subscription_types" target="_blank">Subscription</a>

Note: Gateway API resources (HTTPRoute, GRPCRoute, Gateway, GatewayClass) are owned by the upstream project and are not listed here as WSO2 CRDs. WSO2 CRDs attach to those resources using policy attachment mechanisms.