<p>
<p>Package v1alpha2 contains the API Schema definitions for WSO2 APK.</p>
</p>
## API Policy

<p>
<p>APIPolicy is the Schema for the apipolicies API</p>
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
dp.wso2.com/v1alpha2
</code>
            </td>
        </tr>
        <tr>
            <td>
                <code>kind</code></br>
                string
            </td>
            <td><code>APIPolicy</code></td>
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
                    <a href="#dp.wso2.com/v1alpha2.APIPolicySpec">
                        APIPolicySpec
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
                                <a href="#dp.wso2.com/v1alpha2.PolicySpec">
                                    PolicySpec
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
                                <a href="#dp.wso2.com/v1alpha2.PolicySpec">
                                    PolicySpec
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
                    <a href="#dp.wso2.com/v1alpha2.APIPolicyStatus">
                        APIPolicyStatus
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>

<h3 id="dp.wso2.com/v1alpha2.APIPolicySpec">APIPolicySpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.APIPolicySpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.APIPolicy">APIPolicy</a>)
</p>
<p>
<p>APIPolicySpec defines the desired state of APIPolicy</p>
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
                    <a href="#dp.wso2.com/v1alpha2.PolicySpec">
                        PolicySpec
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
                    <a href="#dp.wso2.com/v1alpha2.PolicySpec">
                        PolicySpec
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
<h3 id="dp.wso2.com/v1alpha2.APIPolicyStatus">APIPolicyStatus
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.APIPolicyStatus" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.APIPolicy">APIPolicy</a>)
</p>
<p>
<p>APIPolicyStatus defines the observed state of APIPolicy</p>
</p>

<h3 id="dp.wso2.com/v1alpha2.BackendJWTToken">BackendJWTToken
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.BackendJWTToken" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.PolicySpec">PolicySpec</a>)
</p>
<p>
<p>BackendJWTToken holds backend JWT token information</p>
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
                <p>Name holds the name of the BackendJWT resource.</p>
            </td>
        </tr>
    </tbody>
</table>

<h3 id="dp.wso2.com/v1alpha2.CORSPolicy">CORSPolicy
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.CORSPolicy" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.PolicySpec">PolicySpec</a>)
</p>
<p>
<p>CORSPolicy holds CORS policy information</p>
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
                <code>accessControlAllowCredentials</code></br>
                <em>
                    bool
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>AllowCredentials indicates whether the request can include user credentials like
                    cookies, HTTP authentication or client side SSL certificates.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>accessControlAllowHeaders</code></br>
                <em>
                    []string
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>AccessControlAllowHeaders indicates which headers can be used
                    during the actual request.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>accessControlAllowMethods</code></br>
                <em>
                    []string
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>AccessControlAllowMethods indicates which methods can be used
                    during the actual request.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>accessControlAllowOrigins</code></br>
                <em>
                    []string
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>AccessControlAllowOrigins indicates which origins can be used
                    during the actual request.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>accessControlExposeHeaders</code></br>
                <em>
                    []string
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>AccessControlExposeHeaders indicates which headers can be exposed
                    as part of the response by listing their names.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>accessControlMaxAge</code></br>
                <em>
                    int
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>AccessControlMaxAge indicates how long the results of a preflight request
                    can be cached in a preflight result cache.</p>
            </td>
        </tr>
    </tbody>
</table>

<h3 id="dp.wso2.com/v1alpha2.InterceptorReference">InterceptorReference
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.InterceptorReference" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.PolicySpec">PolicySpec</a>)
</p>
<p>
<p>InterceptorReference holds InterceptorService reference using name and namespace</p>
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
                <p>Name is the referced CR&rsquo;s name of InterceptorService resource.</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.PolicySpec">PolicySpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.PolicySpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.APIPolicySpec">APIPolicySpec</a>)
</p>
<p>
<p>PolicySpec contains API policies</p>
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
                <code>requestInterceptors</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.InterceptorReference">
                        []InterceptorReference
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>RequestInterceptors referenced to intercetor services to be applied
                    to the request flow.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>responseInterceptors</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.InterceptorReference">
                        []InterceptorReference
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>ResponseInterceptors referenced to intercetor services to be applied
                    to the response flow.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>backendJwtPolicy</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.BackendJWTToken">
                        BackendJWTToken
                    </a>
                </em>
            </td>
            <td>
                <p>BackendJWTPolicy holds reference to backendJWT policy configurations</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>cORSPolicy</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.CORSPolicy">
                        CORSPolicy
                    </a>
                </em>
            </td>
            <td>
                <p>CORS policy to be applied to the API.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>subscriptionValidation</code></br>
                <em>
                    bool
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>SubscriptionValidation denotes whether subscription validation is enabled for the API</p>
            </td>
        </tr>
    </tbody>
</table>
<hr />
<p><em>
        Generated with <code>gen-crd-api-reference-docs</code>.
    </em></p>

{!catalogs/samples/api-policy.md!}
