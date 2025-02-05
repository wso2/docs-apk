# Define API Scopes

API Scopes are used to define the access level of an API resources. You can define API Scopes for an API using the APK configuration file.

## Before you begin

You can use the apk-conf file which is created in <a href="../../../get-started/quick-start-guide" target="_blank">Create an API</a> documentation and save this content into a file named `EmployeeServiceEndpoints.apk-conf`.

Sample content before the modification is shown below.

   ```yaml
   name: "EmployeeServiceAPI"
   basePath: "/test"
   version: "3.14"
   type: "REST"
   defaultVersion: false
   endpointConfigurations:
    production:
      endpoint: "http://employee-service:8080"
   operations:
   - target: "/employees"
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
## Invoke API using access token without API Scopes

Before adding the scopes, let's deploy and invoke the API.
Refer the <a href="../../../get-started/quick-start-guide" target="_blank">Quick Start Guide</a> documentation to deploy and invoke the API.

## Adding API Scopes

Update the APK configuration as the following to add API Scopes to relevant operations in apk-conf. 
Here, we have added a property named `scopes` with the value `wso2` for `/employees` resource.

   ```yaml
   name: "EmployeeServiceAPI"
   basePath: "/test"
   version: "3.14"
   type: "REST"
   defaultVersion: false
   endpointConfigurations:
     production:
       endpoint: "http://employee-service:8080"
   operations:
     - target: "/employees"
       verb: "GET"
       secured: true
       scopes: ["wso2"]
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

Refer <a href="../../../get-started/quick-start-guide" target="_blank">Create an API</a> to deploy the API using the updated APK configuration.

## Invoke API using access token without API Scopes
Refer <a href="../../../get-started/quick-start-guide" target="_blank">Invoke an API</a>. Now, you will receive a 403 Forbidden response as the access token does not have the required scope.

## Invoke API using access token with API Scopes

1. Execute the following request to generate the access token with scope. Use the base64 encoded value of the colon separated client Id and client secret provided in the table below in the Authorization header of the request. We will be using the client credentials grant type with scopes to generate the token.

   | Field         | Value                                |
   | ------------- | ------------------------------------ |
   | Client ID     | 45f1c5c8-a92e-11ed-afa1-0242ac120002 |
   | Client Secret | 4fbd62ec-a92e-11ed-afa1-0242ac120002 |

=== "Request"
    ```
       curl --location 'https://<host>:9095/oauth2/token' \
       --header 'Host: <host>' \
       --header 'Authorization: Basic <Base64Encoded(clientId:clientSecret)>' \
       --header 'Content-Type: application/x-www-form-urlencoded' \
       --data-urlencode 'grant_type=client_credentials&scope=<scope>'
    ```
=== "Sample Request"
    ```
        curl -k --location 'https://idp.am.wso2.com:9095/oauth2/token' \
        --header 'Host: idp.am.wso2.com' \
        --header 'Authorization: Basic NDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyOjRmYmQ2MmVjLWE5MmUtMTFlZC1hZmExLTAyNDJhYzEyMDAwMg==' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'grant_type=client_credentials&scope=wso2'
    ```
=== "Sample Response"
    ```
        {"access_token":"eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2lkcC5hbS53c28yLmNvbS90b2tlbiIsICJzdWIiOiI0NWYxYzVjOC1hOTJlLTExZWQtYWZhMS0wMjQyYWMxMjAwMDIiLCAiZXhwIjoxNjkyNzcxNDczLCAibmJmIjoxNjkyNzY3ODczLCAiaWF0IjoxNjkyNzY3ODczLCAianRpIjoiMDFlZTQxNzQtNjkxNC0xMTZlLWE5NDAtMTY2Y2NkZWZjNWUzIiwgImNsaWVudElkIjoiNDVmMWM1YzgtYTkyZS0xMWVkLWFmYTEtMDI0MmFjMTIwMDAyIiwgInNjb3BlIjoid3NvMiJ9.Z8OctupJzD0X5rcgREUfZCUMI3I-xzvXRBhLscjxPo-53fvtJZ6vjR_gINt5DHIgv0QgjUM66H9fHyxV6n2EUE3xFZ1mE-SDti2hK0kwUSvSSFEwtRTDg3mKewuPWbvms4DvFcSJdg-0b9j2F4L-4Fpc13uh8NuuLiA8UH2qFRvRd_0lkEqWxoi0I8ZD_4qkaOL-by1brq3YVMrubIGbuiuN6vy79QR4XZ0Y5JrrtD9jCbVznqJ7M31zTAmRtRpk4EA25oYOdC0xZzsMRcoPfVcGNAUUEcguNSxMXjrVEInFmxpOtLAqjIKmODzP47jJw-8W_DC4ZRPf2UFCwcD3LQ", "token_type":"Bearer", "expires_in":3600, "scope":"wso2"}
    ```

Now you can use this access token to successfully invoke the scoped resources.
