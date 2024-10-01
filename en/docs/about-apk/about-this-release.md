# About this Release

APK is WSO2's cloud native API management platform. APK is designed to help you build, deploy, and manage APIs in a cloud environment. Our platform is built on top of a microservices architecture and uses containerization technologies to ensure scalability and flexibility. With features like automatic failover and load balancing, our APK platform is designed to be highly available and able to handle large numbers of API requests without performance degradation. We've also added support for continuous delivery and deployment, so you can quickly and easily push updates to your API services.

**WSO2 APK 1.2.0** is the latest **WSO2 APK release** and is the successor of **WSO2 APK 1.1.0**.

## New features

??? note "APK Control Plane support"

    - API Manager 4.3.0 as the control plane for APK - The WSO2 API Platform for Kubernetes (APK) introduces a feature that allows developers to directly create APIs within the APK data plane, enhancing the development workflow. Once created, these APIs are accessible in the Control Plane (API Publisher) for further refinement by API product managers, who can add documentation, configure settings, and manage lifecycle stages. Finally, the APIs are published to the developer portal, ready for consumer use. While product managers oversee the API's presentation and manageability, API developers focus on the technical aspect of gateway deployment.
    - APK as a gateway to API Manager 4.3.0 - The APK gateway functions as a separate gateway environment within the API Manager, allowing users to adhere to their familiar API development process. When it's time to publish the API, the publisher can choose whether to deploy it to the APK gateway or the traditional API Manager gateway. This flexibility enables simultaneous management of both the cloud-native Kubernetes data plane and the API Manager data plane. Consequently, users can leverage the advantages of a Kubernetes-native cloud gateway while still managing their APIs through the familiar API Publisher interface.

??? note "Enhanced API Authentication Support"

    The latest release enhances API security with Mutual SSL Authentication support, introducing two-way SSL authentication to strengthen your API ecosystem. This feature ensures heightened security and trust in API interactions with back end service by mandating mutual authentication between gateway and backend server, significantly bolstering data protection and trustworthiness in your API exchanges.

??? note "Extended GraphQL Capabilities"

    The latest WSO2 APK release introduces robust support for GraphQL, enabling precise data querying and mutation operations in APIs. This feature simplifies development, enhances efficiency, allowing developers and consumers to interact with services more flexibly and effectively. By adopting GraphQL, users gain targeted data access, optimizing the API's responsiveness and adaptability in various application scenarios.

??? note "Advanced Monitoring Capabilities with Prometheus"

    This release introduces Prometheus integration for advanced monitoring within the APK data plane. This enhancement offers detailed insights into API performance and usage, enabling effective troubleshooting and real-time analytics. Users benefit from streamlined monitoring and improved visibility, ensuring robust API reliability and optimized performance.

??? note "API subscription and Application support in DataPlane"

    This feature introduces API subscription and application support within the Data Plane, elevating API consumer interactions with APIs. This upgrade allows subscription management and control, enhancing user engagement and providing a more organized and efficient way to handle API access and subscriptions directly within the Data Plane.

??? note "Gateway environment support (to support virtual environment)"

    APK brings in gateway environment support, allowing for more flexible API deployment and management in virtual settings. This enhancement facilitates cost effective API handling across varied infrastructural setups, streamlining deployment processes and enabling scalability.

??? note "Gateway Specific Global Level Policies"

    In WSO2 API Manager, managing Global Level Policies within the gateway infrastructure is made easier. This streamlines policy handling, eliminating the need for administrators to manually create XML-type policy files. This feature facilitates a user-friendly approach to handling policies, eliminates the requirement for manual XML creation and placement in specific directories, and enhances control by providing a clear interface for creating, deploying, and undeploying policies, offering administrators better control over policy management.

??? note "Semantic API versioning support for APIs"

    This feature allows users to implement a structured versioning strategy, ensuring orderly API updates and compatibility management.

??? note "API Analytics enhancement to work with Moesif analytics out of the box"

    Integrate Moesif analytics to unlock actionable insights into your API's performance and usage patterns. This integration equips you with the intelligence to refine your API strategies, improving service quality based on real user data, and ultimately driving better business decisions to foster growth and user satisfaction.

## Compatible WSO2 product versions

- WSO2 APK 1.2.0 is compatible with WSO2 API Manager 4.4.0([APIM](https://apim.docs.wso2.com/en/latest/)).

## Fixed issues

- For all the fixed issues in WSO2 APK 1.2.0, go to [APK](https://github.com/wso2/apk/issues?q=is%3Aissue+is%3Aclosed+closed%3A2023-09-18..2024-04-10+)

## Known issues

- For all the known issues in WSO2 APK 1.2.0, go to [APK](https://github.com/wso2/apk/issues?q=is%3Aopen+is%3Aissue)

## Release Notes

For more information on each of the APK releases, go to [Releases](https://github.com/wso2/apk/releases) on the APK product repository in GitHub.

## Release Planning

For more information about APK release planning and project management information, go to [APK Project Dashboard](https://github.com/orgs/wso2/projects/80/).
