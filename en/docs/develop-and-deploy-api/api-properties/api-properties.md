# Define API Properties

## Before you begin

- <a href="../../../get-started/quick-start-guide" target="_blank">Create an API</a>


You can use the apk-conf file which is created in <a href="../../../get-started/quick-start-guide#generate-apk-configuration-file-from-the-openapi-definition" target="_blank">Create an API</a> documentation and save this content into a file named `EmployeeServiceEndpoints.apk-conf`.

Sample content before the modification is shown below.

   ```yaml
   name: "EmployeeServiceAPI"
   basePath: "/test"
   version: "3.14"
   type: "REST"
   defaultVersion: false
   endpointConfigurations:
    production:
      endpoint: "https://run.mocky.io/v3/1327c339-354b-4080-8296-f6268365e67b"
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

## Adding API Properties

Update the APK configuration as the following to add API Properties as additionalProperties in apk-conf. 
Here, we have added a property named `enableStore` with the value `true`.

   ```yaml
   name: "EmployeeServiceAPI"
   basePath: "/test"
   version: "3.14"
   type: "REST"
   defaultVersion: false
   endpointConfigurations:
     production:
       endpoint: "https://run.mocky.io/v3/1327c339-354b-4080-8296-f6268365e67b"
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
   additionalProperties:
     - name: "enableStore"
       value: "true"
   ```

## Deploy APK configuration

Refer <a href="../../../get-started/quick-start-guide#deploy-the-api-in-apk" target="_blank">Create an API</a> to deploy the API using APK configuration.