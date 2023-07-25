# Define production and sandbox endpoints

## Before you begin

- [Create an API](../../get-started/quick-start-guide.md)


You can use the apk-conf file which is created in [Create an API](../../get-started/quick-start-guide.md) documentation and Save this content into a file named `EmployeeServiceEndpoints.apk-conf`.

Sample content before the modification is shown below.

   ```yaml
   name: "EmployeeServiceAPI"
   context: "/test"
   version: "3.14"
   type: "REST"
   organization: "apk-org"
   vhosts:
    production:
    - "default.gw.wso2.com"
   defaultVersion: false
   endpointConfigurations:
    production:
      endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
   operations:
   - target: "/employee"
     verb: "GET"
     authTypeEnabled: true
    scopes: []
   - target: "/employee"
     verb: "POST"
     authTypeEnabled: true
     scopes: []
   - target: "/employee/{employeeId}"
     verb: "PUT"
     authTypeEnabled: true
     scopes: []
   - target: "/employee/{employeeId}"
     verb: "DELETE"
     authTypeEnabled: true
     scopes: []
   ```


## API level

It is mandatory to define at least one of the production endpoint or sandbox endpoint at the API level. Let's add different endpoints for sandbox and production.

Update the APK configuration as the following to add different endpoints to sandboc and prudction endpoints. You can use your own endpoints. In this example we have used two different mocky endpoints, these endpoints might not work when you test. 


   ```yaml
   name: "EmployeeServiceAPI"
   context: "/test"
   version: "3.14"
   type: "REST"
   organization: "apk-org"
   vhosts:
    production:
    - "default.gw.wso2.com"
    sandbox: 
    - "sand.gw.wso2.com"
   defaultVersion: false
   endpointConfigurations:
    production:
      endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
    sandbox:
      endpoint: "https://run.mocky.io/v3/4bf0062b-042e-4adf-b8c9-7be0cf8745cb"
   operations:
   - target: "/employee"
     verb: "GET"
     authTypeEnabled: true
    scopes: []
   - target: "/employee"
     verb: "POST"
     authTypeEnabled: true
     scopes: []
   - target: "/employee/{employeeId}"
     verb: "PUT"
     authTypeEnabled: true
     scopes: []
   - target: "/employee/{employeeId}"
     verb: "DELETE"
     authTypeEnabled: true
     scopes: []
   ```

Deploy the APK configuration, and now you can send requests to different endpoints based on your environments, either production or sandbox.

- https://default.gw.wso2.com:9095/test/3.14/employee/
- https://sand.gw.wso2.com:9095/test/3.14/employee/

## Resource level

You can define different endpoint URLs for different resources. Following is the example APK configuration to configure different production and sandbox endpoint for `/employee` GET Resource.


   ```yaml
   name: "EmployeeServiceAPI"
   context: "/test"
   version: "3.14"
   type: "REST"
   organization: "apk-org"
   vhosts:
    production:
    - "default.gw.wso2.com"
    sandbox: 
    - "sand.gw.wso2.com"
   defaultVersion: false
   endpointConfigurations:
    production:
      endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
    sandbox:
      endpoint: "https://run.mocky.io/v3/4bf0062b-042e-4adf-b8c9-7be0cf8745cb"
   operations:
   - target: "/employee"
     verb: "GET"
     authTypeEnabled: true
     scopes: []
     endpointConfigurations:
       production:
         endpoint: "https://run.mocky.io/v3/4bf0062b-042e-4adf-b8c9-7be0cf8745cb"
       sandbox:
         endpoint: "https://run.mocky.io/v3/85516819-1edd-412b-a32b-a9284705a0b4"
   - target: "/employee"
     verb: "POST"
     authTypeEnabled: true
     scopes: []
   - target: "/employee/{employeeId}"
     verb: "PUT"
     authTypeEnabled: true
     scopes: []
   - target: "/employee/{employeeId}"
     verb: "DELETE"
     authTypeEnabled: true
     scopes: []
   ```

Deploy the APK configuration and invoke the following get requests

- https://default.gw.wso2.com:9095/test/3.14/employee/
- https://sand.gw.wso2.com:9095/test/3.14/employee/

You will notice that the request goes to the appropriate endpoint based on the URL used. 