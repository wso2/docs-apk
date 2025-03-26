# Weighted Routing via APK Conf

This feature enables Weighted Routing, allowing requests to be distributed across multiple backend endpoints based on predefined weight values. This guide explains how to configure Weighted Routing for an API using the APK-Conf file.

## Applying Weights to Backend Endpoints in APK-Conf

The following is a sample code snippet on how weight values can be defined for `endpointConfigurations` in an APK-Conf file.

```yaml
endpointConfigurations:
  production:
    - endpoint: "http://demo-api-1-service.backend.svc.cluster.local:81"
      weight: 50
    - endpoint: "http://demo-api-2-service.backend.svc.cluster.local:43"
      weight: 10
    - endpoint: "http://demo-api-3-service.backend.svc.cluster.local:8081"
      weight: 40
```

!!! tip "Important"

    * The weight values do not need to sum to one hundred. They are not interpreted as percentage values but rather as proportions relative to the total sum of all weights applied.
    * The weight values have to be whole numbers.
    * A weight of '0' (Zero) means that no traffic will be sent to the particular endpoint.

!!! info "Applying Equal Weights to Backend Endpoints in APK-Conf"

    To evenly distribute traffic among endpoints, you may assign equal weights to all endpoints. However, ensure that the weight values are not all set to "1". Instead, **use any other whole number greater than 1**. Refer example below for sample configurations.

    ??? example "Equal Weight Endpoints Examples"
        
        !!! success inline "Correct"
            ```yaml
            endpointConfigurations:
            production:
                - endpoint: "http://demo-api-1-service.backend.svc.cluster.local:81"
                weight: 2
                - endpoint: "http://demo-api-2-service.backend.svc.cluster.local:43"
                weight: 2
                - endpoint: "http://demo-api-3-service.backend.svc.cluster.local:8081"
                weight: 2
            ```
        !!! success inline "Correct"
            ```yaml
            endpointConfigurations:
            production:
                - endpoint: "http://demo-api-1-service.backend.svc.cluster.local:81"
                weight: 100
                - endpoint: "http://demo-api-2-service.backend.svc.cluster.local:43"
                weight: 100
                - endpoint: "http://demo-api-3-service.backend.svc.cluster.local:8081"
                weight: 100
            ```
        !!! failure "Incorrect"
            ```yaml
            endpointConfigurations:
            production:
                - endpoint: "http://demo-api-1-service.backend.svc.cluster.local:81"
                weight: 1
                - endpoint: "http://demo-api-2-service.backend.svc.cluster.local:43"
                weight: 1
                - endpoint: "http://demo-api-3-service.backend.svc.cluster.local:8081"
                weight: 1
            ```

## Create an API using APK-Conf with Weighted Routing Across Multiple Endpoints

Follow the instructions below to configure weighted routing across multiple endpoints to an API via APK-Conf file:

!!! note "Before you begin"
    
    - Install the <a href="../../../setup/prerequisites" target="_blank">prerequisites</a> that are required to run WSO2 APK.
    - <a href="../../../get-started/quick-start-guide" target="_blank">Start WSO2 APK</a>.

### Step 1 - Generate an APK-Conf file
Create an `apk-conf` file by following the instructions in the <a href="../../../get-started/quick-start-guide/#step-3-configure-the-managed-api-for-the-backend-service" target="_blank">Quick Start Guide</a>. Then, modify the generated file as described in the following steps to enable weighted routing.

### Step 2 - Configure the Weights under the Endpoints in APK-Conf

Below is a complete sample `apk-conf` file with Weighted Routing configured:

```yaml
name: "BackendServiceAPI"
basePath: "/backend-service"
version: "1.0"
type: "REST"
defaultVersion: false
endpointConfigurations:
  production:
    - endpoint: "http://demo-api-1-service.backend.svc.cluster.local:81"
      weight: 50
    - endpoint: "http://demo-api-2-service.backend.svc.cluster.local:43"
      weight: 10
    - endpoint: "http://demo-api-3-service.backend.svc.cluster.local:8081"
      weight: 40
operations:
  - target: "/demo"
    verb: "GET"
    secured: true
    scopes: []
```

Replace the contents of your `apk-conf` file with the provided sample configuration.

### Step 3 - Deploy the API

#### 1. Deploy the Sample Backend Endpoints

!!!NOTE
        Ensure that a namespace named `backend` exists prior to deploying the sample backend resources provided in this guide to ensure their correct deployment.

Deploy the sample backend resources using the following command.

=== "Command"
    ```command
    kubectl apply -f 'https://raw.githubusercontent.com/wso2/apk/refs/heads/main/developer/tryout/samples/sample-backend-weighted.yaml'
    ```
    
=== "Format"
    ```command
    kubectl apply -f '<path-to-crs>'
    ```

#### 2. Deploy the API with APK-Conf

<a href="../../../get-started/quick-start-guide/#step-4-generate-access-token" target="_blank">Generate an access token</a> and deploy the API with APK-Conf file by following the steps in <a href="../../../get-started/quick-start-guide/#step-5-deploy-and-invoke-the-api" target="_blank">Deploy the API in Kubernetes Gateway</a>

### Step 4 - Verify the API Invocation

Invoke the API using the following command along with the access token generated in the previous step:

=== "Sample Request"
    ```
    curl -k --location 'https://default.gw.example.com:9095/backend-service/1.0/demo' \
    --header 'Host: default.gw.example.com' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiYXVkIjoiYXVkMSIsICJleHAiOjE3Mzk1MjU1OTUsICJuYmYiOjE3Mzk1MjE5OTUsICJpYXQiOjE3Mzk1MjE5OTUsICJqdGkiOiIwMWVmZWFhZS01NTZhLTExNzgtOTdiYi1lMDJmMjAzYzA4N2QiLCAiY2xpZW50SWQiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAic2NvcGUiOiJhcGs6YXBpX2NyZWF0ZSJ9.WUl6NICtrQbKib5wKJFRV4ekS2-Z1XTVGmU-J5_RZzFhIpVRzJtlgqcia9SGxV5Drgvq15B9u8odl07OWxGxoUfQuDwr5N63BKYP1oVn_zAghX9-16AAWP7iUEdh6OE4abeoI9PXGylgmUarwaLBQZXrHdBWkrVSiHmUuRn3W4jVkdqjjZ7f5XZBimfey2zO-Dm-z95gN3VnyOl46xB9U5LPgXqrjZrDnQrFuokhDEf0YhqTmPXjGv8Xk8kRPVmlqMSnTiOc0O0iMlFZwSMBksBiRQlKVgqB7h66mB5zRx1TWRcEJ5NCkMz101hz5YuGq_rKZiGc1Gq6Tncw3EcVQw'
    ```
=== "Request Format"
    ```
    curl -k --location 'https://<host>:9095/backend-service/1.0/demo' \
    --header 'Host: default.gw.example.com' \
    --header 'Authorization: Bearer <access-token>'
    ```

Once you invoke the above sample request, you will receive one of the following sample responses coming from one of the different endpoints as per the configured weight. (In the sample responses, the `API_version` value is used solely for the purpose of distinguishing between the three backends and does not represent an actual API version in this scenario.)

=== "Sample Response 1"
    ```JSON
    {
      "API_version":"1.0",
      "message":"You have reached Backend 1",
      "namespace":"Backend",
      "port":81
    }
    ```
=== "Sample Response 2"
    ```JSON
    {
      "API_version":"2.0",
      "message":"You have reached Backend 2",
      "namespace":"Backend",
      "port":43
    }
    ```
=== "Sample Response 3"
    ```JSON
    {
      "API_version":"3.0",
      "message":"You have reached Backend 3",
      "namespace":"Backend",
      "port":8081
    }
    ```

You can use the following script to verify the number of responses received from each endpoint of the route in this sample. The script invokes the request 100 times and provides a count of the number of responses from each endpoint.

=== "Sample Request"
    ```
    for i in {1..100}; do curl -s -k --location 'https://default.gw.example.com:9095/backend-service/1.0/demo' \
    --header 'Host: default.gw.example.com' \
    --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiYXVkIjoiYXVkMSIsICJleHAiOjE3Mzk1MjU1OTUsICJuYmYiOjE3Mzk1MjE5OTUsICJpYXQiOjE3Mzk1MjE5OTUsICJqdGkiOiIwMWVmZWFhZS01NTZhLTExNzgtOTdiYi1lMDJmMjAzYzA4N2QiLCAiY2xpZW50SWQiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAic2NvcGUiOiJhcGs6YXBpX2NyZWF0ZSJ9.WUl6NICtrQbKib5wKJFRV4ekS2-Z1XTVGmU-J5_RZzFhIpVRzJtlgqcia9SGxV5Drgvq15B9u8odl07OWxGxoUfQuDwr5N63BKYP1oVn_zAghX9-16AAWP7iUEdh6OE4abeoI9PXGylgmUarwaLBQZXrHdBWkrVSiHmUuRn3W4jVkdqjjZ7f5XZBimfey2zO-Dm-z95gN3VnyOl46xB9U5LPgXqrjZrDnQrFuokhDEf0YhqTmPXjGv8Xk8kRPVmlqMSnTiOc0O0iMlFZwSMBksBiRQlKVgqB7h66mB5zRx1TWRcEJ5NCkMz101hz5YuGq_rKZiGc1Gq6Tncw3EcVQw' \
    | grep -oP 'API_version":"\K[0-9]\.[0-9]'; done | sort | uniq -c | awk '{gsub("\\.0","",$2); print $2 " -> " $1}'
    ```

=== "Sample Response"
    ```
    1 -> 51
    2 -> 10
    3 -> 39
    ```

=== "Request Format"
    ```
    for i in {1..100}; do curl -s -k --location 'https://<host>:9095/backend-service/1.0/demo' \
    --header 'Host: default.gw.example.com' \
    --header 'Authorization: Bearer <access-token>' \
    | grep -oP 'API_version":"\K[0-9]\.[0-9]'; done | sort | uniq -c | awk '{gsub("\\.0","",$2); print $2 " -> " $1}'
    ```