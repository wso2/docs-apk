# Overview

Logging in APK is really important when debugging issues in a short period of time and looking into the underlying details of how each component works. APK provides facilities for getting the logs in various formats (JSON, Plain text), various output methods and various logging levels.

## Log Configurations

There are two main configuration files used by APK for the logging purposes.

- log_config.toml - This will be using for the log configurations related to `adapter` and `router`.
- log4j2.properties - This will be using for the log configurations related to `enforcer`.

Both these files are located in the same ConfigMap file located in the following file in the APK helm chart.

```yaml
apk/helm-charts/templates/data-plane/gateway-components/log-conf.yaml
```

These configurations can be set using the `values.yaml` file. Instructions in <a href="../../../setup/Customize-Configurations" target="_blank">Customize Configurations</a> will guide you through the process of acquiring the `values.yaml` file. Follow each section to configure the logs for each of the components.

## Error Codes in Logs 

In addition to these, the adapter and enforcer components have been defined with a set of error codes for each of the components’ error logs, in order to uniquely identify application errors. Following are the error codes ranges for each of the components.

- Adapter error codes range from 1000 to 4999.
- Enforcer error codes range from 5000 to 8999.


## See Also

Here is a summary of topics that will be covered under this log configurations section.

- <a href="../configure-logs-adapter/" target="_blank">Adapter Log Configurations</a>
  - <a href="../configure-logs-adapter#adapter-root-level-configurations" target="_blank">Adapter root level configurations</a>
  - <a href="../configure-logs-adapter#adapter-package-level-configurations" target="_blank">Adapter package level configurations</a>

- <a href="../configure-logs-enforcer" target="_blank">Enforcer Log Configurations</a>
  - <a href="../configure-logs-enforcer/#configuring-log4j2-properties" target="_blank">Configuring Log4j2 Properties</a>
    - <a href="../configure-logs-enforcer/#setting-the-log-level" target="_blank">Setting the Log Level</a>
    - <a href="../configure-logs-enforcer/#setting-the-threshold" target="_blank">Setting the Threshold</a>
    - <a href="../configure-logs-enforcer/#configuring-log4j2-appenders" target="_blank">Configuring Log4j2 Appenders</a>
    - <a href="../configure-logs-enforcer/#configuring-log4j2-loggers" target="_blank">Configuring Log4j2 Loggers</a>
  - <a href="../configure-logs-enforcer/#enforcer-access-logs" target="_blank">Enforcer Access Logs</a>
  - <a href="../configure-logs-enforcer/#setting-the-log-format" target="_blank">Setting the log format</a>
    - <a href="../configure-logs-enforcer/#plain-text-format" target="_blank">Plain Text format</a>
    - <a href="../configure-logs-enforcer/#json-format" target="_blank">JSON format</a>

- <a href="../configure-logs-router/#router-log-configurations" target="_blank">Router Log Configurations</a>
  - <a href="../configure-logs-router/#router-access-logging" target="_blank">Router Access Logging</a>
  - <a href="../configure-logs-router/#router-debug-logs" target="_blank">Router Debug Logs</a>
