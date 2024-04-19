# API Management Overview

In this section, a comprehensive detail of API Management Capabilites offered by WSO2 APK utilizing WSO2 API Manager Control Plane is provided.

## Supported Features

- API Management: Manage APIs, including creating, deploying, publishing, and retiring APIs.
- Application Management: Manage applications that consume APIs, including subscription management.
- Subscription Management: Manage subscriptions to APIs by applications.
- API Analytics: Gather and analyze data on API usage and performance.
- API Marketplace: Provide a marketplace for discovering and consuming APIs.
- Integration with WSO2 APK Gateway: Integrate with the APK Gateway for deploying APIs and managing traffic.

### API Management

API Management is the process of creating, publishing, and managing APIs in a secure and scalable environment. API Management enables organizations to expose their APIs to internal and external developers, partners, and other consumers. API Management provides a platform for developers to discover, consume, and manage APIs.

#### Create and Manage APIs

##### REST APIs: Create REST APIs through the API Publisher.
  - Transport Level Security: Secure APIs using transport level security. HTTPS and Mutual SSL are supported.
  - Application Level Security: Secure APIs using application level security. Basic Auth, OAuth, and JWT are supported.
  - API Level and Resource Level Rate Limiting, Security, and Monitoring can be configured for APIs.
  - Scope: Scope based access control is supported.
  - Mediation: Mediate requests and responses through the Interceptor Service Support.
  - API Documentation: Document APIs through the API Publisher.
  - API Deployment: Deploy APIs through the API Publisher.
  - API Testing: Test APIs through the API Publisher.
  - API Lifecycle Management: Manage the lifecycle of APIs through the API Publisher.
  - API Versioning: API Versioning and Default Versioning is supported.
##### GraphQL APIs: Create GraphQL APIs through the API Publisher.
  - Transport Level Security: Secure APIs using transport level security. HTTPS and Mutual SSL are supported.
  - Application Level Security: Secure APIs using application level security. Basic Auth, OAuth, and JWT are supported.
  - Scope: Scope based access control is supported.
  - API Level and Resource Level Rate Limiting, Security, and Monitoring can be configured for APIs.
  - API Deployment: Deploy APIs through the API Publisher.
  - API Documentation: Document APIs through the API Publisher.
  - API Testing: Test APIs through the API Publisher.
  - API Lifecycle Management: Manage the lifecycle of APIs through the API Publisher.
  - API Versioning: API Versioning and Default Versioning is supported.

#### Application Management

Application Management is the process of creating, publishing, and managing applications that consume APIs. Application Management enables organizations to manage applications that consume APIs in a secure and scalable environment. Application Management provides a platform for developers to discover, consume, and manage APIs.

##### Create and Manage Applications
   - Application Registration: Register applications through the Developer Portal.
   - Application Subscription: Subscribe to APIs through the Developer Portal.
   - Application Key Generation: Generate keys for applications through the Developer Portal.
   - Application Monitoring: Monitor applications through the Developer Portal.

#### Subscription Management

Subscription Management is the process of managing subscriptions to APIs by applications. Subscription Management enables organizations to manage subscriptions to APIs by applications in a secure and scalable environment. Subscription Management provides a platform for developers to discover, consume, and manage APIs.

##### Create and Manage Subscriptions
   - Subscription Management: Manage subscriptions to APIs by applications through the Developer Portal.
   - Subscription Monitoring: Monitor subscriptions to APIs by applications through the Developer Portal.
##### Subscription Blocking: Block subscriptions to APIs by applications through the Publisher Portal.

#### API Analytics

API Analytics is the process of gathering and analyzing data on API usage and performance. API Analytics enables organizations to gather and analyze data on API usage and performance in a secure and scalable environment. All the APIM supported analytics features are available in the APK Control Plane.

#### API Marketplace

API Marketplace is the process of providing a marketplace for discovering and consuming APIs. WSO2 API Manager Devportal  enables organizations to provide a marketplace for discovering and consuming APIs in a secure and scalable environment. This provides a platform for developers to discover, consume, and manage APIs.

#### Integration with WSO2 APK Gateway

Integration with WSO2 APK Gateway is the process of integrating with the APK Gateway for deploying APIs and managing traffic. WSO2 API Manager Control Plane integrates with the APK Gateway for deploying APIs and managing traffic in a secure and scalable environment. This provides a platform for developers to deploy APIs and manage traffic.

## Unsupported Features

- Application level rate limiting: Application level throttling is not supported.
- Subscription level rate limiting: Subscription level throttling is not supported.
- API Keys: API Keys generation and invocation API using API Keys are not supported.
- SOAP APIs: SOAP APIs are not supported.
- SOAP to REST API conversion: SOAP to REST API conversion is not supported.
- Webhooks/WebSub: Webhooks/WebSub are not supported.
- SSE API: SSE API is not supported.
- Load Balancing: Load Balancing is not supported.
- Failover: Failover routing is not supported.
- XACML: XACML based authorization is not supported.
- OPA: OPA based authorization is not supported.
- Response Caching: Response Caching is not supported.
- Bot Detection, Gateway Threat Protectors via API Policy: Bot Detection, Gateway Threat Protectors via API Policy are not supported.
- Endpoint Types: SOAP, Dynamic, Mock, AWS Lambda, JMS Backend Endpoints are not supported.
- API Products: API Products are not supported.
- API prototyping or mocking support: API prototyping or mocking support is not supported.
- Opaque Token support: Opaque Token support is not supported.
- Certificate bound access tokens: Certificate bound access tokens are not supported.

## Partially Supported Features

- API level rate limiting: API level rate limiting is partially supported. API level rate limit(Advance Policies) count and count unit are supported while Conditional Ratelimiting such as IP based, Header based, Query parameter based and JWT  Claim based are not supported.
- Lifecycle Management: API Lifecycle Management is partially supported. API Lifecycle Management is supported for creating, publishing, and retiring APIs. However, API Blocking is not supported for APK Gateways.
- Backend JWT: Backend JWT is partially supported. Custom Header, Token TTL and Hashing Algorithm is supported while Custom Claims are not supported.