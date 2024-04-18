WSO2 APK provides a set of REST APIs and tools to streamline the API development process. These APIs/tools are designed for API developers to create APIs, mock APIs, and test APIs and deploying APIs to a Kubernetes cluster.

APK offers a suite of developer tools to streamline the API development process further.

## APK Tools for Enhanced API Development

- <b>APK Configuration File</b>

    A human-readable YAML interpretation of OpenAPI Specification (OAS) definitions with enhanced API and endpoint configurations. This simplifies API configuration, making it more approachable.

- <b>APK Config language support VSCode Plugin</b>
    
    VSCode plugin provides an intuitive interface for writing APK Conf files, reducing the learning curve for developers. For more details, refer to the section on [Enhance Configuration with APK Config Language Support]({{base_path}}/en/latest/create-api/create-and-deploy-apis/apk-conf-lang-support)

- <b>Config Generator</b>

    - Provide REST API to automatically generates APK Configuration file from the provided OAS definition 
    - Provide REST API to generate the CR set required for your APIs using APK Configuration file.

- <b>Config Deployer</b>

    Provide REST API to create and deploy CRs to the Kubernetes server using APK configuration file, saving time and effort during the deployment process.

## Deploy/Undeploy APIs using APK Tools

Learn how to efficiently create and deploy APIs using our developer-friendly tools and resources. 
These sections will guide you through the entire process, from API creation to deployment, then un-deployment ensuring you can easily bring your APIs to life.

### Step 1 - Generate APK Configuration File

Generating an APK Configuration file is a crucial step in setting up your API using APK enhanced tools within the WSO2 APK ecosystem. This file contains essential API metadata, security settings, rate limiting details, and other vital information. 

### Step 2 (optional) - Create or Update Configuration

To streamline the configuration process, APK offers the `APK Config Language Support` Visual Studio Code (VS Code) extension. This dynamic extension simplifies customization by offering syntax highlighting, auto-completion, validation and error checking for your APK configuration YAML files.

By incorporating the `APK Config Language Support` extension, you can enhance your configuration workflow within Visual Studio Code. This extension enables you to take advantage of smart features, which in turn improve the efficiency and precision of your configuration tasks.

### Step 3 - Generate Kubernetes Custom Resources(CRs) and Deploy API by applying CRs to Kubernetes Cluster

- Option 1 - Deploy API using APK Config Deployer tool 

The Config Deployer streamlines the API deployment process by generating and applying CRs in a single step. With this option, you can use the Config Deployer to automatically generate the necessary CR configurations for your APIs and apply the generated CRs directly to your Kubernetes API server for rapid deployment. You can deploy the API directly into APK using API Schema definition and APK configuration file using the REST API.

!!! note
    To optimize the configuration process, APK presents a VS Code plugin designed to offer syntax highlighting and intelligent suggestions. This plugin simplifies the incorporation of rate limitations, new resources, and security configurations into your API. Adapt the contents of the APK Configuration file as needed. For further details, refer to the section on [Enhance Configuration with APK Config Language Support]({{base_path}}/en/latest/create-api/create-and-deploy-apis/apk-conf-lang-support/)

- Option 2 - Generate K8s custom resources using config generator tool and Deploy the API using Kubernetes Client

The Config Generator simplifies the process of generating the required Custom Resources (CRs) for your APIs. You can use this tool to automatically create CRs based on your API specifications or APK Configuration file. Once the CRs are generated, you have the flexibility to:

1. Feed them into your CI/CD pipeline for automated and controlled deployment.
2. Apply them directly to your Kubernetes cluster using the standard "kubectl apply" command for a manual deployment approach.

By invoking the Configuration Service, you can generate Kubernetes artifacts specifically tailored for APIs. These artifacts can be applied to a Kubernetes cluster using standard command-line tools like kubectl. However, in production scenarios, direct execution of kubectl commands on the runtime may not be feasible. In such cases, pipeline jobs play a vital role, where the generated artifacts are applied to the runtime through automated processes.

You can generate K8s resources as a zip file from config-deployer service and apply it to the deployment through a CI/CD pipeline using kubectl.

### Step 5 - Undeploy API

{!templates/apk-conf-undeploy.md!}
