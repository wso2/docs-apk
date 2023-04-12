
In the APK, you can deploy APIs by using Kubernetes resources, if you prefer a Kubernetes-native experience. However, APK also expose REST APIs, and you can create APIs using any of the following three methods:

- [Create API using CRs](../create-and-deploy-apis/create-api-using-cr) - This method requires manually defining the API by creating YAML files for Kubernetes resources such as APIs, HTTPRoutes, Deployments, Services, ..etc, giving you complete control over the deployment but requiring some knowledge of Kubernetes and being potentially more time-consuming.

- [Create API from API definition](../create-and-deploy-apis/create-api-from-api-definition) - This method involves defining the API using Swagger/OpenAPI Specification, which allows you to define the API in a standardized way.

- [Create API from k8s service](../create-and-deploy-apis/create-api-from-k8s-service) - This method let's you use sequence of REST API calls to create an API from scratch without using a Swagger definition.
