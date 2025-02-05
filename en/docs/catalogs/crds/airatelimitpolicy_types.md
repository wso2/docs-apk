<h3 id="dp.wso2.com/v1alpha3.AIRateLimitPolicy">AIRateLimitPolicy
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.AIRateLimitPolicy" title="Permanent link">¶</a>
</h3>
<p>
<p>AIRateLimitPolicy is the Schema for the airatelimitpolicies API</p>
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
                    <a href="#dp.wso2.com/v1alpha3.AIRateLimitPolicySpec">
                        AIRateLimitPolicySpec
                    </a>
                </em>
            </td>
            <td>
                <br />
                <br />
                <table>
                    <tr>
                        <td>
                            <code>override</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha3.AIRateLimit">
                                    AIRateLimit
                                </a>
                            </em>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>default</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha3.AIRateLimit">
                                    AIRateLimit
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
                    <a href="#dp.wso2.com/v1alpha3.AIRateLimitPolicyStatus">
                        AIRateLimitPolicyStatus
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha3.AIRateLimitPolicySpec">AIRateLimitPolicySpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.AIRateLimitPolicySpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha3.AIRateLimitPolicy">AIRateLimitPolicy</a>)
</p>
<p>
<p>AIRateLimitPolicySpec defines the desired state of AIRateLimitPolicy</p>
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
                <code>override</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha3.AIRateLimit">
                        AIRateLimit
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>default</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha3.AIRateLimit">
                        AIRateLimit
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
<h3 id="dp.wso2.com/v1alpha3.AIRateLimit">AIRateLimit
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.AIRateLimit" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha3.AIRateLimitPolicySpec">AIRateLimitPolicySpec</a>)
</p>
<p>
<p>AIRateLimit defines the AI ratelimit configuration</p>
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
                <code>tokenCount</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha3.TokenCount">
                        TokenCount
                    </a>
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
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha3.TokenCount">TokenCount
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.TokenCount" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha3.AIRateLimit">AIRateLimit</a>)
</p>
<p>
<p>TokenCount defines the Token based ratelimit configuration</p>
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
                <code>requestTokenCount</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <p>RequestTokenCount specifies the maximum number of tokens allowed
                    in AI requests within a given unit of time. This value limits the
                    token count sent by the client to the AI service over the defined period.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>responseTokenCount</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <p>ResponseTokenCount specifies the maximum number of tokens allowed
                    in AI responses within a given unit of time. This value limits the
                    token count received by the client from the AI service over the defined period.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>totalTokenCount</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <p>TotalTokenCount represents the maximum allowable total token count
                    for both AI requests and responses within a specified unit of time.
                    This value sets the limit for the number of tokens exchanged between
                    the client and AI service during the defined period.</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha3.RequestCount">RequestCount
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.RequestCount" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha3.AIRateLimit">AIRateLimit</a>)
</p>
<p>
<p>TokenCount defines the Token based ratelimit configuration</p>
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
                <code>requestsPerUnit</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <p>RequestsPerUnit specifies the maximum number of requests allowed
                    within a given unit of time.</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha3.AIRateLimitPolicyStatus">AIRateLimitPolicyStatus
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.AIRateLimitPolicyStatus" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha3.AIRateLimitPolicy">AIRateLimitPolicy</a>)
</p>
<p>
<p>AIRateLimitPolicyStatus defines the observed state of AIRateLimitPolicy</p>
</p>
<hr />
<p><em>
        Generated with <code>gen-crd-api-reference-docs</code>.
    </em></p>

{!catalogs/samples/airatelimitpolicy.md!}