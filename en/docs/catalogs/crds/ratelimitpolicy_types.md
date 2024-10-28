<p>
<p>Package v1alpha3 contains the API Schema definitions for WSO2 APK.</p>
</p>
Resource Types:
<ul></ul>
<h3 id="dp.wso2.com/v1alpha3.APIRateLimitPolicy">APIRateLimitPolicy
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.APIRateLimitPolicy" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha3.RateLimitAPIPolicy">RateLimitAPIPolicy</a>)
</p>
<p>
<p>APIRateLimitPolicy defines the desired state of APIPolicy</p>
</p>
<table>
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <code>requestsPerUnit</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <p>RequestPerUnit is the number of requests allowed per unit time</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>unit</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>Unit is the unit of the requestsPerUnit</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha3.BurstControl">BurstControl
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.BurstControl" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha3.SubscriptionRateLimitPolicy">SubscriptionRateLimitPolicy</a>)
</p>
<p>
<p>BurstControl defines the rule for token count quota.</p>
</p>
<table>
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <code>requestsPerUnit</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>unit</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha3.CustomRateLimitPolicy">CustomRateLimitPolicy
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.CustomRateLimitPolicy" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha3.RateLimitAPIPolicy">RateLimitAPIPolicy</a>)
</p>
<p>
<p>CustomRateLimitPolicy defines the desired state of CustomPolicy</p>
</p>
<table>
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <code>requestsPerUnit</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <p>RequestPerUnit is the number of requests allowed per unit time</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>unit</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>Unit is the unit of the requestsPerUnit</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>key</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>Key is the key of the custom policy</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>value</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Value is the value of the custom policy</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>organization</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>Organization is the organization of the policy</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha3.RateLimitAPIPolicy">RateLimitAPIPolicy
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.RateLimitAPIPolicy" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha3.RateLimitPolicySpec">RateLimitPolicySpec</a>)
</p>
<p>
<p>RateLimitAPIPolicy defines the desired state of Policy</p>
</p>
<table>
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <code>api</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha3.APIRateLimitPolicy">
                        APIRateLimitPolicy
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>API level ratelimit policy</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>subscription</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha3.SubscriptionRateLimitPolicy">
                        SubscriptionRateLimitPolicy
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Subscription level ratelimit policy</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>custom</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha3.CustomRateLimitPolicy">
                        CustomRateLimitPolicy
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Custom ratelimit policy</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha3.RateLimitPolicy">RateLimitPolicy
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.RateLimitPolicy" title="Permanent link">¶</a>
</h3>
<p>
<p>RateLimitPolicy is the Schema for the ratelimitpolicies API</p>
</p>
<table>
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <code>metadata</code></br>
                <em>
                    <a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#objectmeta-v1-meta">
                        Kubernetes meta/v1.ObjectMeta
                    </a>
                </em>
            </td>
            <td>
                Refer to the Kubernetes API documentation for the fields of the
                <code>metadata</code> field.
            </td>
        </tr>
        <tr>
            <td>
                <code>spec</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha3.RateLimitPolicySpec">
                        RateLimitPolicySpec
                    </a>
                </em>
            </td>
            <td>
                <br />
                <br />
                <table>
                    <tr>
                        <td>
                            <code>default</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha3.RateLimitAPIPolicy">
                                    RateLimitAPIPolicy
                                </a>
                            </em>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>override</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha3.RateLimitAPIPolicy">
                                    RateLimitAPIPolicy
                                </a>
                            </em>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>targetRef</code></br>
                            <em>
                                sigs.k8s.io/gateway-api/apis/v1alpha2.PolicyTargetReference
                            </em>
                        </td>
                        <td>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <code>status</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha3.RateLimitPolicyStatus">
                        RateLimitPolicyStatus
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha3.RateLimitPolicySpec">RateLimitPolicySpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.RateLimitPolicySpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha3.RateLimitPolicy">RateLimitPolicy</a>)
</p>
<p>
<p>RateLimitPolicySpec defines the desired state of RateLimitPolicy</p>
</p>
<table>
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <code>default</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha3.RateLimitAPIPolicy">
                        RateLimitAPIPolicy
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>override</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha3.RateLimitAPIPolicy">
                        RateLimitAPIPolicy
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>targetRef</code></br>
                <em>
                    sigs.k8s.io/gateway-api/apis/v1alpha2.PolicyTargetReference
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha3.RateLimitPolicyStatus">RateLimitPolicyStatus
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.RateLimitPolicyStatus" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha3.RateLimitPolicy">RateLimitPolicy</a>)
</p>
<p>
<p>RateLimitPolicyStatus defines the observed state of RateLimitPolicy</p>
</p>
<h3 id="dp.wso2.com/v1alpha3.RequestCount">RequestCount
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.RequestCount" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha3.SubscriptionRateLimitPolicy">SubscriptionRateLimitPolicy</a>)
</p>
<p>
<p>RequestCount defines the rule for request count quota.</p>
</p>
<table>
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <code>requestsPerUnit</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>unit</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha3.SubscriptionRateLimitPolicy">SubscriptionRateLimitPolicy
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.SubscriptionRateLimitPolicy" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha3.RateLimitAPIPolicy">RateLimitAPIPolicy</a>)
</p>
<p>
<p>SubscriptionRateLimitPolicy defines the subscription-level rate limiting policy.</p>
</p>
<table>
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <code>stopOnQuotaReach</code></br>
                <em>
                    bool
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>organization</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>requestCount</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha3.RequestCount">
                        RequestCount
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>burstControl</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha3.BurstControl">
                        BurstControl
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<hr />
<p><em>
        Generated with <code>gen-crd-api-reference-docs</code>.
    </em></p>

## Rate Limiter Samples

{!catalogs/samples/ratelimit-api.md!}
{!catalogs/samples/ratelimit-resource.md!}
{!catalogs/samples/ratelimit-custom.md!}

Refer the [Rate Limit documentation](../../create-api/rate-limiting/rate-limiting-policy-overview.md) for more information on how to configure rate limit policies.