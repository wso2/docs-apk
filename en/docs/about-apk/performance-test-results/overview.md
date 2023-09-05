# Performance Test Results

The performance of APK was evaluated using an API that triggers a "Netty Echo Service" which echoes back any requests sent to it. The test cases utilized a secured API that directly invoked the backend via APK gateway.

Tests were conducted to assess the performance of APK with varying concurrent user loads of 10, 50, 100, 200, 500, and 1000 users, where concurrent users refer to multiple users accessing APK simultaneously. Different message sizes (payloads) of 50B, 1KiB, 10KiB, and 100KiB were used in the tests. The back-end delay was 0ms, and Apache JMeter was used as the test client. The test scenarios were executed over a 20-minute timeframe, which included a 5-minute warmup period. Test results were analyzed by excluding outcomes relevant to the warmup period.

Two key performance metrics were used to measure the performance of each test.

- Throughput: The number of requests that the APK processes during a specific time interval (e.g. per second).
- Response Time : The end-to-end latency for an operation of invoking a service in APK. The complete distribution of response times was recorded.

## Deployment used for the performance tests

Given below are the details of the deployment that was used for the performance test that is recorded in this documentation.

[![Deployment](../../assets/img/performance-test-results/apk-perf-test.png)](../../assets/img/performance-test-results/apk-perf-test.png)

!!! important
    For better throughput and performance, it is recommended to use compute optimized nodes for the cluster and the Jmeter servers.

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Azure VM Instance Type</th>
    <th>vCPU</th>
    <th>Mem(GiB)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Apache JMeter Client</td>
    <td>Standard F8s v2</td>
    <td>8</td>
    <td>16</td>
  </tr>
  <tr>
    <td>Apache JMeter Server 01</td>
    <td>Standard F8s v2</td>
    <td>8</td>
    <td>16</td>
  </tr>
  <tr>
    <td>Apache JMeter Server 02</td>
    <td>Standard F8s v2</td>
    <td>8</td>
    <td>16</td>
  </tr>
  <tr>
    <td>AKS cluster (two node pools)</td>
    <td>Standard F8s v2</td>
    <td>8</td>
    <td>16</td>
  </tr>
</tbody>
</table>

- The operating system used for the Jmeter servers and the client in Ubuntu 20.04 LTS
- Java version used for tests is OpenJDK Runtime Environment Temurin-11.0.20+8 (build 11.0.20+8)


## Performance test scripts

All scripts used to run the performance tests and analyze results are in the following repositories.

- [https://github.com/wso2/apk/tree/main/test/performance](https://github.com/wso2/apk/tree/main/test/performance)


## Results

[APK](https://wso2.com/api-platform-for-k8s/) is powered by the open source project called [Envoy Proxy](https://www.envoyproxy.io/). Envoy allows to change number of worker threads used for the computations. More details regarding the envoy `--concurrency` configuration are available in [here](https://www.envoyproxy.io/docs/envoy/latest/operations/cli#cmdoption-concurrency). Additionally, an explanation for the **Envoy Threading Model** includes [here](https://www.envoyproxy.io/docs/envoy/latest/operations/cli#cmdoption-concurrency).

Since we used the `Standard F8s v2` instances (CPU count = 4) for the performance tests and to do a test result comparison, we executed the above-mentioned user counts and payload sizes considering two concurrency levels. We assigned below describing `CPU amount` and `concurrency count` to the Router when applying APK test deployments. In order to match the increased concurrency level, we increased the CPU allocation to the Router also. Below table lists the test scenarios explained in this documentation.

<table>
<thead>
  <tr>
    <th>Test Scenario</th>
    <th>CPU allocation for the Router (m)</th>
    <th>Router concurrency level</th>
    <th>Test results</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>1</td>
    <td>1000 (1CPU)</td>
    <td>2</td>
    <td><a href="{{base_path}}/en/latest/about-apk/performance-test-results/gateway-router-with-one-cpus/">Router with one CPU</a</td>
  </tr>
  <tr>
    <td>2</td>
    <td>2000 (2CPU)</td>
    <td>2</td>
    <td><a href="{{base_path}}/en/latest/about-apk/performance-test-results/gateway-router-with-two-cpus/">Router with two CPU</a</td>
  </tr>
</tbody>
</table>
