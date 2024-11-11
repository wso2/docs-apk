## Configuring API Manager Control Plane

API Manager can be configured in both ways.

  1. API Manager as the control plane for APK
  2. APK as a gateway to API Manager 

### API Manager as the control plane for APK

These are additional configuration to values.yaml file to provide control plane related configs to API Manager.

``` 
configurations:
    gatewayType: "APK"

publisher:
    enablePortalConfigurationOnlyMode: true

gateway:
# -- APIM Gateway environments
    environments:
        - name: "Default"
        type: "hybrid"
        provider: "wso2"
        gatewayType: "APK"
        displayInApiConsole: true
        description: "This is a hybrid gateway that handles both production and sandbox token traffic."
        showAsTokenEndpointUrl: true
        serviceName: "wso2am-gateway-service"
        servicePort: 9443
        wsHostname: "websocket.wso2.com"
        httpHostname: "carbon.super.gw.wso2.com:9095"
        websubHostname: "websub.wso2.com"
```

### APK as a gateway to API Manager 

1.  Configure supported gateway types in API Manager.

    Add following configuration to deployment.toml file to provide supported gateway types to API Manager. Here, need to provide the supported gateway types as `APK`.

    === "Both"
        ``` toml
            [apim]
            gateway_type = "Regular,APK"
        ```
    === "APK Only"
        ``` toml
            [apim]
            gateway_type = "APK"
        ```

2. Change the default gateway environment if APK Only scenario.

    Add following configuration to deployment.toml file to provide APK gateway as the default gateway environment to API Manager. Here, need to provide the default gateway type as `APK` and other relevant configurations.

    ``` toml
    [[apim.gateway.environment]]
    name = "Default"
    type = "hybrid"
    gateway_type = "APK"
    provider = "wso2"
    display_in_api_console = true
    description = "This is a hybrid gateway that handles both production and sandbox token traffic."
    show_as_token_endpoint_url = true
    service_url = "https://localhost:${mgt.transport.https.port}/services/"
    username= "${admin.username}"
    password= "${admin.password}"
    http_endpoint = "http://default.gw.wso2.com:9090"
    https_endpoint = "https://default.gw.wso2.com:9095"
    ```
