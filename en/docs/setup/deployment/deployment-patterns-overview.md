# Kubernetes Gateway Installation Patterns

This document outlines the recommended installation patterns for the WSO2 Kubernetes Gateway. 

!!! important
    Please clear any existing QSG configuration before you begin the production setup.
    <a href="../../uninstall/" target="_blank">Uninstall Kubernetes Gateway Components</a>

!!! important
    All patterns are deployed using Helm charts with public Docker images. If you have a WSO2 subscription, you can configure the chart to pull commercial Docker images instead—every pattern supports commercial images as well.

- <a href="../../deployment/apk-data-plane-deployment-patterns" target="_blank">Pattern 1</a> - <b>Standalone Kubernetes Gateway</b>
<p>In this pattern, you only get the Kubernetes Gateway. you must create APIs using the provided REST APIs.</p>
- <a href="../../deployment/apk-as-gateway-in-apim-deployment-patterns" target="_blank">Pattern 2</a> - <b>Integrate as a gateway within the API Manager control plane. </b><p>
In this pattern you can design, manage, deploy, publish and delete API from API Manager control plane(ACP) UI. If you want to design APIs from the Control Plane UI, you should use this pattern.</p>
- <a href="../../deployment/apk-with-apim-cp-deployment-patterns" target="_blank">Pattern 3</a> - <b>Kubernetes Gateway with Control Plane</b></a> <p>
In this pattern you can not design/create API from API Manager control plane. API design should be handle by kubernetes gateway and API reflect to control palne to govern and publish</p>

