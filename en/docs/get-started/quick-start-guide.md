# Quick Start Guide

This section is a step-by-step guide to create, depoly and invoke an API using the WSO2 API Platform For Kubernetes.

## Before you begin...

Install the [prerequisites](../../setup/prerequisites) that are required to run WSO2 API Platform For Kubernetes.

## Step 1 - Start WSO2 API Platform For Kubernetes

{!includes/start-apk.md!}

## Step 2 - Create an Organization

WSO2 API Platform For Kubernetes system have default organization called `default`. Refer more details on organizations and organization creation using the [Create an Organization](../../setup/organizations).

!!! Note
    From here onwards, we will use the `default` organization for the quick start guide.

## Step 3 - Create and Deploy the API

!!! Note
    APIs can be created using several methods. In this quick start guide, we will use the Runtime API to create and deploy the API. Refer more details on API creation methods using the [Create and Deploy API](../../develop/runtime-api).



Before creating an API, you need sample backend service to invoke the API. In this quick start guide, we will use the [httpbin](https://httpbin.org/) service as the backend service.
The services should be created in a different namespace than the APK or Kubernetes System namespaces
To deploy sample backend use the following command.

```
kubctl apply -f sample-backend.yaml -n apk-backend
```
```

sample-backend.yaml
---
apiVersion: v1
kind: Service
metadata:
    name: backend
spec:
    ports:
      - name: http
        port: 80
        targetPort: 80
    selector:
        app: httpbin
---

```


Follow the instructions below to Create and deploy an API using the Runtime API:

```tab="Format"
    {
        "context": "",
        "name": "",
        "version": "",
        "type": "",
        "operations": []
    }
```

```tab="Example"
    {
        "context": "/pizza",
        "name": "PizzaShackAPI",
        "version": "1.0.0",
        "type": "REST",
        "operations": [
            {
                "target": "/get",
                "verb": "GET",
                "authTypeEnabled": true,
                "endpointConfig": {
                    "endpoint_type": "http",
                    "production_endpoints": {
                        "url": "http://httpbin.org"
                    }
                }
            }
        ]
    }
```

Execute the following cURL command with token and payload to create an API.

```tab="Format"
     curl -k -X POST -H "Authorization: Bearer <access-token>" -H "Content-Type: application/json" -H "Accept: application/json" -d <API-JSON-payload> "https://prod.api.am.wso2.com:9095/api/am/runtime/apis"
```

```tab="Example"
     curl -k -X POST -H "Authorization: Bearer ae4eae22-3f65-387b-a171-d37eaa366fa8" -H "Content-Type: application/json" -H "Accept: application/json" -d @data.json "https://prod.api.am.wso2.com:9095/api/am/runtime/apis"
```

!!! Note
    Generate access token to invoke API Create request using the following command.

    ```
    curl --location 'https://{router_service}:9095/oauth2/token' \
    --header 'Host: prod.idp.am.wso2.com' \
    --header 'Authorization: Basic NDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyOjRmYmQ2MmVjLWE5MmUtMTFlZC1hZmExLTAyNDJhYzEyMDAwMg==' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'grant_type=client_credentials'
    ```


## Step 4 - Invoke the REST API

{!includes/invoke-api.md!}