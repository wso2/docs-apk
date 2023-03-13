# API Policies - Overview

An API policy is a collection of rules that are executed at the API Gateway. You can use API policies to make API invocations undergo behavioral changes before reaching the backend or you can use API policies to modify the API response that a client receives.

Generally, you would need to attach policies when you need to enforce a business logic that needs to be executed on the Request or Response flow of an API invocation. 

WSO2 APK allows you to attach API policies in the following instances.

- At the API-level.
- At the Operation-level.

You can not attach an API policy at two separate levels simultaneously. If you have attached a global policy for an API, WSO2 APK will not allow you to attach an Operation-level policy as well and vice versa. Furthermore, attaching an API varies as follows based on the approach you use to create an API:

| **Create an API from:** | **Attach Policies**                             |
|-------------------------|-------------------------------------------------|
| REST APIs               | Attach a policy at API-level or Operation-level |
| Custom Resources (CRs)  | Attach a policy at Operation-level              |

When you attach a policy at the API-level it will be applied globally to all the operations that correspond to the API. However, when you attach a policy at an operation level, it will only be applicable locally to a specific operation.

WSO2 APK has a set of default policies available out-of-the-box that cover most of the common use cases that you will need. You can attach APIs under the following main flows:

- Request Flow
- Response Flow
