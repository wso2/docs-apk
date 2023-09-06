# Define API Properties

## Before you begin

- [Create an API](../../get-started/quick-start-guide.md)


You can use the apk-conf file which is created in [Create an API](../../get-started/quick-start-guide.md) documentation and Save this content into a file named `EmployeeServiceEndpoints.apk-conf`.

Sample content before the modification is shown below.

   ```yaml
   name: "EmployeeServiceAPI"
   basePath: "/test"
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
   additionalProperties:
     - name: "enableStore"
       value: "true"
   ```

## Deploy APK configuration

Refer [Create an API](../../get-started/quick-start-guide.md) to deploy the API using APK configuration.