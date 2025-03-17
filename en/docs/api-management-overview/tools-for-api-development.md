WSO2 Kubernetes Gateway provides a set of REST APIs and tools to streamline the API development process. These APIs/tools are designed for API developers to create, mock, test and deploy APIs to a Kubernetes cluster.

## Kubernetes Gateway Tools for Enhanced API Development

- <b>Kubernetes Gateway Configuration File</b>

    A human-readable YAML interpretation of OpenAPI Specification (OAS) definitions with enhanced API and endpoint configurations. This simplifies API configuration, making it more approachable.

- <b>Kubernetes Gateway Config language support VSCode Plugin</b>
    
    The VSCode plugin provides an intuitive interface for writing Kubernetes Gateway Conf files, reducing the learning curve for developers. For more details, refer to the section on <a href="../../api-management-overview/apk-conf-lang-support" target="_blank">Enhance Configuration with Kubernetes Gateway Config Language Support</a>.

- <b><a href="../../catalogs/api-reference-config-generator" target="_blank">Config Generator</a></b>

    Provides a REST API to

      - automatically generate Kubernetes Gateway Configuration file from the provided OAS definition
      - generate the Kubernetes custom resources required for your APIs using the Kubernetes Gateway Configuration file.

- <b><a href="../../catalogs/api-reference-config-deployer" target="_blank">Config Deployer</a></b>

    Provides a REST API to create and deploy CRs to the Kubernetes server using Kubernetes Gateway configuration file, saving time and effort during the deployment process.

## Deploy/Undeploy APIs using Kubernetes Gateway Tools

Learn how to efficiently create and deploy APIs using our developer-friendly tools and resources. 
The following sections will guide you through the entire process, from API creation to deployment, then un-deployment ensuring you can easily bring your APIs to life.

### Step 1 - Generate Kubernetes Gateway Configuration File

Generating an Kubernetes Gateway Configuration file is a crucial step in setting up your API using Kubernetes Gateway enhanced tools within the WSO2 Kubernetes Gateway ecosystem. This file contains essential API metadata, security settings, rate limiting details, and other vital information. 

!!! note
    For production scenarios, it is recommended to commit the configuration to a source control system such as GitHub. This enables controlled and automated deployments through pipelines, ensuring a structured and controlled release process.

### Step 2 (optional) - Create or Update Configuration

To streamline the configuration process, Kubernetes Gateway offers the <a href="https://marketplace.visualstudio.com/items?itemName=WSO2.apk-config-language-support" target="_blank">Kubernetes Gateway Config Language Support Visual Studio Code (VS Code) extension</a>. This dynamic extension simplifies customization by offering syntax highlighting, auto-completion, validation and error checking for your Kubernetes Gateway configuration YAML files.

By incorporating the `Kubernetes Gateway Config Language Support` extension, you can enhance your configuration workflow within Visual Studio Code. This extension enables you to take advantage of smart features, which in turn improve the efficiency and precision of your configuration tasks.

### Step 3 - Generate Kubernetes Custom Resources(CRs) and Deploy API by applying CRs to Kubernetes Cluster

#### Option 1 - Deploy API using Kubernetes Gateway Config Deployer tool 

The Config Deployer streamlines the API deployment process by generating and applying CRs in a single step. With this option, you can use the Config Deployer to automatically generate the necessary CR configurations for your APIs and apply the generated CRs directly to your Kubernetes API server for rapid deployment. You can deploy the API directly into Kubernetes Gateway using API Schema definition and Kubernetes Gateway configuration file using the REST API.

!!! note
    To optimize the configuration process, Kubernetes Gateway presents a VS Code plugin designed to offer syntax highlighting and intelligent suggestions. This plugin simplifies the incorporation of rate limitations, new resources, and security configurations into your API. Adapt the contents of the Kubernetes Gateway Configuration file as needed. For further details, refer to the section on <a href="../../api-management-overview/apk-conf-lang-support" target="_blank">Enhance Configuration with Kubernetes Gateway Config Language Support</a>.

#### Option 2 - Generate K8s custom resources using config generator tool and Deploy the API using Kubernetes Client

The Config Generator simplifies the process of generating the required Custom Resources (CRs) for your APIs. You can use this tool to automatically create CRs based on your API specifications or Kubernetes Gateway Configuration file. Once the CRs are generated, you have the flexibility to:

1. Feed them into your CI/CD pipeline for automated and controlled deployment.
2. Apply them directly to your Kubernetes cluster using the standard "kubectl apply" command for a manual deployment approach.

By invoking the Configuration Service, you can generate Kubernetes artifacts specifically tailored for APIs. These artifacts can be applied to a Kubernetes cluster using standard command-line tools like kubectl. However, in production scenarios, direct execution of kubectl commands on the runtime may not be feasible. In such cases, pipeline jobs play a vital role, where the generated artifacts are applied to the runtime through automated processes.

You can generate K8s resources as a zip file from config-deployer service and apply it to the deployment through a CI/CD pipeline using kubectl.

You can follow steps and samples mentioned in <a href="../../create-api/create-and-deploy-apis/rest/create-rest-api-using-rest-api" target="_blank">Deploy a REST API via Kubernetes Gateway REST API</a> to test out the above flows.

### Step 5 - Undeploy API

{!includes/apk-conf-undeploy.md!}
