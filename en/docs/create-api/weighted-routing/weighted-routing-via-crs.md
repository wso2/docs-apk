# Weighted Routing via CRs

This feature enables Weighted Routing, allowing requests to be distributed across multiple backend endpoints based on predefined weight values. This guide explains how to configure Weighted Routing for an API using Kubernetes custom resources (CRs).

## Applying Weights to Backend Endpoints via CRs

The following is a sample code snippet of how weight values can be defined for `backendRefs` in a HTTPRoute Resource.

```yaml
backendRefs:
- group: "dp.wso2.com"
  kind: "Backend"
  name: "backend-1-api"
  weight: 60

- group: "dp.wso2.com"
  kind: "Backend"
  name: "backend-2-api"
  weight: 10

- group: "dp.wso2.com"  
  kind: "Backend"
  name: "backend-3-api"
  weight: 20
```

!!! tip "Important"

    * The weight values do not need to sum to one hundred. They are not interpreted as percentage values but rather as proportions relative to the total sum of all weights applied.
    * The weight values have to be whole numbers.
    * A weight of '0' (Zero) means that no traffic will be sent to the particular endpoint.

!!! info "Applying Equal Weights to Backend Endpoints via CRs"

    To evenly distribute traffic among endpoints, you may assign equal weights to all endpoints. However, ensure that the weight values are not all set to "1". Instead, **use any other whole number greater than 1**. Refer example below for sample configurations.

    ??? example "Equal Weight Endpoints Examples"
        
        !!! success inline "Correct"
            ```yaml
            backendRefs:
            - group: "dp.wso2.com"
              kind: "Backend"
              name: "backend-1-api"
              weight: 2

            - group: "dp.wso2.com"
              kind: "Backend"
              name: "backend-2-api"
              weight: 2

            - group: "dp.wso2.com"  
              kind: "Backend"
              name: "backend-3-api"
              weight: 2
            ```
        !!! success inline "Correct"
            ```yaml
            backendRefs:
            - group: "dp.wso2.com"
              kind: "Backend"
              name: "backend-1-api"
              weight: 100

            - group: "dp.wso2.com"
              kind: "Backend"
              name: "backend-2-api"
              weight: 100

            - group: "dp.wso2.com"  
              kind: "Backend"
              name: "backend-3-api"
              weight: 100
            ```
        !!! failure "Incorrect"
            ```yaml
            backendRefs:
            - group: "dp.wso2.com"
              kind: "Backend"
              name: "backend-1-api"
              weight: 1

            - group: "dp.wso2.com"
              kind: "Backend"
              name: "backend-2-api"
              weight: 1

            - group: "dp.wso2.com"  
              kind: "Backend"
              name: "backend-3-api"
              weight: 1
            ```

## Create an API using CRs with Weighted Routing Across Multiple Endpoints

Follow the instructions below to configure weighted routing across multiple endpoints to an API via CRs:

!!! note "Before you begin"
    
    - Install the <a href="../../../setup/prerequisites" target="_blank">prerequisites</a> that are required to run WSO2 APK.
    - <a href="../../../get-started/quick-start-guide" target="_blank">Start WSO2 APK</a>.

### Step 1 - Define the CRs

You can find the sample CRs provided <a href="https://github.com/wso2/apk/tree/main/developer/tryout/samples/sample-weighted-routing.yaml" target="_blank">here</a>.

The sample contains the following Resources required for weighted routing.

  * API CR.
  * HTTPRoute CR.
  * CRs that define the services for the API backend endpoints (Backend CRs).
  * Configmap CR.

The sample Backend endpoints which are used for Weighted Routing in this guide can be found <a href="https://github.com/wso2/apk/tree/main/developer/tryout/samples/sample-backend-weighted.yaml" target="_blank">here</a>.
  

### Step 2 - Configure Route Weights in the HTTPRoute CR

Weight values for each of the endpoint routes can be configured in the HTTPRoute CR as shown in the sample HTTPRoute CR provided below.

```yaml
apiVersion: "gateway.networking.k8s.io/v1beta1"
kind: "HTTPRoute"
metadata:
  name: "http-route"
  labels:
    api-name: "backend-service-api"
    api-version: "1.0"
spec:
  hostnames:
  - "default.gw.wso2.com"
  rules:
  - matches:
    - path:
        type: "RegularExpression"
        value: "/demo"
      method: "GET"
    filters:
    - type: "URLRewrite"
      urlRewrite:
        path:
          type: "ReplaceFullPath"
          replaceFullPath: "/demo"

    backendRefs:
    - group: "dp.wso2.com"
      kind: "Backend"
      name: "backend-1-api"
      weight: 5

    - group: "dp.wso2.com"
      kind: "Backend"
      name: "backend-2-api"
      weight: 2

    - group: "dp.wso2.com"  
      kind: "Backend"
      name: "backend-3-api"
      weight: 3
      
  parentRefs:
  - group: "gateway.networking.k8s.io"
    kind: "Gateway"
    name: "wso2-apk-default"
    sectionName: "httpslistener"
```

### Step 3 - Deploy the CRs

Once you have designed your API using these CRs, the next step is to apply them to the Kubernetes API server. APK will process and deploy your API seamlessly, taking full advantage of the Kubernetes infrastructure.

#### 1. Deploy the Sample Backend CRs

!!!NOTE
        Ensure that a namespace named `backend` exists prior to deploying the sample backend resources provided in this guide to ensure their correct deployment.

Deploy the sample backend resources using the following command.

=== "Command"
    ```command
    kubectl apply -f "https://raw.githubusercontent.com/wso2/apk/refs/heads/main/developer/tryout/samples/sample-backend-weighted.yaml"
    ```
    
=== "Format"
    ```command
    kubectl apply -f <path-to-crs>
    ```

#### 2. Apply the Sample API CRs

Apply the CRs to the Kubernetes API server using the following command.

=== "Command"
    ```command
    kubectl apply -f "https://raw.githubusercontent.com/wso2/apk/refs/heads/main/developer/tryout/samples/sample-weighted-routing.yaml"
    ```
    
=== "Format"
    ```command
    kubectl apply -f <path-to-crs>
    ```

### Step 4 - Verify the API Invocation

<a href="../../../develop-and-deploy-api/security/generate-access-token" target="_blank">Generate an access token</a> and invoke the API using the following command:

=== "Sample Request"
    ```
    curl -k --location "https://default.gw.wso2.com:9095/backend-service/1.0/demo" \
    --header "Host: default.gw.wso2.com" \
    --header "Authorization: Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiYXVkIjoiYXVkMSIsICJleHAiOjE3Mzk1MjU1OTUsICJuYmYiOjE3Mzk1MjE5OTUsICJpYXQiOjE3Mzk1MjE5OTUsICJqdGkiOiIwMWVmZWFhZS01NTZhLTExNzgtOTdiYi1lMDJmMjAzYzA4N2QiLCAiY2xpZW50SWQiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAic2NvcGUiOiJhcGs6YXBpX2NyZWF0ZSJ9.WUl6NICtrQbKib5wKJFRV4ekS2-Z1XTVGmU-J5_RZzFhIpVRzJtlgqcia9SGxV5Drgvq15B9u8odl07OWxGxoUfQuDwr5N63BKYP1oVn_zAghX9-16AAWP7iUEdh6OE4abeoI9PXGylgmUarwaLBQZXrHdBWkrVSiHmUuRn3W4jVkdqjjZ7f5XZBimfey2zO-Dm-z95gN3VnyOl46xB9U5LPgXqrjZrDnQrFuokhDEf0YhqTmPXjGv8Xk8kRPVmlqMSnTiOc0O0iMlFZwSMBksBiRQlKVgqB7h66mB5zRx1TWRcEJ5NCkMz101hz5YuGq_rKZiGc1Gq6Tncw3EcVQw"
    ```
=== "Request Format"
    ```
    curl -k --location "https://<host>:9095/backend-service/1.0/demo" \
    --header "Host: default.gw.wso2.com" \
    --header "Authorization: Bearer <access-token>"
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
    for i in {1..100}; do curl -s -k --location "https://default.gw.wso2.com:9095/backend-service/1.0/demo" \
    --header "Host: default.gw.wso2.com" \
    --header "Authorization: Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiYXVkIjoiYXVkMSIsICJleHAiOjE3Mzk1MjU1OTUsICJuYmYiOjE3Mzk1MjE5OTUsICJpYXQiOjE3Mzk1MjE5OTUsICJqdGkiOiIwMWVmZWFhZS01NTZhLTExNzgtOTdiYi1lMDJmMjAzYzA4N2QiLCAiY2xpZW50SWQiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAic2NvcGUiOiJhcGs6YXBpX2NyZWF0ZSJ9.WUl6NICtrQbKib5wKJFRV4ekS2-Z1XTVGmU-J5_RZzFhIpVRzJtlgqcia9SGxV5Drgvq15B9u8odl07OWxGxoUfQuDwr5N63BKYP1oVn_zAghX9-16AAWP7iUEdh6OE4abeoI9PXGylgmUarwaLBQZXrHdBWkrVSiHmUuRn3W4jVkdqjjZ7f5XZBimfey2zO-Dm-z95gN3VnyOl46xB9U5LPgXqrjZrDnQrFuokhDEf0YhqTmPXjGv8Xk8kRPVmlqMSnTiOc0O0iMlFZwSMBksBiRQlKVgqB7h66mB5zRx1TWRcEJ5NCkMz101hz5YuGq_rKZiGc1Gq6Tncw3EcVQw" \
    | grep -oP '"API_version":"\K[0-9]\.[0-9]'; done | sort | uniq -c | awk '{gsub("\\.0","",$2); print $2 " -> " $1}'
    ```

=== "Sample Response"
    ```
    1 -> 31
    2 -> 10
    3 -> 59
    ```

=== "Request Format"
    ```
    for i in {1..100}; do curl -s -k --location "https://<host>:9095/backend-service/1.0/demo" \
    --header "Host: default.gw.wso2.com" \
    --header "Authorization: Bearer <access-token>" \
    | grep -oP '"API_version":"\K[0-9]\.[0-9]'; done | sort | uniq -c | awk '{gsub("\\.0","",$2); print $2 " -> " $1}'
    ```