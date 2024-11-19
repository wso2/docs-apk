<p>
<p>Package v1alpha1 contains the API Schema definitions for WSO2 APK.</p>
</p>
## Authentication

<p>
<p>Authentication is the Schema for the authentications API</p>
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
                <code>dp.wso2.com/v1alpha1</code>
            </td>
        </tr>
        <tr>
            <td>
                <code>kind</code></br>
                string
            </td>
            <td><code>Authentication</code></td>
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
                    <a href="#dp.wso2.com/v1alpha1.AuthenticationSpec">
                        AuthenticationSpec
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
                                <a href="#dp.wso2.com/v1alpha1.AuthSpec">
                                    AuthSpec
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
                                <a href="#dp.wso2.com/v1alpha1.AuthSpec">
                                    AuthSpec
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
                    <a href="#dp.wso2.com/v1alpha1.AuthenticationStatus">
                        AuthenticationStatus
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.APIAuth">APIAuth
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.APIAuth" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.AuthSpec">AuthSpec</a>)
</p>
<p>
<p>APIAuth Authentication scheme type and details</p>
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
                    <a href="#dp.wso2.com/v1alpha1.Oauth2Auth">
                        Oauth2Auth
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Oauth2 is to specify the Oauth2 authentication scheme details</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>apiKey</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.APIKeyAuth">
                        []APIKeyAuth
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>APIKey is to specify the APIKey authentication scheme details</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>testConsoleKey</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.TestConsoleKeyAuth">
                        TestConsoleKeyAuth
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>TestConsoleKey is to specify the Test Console Key authentication scheme details</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.APIKeyAuth">APIKeyAuth
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.APIKeyAuth" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.APIAuth">APIAuth</a>)
</p>
<p>
<p>APIKeyAuth APIKey Authentication scheme details</p>
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
                <p>In is to specify how the APIKey is passed to the request
</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>name</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>Name is the name of the header or query parameter to be used</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>sendTokenToUpstream</code></br>
                <em>
                    bool
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>SendTokenToUpstream is to specify whether the APIKey should be sent to the upstream</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.AuthSpec">AuthSpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.AuthSpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.AuthenticationSpec">AuthenticationSpec</a>)
</p>
<p>
<p>AuthSpec specification of the authentication service</p>
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
                <code>disabled</code></br>
                <em>
                    bool
                </em>
            </td>
            <td>
                <p>Disabled is to disable all authentications</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>authTypes</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.APIAuth">
                        APIAuth
                    </a>
                </em>
            </td>
            <td>
                <p>AuthTypes is to specify the authentication scheme types and details</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.AuthenticationSpec">AuthenticationSpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.AuthenticationSpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.Authentication">Authentication</a>)
</p>
<p>
<p>AuthenticationSpec defines the desired state of Authentication</p>
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
                    <a href="#dp.wso2.com/v1alpha1.AuthSpec">
                        AuthSpec
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
                    <a href="#dp.wso2.com/v1alpha1.AuthSpec">
                        AuthSpec
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
<h3 id="dp.wso2.com/v1alpha1.AuthenticationStatus">AuthenticationStatus
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.AuthenticationStatus" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.Authentication">Authentication</a>)
</p>
<p>
<p>AuthenticationStatus defines the observed state of Authentication</p>
</p>
<h3 id="dp.wso2.com/v1alpha1.Oauth2Auth">Oauth2Auth
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.Oauth2Auth" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.APIAuth">APIAuth</a>)
</p>
<p>
<p>Oauth2Auth OAuth2 Authentication scheme details</p>
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
                <code>disabled</code></br>
                <em>
                    bool
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Disabled is to disable OAuth2 authentication</p>
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
                <p>Header is the header name used to pass the OAuth2 token</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>sendTokenToUpstream</code></br>
                <em>
                    bool
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>SendTokenToUpstream is to specify whether the OAuth2 token should be sent to the upstream</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.TestConsoleKeyAuth">TestConsoleKeyAuth
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.TestConsoleKeyAuth" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.APIAuth">APIAuth</a>)
</p>
<p>
<p>TestConsoleKeyAuth Test Console Key Authentication scheme details</p>
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
                <code>header</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Header is the header name used to pass the Test Console Key</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>sendTokenToUpstream</code></br>
                <em>
                    bool
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>SendTokenToUpstream is to specify whether the Test Console Key should be sent to the upstream</p>
            </td>
        </tr>
    </tbody>
</table>
<hr />
<p><em>
        Generated with <code>gen-crd-api-reference-docs</code>.
    </em></p>

{!catalogs/samples/authentication.md!}