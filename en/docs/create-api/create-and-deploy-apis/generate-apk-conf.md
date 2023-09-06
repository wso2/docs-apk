Following steps describe how to generate an APK configuration file.

1. Develop a backend service and deploy it in an environment you prefer.
2. Generate an API schema file, typically an OpenAPI file for your service.
3. You can start by providing your API schema file to the Configuration Service in  APK. This service generates an APK configuration file that includes important API metadata, rate limiting details, security settings, and other necessary information.To generate the APK configuration file corresponding to your API Schema, use the following command that invokes the configuration service. You can assign the values according to the table below.

```
curl -k --location 'https://api.am.wso2.com:9095/api/configurator/1.0.0/apis/generate-configuration' \
--header 'Host: api.am.wso2.com' \
--form 'apiType="REST"' \
--form 'definition=@"/Users/user/EmployeeServiceDefinition.json"'
```

The sample output of the generate APK Configuration (apk-conf) file will be as follows

```
---
name: "EmployeeServiceAPI"
context: ""
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
```

4. Save the content to a file with extension .apk-conf. For example, EmployeeService.apk-conf.
5. To optimize the configuration process, APK presents a VS Code plugin designed to offer syntax highlighting and intelligent suggestions. This plugin simplifies the incorporation of rate limitations, new resources, and security configurations into your API. Adapt the contents of the APK Configuration file as needed. For further details, refer to the section on [Enhance Configuration with APK Config Language Support](./apk-conf-lang-support.md)


!!!NOTE
    For production scenarios, it is recommended to commit the configuration to a source control system such as GitHub. This enables controlled and automated deployments through pipelines, ensuring a structured and controlled release process.

Once you have crafted your APK Configuration File, you have two convenient options for deploying them. Choose the deployment option that best suits your development workflow. Whether you prefer the customization capabilities of the Config Generator and CI/CD pipeline or the simplicity and speed of the Config Deployer, APK empowers you with flexible and efficient API deployment methods in the Kubernetes ecosystem.
