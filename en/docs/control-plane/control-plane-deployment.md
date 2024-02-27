# Deploy APIM Control Plane with APK

There are 3 components which you need to deploy to get the APK working with APIM. They are,

- WSO2 API Manager 4.3.0
- WSO2 APK Gateway 1.1.0
- WSO2 APIM-APK Agent 1.1.0

Follow the below steps to deploy each of the above components.

## Deploy WSO2 API Manager

1. [Download](https://wso2.com/api-management/install/) and deploy WSO2 API Manager 4.3.0 in K8s cluster using Helm Charts.
2. Configure the API Manager with the APK Gateway by following the [APIM-APK Agent Configuration](../control-plane/control-plane-configuration.md) guide.

## Deploy WSO2 APK Gateway

1. Follow the [APK Installation Guide](https://apk.docs.wso2.com/en/latest/install-and-setup/installation-prerequisites/) to deploy WSO2 APK Gateway 1.1.0 in K8s cluster using Helm Charts.
2. Configure the APK Gateway with the API Manager by following the [APK Gateway Configuration](../control-plane/control-plane-configuration.md) guide.

## Deploy WSO2 APIM-APK Agent
1. Follow the [APIM-APK Agent Installation Guide](../control-plane/deploy-apim-apk-agent.md) to deploy WSO2 APIM-APK Agent 1.1.0 in K8s cluster using Helm Charts.
2. Configure the APIM-APK Agent with the API Manager by following the [APIM-APK Agent Configuration](../control-plane/control-plane-configuration.md) guide.

## Next Steps

You can refer the [APK Control Plane Operations](../control-plane/control-plane-operations.md) guide to deploy APIs using the API Manager Control Plane with APK Gateway using APIM-APK Agent.