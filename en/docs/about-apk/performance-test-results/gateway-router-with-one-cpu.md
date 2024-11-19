The table below displays the resource allocations for the Gateway related components of APK for the performance tests.

<table>
<thead>
  <tr>
    <th>Container Name</th>
    <th>Requesting Memory Amount (Mi)</th>
    <th>Requesting CPU Amount (m)</th>
    <th>Limiting Memory Amount (Mi)</th>
    <th>Limiting CPU Amount (m)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Adapter</td>
    <td>500</td>
    <td>500</td>
    <td>500</td>
    <td>500</td>
  </tr>
  <tr>
    <td>Enforcer</td>
    <td>1000</td>
    <td>1000</td>
    <td>1000</td>
    <td>1000</td>
  </tr>
  <tr>
    <td>Router</td>
    <td>500</td>
    <td>1000</td>
    <td>500</td>
    <td>1000</td>
  </tr>
  <tr>
    <td>Netty Backend</td>
    <td>4096</td>
    <td>2000</td>
    <td>6114</td>
    <td>2000</td>
  </tr>
</tbody>
</table>

## Throughput (requests/sec) vs. concurrent users

The following graph illustrates the throughput against the number of concurrent users.

[![TPS 1 CPU](../../assets/img/performance-test-results/tps-1-cpu.png)](../../assets/img/performance-test-results/tps-1-cpu.png)

**Key Observations**

For a given payload size, APK provides a most likely consistent throughput level. But for large payload sizes you will get a low throughput value when compared to the small payload sizes.

## Average Response time (ms) vs. concurrent users

Backend delay is assigned as zero milliseconds when obtaining test results. The below graph shows how response time varied for different concurrent user counts. Also, the same graph shows the impact of the payload size considering the same two parameters.

[![Response time 1 CPU](../../assets/img/performance-test-results/response-time-1-cpu.png)](../../assets/img/performance-test-results/response-time-1-cpu.png)

**Key observations:**

When increasing concurrent users for given payload size, APK consumes steady growth for the response time. But when considering the same user count for large payloads, response time is high compared to the small payloads.

## Response time percentiles vs. concurrent users

Below graphs show 90th, 95th, and 99th Response Time percentiles for 0ms backend delay. This is useful to measure the percentage of requests that exceeded the response time value for a given percentile. A percentile can also tell the percentage of requests completed below the particular response time value.

[![Percentiles 1 CPU](../../assets/img/performance-test-results/percentile-1-cpu.png)](../../assets/img/performance-test-results/percentile-1-cpu.png)

Test scenario results in CSV format are available <a href="https://raw.githubusercontent.com/wso2/apk/main/test/performance/benchmarks/cpus-1/summary.csv" target="_blank" download>here</a>.