
## Application

<p>
<p>Application is the Schema for the applications API</p>
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
                    <a href="#dp.wso2.com/v1alpha2.ApplicationSpec">
                        ApplicationSpec
                    </a>
                </em>
            </td>
            <td>
                <br />
                <br />
                <table>
                    <tr>
                        <td>
                            <code>name</code></br>
                            <em>
                                string
                            </em>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>owner</code></br>
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
                            <code>attributes</code></br>
                            <em>
                                map[string]string
                            </em>
                        </td>
                        <td>
                            <em>(Optional)</em>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>securitySchemes</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha2.SecuritySchemes">
                                    SecuritySchemes
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
                    <a href="#dp.wso2.com/v1alpha2.ApplicationStatus">
                        ApplicationStatus
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.ApplicationSpec">ApplicationSpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.ApplicationSpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.Application">Application</a>)
</p>
<p>
<p>ApplicationSpec defines the desired state of Application</p>
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
            </td>
        </tr>
        <tr>
            <td>
                <code>owner</code></br>
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
                <code>attributes</code></br>
                <em>
                    map[string]string
                </em>
            </td>
            <td>
                <em>(Optional)</em>
            </td>
        </tr>
        <tr>
            <td>
                <code>securitySchemes</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.SecuritySchemes">
                        SecuritySchemes
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.ApplicationStatus">ApplicationStatus
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.ApplicationStatus" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.Application">Application</a>)
</p>
<p>
<p>ApplicationStatus defines the observed state of Application</p>
</p>

<h3 id="dp.wso2.com/v1alpha2.SecurityScheme">SecurityScheme
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.SecurityScheme" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.SecuritySchemes">SecuritySchemes</a>)
</p>
<p>
<p>SecurityScheme defines the details specific to a security scheme</p>
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
                <code>environments</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.Environment">
                        []Environment
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.SecuritySchemes">SecuritySchemes
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.SecuritySchemes" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.ApplicationSpec">ApplicationSpec</a>)
</p>
<p>
<p>SecuritySchemes defines the supported security schemes</p>
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
                <code>oauth2</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.SecurityScheme">
                        SecurityScheme
                    </a>
                </em>
            </td>
            <td>
                <p>OAuth2 denotes the OAuth2 security scheme</p>
            </td>
        </tr>
    </tbody>
</table>

<h3 id="dp.wso2.com/v1alpha2.Environment">Environment
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.Environment" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.SecurityScheme">SecurityScheme</a>)
</p>
<p>
<p>Environment defines the environment specific details related to the security scheme</p>
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
                <code>envId</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>appId</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>keyType</code></br>
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

{!catalogs/samples/application.md!}
