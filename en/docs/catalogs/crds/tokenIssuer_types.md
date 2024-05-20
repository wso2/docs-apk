<p>
<p>Package v1alpha2 contains the API Schema definitions for WSO2 APK.</p>
</p>

## Token Issuer

<p>
<p>TokenIssuer is the Schema for the tokenIssuer API</p>
</p>
<h3 id="dp.wso2.com/v1alpha2.TokenIssuer">TokenIssuer
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.TokenIssuer" title="Permanent link">¶</a>
</h3>
<p>
<p>TokenIssuer is the Schema for the tokenissuers API</p>
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
            <td><code>TokenIssuer</code></td>
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
                    <a href="#dp.wso2.com/v1alpha2.TokenIssuerSpec">
                        TokenIssuerSpec
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
                            <p>Name is the unique name of the Token Issuer in
                                the Organization defined . &ldquo;Organization/Name&rdquo; can
                                be used to uniquely identify an Issuer.</p>
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
                            <p>Organization denotes the organization of the Token Issuer.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>issuer</code></br>
                            <em>
                                string
                            </em>
                        </td>
                        <td>
                            <p>Issuer denotes the issuer of the Token Issuer.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>consumerKeyClaim</code></br>
                            <em>
                                string
                            </em>
                        </td>
                        <td>
                            <p>ConsumerKeyClaim denotes the claim key of the consumer key.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>scopesClaim</code></br>
                            <em>
                                string
                            </em>
                        </td>
                        <td>
                            <p>ScopesClaim denotes the claim key of the scopes.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>signatureValidation</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha2.SignatureValidation">
                                    SignatureValidation
                                </a>
                            </em>
                        </td>
                        <td>
                            <p>SignatureValidation denotes the signature validation method of jwt</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>claimMappings</code></br>
                            <em>
                                <a
                                    href="#dp.wso2.com/v1alpha2.[]github.com/wso2/apk/common-go-libs/apis/dp/v1alpha2.ClaimMapping">
                                    []github.com/wso2/apk/common-go-libs/apis/dp/v1alpha2.ClaimMapping
                                </a>
                            </em>
                        </td>
                        <td>
                            <p>ClaimMappings denotes the claim mappings of the jwt</p>
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
                            <p>TargetRef denotes the reference to the which gateway it applies to</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>environments</code></br>
                            <em>
                                []string
                            </em>
                        </td>
                        <td>
                            <em>(Optional)</em>
                            <p>Environments denotes the environments that are applicable for the token issuer.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <code>status</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.TokenIssuerStatus">
                        TokenIssuerStatus
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.CERTConfig">CERTConfig
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.CERTConfig" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.JWKS">JWKS</a>,
    <a href="#dp.wso2.com/v1alpha2.SignatureValidation">SignatureValidation</a>)
</p>
<p>
<p>CERTConfig defines the certificate configuration</p>
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
                <code>certificateInline</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>CertificateInline is the Inline Certificate entry</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>secretRef</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.RefConfig">
                        RefConfig
                    </a>
                </em>
            </td>
            <td>
                <p>SecretRef denotes the reference to the Secret that contains the Certificate</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>configMapRef</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.RefConfig">
                        RefConfig
                    </a>
                </em>
            </td>
            <td>
                <p>ConfigMapRef denotes the reference to the ConfigMap that contains the Certificate</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.ClaimMapping">ClaimMapping
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.ClaimMapping" title="Permanent link">¶</a>
</h3>
<p>
<p>ClaimMapping defines the reference configuration</p>
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
                <code>remoteClaim</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>RemoteClaim denotes the remote claim</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>localClaim</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>LocalClaim denotes the local claim</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.JWKS">JWKS
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.JWKS" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.SignatureValidation">SignatureValidation</a>)
</p>
<p>
<p>JWKS defines the JWKS endpoint</p>
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
                <code>url</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>URL is the URL of the JWKS endpoint</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>tls</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.CERTConfig">
                        CERTConfig
                    </a>
                </em>
            </td>
            <td>
                <p>TLS denotes the TLS configuration of the JWKS endpoint</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.SignatureValidation">SignatureValidation
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.SignatureValidation" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.TokenIssuerSpec">TokenIssuerSpec</a>)
</p>
<p>
<p>SignatureValidation defines the signature validation method</p>
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
                <code>jwks</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.JWKS">
                        JWKS
                    </a>
                </em>
            </td>
            <td>
                <p>JWKS denotes the JWKS endpoint information</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>certificate</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.CERTConfig">
                        CERTConfig
                    </a>
                </em>
            </td>
            <td>
                <p>Certificate denotes the certificate information</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.TokenIssuerSpec">TokenIssuerSpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.TokenIssuerSpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.TokenIssuer">TokenIssuer</a>)
</p>
<p>
<p>TokenIssuerSpec defines the desired state of TokenIssuer</p>
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
                <p>Name is the unique name of the Token Issuer in
                    the Organization defined . &ldquo;Organization/Name&rdquo; can
                    be used to uniquely identify an Issuer.</p>
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
                <p>Organization denotes the organization of the Token Issuer.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>issuer</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>Issuer denotes the issuer of the Token Issuer.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>consumerKeyClaim</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>ConsumerKeyClaim denotes the claim key of the consumer key.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>scopesClaim</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>ScopesClaim denotes the claim key of the scopes.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>signatureValidation</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.SignatureValidation">
                        SignatureValidation
                    </a>
                </em>
            </td>
            <td>
                <p>SignatureValidation denotes the signature validation method of jwt</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>claimMappings</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.[]github.com/wso2/apk/common-go-libs/apis/dp/v1alpha2.ClaimMapping">
                        []github.com/wso2/apk/common-go-libs/apis/dp/v1alpha2.ClaimMapping
                    </a>
                </em>
            </td>
            <td>
                <p>ClaimMappings denotes the claim mappings of the jwt</p>
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
                <p>TargetRef denotes the reference to the which gateway it applies to</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>environments</code></br>
                <em>
                    []string
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Environments denotes the environments that are applicable for the token issuer.</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.TokenIssuerStatus">TokenIssuerStatus
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.TokenIssuerStatus" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.TokenIssuer">TokenIssuer</a>)
</p>
<p>
<p>TokenIssuerStatus defines the observed state of TokenIssuer</p>
</p>
<hr />
<p><em>
        Generated with <code>gen-crd-api-reference-docs</code>.
    </em></p>

{!catalogs/samples/token-issuer.md!}
