Generating an APK Configuration file is a crucial step in setting up your API using APK enhanced tools within the WSO2 APK ecosystem. 
This file contains essential API metadata, security settings, rate limiting details, and other vital information. 
In this guide, we'll walk you through the process of generating this configuration file to streamline your API management.

Following steps describe how to generate an APK configuration file.

1. Develop a backend service and deploy it in an environment you prefer.
   
    To begin, it's essential to have a backend service that your API will interact with. The APK Configuration file is generated based on the API schema, which, in turn, relies on the functionality of your backend service. 

2. Generate an API schema file, typically an OpenAPI file for your service. 

    You will need an OpenAPI Specification 3.x or a GraphQL definition file that describes the structure and behavior of your API. This file serves as the foundation for configuring your API and is essential for generating the APK Configuration file.

3. Generate APK configuration file.
    
    You can start by providing your API schema file to the Configuration Service in  APK. This service generates an APK configuration file that includes important API metadata, rate limiting details, security settings, and other necessary information to generate the APK configuration file corresponding to your API Schema.

    Here, the definition can point to either an OpenAPI Specification file or a GraphQL SDL file.
    The definition can be provided as a local file or as a URL containing a definition file.
    
    1. As a local file
    ```
    curl -k --location 'https://api.am.wso2.com:9095/api/configurator/1.0.0/apis/generate-configuration' \
    --header 'Host: api.am.wso2.com' \
    --form 'definition=@"/Users/user/EmployeeServiceDefinition.json"'
    ```
    
    2. As a URL

    The following URLs contain valid sample definitions that you can use.

    OpenAPI Specification for REST API:
    ```
    curl -k --location 'https://api.am.wso2.com:9095/api/configurator/1.0.0/apis/generate-configuration' \
    --header 'Host: api.am.wso2.com' \
    ---form 'url="https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/definitions/EmployeeServiceDefinition.json"' \
    --form 'apiType="REST"'
    ```

    GraphQL SDL:
    ```
    curl -k --location 'https://api.am.wso2.com:9095/api/configurator/1.0.0/apis/generate-configuration' \
    --header 'Host: api.am.wso2.com' \
    ---form 'url="https://raw.githubusercontent.com/wso2/apk/main/developer/tryout/samples/definitions/StarWars.graphql"' \
    --form 'apiType="REST"'
    ```

    The sample output of the generated APK Configuration (apk-conf) file will be as follows.
    
    ```
    ---
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

5. Save the content to a file with the extension .apk-conf. For example, EmployeeService.apk-conf.
6. Update the APK configuration file with additional API configurations as needed, such as Rate limits, CORs configurations.

     To optimize the configuration process, APK presents a VS Code plugin designed to offer syntax highlighting and intelligent suggestions. This plugin simplifies the incorporation of rate limitations, new resources, and security configurations into your API. Adapt the contents of the APK Configuration file as needed. For further details, refer to the section on [Enhance Configuration with APK Config Language Support](./apk-conf-lang-support.md)

    !!!NOTE 
        For production scenarios, it is recommended to commit the configuration to a source control system such as GitHub. This enables controlled and automated deployments through pipelines, ensuring a structured and controlled release process.

7. Deploy the API to a Kubernetes cluster.

     Once you have crafted your APK Configuration File, you have two convenient options for deploying them. Choose the deployment option that best suits your development workflow. Whether you prefer the customization capabilities of the Config Generator and CI/CD pipeline or the simplicity and speed of the Config Deployer, APK empowers you with flexible and efficient API deployment methods in the Kubernetes ecosystem.

     - Option 1 - [Generate K8s custom resources using config generator tool and Deploy the API using Kubernetes Client](../create-and-deploy-api)
     - Option 2 - [Deploy API using APK Config Deployer tool](../direct-deploy)

