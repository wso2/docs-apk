<p>
<p>Package v1alpha1 contains the API Schema definitions for WSO2 APK.</p>
</p>
## Backend JWT

<p>
<p>BackendJWT is the Schema for the backendjwts API</p>
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
            <td><code>BackendJWT</code></td>
        </tr>
        <tr>
            <td>
                <code>metadata</code></br>
                <em>
                    <a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#objectmeta-v1-meta" target="_blank">
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
                    <a href="#dp.wso2.com/v1alpha1.BackendJWTSpec">
                        BackendJWTSpec
                    </a>
                </em>
            </td>
            <td>
                <br />
                <br />
                <table>
                    <tr>
                        <td>
                            <code>encoding</code></br>
                            <em>
                                string
                            </em>
                        </td>
                        <td>
                            <em>(Optional)</em>
                            <p>Encoding of the JWT token</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>header</code></br>
                            <em>
                                string
                            </em>
                        </td>
                        <td>
                            <em>(Optional)</em>
                            <p>Header of the JWT token</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>signingAlgorithm</code></br>
                            <em>
                                string
                            </em>
                        </td>
                        <td>
                            <em>(Optional)</em>
                            <p>Signing algorithm of the JWT token</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>tokenTTL</code></br>
                            <em>
                                uint32
                            </em>
                        </td>
                        <td>
                            <em>(Optional)</em>
                            <p>TokenTTL time to live for the backend JWT token in seconds</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>customClaims</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha1.CustomClaim">
                                    []CustomClaim
                                </a>
                            </em>
                        </td>
                        <td>
                            <em>(Optional)</em>
                            <p>CustomClaims holds custom claims that needs to be added to the jwt</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <code>status</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.BackendJWTStatus">
                        BackendJWTStatus
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.BackendJWTSpec">BackendJWTSpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.BackendJWTSpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.BackendJWT">BackendJWT</a>)
</p>
<p>
<p>BackendJWTSpec defines the desired state of BackendJWT</p>
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
                <code>encoding</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Encoding of the JWT token</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>header</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Header of the JWT token</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>signingAlgorithm</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Signing algorithm of the JWT token</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>tokenTTL</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>TokenTTL time to live for the backend JWT token in seconds</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>customClaims</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.CustomClaim">
                        []CustomClaim
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>CustomClaims holds custom claims that needs to be added to the jwt</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.BackendJWTStatus">BackendJWTStatus
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.BackendJWTStatus" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.BackendJWT">BackendJWT</a>)
</p>
<p>
<p>BackendJWTStatus defines the observed state of BackendJWT</p>
</p>
<h3 id="dp.wso2.com/v1alpha1.CustomClaim">CustomClaim
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.CustomClaim" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.BackendJWTSpec">BackendJWTSpec</a>)
</p>
<p>
<p>CustomClaim holds custom claim information</p>
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
                <code>claim</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>Claim name</p>
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
                <p>Claim value</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>type</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>Claim type</p>
            </td>
        </tr>
    </tbody>
</table>
<hr />
<p><em>
        Generated with <code>gen-crd-api-reference-docs</code>.
    </em></p>

{!catalogs/samples/backend-jwt.md!}
