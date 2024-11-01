This document serves as a comprehensive guide, detailing all the parameters relevant to the apk-conf file within WSO2 APK

| Field Name             | Type                   | Description                                                 |
| ---------------------- | ---------------------- | ----------------------------------------------------------- |
| id                     | string                 | UUID of the API (readOnly: true)                            |
| name                   | string                 | (1-60 characters, no special characters)                    |
| basePath               | string                 | Base Path of the API (1-256 characters)                     |
| version                | string                 | Version of the API (1-30 characters, no special characters) |
| type                   | string                 | Type of the API (REST, GraphQL, GRPC)                       |
| definitionPath         | string                 | Endpoint to expose API definition file.                     |
| defaultVersion         | boolean                | Is this the default version of the API?                     |
| subscriptionValidation | boolean                | Is subscription validation enabled for the API?             |
| environment            | string                 | Environment of the API.                                     |
| endpointConfigurations | EndpointConfigurations | Configurations for the API endpoints.                       |
| aiProvider             | AIProvider             | AI Provider for the API.                                    |
| operations             | array                  | Operations supported by the API                             |
| apiPolicies            | APIOperationPolicies   | Policies applied to the API level.                          |
| rateLimit              | RateLimit              | Configuration for rate limiting of API calls.               |
| authentication         | array                  | Authentication types for the API                            |
| additionalProperties   | array                  | Map of custom properties of the API.                        |
| corsConfiguration      | CORSConfiguration      | Configuration for CORS (Cross-Origin Resource Sharing).     |

**schemas:**

| Schema                 | Type   | Description                                 |
| ---------------------- | ------ | ------------------------------------------- |
| Authentication         | object | Authentication settings for the API         |
| CORSConfiguration      | object | CORS configuration for the API              |
| APIOperationPolicies   | object | Policies applied to API-level operations    |
| APKOperationPolicy     | object | API Operation Policy                        |
| RateLimit              | object | API Rate Limit Details                      |
| AIProvider             | object | Configuration for AI provider integrations  |
| EndpointConfigurations | object | Configuration of API endpoints              |
| Certificate            | object | SSL/TLS certificate details                 |
| BasicEndpointSecurity  | object | Basic authentication settings for endpoints |
| APIKeyEndpointSecurity | object | API key settings for endpoint security      |
| Resiliency             | object | Resiliency configuration for API            |
| Timeout                | object | Timeout settings for API calls              |
| RetryPolicy            | object | Retry policy for failed API calls           |
| APKOperations          | object | List of operations provided by the API      |
| K8sService             | object | Kubernetes service configuration            |
| InterceptorPolicy      | object | Policy for request/response interception    |
| BackendJWTPolicy       | object | Configuration for backend JWT generation    |
| HeaderModifierPolicy   | object | Policy for modifying request headers        |
| RequestMirror          | object | Configuration for mirroring requests        |
| RequestRedirect        | object | Configuration for redirecting requests      |


| **Object**             | **Property**                 | **Type**                                     | **Description**                                                                    |
| ---------------------- | ---------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------- |
| Resiliency             | timeout                      | Timeout                                      | Defines timeout-related configurations.                                            |
|                        | retryPolicy                  | RetryPolicy                                  | Defines retry-related configurations.                                              |
|                        | circuitBreaker               | CircuitBreaker                               | Defines circuit breaker-related configurations.                                    |
| CircuitBreaker         | maxConnectionPools           | integer                                      | The maximum number of connection pools.                                            |
|                        | maxConnections               | integer                                      | The maximum number of connections.                                                 |
|                        | maxPendingRequests           | integer                                      | The maximum number of pending requests.                                            |
|                        | maxRequests                  | integer                                      | The maximum number of requests.                                                    |
|                        | maxRetries                   | integer                                      | The maximum number of retries.                                                     |
| Timeout                | downstreamRequestIdleTimeout | integer                                      | The idle timeout for downstream requests in milliseconds.                          |
|                        | upstreamResponseTimeout      | integer                                      | The response timeout for upstream requests in milliseconds.                        |
| RetryPolicy            | count                        | integer                                      | The number of retry attempts.                                                      |
|                        | baseIntervalMillis           | integer                                      | The base interval between retry attempts in milliseconds.                          |
|                        | statusCodes                  | array of integers                            | An array of HTTP status codes to trigger retries.                                  |
| APKOperations          | target                       | string                                       | The target of the operation, e.g., "/order/{orderId}".                             |
|                        | verb                         | string                                       | The HTTP verb of the operation, e.g., "POST".                                      |
|                        | secured                      | boolean                                      | Authentication mode for the resource (true/false).                                 |
|                        | endpointConfigurations       | EndpointConfigurations                       | Configurations for the production and sandbox endpoints.                           |
|                        | operationPolicies            | array of APIOperationPolicies                | Configurations for the operation policies.                                         |
|                        | rateLimit                    | RateLimit                                    | Configurations for rate limiting.                                                  |
|                        | scopes                       | array of strings                             | An array of scope strings.                                                         |
| RateLimit              | requestsPerUnit              | integer                                      | The number of requests allowed per specified unit of time.                         |
|                        | unit                         | string                                       | The unit of time for rate limiting. Values: "Hour", "Minute", "Day".               |
| InterceptorProperties  | backendUrl                   | string                                       | The URL of the backend service.                                                    |
|                        | headersEnabled               | boolean                                      | Specifies whether headers are enabled.                                             |
|                        | bodyEnabled                  | boolean                                      | Specifies whether the request body is enabled.                                     |
|                        | trailersEnabled              | boolean                                      | Specifies whether trailers are enabled.                                            |
|                        | contextEnabled               | boolean                                      | Specifies whether context is enabled.                                              |
|                        | tlsSecretName                | string                                       | The name of the secret containing TLS configuration.                               |
|                        | tlsSecretKey                 | string                                       | The key within the secret that holds TLS configuration.                            |
| BackendJWTProperties   | encoding                     | string                                       | The encoding type.                                                                 |
|                        | signingAlgorithm             | string                                       | The signing algorithm.                                                             |
|                        | header                       | string                                       | The header.                                                                        |
|                        | tokenTTL                     | integer                                      | The token time-to-live (TTL) in milliseconds.                                      |
|                        | customClaims                 | array of CustomClaims                        | An array of custom claims.                                                         |
| CustomClaims           | claim                        | string                                       | The claim name.                                                                    |
|                        | value                        | string                                       | The claim value.                                                                   |
|                        | type                         | string                                       | The claim type.                                                                    |
| RequestMirror          | target                       | string                                       | Specifies the target to which requests should be mirrored.                         |
| RequestRedirect        | scheme                       | string                                       | Defines the scheme for the redirection (e.g., "https").                            |
|                        | hostname                     | string                                       | The hostname for the redirect.                                                     |
|                        | port                         | integer                                      | The port for the redirect.                                                         |
|                        | path                         | string                                       | The path for the redirect.                                                         |
|                        | statusCode                   | integer                                      | The HTTP status code for the redirect.                                             |
| HeaderModifier         | addHeaders                   | map of string                                | Headers to add to the request.                                                     |
|                        | removeHeaders                | array of strings                             | Headers to remove from the request.                                                |
|                        | setHeaders                   | map of string                                | Headers to set or replace in the request.                                          |
| AIProvider             | name                         | string                                       | Name of the AI provider.                                                           |
|                        | apiVersion                   | string                                       | The version of the AI provider.                                                    |
| Authentication         |                              | array                                        | An array containing configurations for the authentication types.                   |
| OAuth2Authentication   | required                     | enum                                         | Describes whether OAuth2 is "mandatory" or "optional".                             |
|                        | enabled                      | boolean                                      | Whether this type of authentication is enabled for this API or not.                |
|                        | authType                     | string                                       | Type of authentication. For OAuth2, the value is "OAuth2"                          |
|                        | sendTokenToUpstream          | boolean                                      | Whether to pass the token to the upstream or not.                                  |
|                        | headerEnable                 | boolean                                      | Whether sending OAuth2 token in the header is enabled.                             |
|                        | headerName                   | boolean                                      | Name of the OAuth2 header.                                                         |
| APIKeyAuthentication   | required                     | enum                                         | Describes whether APIKey authentication is "mandatory" or "optional".              |
|                        | enabled                      | boolean                                      | Whether this type of authentication is enabled for this API or not.                |
|                        | authType                     | string                                       | Type of authentication. For APIKey, the value is "APIKey"                          |
|                        | sendTokenToUpstream          | boolean                                      | Whether to pass the token to the upstream or not.                                  |
|                        | headerEnable                 | boolean                                      | Whether sending APIKey token in the header is enabled.                             |
|                        | headerName                   | boolean                                      | Name of the APIKey header.                                                         |
|                        | queryParamEnable             | boolean                                      | Whether sending API key as a query param is enabled.                               |
|                        | queryParamName               | boolean                                      | Name of the API key query param.                                                   |
| MTLSAuthentication     | required                     | enum                                         | Describes whether mTLS authentication is "mandatory" or "optional".                |
|                        | authType                     | string                                       | Type of authentication. For mTLS, the value is "mTLS"                              |
|                        | enabled                      | boolean                                      | Whether this type of authentication is enabled for this API or not.                |
|                        | certificates                 | array of MTLSCertificates                    | The names and keys of the config maps containing the mTLS certificates for the API |
| MTLSCertificates       | name                         | string                                       | Name of the configmap containing the mTLS certificate.                             |
|                        | key                          | string                                       | The key of the mTLS certificate containing the configmap.                          |
| JWTAuthentication      | required                     | enum                                         | Describes whether OAuth2 is "mandatory" or "optional".                             |
|                        | authType                     | string                                       | Type of authentication. For JWT, the value is "JWT"                                |
|                        | sendTokenToUpstream          | boolean                                      | Whether to pass the token to the upstream or not.                                  |
|                        | enabled                      | boolean                                      | Whether this type of authentication is enabled for this API or not.                |
|                        | headerEnable                 | boolean                                      | Whether sending JWT token in the header is enabled.                                |
|                        | headerName                   | boolean                                      | Name of the JWT header.                                                            |
|                        | queryParamEnable             | boolean                                      | Whether sending JWT token as a query param is enabled.                             |
|                        | queryParamName               | boolean                                      | Name of the JWT query param.                                                       |
|                        | audience                     | array of string                              | The list of audiences to be validated in the JWT.                                  |
| EndpointConfigurations | production                   | EndpointConfiguration                        | Configuration of the production endpoint.                                          |
|                        | sandbox                      | EndpointConfiguration                        | Configuration of the sandbox endpoint.                                             |
| EndpointConfiguration  | endpoint                     | string/K8sService                            | Configuration of the endpoint.                                                     |
|                        | endpointSecurity             | BasicEndpointSecurity/APIKeyEndpointSecurity | Security configuration for the API endpoint.                                       |
|                        | certificate                  | Certificate                                  | Certificate information for secure communication.                                  |
|                        | resiliency                   | Resiliency                                   | Resiliency configuration for the API endpoint.                                     |
|                        | aiRatelimit                  | AIRateLimit                                  | AI ratelimit configuration for the API endpoint.                                   |
| K8sService             | name                         | string                                       | The name of the Kubernetes service, e.g., "pizzashack-service".                    |
|                        | namespace                    | string                                       | The Kubernetes namespace where the service is deployed, e.g., "apk-platform".      |
|                        | port                         | integer                                      | The port number on which the service is exposed, e.g., 8080.                       |
|                        | protocol                     | string                                       | The protocol used by the service, e.g., "http".                                    |
| BasicEndpointSecurity  | secretName                   | string                                       | The name of the secret containing the credentials for basic authentication.        |
|                        | userNameKey                  | string                                       | The key within the secret that holds the username for basic authentication.        |
|                        | passwordKey                  | string                                       | The key within the secret that holds the password for basic authentication.        |
| APIKeyEndpointSecurity | secretName                   | string                                       | The name of the secret containing the certificate.                                 |
|                        | in                           | enum                                         | The location of the API key in the request.                                        |
|                        | apiKeyNameKey                | string                                       | The name of key in the request.                                                    |
|                        | apiKeyValueKey               | string                                       | The value of key in the request.                                                   |
| Certificate            | secretName                   | string                                       | The name of the secret containing the certificate.                                 |
|                        | secretKey                    | enum                                         | The key within the secret that holds the certificate.                              |
| AIRateLimit            | enabled                      | boolean                                      | States whether the AI ratelimit is turned on or not                                |
|                        | token                        | TokenAIRL                                    | Token limits configuration for AI rate limiting                                    |
|                        | request                      | RequestAIRL                                  | Request limits configuration for AI rate limiting                                  |
| TokenAIRL              | promptLimit                  | integer                                      | States whether the AI ratelimit is turned on or not                                |
|                        | completionLimit              | integer                                      | Limit for completions within the specified unit                                    |
|                        | totalLimit                   | integer                                      | Total limit combining prompt and completion counts                                 |
|                        | unit                         | enum                                         | The time unit for the rate limits. Values: "Minute", "Hour" and "Day"              |
| RequestAIRL            | requestLimit                 | integer                                      | Limit for requests within the specified unit                                       |
|                        | unit                         | enum                                         | The time unit for the rate limits. Values: "Minute", "Hour" and "Day"              |


**Notes:**

- The table above represents the JSON schema fields and their descriptions.
- Additional details about each field and schema can be found in the JSON schema itself.
- APK Config Language Support Visual Studio Code (VS Code) extension can be used to validate the apk-conf file.
