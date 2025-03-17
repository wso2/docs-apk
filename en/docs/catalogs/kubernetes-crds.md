# Kubernetes Gateway CRD Catalog

WSO2 API management for Kubernetees now offers comprehensive support for the <a href="https://gateway-api.sigs.k8s.io/" target="_blank">Kubernetes Gateway API specification</a>. This support signifies a significant advancement in our API management for Kubernetees solution, enhancing our compatibility and integration capabilities within Kubernetes environments.

WSO2 API management for Kubernetes also supports the <a href="https://gateway-api.sigs.k8s.io/references/policy-attachment/#supported-resources" target="_blank">metaresources and policy attachment specifications</a> defined by the Kubernetes Gateway API. These specifications provide a standardized approach to extending and configuring the behavior of objects within the Gateway API.

The diagram below displays the CRDs used within the WSO2 Kubernetes Gateway.
<br></br>
[![Data Plane CRDs](../assets/img/catalogs/catalog.png)](../assets/img/catalogs/catalog.png)

The catalogs of the CRDs, including examples and the configuration definitions, can be found below.

- <a href="../../catalogs/crds/api_types" target="_blank">API</a>  
- <a href="../../catalogs/samples/http-route" target="_blank">HTTPRoute</a>  
- <a href="../../catalogs/crds/authentication_types" target="_blank">Authentication</a>  
- <a href="../../catalogs/crds/backend_types" target="_blank">Backend</a>  
- <a href="../../catalogs/crds/backendjwt_types" target="_blank">BackendJWT</a>  
- <a href="../../catalogs/crds/apipolicy_types" target="_blank">APIPolicy</a>  
- <a href="../../catalogs/crds/interceptorservice_types" target="_blank">Interceptor Service</a>  
- <a href="../../catalogs/crds/ratelimitpolicy_types" target="_blank">RateLimitPolicy</a>  
- <a href="../../catalogs/crds/scope_types" target="_blank">Scope</a>  
- <a href="../../catalogs/crds/tokenIssuer_types" target="_blank">TokenIssuer</a>  
- <a href="../../catalogs/crds/aiprovider_types" target="_blank">AIProvider</a>  
- <a href="../../catalogs/crds/airatelimitpolicy_types" target="_blank">AIRateLimitPolicy</a>  
- <a href="../../catalogs/crds/application_types" target="_blank">Application</a>  
- <a href="../../catalogs/crds/application_mapping_types" target="_blank">ApplicationMapping</a>  
- <a href="../../catalogs/crds/subscription_types" target="_blank">Subscription</a>  
- <a href="../../catalogs/crds/gql_routes_types" target="_blank">GQLRoute</a>  
- <a href="../../catalogs/samples/grpc-route" target="_blank">GRPCRoute</a>  