<p>
<p>Package v1alpha1 contains the API Schema definitions for WSO2 APK.</p>
</p>
<h3 id="dp.wso2.com/v1alpha1.JWTIssuerMapping">JWTIssuerMapping <a class="headerlink"
        href="#dp.wso2.com%2fv1alpha1.JWTIssuerMapping" title="Permanent link">¶</a>
</h3>
<p>
<p>JWTIssuerMapping maps read reconciled Backend and resolve properties into ResolvedJWTIssuer struct</p>
</p>
<h3 id="dp.wso2.com/v1alpha1.ResolvedJWKS">ResolvedJWKS
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.ResolvedJWKS" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.ResolvedSignatureValidation">ResolvedSignatureValidation</a>)
</p>
<p>
<p>ResolvedJWKS holds the resolved properties of JWKS</p>
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
                <code>URL</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>TLS</code></br>
                <em>
                    invalid type
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.ResolvedJWTIssuer">ResolvedJWTIssuer
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.ResolvedJWTIssuer" title="Permanent link">¶</a>
</h3>
<p>
<p>ResolvedJWTIssuer holds the resolved properties of JWTIssuer</p>
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
                <code>Name</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>Organization</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>Issuer</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>ConsumerKeyClaim</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>ScopesClaim</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>SignatureValidation</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.ResolvedSignatureValidation">
                        ResolvedSignatureValidation
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>ClaimMappings</code></br>
                <em>
                    map[string]string
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.ResolvedSignatureValidation">ResolvedSignatureValidation
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.ResolvedSignatureValidation" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.ResolvedJWTIssuer">ResolvedJWTIssuer</a>)
</p>
<p>
<p>ResolvedSignatureValidation holds the resolved properties of SignatureValidation</p>
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
                <code>JWKS</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.ResolvedJWKS">
                        ResolvedJWKS
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>Certificate</code></br>
                <em>
                    invalid type
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