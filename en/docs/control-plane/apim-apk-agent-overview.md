# APIM APK Agent Overview

The APIM APK Agent is a component that connects the WSO2 API Manager (APIM) control plane with the WSO2 APK Gateway. The APIM APK Agent is responsible for the following tasks:

- Recieve JMS Events which relates to API,Application,Subscription management from the APIM Control Plane.
- Convert the data which is recieved from the APIM Control Plane to the APK Gateway understandable format which are K8s Custom Resources.
- Apply the generated Custom Resources to the K8s cluster to deploy API to APK Gateway.
