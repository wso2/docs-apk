
## Subscription

<p>
<p>Subscription is the Schema for the subscriptions API</p>
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
                    <a href="#dp.wso2.com/v1alpha2.SubscriptionSpec">
                        SubscriptionSpec
                    </a>
                </em>
            </td>
            <td>
                <br />
                <br />
                <table>
                    <tr>
                        <td>
                            <code>subscriptionStatus</code></br>
                            <em>
                                string
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
                            <code>api</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha2.API">
                                    API
                                </a>
                            </em>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>ratelimitRef</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha2.RatelimitRef">
                                    RatelimitRef
                                </a>
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
                    <a href="#dp.wso2.com/v1alpha2.SubscriptionStatus">
                        SubscriptionStatus
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.SubscriptionSpec">SubscriptionSpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.SubscriptionSpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.Subscription">Subscription</a>)
</p>
<p>
<p>SubscriptionSpec defines the desired state of Subscription</p>
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
                <code>subscriptionStatus</code></br>
                <em>
                    string
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
                <code>api</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.API">
                        API
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.SubscriptionStatus">SubscriptionStatus
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.SubscriptionStatus" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.Subscription">Subscription</a>)
</p>
<p>
<p>SubscriptionStatus defines the observed state of Subscription</p>
</p>

<h3 id="dp.wso2.com/v1alpha2.API">API
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.API" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.SubscriptionSpec">SubscriptionSpec</a>)
</p>
<p>
<p>API defines the API associated with the subscription</p>
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
                <code>name</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            Name of the API associated with the subscription
            </td>
        </tr>
        <tr>
            <td>
                <code>version</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            Version of the API associated with the subscription
            </td>
        </tr>
    </tbody>
</table>

<h3 id="dp.wso2.com/v1alpha2.RatelimitRef">API
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.RatelimitRef" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.SubscriptionSpec">SubscriptionSpec</a>)
</p>
<p>
<p>RatelimitRef defines the RatelimitPolicy or AIRatelimitpolicy associated with the subscription</p>
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
                <code>name</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            Name of the RatelimitPolicy|AIRatelimitPolicy associated with the subscription
            </td>
        </tr>
        <tr>
            <td>
                <code>level</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            Whether the policy should be applied to application or subscription level(NOT SUPPORTED YET. Currently subscription level is the default.)
            </td>
        </tr>
    </tbody>
</table>

<hr />
<p><em>
    Generated with <code>gen-crd-api-reference-docs</code>.
</em></p>

{!catalogs/samples/subscription.md!}
