# Configure Analytics for Choreo Insights

## Step 1 - Generate On-prem Key

1. Sign in to [https://console.choreo.dev/login](https://console.choreo.dev/login).

2. Go to `Settings > On-prem Keys` and click on `Generate Key` button.

3. Copy the generated on-prem key.

## Step 2 - Setup Enforcer

1. Open `<APK_HOME>/helm-charts/values.yaml` file.

2. Set following config under `wso2.apk.dp.gatewayRuntime` section to enable analytics.

    ```yaml
    analytics:
      enabled: true
      type: "Choreo"
      authURL: "https://analytics-event-auth.choreo.dev/auth/v1"
      authToken: "<on-prem-key>"
    ```

3. Redeploy the enforcer.

## Step 3 - View Analytics Data

1. After setting up the enforcer, invoke a few requests (success and failure) for a deployed API.

2. Go to [Choreo Insights](https://console.choreo.dev/insights) and select the correct environment to view the analytics data.

Following are some of the graphs generated in the Choreo Insights.

[![Choreo Insights Overview](../../assets/img/analytics/choreo-insights-overview.png)](../../assets/img/analytics/choreo-insights-overview.png)

[![Choreo Insights Latency](../../assets/img/analytics/choreo-insights-latency.png)](../../assets/img/analytics/choreo-insights-latency.png)
