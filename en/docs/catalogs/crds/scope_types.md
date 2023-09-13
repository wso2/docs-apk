<p>
<p>Package v1alpha1 contains the API Schema definitions for WSO2 APK.</p>
</p>
<h3 id="dp.wso2.com/v1alpha1.Scope">Scope
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.Scope" title="Permanent link">¶</a>
</h3>
<p>
<p>Scope is the Schema for the scopes API</p>
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
                <code>apiVersion</code></br>
                string
            </td>
            <td>
                <code>
dp.wso2.com/v1alpha1
</code>
            </td>
        </tr>
        <tr>
            <td>
                <code>kind</code></br>
                string
            </td>
            <td><code>Scope</code></td>
        </tr>
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
                    <a href="#dp.wso2.com/v1alpha1.ScopeSpec">
                        ScopeSpec
                    </a>
                </em>
            </td>
            <td>
                <br />
                <br />
                <table>
                    <tr>
                        <td>
                            <code>names</code></br>
                            <em>
                                []string
                            </em>
                        </td>
                        <td>
                            <p>Name scope name</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <code>status</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.ScopeStatus">
                        ScopeStatus
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.ScopeSpec">ScopeSpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.ScopeSpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.Scope">Scope</a>)
</p>
<p>
<p>ScopeSpec defines the desired state of Scope</p>
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
                <code>names</code></br>
                <em>
                    []string
                </em>
            </td>
            <td>
                <p>Name scope name</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.ScopeStatus">ScopeStatus
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.ScopeStatus" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.Scope">Scope</a>)
</p>
<p>
<p>ScopeStatus defines the observed state of Scope</p>
</p>
<hr />
<p><em>
        Generated with <code>gen-crd-api-reference-docs</code>.
    </em></p>

## Sample

{!catalogs/samples/scope.md!}
