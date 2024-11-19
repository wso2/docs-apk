# Adapter Log Configurations

To configure Adapter logs, update the `values.yaml`'s `wso2.apk.dp.adapter.logging` section with the following values. Instructions in <a href="../../../setup/Customize-Configurations" target="_blank">Customize Configurations</a> will guide you through the process of acquiring the `values.yaml` file.

```yaml
  logging:
    level: "INFO" # LogLevels can be "DEBG", "FATL", "ERRO", "WARN", "INFO", "PANC"
    logFormat: "TEXT" # Values can be "JSON", "TEXT"
``` 

For the advanced configurations, the log configurations file for the Adapter is in `Config.toml` file located in ConfigMap file located in the following file in the APK helm chart.

```yaml
apk/helm-charts/templates/data-plane/gateway-components/log-conf.yaml
```

The sample for Adapter log configurations looks similar to the following.

``` toml
# The logging configuration for Adapter

## Adapter root Level configurations

logLevel = "INFO"
LogFormat = "TEXT"

[rotation]
MaxSize = 10    # In MegaBytes (MB)
MaxBackups = 3
MaxAge =  2   # In days
Compress = true

## Adapter package Level configurations

[[pkg]]
name = "github.com/wso2/apk/adapter/internal/adapter"
logLevel = "INFO"

[[pkg]]
name = "github.com/wso2/apk/adapter/internal/oasparser"
logLevel = "INFO"
```

## Adapter root Level configurations

<table>
    <thead>
        <tr class="header">
            <th>Property</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr class="even">
            <td><code>logLevel</code></td>
            <td>Upto which level the logs should be printed. If this is set under root level, it will be applied through all packages unless specified in package log levels. LogLevels can be <code>"DEBG"</code>, <code>"FATL"</code>, <code>"ERRO"</code>, <code>"WARN"</code>, <code>"INFO"</code>, <code>"PANC"</code></td>
        </tr>
        <tr class="odd">
            <td><code>LogFormat</code></td>
            <td><p>Format of the logs printed. Log formats can be <code>"TEXT"</code>, <code>"JSON"</code></p>
                <div class="admonition note">
                    <p class="admonition-title">Note</p>
                    <p><code>JSON</code> format can be used as the formalized log format, which can be used for automated processing of logs.</p>
                </div>
            </td>
        </tr>
        <tr class="even">
            <td><code>[rotation].MaxSize</code></td>
            <td>MaxSize is the maximum size in megabytes of the log file before it gets rotated. It defaults to 10 megabytes.</td>
        </tr>
        <tr class="odd">
            <td><code>[rotation].MaxAge</code></td>
            <td>MaxAge is the maximum number of days to retain old log files based on the timestamp encoded in their filename.  Note that a day is defined as 24 hours and may not exactly correspond to calendar days due to daylight savings, leap seconds, etc. The default is set as 2 days.</td>
        </tr>
        <tr class="even">
            <td><code>[rotation].MaxBackups</code></td>
            <td>MaxBackups is the maximum number of old log files to retain. The default is to retain 3 old log files (though MaxAge may still cause them to get deleted).</td>
        </tr>
        <tr class="even">
            <td><code>[rotation].Compress</code></td>
            <td>Compress determines if the rotated log files should be compressed using gzip. The default is not to perform compression.</td>
        </tr>
    </tbody>
</table>

## Adapter package level configurations

Adapter package level configurations can override the root level configurations for the purpose of applying logging rules at package level. Note that `LogFormat` will not be supported at package level.
