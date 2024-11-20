# Add API Policy to API in API Manager

Policies generally enforce some business logic that needs to be executed on the Request or Response flow of an API invocation. A policy is a collection of rules that will be executed at the API Gateway. Using policies we can make API invocations undergo slight behavioural modifications before reaching the backend. In a similar manner, we can modify the API response a client receives.

API Manager ships a default set of policies that cover most of the common use cases that you will need. You can attach policies to the API in the [API Manager publisher portal](https://am.wso2.com/publisher){:target="_blank"}.

The list of supported policies are as follows.

1. Request flow:
    - [Add Header](./add-header.md){:target="_blank"}
    - [Remove Header](./remove-header.md){:target="_blank"}
    - [Call Interceptor Service](./interceptor-service.md){:target="_blank"}
    - [Mirror Request](./mirror-request.md){:target="_blank"}
    - [Redirect Request](./redirect-request.md){:target="_blank"}
    - [Backend JWT](./backend-jwt.md){:target="_blank"}
2. Response flow:
    - [Add Header](./add-header.md){:target="_blank"}
    - [Remove Header](./remove-header.md){:target="_blank"}
    - [Call Interceptor Service](./interceptor-service.md){:target="_blank"}