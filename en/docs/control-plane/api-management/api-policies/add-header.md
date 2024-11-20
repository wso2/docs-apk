The header modification functionality allows the addition, modification, and removal of headers in both requests and responses. This capability is useful for enhancing control and flexibility in API interactions, ensuring that specific requirements for incoming requests and outgoing responses are consistently met. This functionality is configured using the HTTPRoute filters `RequestHeaderModifier` and `ResponseHeaderModifier` filters, which specify how headers should be manipulated at various stages of the request and response lifecycle.

To add headers to requests or responses for an API or an API operation, add the name of the header and the value you require as properties in the header policy, as shown below.

[![Add Header](../../../assets/img/api-policies/add-header-policy.png)](../../../assets/img/api-policies/add-header-policy.png)

!!! note
    While interceptors can be used for header modification as well, it is recommended to use the Add Header and Remove Header policies for that scenario, and use Interceptor policies for more advanced use cases.
