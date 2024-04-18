## Step 1. Develop a backend service
   
To begin, it's essential to have a backend service that your API will interact with. The APK Configuration file is generated based on the API schema, which, in turn, relies on the functionality of your backend service. 

In this guide, we will be using a backend deployed in a Kubernetes cluster. Prior to invoking the API, you will need to have this backend up and running.

You can create this sample backend with the following command.

``` bash
kubectl apply -f https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/qsg-sample-backend.yaml
```

Wait for this pod to spin up. You can check its status using the following command.

``` bash
kubectl get pods
```

## Step 2. Generate an API schema file for your service. 

You will need an OpenAPI Specification 3.x that describes the structure and behavior of your API. This file serves as the foundation for configuring your API and is essential for generating the APK Configuration file.

Save and download the sample [EmployeeServiceDefinition.json](https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/definitions/EmployeeServiceDefinition.json) file. This is the OAS definition of the API that we are going to deploy in APK.

## Step 3. Generate APK configuration file.
    
You can start by providing your API schema file to the Configuration Service in  APK. This service generates an APK configuration file that includes important API metadata, rate limiting details, security settings, and other necessary information to generate the APK configuration file corresponding to your API Schema.

Here, the definition can point to either an OpenAPI Specification file.
The definition can be provided as a local file or as a URL containing a definition file.

1. As a local file

```bash
curl -k --location 'https://api.am.wso2.com:9095/api/configurator/1.1.0/apis/generate-configuration' \
--header 'Host: api.am.wso2.com' \
--form 'definition=@"/Users/user/EmployeeServiceDefinition.json"'
```

2. As a URL

The following URLs contain valid sample definitions that you can use.

OpenAPI Specification for REST API:

```bash
curl -k --location 'https://api.am.wso2.com:9095/api/configurator/1.1.0/apis/generate-configuration' \
--header 'Host: api.am.wso2.com' \
---form 'url="https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/definitions/EmployeeServiceDefinition.json"' \
--form 'apiType="REST"'
```

The sample output of the generated APK Configuration (apk-conf) file will be as follows.

```yaml
name: "EmployeeServiceAPI"
basePath: ""
version: "3.14"
type: "REST"
defaultVersion: false
endpointConfigurations:
    production:
        endpoint: "http://employee-service:80"
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

## Step 5. Save the content to a file with the extension .apk-conf. 

For example, EmployeeService.apk-conf.

!!! note
    For production scenarios, it is recommended to commit the configuration to a source control system such as GitHub. This enables controlled and automated deployments through pipelines, ensuring a structured and controlled release process.

## Step 6. Update the APK configuration file.

!!! note
    To optimize the configuration process, APK presents a VS Code plugin designed to offer syntax highlighting and intelligent suggestions. This plugin simplifies the incorporation of rate limitations, new resources, and security configurations into your API. Adapt the contents of the APK Configuration file as needed. For further details, refer to the section on [Enhance Configuration with APK Config Language Support]({{base_path}}/en/latest/create-api/create-and-deploy-apis/apk-conf-lang-support/)