# Configure Analytics for ELK Stack

## Step 1 - Configure Enforcer

1. Open `apk/helm-charts/templates/data-plane/gateway-components/log-conf.yaml` file.

2. Set following config under `config.toml` section to enable analytics.

    ```toml
    [analytics]
      enabled = true
      type = "ELK"
    ```

3. Add following configs under `log4j2.properties` section to publish logs to a file. 

    1. Add `ENFORCER_ANALYTICS` to the appenders list.

        ```toml
        appenders = ENFORCER_ANALYTICS, ... (list of other available appenders)
        ```

    2. Add configurations for `ENFORCER_ANALYTICS` after `appenders`.

        ```toml
        appender.ENFORCER_ANALYTICS.type = RollingFile
        appender.ENFORCER_ANALYTICS.name = ENFORCER_ANALYTICS
        appender.ENFORCER_ANALYTICS.fileName = logs/enforcer_analytics.log
        appender.ENFORCER_ANALYTICS.filePattern = /logs/enforcer_analytics-%d{MM-dd-yyyy}.log
        appender.ENFORCER_ANALYTICS.layout.type = PatternLayout
        appender.ENFORCER_ANALYTICS.layout.pattern = [%d] - %m%ex%n
        appender.ENFORCER_ANALYTICS.policies.type = Policies
        appender.ENFORCER_ANALYTICS.policies.time.type = TimeBasedTriggeringPolicy
        appender.ENFORCER_ANALYTICS.policies.time.interval = 1
        appender.ENFORCER_ANALYTICS.policies.time.modulate = true
        appender.ENFORCER_ANALYTICS.policies.size.type = SizeBasedTriggeringPolicy
        appender.ENFORCER_ANALYTICS.policies.size.size=10MB
        appender.ENFORCER_ANALYTICS.strategy.type = DefaultRolloverStrategy
        appender.ENFORCER_ANALYTICS.strategy.max = 20
        appender.ENFORCER_ANALYTICS.filter.threshold.type = ThresholdFilter
        appender.ENFORCER_ANALYTICS.filter.threshold.level = DEBUG
        ```

    3. Add `reporter` to the loggers list.

        ```toml
        loggers = reporter, ... (list of other available loggers)
        ```

    4. Add configurations for `reporter` after `loggers`.

        ```toml
        logger.reporter.name = org.wso2.am.analytics.publisher.reporter.elk
        logger.reporter.level = INFO
        logger.reporter.additivity = false
        logger.reporter.appenderRef.rolling.ref = ENFORCER_ANALYTICS
        ```

## Step 2 - Set up the ELK Stack

1. Configure and setup the following elements in ELK Stack.
    - Elasticsearch
    - Kibana
    - Logstash
    - Filebeat

2. Configure Filebeat to read the log file as the input source.

    1. Open the `filebeat.yml` file.

    2. Configure the log file as the input source.

        ```yaml
        filebeat.inputs:
        - type: log
          enabled: true
          paths:
          - /logs/enforcer_analytics.log
          include_lines: ['(apimMetrics):']
        ```

3. Set up Kibana dashboards.

After setting up the enforcer and the ELK Stack, invoke a few requests (success and failure) for a deployed API. You will be able to view the analytics data in the Kibana dashboard.