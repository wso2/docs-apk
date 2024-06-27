## Application Mapping


<p>
<p>ApplicationMapping is the Schema for the applicationmappings API</p>
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
                    <a href="#dp.wso2.com/v1alpha2.ApplicationMappingSpec">
                        ApplicationMappingSpec
                    </a>
                </em>
            </td>
            <td>
                <br />
                <br />
                <table>
                    <tr>
                        <td>
                            <code>applicationRef</code></br>
                            <em>
                                string
                            </em>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>subscriptionRef</code></br>
                            <em>
                                string
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
                    <a href="#dp.wso2.com/v1alpha2.ApplicationMappingStatus">
                        ApplicationMappingStatus
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.ApplicationMappingSpec">ApplicationMappingSpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.ApplicationMappingSpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.ApplicationMapping">ApplicationMapping</a>)
</p>
<p>
<p>ApplicationMappingSpec defines the desired state of ApplicationMapping</p>
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
                <code>applicationRef</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>subscriptionRef</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.ApplicationMappingStatus">ApplicationMappingStatus
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.ApplicationMappingStatus" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.ApplicationMapping">ApplicationMapping</a>)
</p>
<p>
<p>ApplicationMappingStatus defines the observed state of ApplicationMapping</p>
</p>

<hr />
<p><em>
        Generated with <code>gen-crd-api-reference-docs</code>.
</em></p>

{!catalogs/samples/application_mapping.md!}
