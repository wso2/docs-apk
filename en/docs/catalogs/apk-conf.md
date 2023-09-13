This document serves as a comprehensive guide, detailing all the parameters relevant to the apk-conf file within WSO2 APK

| Field                | Type    | Description                                                        |
|----------------------|---------|--------------------------------------------------------------------|
| id                   | string  | UUID of the API                                                    |
| name                 | string  | Name of the API (1-60 characters, no special characters)          |
| basePath             | string  | Base Path of the API (1-256 characters)                           |
| version              | string  | Version of the API (1-30 characters, no special characters)        |
| type                 | string  | Type of the API (REST, GraphQL, GRPC)                              |
| definitionPath       | string  | Endpoint to expose API Definition                                  |
| defaultVersion       | boolean | Is this the default version of the API                            |
| endpointConfigurations | object  | Configuration for different endpoints of the API                   |
| operations           | array   | Operations supported by the API                                    |
| apiPolicies          | object  | Policies applied to API-level operations                           |
| rateLimit            | object  | Rate limiting configuration for the API                             |
| authentication       | array   | Authentication types for the API                                   |
| additionalProperties | array   | Map of custom properties of the API                                 |
| corsConfiguration    | object  | Cross-Origin Resource Sharing (CORS) configuration for the API     |

**schemas:**

| Schema               | Type    | Description                                                        |
|----------------------|---------|--------------------------------------------------------------------|
| Authentication       | object  | Authentication settings for the API                                |
| CORSConfiguration    | object  | CORS configuration for the API                                     |
| APIOperationPolicies | object  | Policies applied to API-level operations                           |
| APKOperationPolicy   | object  | API Operation Policy                                                |
| RateLimit            | object  | API Rate Limit Details                                             |
| EndpointConfigurations | object  | Endpoint Configurations                                             |
| EndpointConfiguration | object  | Endpoint Configuration                                              |
| Certificate          | object  | Certificate information for secure communication                    |
| EndpointSecurity     | object  | Security configuration for the API endpoint                         |
| BasicEndpointSecurity | object  | Basic Authentication security settings for the API endpoint         |
| Resiliency           | object  | Endpoint resiliency related configurations of the API               |
| CircuitBreaker       | object  | Circuit Breaker configuration for the API endpoint                  |
| Timeout              | object  | Timeout settings for the API endpoint                               |
| RetryPolicy          | object  | Retry Policy settings for the API endpoint                          |
| APKOperations        | object  | API Operation                                                        |
| K8sService           | object  | Kubernetes Service information for the API endpoint                 |
| InterceptorProperties | object  | Interceptor Parameters                                               |
| BackendJWTProperties | object  | Backend JWT Parameters                                               |
| CustomClaims         | object  | Custom Claims for JWT authentication                                |


| **Object**          | **Property**                     | **Type**        | **Description**                                                                                                |
|---------------------|----------------------------------|-----------------|----------------------------------------------------------------------------------------------------------------|
| Resiliency          | timeout                          | Timeout         | Defines timeout-related configurations.                                                                        |
|                     | retryPolicy                      | RetryPolicy     | Defines retry-related configurations.                                                                          |
|                     | circuitBreaker                   | CircuitBreaker  | Defines circuit breaker-related configurations.                                                                |
| CircuitBreaker      | maxConnectionPools               | integer         | The maximum number of connection pools.                                                                       |
|                     | maxConnections                   | integer         | The maximum number of connections.                                                                           |
|                     | maxPendingRequests               | integer         | The maximum number of pending requests.                                                                       |
|                     | maxRequests                      | integer         | The maximum number of requests.                                                                              |
|                     | maxRetries                       | integer         | The maximum number of retries.                                                                               |
| Timeout             | downstreamRequestIdleTimeout      | integer         | The idle timeout for downstream requests in milliseconds.                                                    |
|                     | upstreamResponseTimeout          | integer         | The response timeout for upstream requests in milliseconds.                                                   |
| RetryPolicy         | count                            | integer         | The number of retry attempts.                                                                                |
|                     | baseIntervalMillis               | integer         | The base interval between retry attempts in milliseconds.                                                    |
|                     | statusCodes                      | array of integers | An array of HTTP status codes to trigger retries.                                                    |
| APKOperations       | target                           | string          | The target of the operation, e.g., "/order/{orderId}".                                                      |
|                     | verb                             | string          | The HTTP verb of the operation, e.g., "POST".                                                               |
|                     | secured                          | boolean         | Authentication mode for the resource (true/false).                                                          |
|                     | endpointConfigurations           | $ref            | Reference to endpoint configurations.                                                                        |
|                     | operationPolicies                | $ref            | Reference to operation policies.                                                                             |
|                     | rateLimit                        | $ref            | Reference to rate limiting configuration.                                                                   |
|                     | scopes                           | array of strings | An array of scope strings.                                                                              |
| K8sService          | name                             | string          | The name of the Kubernetes service, e.g., "pizzashack-service".                                              |
|                     | namespace                        | string          | The Kubernetes namespace where the service is deployed, e.g., "apk-platform".                                |
|                     | port                             | integer         | The port number on which the service is exposed, e.g., 8080.                                                 |
|                     | protocol                         | string          | The protocol used by the service, e.g., "http".                                                              |
| InterceptorProperties | backendUrl                      | string          | The URL of the backend service.                                                                             |
|                     | headersEnabled                   | boolean         | Specifies whether headers are enabled.                                                                       |
|                     | bodyEnabled                      | boolean         | Specifies whether the request body is enabled.                                                               |
|                     | trailersEnabled                  | boolean         | Specifies whether trailers are enabled.                                                                      |
|                     | contextEnabled                   | boolean         | Specifies whether context is enabled.                                                                       |
|                     | tlsSecretName                    | string          | The name of the secret containing TLS configuration.                                                        |
|                     | tlsSecretKey                     | string          | The key within the secret that holds TLS configuration.                                                     |
| BackendJWTProperties | encoding                         | string          | The encoding type.                                                                                           |
|                     | signingAlgorithm                 | string          | The signing algorithm.                                                                                       |
|                     | header                           | string          | The header.                                                                                                   |
|                     | tokenTTL                         | integer         | The token time-to-live (TTL) in milliseconds.                                                               |
|                     | customClaims                     | array of CustomClaims | An array of custom claims.                                                                      |
| CustomClaims        | claim                            | string          | The claim name.                                                                                               |
|                     | value                            | string          | The claim value.                                                                                              |
|                     | type                             | string          | The claim type.                                                                                               |


**Notes:**

- The table above represents the JSON schema fields and their descriptions.
- Additional details about each field and schema can be found in the JSON schema itself.
- APK Config Language Support Visual Studio Code (VS Code) extension can be used to validate the apk-conf file.
