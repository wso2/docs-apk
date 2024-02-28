# Control Plane

## Overview

The Control Plane serves as the central intelligence hub for WSO2 APK, orchestrating the entirety of the API ecosystem. It encompasses critical functionalities such as API management, administrative operations, and the API marketplace. Structurally, it comprises four principal components: the Back Office, Dev Portal, Admin Portal, and APIM-APK Agent. These components cater to diverse user roles, ranging from API product managers to consumers and administrative personnel. Within the Control Plane, users configure, oversee, and track the performance of APIs, ensuring seamless management and optimization of the API landscape.

For the APK Control Plane, we are going to use same WSO2 API Manager Control Plane. The WSO2 API Manager control plane is a set of components that are responsible for managing and monitoring APIs. The control plane is responsible for the following tasks: 

- API gateway management
- API lifecycle management
- API publishing and subscription
- API analytics
- API monetization
- API security
- API documentation
- API versioning
- API rate limiting
- API throttling
- API mediation

APK Only supports REST API and GraphQL API creation for now.

## Architecture

Following diagram depicts the architecture of how the WSO2 APIM Control Plane connects with WSO2 APK Gateway using APIM-APK Agent.

[![Architecture](../assets/img/control-plane/apk-cp-overview.png)](../assets/img/control-plane/apk-cp-overview.png)

## APIM APK Agent

The APIM APK Agent is a component that connects the WSO2 API Manager (APIM) control plane with the WSO2 APK Gateway. The APIM APK Agent is responsible for the following tasks:

- Recieve JMS Events which relates to API,Application,Subscription management from the APIM Control Plane.
- Convert the data which is recieved from the APIM Control Plane to the APK Gateway understandable format which are K8s Custom Resources.
- Apply the generated Custom Resources to the K8s cluster to deploy API to APK Gateway.


## Next Steps

You can refer the [Control Plane Deployment](../control-plane/control-plane-deployment.md) regards to configuring API Manager Control Plane with APK Gateway using APIM-APK Agent.

    