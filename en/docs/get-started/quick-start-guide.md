# Quick Start Guide

## Before you begin

Install the [prerequisites](/setup/prerequisites) that are required to run WSO2 APK.

## Step 1 - Start WSO2 APK

Follow the instructions below to deploy APK Data Service (DS) servers and the Cloud Native Postgres(CloudNativePG) in the Kubernetes cluster.

1. Download the latest [WSO2 APK release](https://github.com/wso2/apk/releases) and unzip it.

      Let's refer to the unzipped folder as `<APK-HOME>`.

2. Navigate to the `<APK-HOME>/<helm-charts>/` directory.

      `cd <APK-HOME>/<helm-charts>/`

3.  Download the dependent charts.
    
     ```
     helm dependency build
     ```

4.  Install the APK components and start WSO2 APK.

     ```tab="Format"
     helm install <helm-chart> . -n <namespace>
     ```
     
     ```tab="Command"
     helm install apk-test . -n apk
     ```

    !!! info "Optional"

         If required, use one of the following parameters when starting WSO2 APK.

          - To deploy Control Plane components only use `--set wso2.apk.dp.enabled=false`
          - To deploy Data Plane components only use `--set wso2.apk.cp.enabled=false`

5.  Verify the deployment.

      ```
      kubectl get pods -n apk
      ```

    !!! info "Optionally, to Access Deployment through your local machine"

        1. Identify the `router-service` external IP address.
           ```
           kubectl get svc -n apk | grep router-service
           ```
        2. Invoke the API through the APK Gateway.
           ```
           kubectl port-forward svc/apk-test-wso2-apk-router-service -n apk 9095:9095
           ```

## Step 2 - Deploy the API

Follow the instructions below to deploy an API using the kubectl:

1. Create an API Custom Resource (CR) and create a production and/or sandbox HTTPRoute CRs, and service for the API backend.

    !!! info
        - You can find a sample CR set in the `<APK-HOME>/developer/tryout/samples/` directory.
        - The backend of the sample REST API is [https://httpbin.org/](https://httpbin.org/)

2. Apply CRs to the Kubernetes API server using the kubectl.

     ```
     kubectl apply -f developer/tryout/samples/
     ```

    !!! Note
        - The services should be created in a different namespace than the APK or Kubernetes System namespaces. 
        -  The APIs should be created in the APK deployment namespace.

## Step 3 - Invoke the REST API

1. Obtain a token to invoke the System API.

      Provide the router service external IP in the following command.

      ```
      TOKEN=$(curl --location --request POST '{router_service}:9095/oauth2/token' \
      --header 'Host: idp.am.wso2.com' \
      --header 'Authorization: Basic NDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyOjRmYmQ2MmVjLWE5MmUtMTFlZC1hZmExLTAyNDJhYzEyMDAwMg==' \
      --header 'Content-Type: application/x-www-form-urlencoded' \
      --data-urlencode 'grant_type=client_credentials')
      ```

2. List the created API and retrieve the `API_ID`.

     ```
     curl --location --request GET '{router_service}:9095/api/am/runtime/apis' \
     --header 'Host: api.am.wso2.com' \
     --header 'Authorization: Bearer $TOKEN'
     ```

3. Obtain a token to invoke the created REST API.
     
      Provide the router service external IP in the following command.

      ```
      INTERNAL_KEY=$(curl --location --request POST '{router_service}:9095/api/am/runtime/apis/<$API_ID>/generate-key' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Host: api.am.wso2.com' \
      --header 'Authorization: Bearer $TOKEN')
      ```

4. Invoke the REST API.
   
      ```
      curl --location --request GET '{router_service}:9095/http-bin-api/1.0.8/get' \
      --header 'HOST: gw.wso2.com' \
      --header 'Internal-Key: $INTERNAL_KEY'  
      ```
