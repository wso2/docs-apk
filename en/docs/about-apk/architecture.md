# Architecture

APK is an open-source platform for providing complete API Management capabilities on top of the Kubernetes cluster management platform.

APK is composed of these components:

[![Architecture](../../assets/img/wso2-api-platform-for-kubernetes-component-architecture.png)](../../assets/img/wso2-api-platform-for-kubernetes-component-architecture.png)

**Control Plane** - The APK control plane. It provides API Management capabilities, marketplace capabilities along with domain services and web applications. It consists of the following sub-components:

- **Back Office** - Responsible for configuring the portal aspects of API including descriptions, documents, images, etc. Also, manage API visibility and lifecycle. The backend component was developed using Ballerina.

- **Dev Portal** - Responsible for API consumer interaction. API consumers can discover APIs, read documents, try them out and eventually subscribe to and consume APIs. The backend component was developed using Ballerina.

- **Admin Portal** - Responsible for configuring rate limit policies, key management services, and other administrative tasks. Backend components developed using Ballerina.

- **Management Server** - Responsible for communication with data planes and pushing updates. Backend components developed using Go lang

**Data Plane** - The APK data plane. It provides API runtime capabilities such as gateway, rate-limiting services, and runtime management. It consists of the following sub-components:

- **Runtime Manager** - Responsible for configuring the runtime aspects of API including API endpoints, discovering Kubernetes services, and converting them into APIs, etc. The backend component was developed using Ballerina.

- **Management Client** - Responsible for communication with the management server(control plane) to push/pull updates and maintain connectivity between the data plane and the control plane. The backend component was developed using Go.

- **API Gateway - Router** - Router will intercept incoming API traffic and apply quality of services such as authentication, authorization, and rate limiting. The router uses the Envoy Proxy as the core component that does the traffic routing. Required additional extensions were developed using C++.

- **API Gateway - Enforcer** - The Enforcer is the component that enforces the API management capabilities such as security, Rate Limiting, analytics, validation and etc. When the Router receives a request, it forwards that request to the Enforcer in order to perform the additional QoS. Plugins were developed using Java.

- **Identity Platform** - Responsible for authentication and authorization happens in the data plane.
