# Define production and sandbox endpoints

## Before you begin

- [Create an API](../../get-started/quick-start-guide.md)


You can use the apk-conf file which is created in [Create an API](../../get-started/quick-start-guide.md) documentation and save this content into a file named `EmployeeServiceEndpoints.apk-conf`.

!!! note
        Add `default.sandbox.gw.wso2.com` to your `/etc/hosts` file in order to try the sandbox endpoints.

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


## API level

It is mandatory to define at least one of the production endpoint or sandbox endpoint at the API level. Let's add different endpoints for sandbox and production.

Update the APK configuration as the following to add different endpoints to sandbox and production endpoints. You can use your own endpoints. In this example, we have used two different mocky endpoints; these endpoints might not work when you test. 

   ```yaml
   name: "EmployeeServiceAPI"
   basePath: "/test"
   version: "3.14"
   type: "REST"
   defaultVersion: false
   endpointConfigurations:
    production:
      endpoint: "https://run.mocky.io/v3/1327c339-354b-4080-8296-f6268365e67b"
    sandbox:
      endpoint: "https://run.mocky.io/v3/4bf0062b-042e-4adf-b8c9-7be0cf8745cb"
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

Deploy the APK configuration, and now you can send requests to different endpoints based on your environments, either production or sandbox.

- https://default.gw.wso2.com:9095/test/3.14/employee/
- https://default.sandbox.gw.wso2.com:9095/test/3.14/employee/

## Resource level

You can define different endpoint URLs for different resources. The following is an example APK configuration to configure different production and sandbox endpoint for `/employee` GET Resource.


   ```yaml
   name: "EmployeeServiceAPI"
   basePath: "/test"
   version: "3.14"
   type: "REST"
   defaultVersion: false
   endpointConfigurations:
    production:
      endpoint: "https://run.mocky.io/v3/1327c339-354b-4080-8296-f6268365e67b"
    sandbox:
      endpoint: "https://run.mocky.io/v3/4bf0062b-042e-4adf-b8c9-7be0cf8745cb"
   operations:
   - target: "/employee"
     verb: "GET"
     secured: true
     scopes: []
     endpointConfigurations:
       production:
         endpoint: "https://run.mocky.io/v3/4bf0062b-042e-4adf-b8c9-7be0cf8745cb"
       sandbox:
         endpoint: "https://run.mocky.io/v3/1327c339-354b-4080-8296-f6268365e67b"
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

Deploy the APK configuration and invoke the following get requests

- https://default.gw.wso2.com:9095/test/3.14/employee/
- https://default.sandbox.gw.wso2.com:9095/test/3.14/employee/

You will notice that the request goes to the appropriate endpoint based on the URL used. 