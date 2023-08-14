
!!! note "Note"
    
    Custom Rate Limiting is only supported via CRs

If you encounter a situation where Simple Rate Limiting is insufficient, Custom Rate Limiting is the solution you should consider. With Custom Rate Limiting, you can create numerous custom rate limit keys and establish them through your own unique logic, which is executed against the request. You can set the custom rate limit keys using interceptor policies, and we recommend using a [Gateway level Interceptor Service Policy](../../create-and-attach-api-policies/interceptors/interceptors-via-crs/#configuring-gateway-level-interceptors) for this purpose.

To illustrate, suppose users named "Alice and "Bob" have a typical limit of four requests per minute, which is the standard limit for all users in the system. However, "Bob" is also in the "Admin" group that allows all the users in the group of limit of twenty requests per minute. To handle this type of scenario, you must have two rate limit keys, such as `rlkey_usergroup` for user group and `rlkey_user` for user. 

To achieve this scenario you have to define three `RateLimitPolicy` resources to meet the above example sceanrio as below:

#### Custom Ratelimit Policy for user Bob
```
apiVersion: dp.wso2.com/v1alpha1
kind: RateLimitPolicy
metadata:
  name: http-bin-ratelimit-user
spec:
  override:
    type: Custom
    custom:
      key: rlkey_user
      value: bob
      requestsPerUnit: 4
      unit: Minute
      organization: default
  targetRef:
    kind: Gateway
    name: default
    group: gateway.networking.k8s.io
```

#### Custom Ratelimit Policy for user Alice
```
apiVersion: dp.wso2.com/v1alpha1
kind: RateLimitPolicy
metadata:
  name: http-bin-ratelimit-user
spec:
  override:
    type: Custom
    custom:
      key: rlkey_user
      value: alice
      requestsPerUnit: 4
      unit: Minute
      organization: default
  targetRef:
    kind: Gateway
    name: default
    group: gateway.networking.k8s.io
```

#### Custom Ratelimit Policy for User Group called Admin
```
apiVersion: dp.wso2.com/v1alpha1
kind: RateLimitPolicy
metadata:
  name: http-bin-ratelimit-usergroup
spec:
  override:
    type: Custom
    custom:
      key: rlkey_usergroup
      value: admin
      requestsPerUnit: 20
      unit: Minute
      organization: default
  targetRef:
    kind: Gateway
    name: default
    group: gateway.networking.k8s.io
```

To achive the use case described above, interceptor service should set both `rlkey_usergroup` and `rlkey_user` for each request.

For example, when user "Bob" invoke a request at gateway, then request interceptor service response should have the following data set as below:
```
{
   ...
   ...
   rateLimitKeys: {
      rlkey_user: "bob"
      rlkey_usergroup: "admin"
   }
}
```

When the user "Bob" consumes his user level limt of four requests per minute, then he can consume another four requests using Admin quota. Note that the quata is reduced from both rate limit keys `rlkey_usergroup` and `rlkey_user` for a request invoked by a user. Therefore, "Bob" can consume a count in between zero and twenty per minute. This count can be zero, since some other users in the "Admin" group might have consumed tewenty count in a minute.

For reference, a sample interceptor service with custom rate limiting policy CRs and interceptor policy CRs can be found here: [sample-interceptor-service](https://github.com/wso2/apk/tree/main/samples/custom-ratelimit-interceptor-service)
