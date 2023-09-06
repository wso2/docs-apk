# API Definition Endpoint

API Definition Endpoint is a way to retrieve the openapi definition. By default, "/api-definition" endpoint is reserved and accessible using gateway for each API. You can customize this endpoint path using apk-conf file. Follow the steps below to customize the API Definition Endpoint.

## Before you begin

You can use the apk-conf file which is created in [Create an API](../../get-started/quick-start-guide.md) documentation and Save this content into a file named `EmployeeServiceEndpoints.apk-conf`.

Sample content before the modification is shown below.

   ```yaml
   name: "EmployeeServiceAPI"
   context: "/test"
   version: "3.14"
   type: "REST"
   defaultVersion: false
   endpointConfigurations:
    production:
      endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
   operations:
   - target: "/employee"
     verb: "GET"
     secured: true
     scopes: []
   - target: "/employee"
     verb: "POST"
     secured: true
     scopes: []
   - target: "/employee/{employeeId}"
     verb: "PUT"
     secured: true
     scopes: []
   - target: "/employee/{employeeId}"
     verb: "DELETE"
     secured: true
     scopes: []
   ```
## Default API Definition Endpoint

By default, the API Definition Endpoint is available at the following path and you can execute following command to retrieve the Open API Definition for a particular API.

=== "Request"
    ```
        curl --location 'https://<host>:9095/test/3.14/api-definition' \
        --header 'Host: <host>' \
        --header 'Authorization: bearer <access-token>'
    ```
=== "Sample Request"
    ```
        curl -k --location 'https://default.gw.wso2.com:9095/test/3.14/api-definition' \
        --header 'Host: default.gw.wso2.com' \
        --header 'Authorization: bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ'
    ```

!!!NOTE
    In a default API, the default API Definition Endpoint is also available at the following path: `https://<host>:9095/test/api-definition`

## Customize API Definition Endpoint

Update the APK configuration as the following to add API Definition Endpoint as definitionPath in apk-conf. 
Here, we have added a property named `definitionPath` with the new value `/docs`.

   ```yaml
   name: "EmployeeServiceAPI"
   context: "/test"
   version: "3.14"
   type: "REST"
   definitionPath: "/docs"
   defaultVersion: false
   endpointConfigurations:
     production:
       endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
   operations:
     - target: "/employee"
       verb: "GET"
       secured: true
       scopes: []
     - target: "/employee"
       verb: "POST"
       secured: true
       scopes: []
     - target: "/employee/{employeeId}"
       verb: "PUT"
       secured: true
       scopes: []
     - target: "/employee/{employeeId}"
       verb: "DELETE"
       secured: true
       scopes: []
   ```

## Deploy APK configuration

Refer [Create an API](../../get-started/quick-start-guide.md) to deploy the API using APK configuration.

## Access Custom API Definition Endpoint

Now you can execute following command to retrieve the Open API Definition using the custom defined path for a particular API.

=== "Request"
    ```
        curl --location 'https://<host>:9095/test/3.14/docs' \
        --header 'Host: <host>' \
        --header 'Authorization: bearer <access-token>'
    ```
=== "Sample Request"
    ```
        curl -k --location 'https://default.gw.wso2.com:9095/test/3.14/docs' \
        --header 'Host: default.gw.wso2.com' \
        --header 'Authorization: bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjg4MTMxNDQ0LCAibmJmIjoxNjg4MTI3ODQ0LCAiaWF0IjoxNjg4MTI3ODQ0LCAianRpIjoiMDFlZTE3NDEtMDA0Ni0xOGE2LWFhMjEtYmQwYTk4ZjYzNzkwIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoiZGVmYXVsdCJ9.RfKQq2fUZKZFAyjimvsPD3cOzaVWazabmq7b1iKYacqIdNjkvO9CQmu7qdtrVNDmdZ_gHhWLXiGhN4UTSCXv_n1ArDnxTLFBroRS8dxuFBZoD9Mpj10vYFSDDhUfFqjgMqtpr30TpDMfee1wkqB6K757ZSjgCDa0hAbv555GkLdZtRsSgR3xWcxPBsIozqAMFDCWoUCbgTQuA5OiEhhpVco2zv4XLq2sz--VRoBieO12C69KnGRmoLuPtvOayInvrnV96Tbt9fR0fLS2l1nvAdFzVou0SIf9rMZLnURLVQQYE64GR14m-cFRYdUI9vTsFHZBl5w-uCLdzMMofzZaLQ'
    ```

!!!NOTE
    In a default API, the API Definition Endpoint is also available at the following path: `https://<host>:9095/test/docs`