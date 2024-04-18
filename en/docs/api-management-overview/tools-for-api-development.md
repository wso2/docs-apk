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

## Deploy APIs using APK Tools

Learn how to efficiently create and deploy APIs using our developer-friendly tools and resources. 
These sections will guide you through the entire process, from API creation to deployment, then un-deployment ensuring you can easily bring your APIs to life.

- Step 1 - [Generate APK Configuration File]({{base_path}}/en/latest/create-api/create-and-deploy-apis/generate-apk-conf/) 
- Step 2 (optional) - Create or Update Configuration with [APK Config Language Support via VSCode Plugin]({{base_path}}/en/latest/create-api/create-and-deploy-apis/apk-conf-lang-support).
- Step 3 - Generate Kubernetes Custom Resources(CRs) and Deploy API by applying CRs to Kubernetes Cluster

    - Option 1 - [Generate K8s custom resources using config generator tool and Deploy the API using Kubernetes Client]({{base_path}}/en/latest/create-api/create-and-deploy-apis/create-and-deploy-api)
    - Option 2 - [Deploy API using APK Config Deployer tool]({{base_path}}/en/latest/create-api/create-and-deploy-apis/direct-deploy)

- Step 5 - [Undeploy API]({{base_path}}/en/latest/create-api/create-and-deploy-apis/direct-undeploy)

