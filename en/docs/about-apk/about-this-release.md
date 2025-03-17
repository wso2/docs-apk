# About this Release

WSO2 Kubernetes Gateway is designed to help you build, deploy, and manage APIs in a cloud environment. Our platform is built on top of a microservices architecture and uses containerization technologies to ensure scalability and flexibility. With features like automatic failover and load balancing, our Kubernetes Gateway platform is designed to be highly available and able to handle large numbers of API requests without performance degradation. We've also added support for continuous delivery and deployment, so you can quickly and easily push updates to your API services.

**WSO2 Kubernetes Gateway 1.3.0** is the latest **WSO2 Kubernetes Gateway release** and is the successor of **WSO2 APK 1.2.0**.

## New features

??? note "Performance Improvements"

     Introducing a new lightweight runtime by eliminating the Java runtime, this reduces resource usage while leveraging Envoy Proxy’s lightweight architecture for faster processing and improved scalability.

??? note "Intra-vendor Model Routing Support for AI APIs"

    The model-based round-robin policy routes requests to multiple LLM backends based on a specified AI model. It distributes requests in a round-robin fashion or according to assigned weights, controlling how many requests each backend receives.

??? note "Weighted Routing Capability for APIs in WSO2 Kubernetes Gateway"

    This feature enables Weighted Routing, allowing requests to be distributed across multiple backend endpoints based on predefined weight values.


## Compatible WSO2 product versions

- WSO2 Kubernetes Gateway 1.3.0 is compatible with WSO2 API Manager 4.5.0 (<a href="https://apim.docs.wso2.com/en/latest/" target="_blank">APIM</a>).

## Fixed issues

- For all the fixed issues in WSO2 APK 1.3.0, go to <a href="https://github.com/wso2/apk/issues?q=is%3Aissue+is%3Aclosed+closed%3A2024-04-10..2024-10-29" target="_blank">Kubernetes Gateway</a>.

## Known issues

- For all the known issues in WSO2 Kubernetes Gateway 1.3.0, go to <a href="https://github.com/wso2/apk/issues?q=is%3Aopen+is%3Aissue" target="_blank">Kubernetes Gateway</a>.

## Release Notes

For more information on each of the Kubernetes Gateway releases, go to <a href="https://github.com/wso2/apk/releases" target="_blank">Releases</a> on the Kubernetes Gateway product repository in GitHub.

## Release Planning

For more information about Kubernetes Gateway release planning and project management information, go to <a href="https://github.com/orgs/wso2/projects/80/" target="_blank">Kubernetes Gateway Project Dashboard</a>.

