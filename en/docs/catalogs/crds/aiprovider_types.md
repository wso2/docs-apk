<p>
<p>Package v1alpha3 contains the API Schema definitions for WSO2 APK.</p>
</p>
Resource Types:
<ul></ul>
<h3 id="dp.wso2.com/v1alpha3.AIProvider">AIProvider
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.AIProvider" title="Permanent link">¶</a>
</h3>
<p>
<p>AIProvider is the schema for the AI providers API</p>
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
                    <a href="#dp.wso2.com/v1alpha3.AIProviderSpec">
                        AIProviderSpec
                    </a>
                </em>
            </td>
            <td>
                <br />
                <br />
                <table>
                    <tr>
                        <td>
                            <code>providerName</code></br>
                            <em>
                                string
                            </em>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>providerAPIVersion</code></br>
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
                            <code>model</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha3.ValueDetails">
                                    ValueDetails
                                </a>
                            </em>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>rateLimitFields</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha3.RateLimitFields">
                                    RateLimitFields
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
                    <a href="#dp.wso2.com/v1alpha3.AIProviderStatus">
                        AIProviderStatus
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha3.AIProviderSpec">AIProviderSpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.AIProviderSpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha3.AIProvider">AIProvider</a>)
</p>
<p>
<p>AIProviderSpec defines the desired state of AIProvider</p>
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
                <code>providerName</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>providerAPIVersion</code></br>
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
                <code>model</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha3.ValueDetails">
                        ValueDetails
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>rateLimitFields</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha3.RateLimitFields">
                        RateLimitFields
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha3.AIProviderStatus">AIProviderStatus
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.AIProviderStatus" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha3.AIProvider">AIProvider</a>)
</p>
<p>
<p>AIProviderStatus defines the observed state of AIProvider</p>
</p>
<h3 id="dp.wso2.com/v1alpha3.RateLimitFields">RateLimitFields
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.RateLimitFields" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha3.AIProviderSpec">AIProviderSpec</a>)
</p>
<p>
<p>RateLimitFields defines the Rate Limit fields</p>
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
                <code>promptTokens</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha3.ValueDetails">
                        ValueDetails
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>completionToken</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha3.ValueDetails">
                        ValueDetails
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>totalToken</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha3.ValueDetails">
                        ValueDetails
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha3.ValueDetails">ValueDetails
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha3.ValueDetails" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha3.AIProviderSpec">AIProviderSpec</a>,
    <a href="#dp.wso2.com/v1alpha3.RateLimitFields">RateLimitFields</a>)
</p>
<p>
<p>ValueDetails defines the value details</p>
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
                <code>in</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
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
            </td>
        </tr>
    </tbody>
</table>
<hr />
<p><em>
        Generated with <code>gen-crd-api-reference-docs</code>.
    </em></p>