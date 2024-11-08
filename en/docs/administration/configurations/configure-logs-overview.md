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

These configurations can be set using the `values.yaml` file. Instructions in [Customize Configurations](../../setup/customize-configurations.md) will guide you through the process of acquiring the `values.yaml` file. Follow each section to configure the logs for each of the components.

## Error Codes in Logs 

In addition to these, the adapter and enforcer components have been defined with a set of error codes for each of the components’ error logs, in order to uniquely identify application errors. Following are the error codes ranges for each of the components.

- Adapter error codes range from 1000 to 4999.
- Enforcer error codes range from 5000 to 8999.


## See Also

Here is a summary of topics that will be covered under this log configurations section.

- [Adapter Log Configurations](../configure-logs-adapter/)
    - [Adapter root level configurations](../configure-logs-adapter#adapter-root-level-configurations)
    - [Adapter package level configurations](../configure-logs-adapter#adapter-package-level-configurations)

- [Enforcer Log Configurations](../configure-logs-enforcer)
    - [Configuring Log4j2 Properties](../configure-logs-enforcer/#configuring-log4j2-properties)
        - [Setting the Log Level](../configure-logs-enforcer/#setting-the-log-level)
        - [Setting the Threshold](../configure-logs-enforcer/#setting-the-threshold)
        - [Configuring Log4j2 Appenders](../configure-logs-enforcer/#configuring-log4j2-appenders)
        - [Configuring Log4j2 Loggers](../configure-logs-enforcer/#configuring-log4j2-loggers)
    - [Enforcer Access Logs](../configure-logs-enforcer/#enforcer-access-logs)
    - [Setting the log format](../configure-logs-enforcer/#setting-the-log-format)
        - [Plain Text format](../configure-logs-enforcer/#plain-text-format)
        - [JSON format](../configure-logs-enforcer/#json-format)

- [Router Log Configurations](../configure-logs-router/#router-log-configurations)
    - [Router Access Logging](../configure-logs-router/#router-access-logging)
    - [Router Debug Logs](../configure-logs-router/#router-debug-logs)
