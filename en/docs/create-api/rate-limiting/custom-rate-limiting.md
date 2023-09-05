
!!! note "Note"
    
    Custom Rate Limiting is only supported via CRs

If you encounter a situation where Simple Rate Limiting is insufficient, Custom Rate Limiting is the solution you should consider. With Custom Rate Limiting, you can create numerous custom rate limit keys and establish them through your own unique logic, which is executed against the request. You can set the custom rate limit keys using interceptor policies, and we recommend using a [Gateway level Interceptor Service Policy](../../create-and-attach-api-policies/interceptors/interceptors-via-crs/#configuring-gateway-level-interceptors) for this purpose.

To illustrate, suppose users named "Alice and "Bob" have a typical limit of four requests per minute, which is the standard limit for all users in the system. However, "Bob" is also in the "Admin" group that allows all the users in the group of limit of twenty requests per minute. To handle this type of scenario, you must have two rate limit keys, such as `org_key` for user group and `user_key` for user. 

To achieve this scenario, you have to define three `RateLimitPolicy` resources to meet the above example scenario as below:

#### Custom Rate Limit Policy for user Bob
```
apiVersion: dp.wso2.com/v1alpha1
kind: RateLimitPolicy
metadata:
  name: http-bin-ratelimit-user
spec:
  override:
    custom:
      key: user_key
      value: bob
      requestsPerUnit: 4
      unit: Minute
      organization: default
  targetRef:
    kind: Gateway
    name: default
    group: gateway.networking.k8s.io
```

#### Custom Rate Limit Policy for user Alice
```
apiVersion: dp.wso2.com/v1alpha1
kind: RateLimitPolicy
metadata:
  name: http-bin-ratelimit-user
spec:
  override:
    custom:
      key: user_key
      value: alice
      requestsPerUnit: 4
      unit: Minute
      organization: default
  targetRef:
    kind: Gateway
    name: default
    group: gateway.networking.k8s.io
```

#### Custom Rate Limit Policy for User Group called Admin
```
apiVersion: dp.wso2.com/v1alpha1
kind: RateLimitPolicy
metadata:
  name: http-bin-ratelimit-usergroup
spec:
  override:
    custom:
      key: org_key
      value: admin
      requestsPerUnit: 20
      unit: Minute
      organization: default
  targetRef:
    kind: Gateway
    name: default
    group: gateway.networking.k8s.io
```

When invoking the API, the request headers should contain both `org_id` and `user_id` pointing to the respective values (as shown below). This can be achieved by using an interceptor service to set both `org_id` and `user_id` for each request.

For example, when user "Bob" invokes a request at gateway, then the request interceptor service response should have the following data set:
```
{
   ...
   ...
   rateLimitKeys: {
      user_id: "bob"
      org_id: "admin"
   }
}
```

When the user "Bob" consumes his user level limit of four requests per minute, then he can consume another four requests using Admin quota. Note that the quota is reduced from both rate limit keys `org_key` and `user_key` for a request invoked by a user. Therefore, "Bob" can consume a count in between zero and twenty per minute. This count can be zero, since some other users in the "Admin" group might also have consumed twenty requests in a minute.

For reference, a sample interceptor service with custom rate limiting policy CRs and interceptor policy CRs can be found here: [sample-interceptor-service](https://github.com/wso2/apk/tree/main/samples/custom-ratelimit-interceptor-service)
