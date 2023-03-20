# API Policies - Overview

API policies are a powerful tool in WSO2 APK for enforcing business logic and modifying API requests and responses. You can attach policies at the API-level or operation-level, in either the request or response flow. WSO2 APK comes with a set of default policies that cover most common use cases that will suit your specific needs.

Keep in mind that you cannot attach an API policy at two separate levels simultaneously and that the approach for attaching policies varies depending on the interface that you are using (i.e., CLI or REST API interface) to create the APIs.

| **Create an API from:** | **Attach Policies**                             |
|-------------------------|-------------------------------------------------|
| REST APIs               | Attach a policy at API-level or Operation-level |
| Custom Resources (CRs)  | Attach a policy at Operation-level              |  

When you attach a policy at the API-level, it will be applied globally to all the operations that correspond to the API. However, when you attach a policy at an operation level, it will only be applicable locally to a specific operation.

## What's Next?

- [Learn to attach API Policies using the REST API Interface](../../develop-and-deploy-api/api-policies/attach-policies-via-rest-api)
- [Learn to attach API Policies using a Custom Resource (CR)](../../develop-and-deploy-api/api-policies/attach-policies-via-crs)
