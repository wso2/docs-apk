<p>
<p>Package v1alpha1 contains the API Schema definitions for WSO2 APK.</p>
</p>
## Authentication

<h3 id="dp.wso2.com/v1alpha2.Authentication">Authentication
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.Authentication" title="Permanent link">¶</a>
</h3>
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
                <code>dp.wso2.com/v1alpha2</code>
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
                    <a href="#dp.wso2.com/v1alpha2.AuthenticationSpec">
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
                                <a href="#dp.wso2.com/v1alpha2.AuthSpec">
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
                                <a href="#dp.wso2.com/v1alpha2.AuthSpec">
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
                    <a href="#dp.wso2.com/v1alpha2.AuthenticationStatus">
                        AuthenticationStatus
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.APIAuth">APIAuth
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.APIAuth" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.AuthSpec">AuthSpec</a>)
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
                    <a href="#dp.wso2.com/v1alpha2.Oauth2Auth">
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
                    <a href="#dp.wso2.com/v1alpha2.APIKeyAuth">
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
                <code>jwt</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.JWT">
                        JWT
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>JWT is to specify the JWT authentication scheme details</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>mtls</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.MutualSSLConfig">
                        MutualSSLConfig
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>MutualSSL is to specify the features and certificates for mutual SSL</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.AuthSpec">AuthSpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.AuthSpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.AuthenticationSpec">AuthenticationSpec</a>)
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
                    <a href="#dp.wso2.com/v1alpha2.APIAuth">
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
<h3 id="dp.wso2.com/v1alpha2.AuthenticationSpec">AuthenticationSpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.AuthenticationSpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.Authentication">Authentication</a>)
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
                    <a href="#dp.wso2.com/v1alpha2.AuthSpec">
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
                    <a href="#dp.wso2.com/v1alpha2.AuthSpec">
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
<h3 id="dp.wso2.com/v1alpha2.AuthenticationStatus">AuthenticationStatus
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.AuthenticationStatus" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.Authentication">Authentication</a>)
</p>
<h3 id="dp.wso2.com/v1alpha2.Oauth2Auth">Oauth2Auth
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.Oauth2Auth" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.APIAuth">APIAuth</a>)
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
                <code>required</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Required indicates whether OAuth2 is mandatory or optional</p>
            </td>
        </tr>
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

<h3 id="dp.wso2.com/v1alpha2.MutualSSLConfig">MutualSSLConfig
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.MutualSSLConfig" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.APIAuth">APIAuth</a>)
</p>
<p>
<p>MutualSSLConfig scheme type and details</p>
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
                <p>Disabled is to disable mTLS authentication</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>required</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Required indicates whether mutualSSL is mandatory or optional</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>certificatesInline</code></br>
                <em>
                    []*string
                </em>
            </td>
            <td>
                <p>CertificatesInline is the Inline Certificate entry</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>secretRefs</code></br>
            </td>
            <td>
                <p>SecretRefs denotes the reference to the Secret that contains the Certificate</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>configMapRefs</code></br>
            </td>
            <td>
                <p>ConfigMapRefs denotes the reference to the ConfigMap that contains the Certificate</p>
            </td>
        </tr>
    </tbody>
</table>

<h3 id="dp.wso2.com/v1alpha2.RefConfig">RefConfig
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.RefConfig" title="Permanent link">¶</a>
</h3>
<p>
<p>RefConfig holds a config for a secret or a configmap</p>
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
                <p>Name of the secret or configmap</p>
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
                <p>Key of the secret or configmap</p>
            </td>
        </tr>
    </tbody>
</table>

<hr />
<p><em>
        Generated with <code>gen-crd-api-reference-docs</code>.
    </em></p>

{!catalogs/samples/authentication.md!}