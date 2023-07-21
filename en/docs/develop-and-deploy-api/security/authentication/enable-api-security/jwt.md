# JWT Authentication

By default JWT authentication is enabled for all the APIs. The default configuration expect a bearer token in the request header `Authorization`. You can disable the JWT authentication or use a custom Authentication header for JWT authentication. 


## Before you begin

- [Create an API](../../get-started/quick-start-guide.md)

you can use the apk-conf file which is created in [Create an API](../../get-started/quick-start-guide.md) documentation and Save this content into a file named `EmployeeServiceDisabledJWT.apk-conf`.


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

### Disable JWT authentication

Modify the conent with the following config to disable JWT
  
   ```yaml
   authentication: 
    - authType: JWT
      enabled: false
   ```

Modified APK configuration content to disable JWT
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
   authentication: 
    - authType: JWT
      enabled: false
   ```
  
  Deploy the APK configuration. As you have not added any other authentication, you will be able to invoke requests without providing any security credentials. However, if you add API key authentication to the configuration, you will receive a 401 response, even if you use a valid access token, since you have disabled JWT authentication but added API-KEY.


### Use custom bearer header name


Modify the conent with the following config to use custom auth header name
  
   ```yaml
   authentication: 
    - authType: JWT
      headerName: testAuth
   ```

Modified APK configuration content to use custom auth header name
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
   authentication: 
    - authType: JWT
      headerName: testAuth
   ```
  
  Deploy the APK configuration. Try invoking the request with a valid token in the Authorization header; you will receive a 401 response. Now, try with the testAuth header and a valid access token; you should receive a successful response.