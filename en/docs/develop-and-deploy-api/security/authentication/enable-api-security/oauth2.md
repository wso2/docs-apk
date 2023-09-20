# OAuth2 Authentication

By default, OAuth2 authentication is enabled for all the APIs. The default configuration expects a bearer token in the request header `Authorization`. You can disable the OAuth2 authentication or use a custom Authentication header for OAuth2 authentication. 

## Before you begin

- [Create an API](../../../../get-started/quick-start-guide.md)

You can use the apk-conf file which is created in [Create an API](../../../../get-started/quick-start-guide.md) documentation and save this content into a file named `EmployeeServiceDisabledOAuth2.apk-conf`.


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

### Disable OAuth2 authentication

Modify the content with the following config to disable OAuth2
  
   ```yaml
   authentication: 
      - authType: OAuth2
        enabled: false
   ```

Sample APK configuration content after the modification to disable OAuth2 is shown below.


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
   authentication: 
      - authType: OAuth2
        enabled: false
   ```
  
  Deploy the APK configuration. As you have not added any other authentication, you will be able to invoke requests without providing any security credentials. However, if you add API key authentication to the configuration, you will receive a 401 response, even if you use a valid access token, since you have disabled OAuth2 authentication but added API-KEY.


### Use custom bearer header name


Modify the content with the following config to use custom auth header name
  
   ```yaml
   authentication: 
      - authType: OAuth2
        headerName: testAuth
   ```

Sample APK configuration content after the modification to use a custom auth header name is shown below.

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
   authentication: 
      - authType: OAuth2
        headerName: testAuth
   ```
  
  Deploy the APK configuration. Try invoking the request with a valid token in the Authorization header; you will receive a 401 response. Now, try with the testAuth header and a valid access token; you should receive a successful response.

### Pass the OAuth2 Token to Backend


Modify the content with the following config to send the OAuth2 header to backend.
  
   ```yaml
   authentication: 
      - authType: OAuth2
        headerName: Authorization
        sendTokenToUpstream: true
   ```

Sample APK configuration content after the modification to send the OAuth2 header to the backend is shown below.

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
   authentication: 
      - authType: OAuth2
        headerName: Authorization
        sendTokenToUpstream: true
   ```
  
  Deploy the APK configuration. Try invoking the request with a valid token in the Authorization header; you will receive a 200 response. Check the backend to see it receiving the OAuth2 token in the same header.