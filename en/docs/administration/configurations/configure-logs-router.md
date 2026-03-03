# Router Log Configurations

As the APK uses an Envoy proxy as the Router component, it only supports the logging mechanisms provided by the Envoy proxy. In the following sections, you may find how to enable Router access logs and debug logs.

To set up Router Logs, start by following the instructions outlined in the <a href="../../../setup/Customize-Configurations" target="_blank">customize configurations section</a>. These instructions will guide you through the process of acquiring the `values.yaml` file, which you will then use to tailor the log configurations to your specific needs.

## Router Access Logging

To enable the Router access logs, update the `values.yaml`'s `wso2.apk.dp.gatewayRuntime.deployment.router.logging` section with the following values. 

```yaml
  logging:
    accessLogs:
      enable: true
``` 

For the advanced configurations, you can configure Router access logs by using the following configs. Router access logs related configurations are in the `log_config.toml` file, which is located in ConfigMap file located in the following file in the APK helm chart.

```yaml
apk/helm-charts/templates/data-plane/gateway-components/log-conf.yaml
```

Setting `enable` as `true` will let you enable the Router access logs and the file path can be set up using the `logfile`. 

```yaml
[accessLogs]
enable = true
format = "[%START_TIME%] '%REQ(:METHOD)% %REQ(X-ENVOY-ORIGINAL-PATH?:PATH)% %PROTOCOL%' %RESPONSE_CODE% %RESPONSE_FLAGS% %BYTES_RECEIVED% %BYTES_SENT% %DURATION% %RESP(X-ENVOY-UPSTREAM-SERVICE-TIME)% '%REQ(X-FORWARDED-FOR)%' '%REQ(USER-AGENT)%' '%REQ(X-REQUEST-ID)%' '%REQ(:AUTHORITY)%' '%UPSTREAM_HOST%'\n"
```

### Traffic Logging

Traffic logging records headers and metadata related to a request and its corresponding response in JSON format and can be used to observe the communication between the client, gateway, and backend (upstream) services. Additionally, it captures the time taken for the request and response to be processed within the Gateway and the time taken for the backend (upstream) to respond.
This log gets printed once the Envoy request/response stream is completed.

You can choose to log request headers, response headers, backend request headers, and backend response headers by enabling the relevant properties under `wso2.apk.dp.gatewayRuntime.deployment.router.logging` in the `values.yaml` . Traffic logging is disabled by default unless at least one logging property is set to `true`.

```yaml
  logging:
    trafficLogging:
      requestLogging:
        enable: true
      responseLogging:
        enable: true
      backendRequestLogging:
        enable: true
      backendResponseLogging:
        enable: true
```

#### Configuration Details

| Property | Description |
| :--- | :--- |
| `ignoredPathPrefixes` | List of URL prefixes to exclude from logs to reduce noise. Any path starting with these prefixes will be ignored |
| `logAllHeaders` | If `true` captures all headers in the logs. If `false`, only captures those specified in `allowedHeaders`. |
| `maxPayloadSize` | Specifies the maximum size (in Bytes) of the body to be captured. Data exceeding this is truncated |
| `maxHeaders` | Limits the maximum number of headers to be logged per request/response |
| `maskedHeaders` | Sensitive headers that should not have their values exposed in the logs. |
| `allowedHeaders` | If `logAllHeaders` is set to false, this list specifies which headers should still be logged. Otherwise, this list will be ignored |
| `requestLogging` | If the `enable` property is set to `true`, it captures the headers of incoming requests from the Client to the Gateway |
| `responseLogging` | If the `enable` property is set to `true`, it captures the headers of outgoing responses from the Gateway to the Client |
| `backendRequestLogging` | If the `enable` property is set to `true`, it captures the headers of outgoing requests from the Gateway to the Backend |
| `backendResponseLogging` | If the `enable` property is set to `true`, it captures the headers of incoming responses from the Backend to the Gateway |
| `logPayload` | Available for each of the logging types above; determines if the request or response body (payload) should be included in the logs. |


!!! warning "Performance Impact"
    Logging payloads (especially large ones) can add latency to requests because the payload is stored in metadata. Use these settings carefully in production environments.


Sample traffic log configuration: 

```yaml
logging:
  trafficLogging:
    ignoredPathPrefixes: 
      - "/health"
    logAllHeaders: true
    maxPayloadSize: 15
    maskedHeaders: 
      - "authorization"
    allowedHeaders: []     
    maxHeaders: 8
    requestLogging:
      enable: true
      logPayload: true
    responseLogging:
      enable: true
      logPayload: true
    backendRequestLogging:
      enable: true
      logPayload: true
    backendResponseLogging:
      enable: true
      logPayload: true
```

Sample traffic log entry:

```json
{
  "authority": "host.docker.internal",
  "backend_proc_duration_us": 2655,
  "bytesReceived": 903185,
  "bytesSent": 36,
  "correlationId": "78bc9236-ad63-4f89-951e-86a8becb106f",
  "method": "GET",
  "path": "/endpoint/wait/0",
  "protocol": "HTTP/1.1",
  "requestBody": "{\n    \"chunks\":...(truncated)",
  "requestHeaders": {
    ":authority": "default.gw.wso2.com:9095",
    ":method": "GET",
    ":path": "/delayed-api/1.2.0/wait/0",
    ":scheme": "https",
  },
  "request_proc_duration_us": 3802,
  "responseBody": "{\"message\":\"Sec...(truncated)",
  "responseFlags": "-",
  "responseHeaders": {
    ":status": "200",
    "connection": "keep-alive",
    "content-type": "application/json",
    "date": "Tue, 03 Mar 2026 09:05:03 GMT",
    "keep-alive": "timeout=5",
    "transfer-encoding": "chunked",
    "vary": "Accept-Encoding"
  },
  "response_proc_duration_us": 147,
  "startTime": "1772528702.922906000",
  "status": 200,
  "total_duration_us": 9636,
  "upstreamHost": "192.168.5.2:3000",
  "upstreamRequestBody": "{\n    \"chunks\":...(truncated)",
  "upstreamRequestHeaders": {
    ":authority": "default.gw.wso2.com:9095",
    ":method": "GET",
    ":path": "/delayed-api/1.2.0/wait/0",
    ":scheme": "https"
  },
  "upstreamResponseBody": "{\"message\":\"Sec...(truncated)",
  "upstreamResponseHeaders": {
    ":status": "200",
    "connection": "keep-alive",
    "content-type": "application/json",
    "date": "Tue, 03 Mar 2026 09:05:03 GMT",
    "keep-alive": "timeout=5",
    "transfer-encoding": "chunked"
  },
  "userAgent": "PostmanRuntime/7.51.1"
}
```

## Router debug logs

To enable Router debug logs, provide the log level as trailing arguments for the envoy command as follows.

```yaml
-l trace, 
--log-level trace
--component-log-level upstream:debug,connection:trace
```

To enable the Router debug logs for APK Deployment, update the `values.yaml`'s `wso2.apk.dp.gatewayRuntime.deployment.router.env` section with the following values.

```yaml
router:
  env:
    TRAILING_ARGS: "--log-level trace"
``` 

For advance cases, you can do this by setting the `TRAILING_ARGS` environment variable in the Router. For example, Add the following line under router configuration in the gateway-runtime-deployment.yaml in the directory `apk/helm-charts/templates/data-plane/gateway-components/gateway-runtime/`.

```yaml
  - name: TRAILING_ARGS
    value: "--log-level trace"
```
The following example configuration can log request headers and response headers, and `ext_authz` information.

```yaml
  - name: TRAILING_ARGS
    value: "--component-log-level http:debug,http2:debug,conn_handler:debug,ext_authz:trace"
```
The following are different sections of an example log with the above log configuration. This log is generated by invoking an API request with `/http-bin-api11/1.0.8/get` path in <a href="http://httpbin.org" target="_blank">http-bin</a> API deployed APK. Different log sections are given in the order same as the order in which they are logged to the console.

Client to Router request headers:
```yaml
[2023-06-02 03:51:02.286][19][debug][http] [source/common/http/conn_manager_impl.cc:306] [C42] new stream
  [2023-06-02 03:51:02.287][19][debug][http] [source/common/http/conn_manager_impl.cc:972] [C42][S12509184374877692213] request headers complete (end_stream=true):
  ':authority', 'a3b58ccf-6ecc-4557-b5bb-0a35cce38256.gw.wso2.com'
  ':path', '/http-bin-api11/1.0.8/get'
  ':method', 'GET'
  'internal-key', 'eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2FwaW0ud3NvMi5jb20vcHVibGlzaGVyIiwgInN1YiI6ImFwa3VzZXIiLCAiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0My9vYXV0aDIvdG9rZW4iLCAiZXhwIjoxNjg1NjgxMjE0LCAibmJmIjoxNjg1Njc3NjE0LCAiaWF0IjoxNjg1Njc3NjE0LCAianRpIjoiMDFlZTAwZjgtMWQ2My0xNGIwLTgyNmMtMWZjMzcwZjc2NTgxIiwgImtleXR5cGUiOiJQUk9EVUNUSU9OIiwgInV1aWQiOiJiYmRmODc0Yi04ZWRjLTRlNDYtYTQ4NC0wODcwYWQxZWZjYmEiLCAidG9rZW5fdHlwZSI6IkludGVybmFsS2V5IiwgInN1YnNjcmliZWRBUElzIjpbeyJuYW1lIjoiaHR0cC1iaW4tYXBpMTEiLCAiY29udGV4dCI6Ii9odHRwLWJpbi1hcGkxMS8xLjAuOCIsICJ2ZXJzaW9uIjoiMS4wLjgiLCAicHVibGlzaGVyIjoiYXBrdXNlciIsICJ1dWlkIjoiYmJkZjg3NGItOGVkYy00ZTQ2LWE0ODQtMDg3MGFkMWVmY2JhIn1dfQ.HAyRoGU7UfDuAnAljuuyCbEii_URjdFUoz_ZC5pEr27bY_Sx69EU1jwU_sXcJmyZbvW5MMI68G4qXT1dp7Li2eRQc-mYsPMJmaLP3HFzWucMn939UqV6WgTsk6S_IrAGbEGl_IAvk7UZwRIi9C27uH4gekXv_yZ_R-x4q4yUUWoJfqAWPfaqbrqAl9NFbw26i6iWNgnsioI3LB8VTHTMBrAM90RRV2GrhOo3Rag3SXw_JhrV_YzcAJiIr6e4YEj88UxRCc2HjnNwrrAWrLodCwcoaCphwLfglhobrBzjBDjzu2i3GLlGe5Mv8SWfnIf5vAfKXX-wTyVQcoyjSNmhoQ'
  'user-agent', 'PostmanRuntime/7.29.2'
  'accept', '*/*'
  'postman-token', '265b20a0-5a1b-4644-abdd-1be3c689fa65'
  'accept-encoding', 'gzip, deflate, br'
  'connection', 'keep-alive'
  [2023-06-02 03:51:02.287][19][debug][http] [source/common/http/conn_manager_impl.cc:955] [C42][S12509184374877692213] request end stream
```
Router to Enforcer request information:
```yaml
[2023-06-02 03:51:02.287][19][trace][ext_authz] [source/extensions/filters/http/ext_authz/ext_authz.cc:74] [C42][S12509184374877692213] ext_authz filter calling authorization server
  [2023-06-02 03:51:02.287][19][trace][ext_authz] [source/extensions/filters/common/ext_authz/ext_authz_grpc_impl.cc:42] Sending CheckRequest: attributes {
  source {
  address {
  socket_address {
    address: "10.244.0.1"
    port_value: 55975
}
}
}
  destination {
  address {
  socket_address {
    address: "10.244.5.245"
    port_value: 9095
}
}
    principal: "*.gw.wso2.com"
}
  request {
  time {
    seconds: 1685677862
    nanos: 286915000
}
  http {
    id: "12509184374877692213"
    method: "GET"
  headers {
    key: ":authority"
    value: "a3b58ccf-6ecc-4557-b5bb-0a35cce38256.gw.wso2.com"
}
  headers {
    key: ":method"
    value: "GET"
}
  headers {
    key: ":path"
    value: "/http-bin-api11/1.0.8/get"
}
  headers {
    key: ":scheme"
    value: "https"
}
  headers {
    key: "accept"
    value: "*/*"
}
  headers {
    key: "accept-encoding"
    value: "gzip, deflate, br"
}
  headers {
    key: "internal-key"
    value: "eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2FwaW0ud3NvMi5jb20vcHVibGlzaGVyIiwgInN1YiI6ImFwa3VzZXIiLCAiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0My9vYXV0aDIvdG9rZW4iLCAiZXhwIjoxNjg1NjgxMjE0LCAibmJmIjoxNjg1Njc3NjE0LCAiaWF0IjoxNjg1Njc3NjE0LCAianRpIjoiMDFlZTAwZjgtMWQ2My0xNGIwLTgyNmMtMWZjMzcwZjc2NTgxIiwgImtleXR5cGUiOiJQUk9EVUNUSU9OIiwgInV1aWQiOiJiYmRmODc0Yi04ZWRjLTRlNDYtYTQ4NC0wODcwYWQxZWZjYmEiLCAidG9rZW5fdHlwZSI6IkludGVybmFsS2V5IiwgInN1YnNjcmliZWRBUElzIjpbeyJuYW1lIjoiaHR0cC1iaW4tYXBpMTEiLCAiY29udGV4dCI6Ii9odHRwLWJpbi1hcGkxMS8xLjAuOCIsICJ2ZXJzaW9uIjoiMS4wLjgiLCAicHVibGlzaGVyIjoiYXBrdXNlciIsICJ1dWlkIjoiYmJkZjg3NGItOGVkYy00ZTQ2LWE0ODQtMDg3MGFkMWVmY2JhIn1dfQ.HAyRoGU7UfDuAnAljuuyCbEii_URjdFUoz_ZC5pEr27bY_Sx69EU1jwU_sXcJmyZbvW5MMI68G4qXT1dp7Li2eRQc-mYsPMJmaLP3HFzWucMn939UqV6WgTsk6S_IrAGbEGl_IAvk7UZwRIi9C27uH4gekXv_yZ_R-x4q4yUUWoJfqAWPfaqbrqAl9NFbw26i6iWNgnsioI3LB8VTHTMBrAM90RRV2GrhOo3Rag3SXw_JhrV_YzcAJiIr6e4YEj88UxRCc2HjnNwrrAWrLodCwcoaCphwLfglhobrBzjBDjzu2i3GLlGe5Mv8SWfnIf5vAfKXX-wTyVQcoyjSNmhoQ"
}
  headers {
    key: "postman-token"
    value: "265b20a0-5a1b-4644-abdd-1be3c689fa65"
}
  headers {
    key: "user-agent"
    value: "PostmanRuntime/7.29.2"
}
  headers {
    key: "x-forwarded-proto"
    value: "https"
}
  headers {
    key: "x-request-id"
    value: "f0b7ae5f-e7b1-40dc-95fb-4f5137de926c"
}
  path: "/http-bin-api11/1.0.8/get"
  host: "a3b58ccf-6ecc-4557-b5bb-0a35cce38256.gw.wso2.com"
  scheme: "https"
  protocol: "HTTP/1.1"
}
}
  context_extensions {
    key: "basePath"
    value: "/http-bin-api11/1.0.8"
}
  context_extensions {
    key: "clusterName"
    value: "a3b58ccf-6ecc-4557-b5bb-0a35cce38256__a3b58ccf-6ecc-4557-b5bb-0a35cce38256.gw.wso2.com_http-bin-api111.0.8_8eb99584-29b8-45d2-986f-ff02097172270"
}
  context_extensions {
    key: "method"
    value: "GET"
}
  context_extensions {
    key: "name"
    value: "http-bin-api11"
}
  context_extensions {
    key: "path"
    value: "/http-bin-api11/1.0.8(.*)"
}
  context_extensions {
    key: "vHost"
    value: "a3b58ccf-6ecc-4557-b5bb-0a35cce38256.gw.wso2.com"
}
  context_extensions {
    key: "version"
    value: "1.0.8"
}
  metadata_context {
}
}
  [2023-06-02 03:51:02.344][19][debug][http] [source/common/http/async_client_impl.cc:105] async http request response headers (end_stream=false):
  ':status', '200'
  'content-type', 'application/grpc'
  'grpc-encoding', 'identity'
  'grpc-accept-encoding', 'gzip'
  'x-envoy-upstream-service-time', '55'
  [2023-06-02 03:51:02.387][19][debug][http] [source/common/http/async_client_impl.cc:132] async http request response trailers:
  'grpc-status', '0'
```

Enforcer to Router response information:
```yaml
[2023-06-02 03:51:02.387][19][trace][ext_authz] [source/extensions/filters/common/ext_authz/ext_authz_grpc_impl.cc:48] Received CheckResponse: status {
}
  ok_response {
  headers {
  header {
    key: "x-wso2-cluster-header"
    value: "a3b58ccf-6ecc-4557-b5bb-0a35cce38256__a3b58ccf-6ecc-4557-b5bb-0a35cce38256.gw.wso2.com_http-bin-api111.0.8_8eb99584-29b8-45d2-986f-ff02097172270"
}
}
  headers_to_remove: "apikey"
  headers_to_remove: "apikey"
  headers_to_remove: "internal-key"
  headers_to_remove: "x-wso2-client-certificate"
}
  dynamic_metadata {
  fields {
    key: "apiName"
  value {
    string_value: "http-bin-api11"
}
}
  fields {
    key: "apiVersion"
  value {
    string_value: "1.0.8"
}
}
  fields {
    key: "apk-enforcer-reply"
  value {
    string_value: "Ok"
}
}
  fields {
    key: "basePath"
  value {
    string_value: "/http-bin-api11/1.0.8"
}
}
  fields {
    key: "customorg"
  value {
    string_value: "a3b58ccf-6ecc-4557-b5bb-0a35cce38256"
}
}
  fields {
    key: "keyType"
  value {
    string_value: "PRODUCTION"
}
}
  fields {
    key: "organizationId"
  value {
    string_value: "a3b58ccf-6ecc-4557-b5bb-0a35cce38256"
}
}
  fields {
    key: "originalPath"
  value {
    string_value: "/http-bin-api11/1.0.8/get"
}
}
  fields {
    key: "token"
  value {
    string_value: "eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiZ2F0ZXdheV9jZXJ0aWZpY2F0ZV9hbGlhcyJ9.eyJpc3MiOiJodHRwczovL2FwaW0ud3NvMi5jb20vcHVibGlzaGVyIiwgInN1YiI6ImFwa3VzZXIiLCAiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0My9vYXV0aDIvdG9rZW4iLCAiZXhwIjoxNjg1NjgxMjE0LCAibmJmIjoxNjg1Njc3NjE0LCAiaWF0IjoxNjg1Njc3NjE0LCAianRpIjoiMDFlZTAwZjgtMWQ2My0xNGIwLTgyNmMtMWZjMzcwZjc2NTgxIiwgImtleXR5cGUiOiJQUk9EVUNUSU9OIiwgInV1aWQiOiJiYmRmODc0Yi04ZWRjLTRlNDYtYTQ4NC0wODcwYWQxZWZjYmEiLCAidG9rZW5fdHlwZSI6IkludGVybmFsS2V5IiwgInN1YnNjcmliZWRBUElzIjpbeyJuYW1lIjoiaHR0cC1iaW4tYXBpMTEiLCAiY29udGV4dCI6Ii9odHRwLWJpbi1hcGkxMS8xLjAuOCIsICJ2ZXJzaW9uIjoiMS4wLjgiLCAicHVibGlzaGVyIjoiYXBrdXNlciIsICJ1dWlkIjoiYmJkZjg3NGItOGVkYy00ZTQ2LWE0ODQtMDg3MGFkMWVmY2JhIn1dfQ.HAyRoGU7UfDuAnAljuuyCbEii_URjdFUoz_ZC5pEr27bY_Sx69EU1jwU_sXcJmyZbvW5MMI68G4qXT1dp7Li2eRQc-mYsPMJmaLP3HFzWucMn939UqV6WgTsk6S_IrAGbEGl_IAvk7UZwRIi9C27uH4gekXv_yZ_R-x4q4yUUWoJfqAWPfaqbrqAl9NFbw26i6iWNgnsioI3LB8VTHTMBrAM90RRV2GrhOo3Rag3SXw_JhrV_YzcAJiIr6e4YEj88UxRCc2HjnNwrrAWrLodCwcoaCphwLfglhobrBzjBDjzu2i3GLlGe5Mv8SWfnIf5vAfKXX-wTyVQcoyjSNmhoQ"
}
}
  fields {
    key: "tokenType"
  value {
    string_value: "Internal Key"
}
}
  fields {
    key: "vhost"
  value {
    string_value: "a3b58ccf-6ecc-4557-b5bb-0a35cce38256.gw.wso2.com"
}
}
}
```

Router to client response headers:
```yaml
[2023-06-02 03:51:05.746][19][debug][http] [source/common/http/conn_manager_impl.cc:1588] [C42][S12509184374877692213] encoding headers via codec (end_stream=false):
  ':status', '200'
  'date', 'Fri, 02 Jun 2023 03:51:11 GMT'
  'content-type', 'application/json'
  'server', 'envoy'
  'access-control-allow-origin', '*'
  'access-control-allow-credentials', 'true'
  'content-encoding', 'gzip'
  'vary', 'Accept-Encoding'
```

Follow <a href="{{envoy_path}}/operations/cli" target="_blank">command line options</a> for more information.

## Router wire logs

By enabling wire logs in the Router component, you can inspect headers, body, and trailers of the request/response. This is helpful to see the changes applied to the request or response after request path and/or response path interceptors.

To enable the wire logs, update the `values.yaml`'s `wso2.apk.dp.gatewayRuntime.deployment.router.logging` section with the following values.

```yaml
  logging:
    wireLogs:
      enable: true
``` 

For the advanced configurations, configure the wire logs, using the following configuration in the `log_config.toml` file, which is located in ConfigMap file located in the following file in the APK helm chart.

```yaml
apk/helm-charts/templates/data-plane/gateway-components/log-conf.yaml
```


```yaml
[wireLogs]
enable = true
include = ["Headers", "Body", "Trailers"]
```

You need to set `enable` property as `true` as well as keep at least one from the set {"Headers", "Body", "Trailers"} depending on which parts you want to inspect in the `include` array.

An API request invoked at APK with the above wire log configuration will generate logs similar to the following.

```yaml
[2023-06-02 03:51:02.389][19][info][lua] [source/extensions/filters/http/lua/lua_filter.cc:918] script log: 
[wirelog] >> request headers >> :authority: a3b58ccf-6ecc-4557-b5bb-0a35cce38256.gw.wso2.com
[wirelog] >> request headers >> :path: /http-bin-api11/1.0.8/get
[wirelog] >> request headers >> :method: GET
[wirelog] >> request headers >> :scheme: https
[wirelog] >> request headers >> user-agent: PostmanRuntime/7.29.2
[wirelog] >> request headers >> accept: */*
[wirelog] >> request headers >> postman-token: 265b20a0-5a1b-4644-abdd-1be3c689fa65
[wirelog] >> request headers >> accept-encoding: gzip, deflate, br
[wirelog] >> request headers >> x-forwarded-proto: https
[wirelog] >> request headers >> x-request-id: f0b7ae5f-e7b1-40dc-95fb-4f5137de926c
[wirelog] >> request headers >> x-wso2-cluster-header: a3b58ccf-6ecc-4557-b5bb-0a35cce38256__a3b58ccf-6ecc-4557-b5bb-0a35cce38256.gw.wso2.com_http-bin-api111.0.8_8eb99584-29b8-45d2-986f-ff02097172270
[2023-06-02 03:51:02.389][19][info][lua] [source/extensions/filters/http/lua/lua_filter.cc:918] script log: Body is empty
[2023-06-02 03:51:02.389][19][info][lua] [source/extensions/filters/http/lua/lua_filter.cc:918] script log: 
[2023-06-02 03:51:02.389][19][debug][http2] [source/common/http/http2/codec_impl.cc:1361] [C8] stream 15 closed: 0
[2023-06-02 03:51:02.389][19][debug][http2] [source/common/http/http2/codec_impl.cc:1414] [C8] Recouping 0 bytes of flow control window for stream 15.
[2023-06-02 03:51:05.745][19][info][lua] [source/extensions/filters/http/lua/lua_filter.cc:918] script log: 
[wirelog] << response headers << :status: 200
[wirelog] << response headers << date: Fri, 02 Jun 2023 03:51:11 GMT
[wirelog] << response headers << content-type: application/json
[wirelog] << response headers << connection: keep-alive
[wirelog] << response headers << server: gunicorn/19.9.0
[wirelog] << response headers << access-control-allow-origin: *
[wirelog] << response headers << access-control-allow-credentials: true
[wirelog] << response headers << content-encoding: gzip
[wirelog] << response headers << vary: Accept-Encoding
[2023-06-02 03:51:05.745][19][info][lua] [source/extensions/filters/http/lua/lua_filter.cc:918] script log: 
[wirelog] << response body << 
[wirelog] << response body << 
[2023-06-02 03:51:05.746][19][info][lua] [source/extensions/filters/http/lua/lua_filter.cc:918] script log: 
```
