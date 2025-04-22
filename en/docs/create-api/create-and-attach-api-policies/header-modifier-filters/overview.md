# Header Modification

The header modification functionality allows the addition, modification, and removal of headers in both requests and responses. This capability is useful for enhancing control and flexibility in API interactions, ensuring that specific requirements for incoming requests and outgoing responses are consistently met. This functionality is configured using the HTTPRoute filters `RequestHeaderModifier` and `ResponseHeaderModifier` filters, which specify how headers should be manipulated at various stages of the request and response lifecycle.

Header modification can also be achieved using interceptors, as detailed in <a href="../../../../create-api/create-and-attach-api-policies/interceptors/interceptors-overview" target="_blank">this section</a>. In a scenario where both interceptors and header modification policies are used, **the header modification filters will be applied after the interceptor.** For example, consider the following scenario.

Assume the GET /uuid route is configured with the following.

1. An interceptor policy to add a header with the name "Interceptor-Header" and the value "Interceptor-Value".
2. A header modification policy to add a header with the name "Modifier-Header" and value "Modifier-Value".

In this scenario, the interceptor headers will be added **first**, followed by the headers from the header modification policy. 

You can also remove headers added by an interceptor using a header modification policy. Additionally, if you have configured a [mirror policy](../mirror-request-filters/overview.md) for this route, the modified headers will be sent in the mirrored request as well.

Header modification using HTTPRoute filters can be achieved in the APK in two ways.

1. <a href="../../../create-and-attach-api-policies/header-modifier-filters/header-modifier-via-rest-api" target="_blank">Using the APK Conf file</a>
2. <a href="../../../create-and-attach-api-policies/header-modifier-filters/header-modifier-via-crs" target="_blank">Using CRs</a>
