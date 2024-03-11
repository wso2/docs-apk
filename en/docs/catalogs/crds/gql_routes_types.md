<p>
<p>Package v1alpha2 contains the API Schema definitions for WSO2 APK.</p>
</p>

## GQLRoute

<p>
<p>GQLRoute is the Schema for the gqlroutes API</p>
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
                    <a href="#dp.wso2.com/v1alpha2.GQLRouteSpec">
                        GQLRouteSpec
                    </a>
                </em>
            </td>
            <td>
                <br />
                <br />
                <table>
                    <tr>
                        <td>
                            <code>CommonRouteSpec</code></br>
                            <em>
                                sigs.k8s.io/gateway-api/apis/v1beta1.CommonRouteSpec
                            </em>
                        </td>
                        <td>
                            <p>
                                (Members of <code>CommonRouteSpec</code> are embedded into this type.)
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>hostnames</code></br>
                            <em>
                                []sigs.k8s.io/gateway-api/apis/v1beta1.Hostname
                            </em>
                        </td>
                        <td>
                            <em>(Optional)</em>
                            <p>Hostnames defines a set of hostname that should match against the HTTP Host
                                header to select a GQLRoute used to process the request.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>backendRefs</code></br>
                            <em>
                                []sigs.k8s.io/gateway-api/apis/v1beta1.HTTPBackendRef
                            </em>
                        </td>
                        <td>
                            <p>BackendRefs defines the backend(s) where matching requests should be
                                sent.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>rules</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha2.GQLRouteRules">
                                    []GQLRouteRules
                                </a>
                            </em>
                        </td>
                        <td>
                            <em>(Optional)</em>
                            <p>Rules are a list of GraphQL resources, filters and actions.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <code>status</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.GQLRouteStatus">
                        GQLRouteStatus
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.GQLRouteFilter">GQLRouteFilter
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.GQLRouteFilter" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.GQLRouteRules">GQLRouteRules</a>)
</p>
<p>
<p>GQLRouteFilter defines the filter to be applied to a request.</p>
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
                <code>extensionRef</code></br>
                <em>
                    sigs.k8s.io/gateway-api/apis/v1beta1.LocalObjectReference
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>ExtensionRef is an optional, implementation-specific extension to the
                    &ldquo;filter&rdquo; behavior. For example, resource &ldquo;myroutefilter&rdquo; in group
                    &ldquo;networking.example.net&rdquo;). ExtensionRef MUST NOT be used for core and
                    extended filters.</p>
                <p>Support: Implementation-specific</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.GQLRouteMatch">GQLRouteMatch
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.GQLRouteMatch" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.GQLRouteRules">GQLRouteRules</a>)
</p>
<p>
<p>GQLRouteMatch defines the predicate used to match requests to a given
    action.</p>
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
                <code>type</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.GQLType">
                        GQLType
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Type specifies GQL typematcher.
                    When specified, this route will be matched only if the request has the
                    specified method.</p>
                <p>Support: Extended</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>path</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>Path specifies a GQL request resource matcher.</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.GQLRouteRules">GQLRouteRules
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.GQLRouteRules" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.GQLRouteSpec">GQLRouteSpec</a>)
</p>
<p>
<p>GQLRouteRules defines semantics for matching an GraphQL request based on
    conditions (matches), processing it (filters), and forwarding the request to
    an API object (backendRefs).</p>
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
                <code>matches</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.GQLRouteMatch">
                        []GQLRouteMatch
                    </a>
                </em>
            </td>
            <td>
                <p>Matches define conditions used for matching the rule against incoming
                    graphQL requests. Each match is independent, i.e. this rule will be matched
                    if <strong>any</strong> one of the matches is satisfied.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>filters</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.GQLRouteFilter">
                        []GQLRouteFilter
                    </a>
                </em>
            </td>
            <td>
                <p>Filters define the filters that are applied to requests that match
                    this rule.</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.GQLRouteSpec">GQLRouteSpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.GQLRouteSpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.GQLRoute">GQLRoute</a>)
</p>
<p>
<p>GQLRouteSpec defines the desired state of GQLRoute</p>
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
                <code>CommonRouteSpec</code></br>
                <em>
                    sigs.k8s.io/gateway-api/apis/v1beta1.CommonRouteSpec
                </em>
            </td>
            <td>
                <p>
                    (Members of <code>CommonRouteSpec</code> are embedded into this type.)
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <code>hostnames</code></br>
                <em>
                    []sigs.k8s.io/gateway-api/apis/v1beta1.Hostname
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Hostnames defines a set of hostname that should match against the HTTP Host
                    header to select a GQLRoute used to process the request.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>backendRefs</code></br>
                <em>
                    []sigs.k8s.io/gateway-api/apis/v1beta1.HTTPBackendRef
                </em>
            </td>
            <td>
                <p>BackendRefs defines the backend(s) where matching requests should be
                    sent.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>rules</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha2.GQLRouteRules">
                        []GQLRouteRules
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Rules are a list of GraphQL resources, filters and actions.</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha2.GQLRouteStatus">GQLRouteStatus
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha2.GQLRouteStatus" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.GQLRoute">GQLRoute</a>)
</p>
<p>
<p>GQLRouteStatus defines the observed state of GQLRoute</p>
</p>
<h3 id="dp.wso2.com/v1alpha2.GQLType">GQLType
    (<code>string</code> alias)</p>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha2.GQLRouteMatch">GQLRouteMatch</a>)
</p>
<p>
<p>GQLType describes how to select a GQL request by matching the GQL Type.
    The value is expected in upper case.</p>
<p>Note that values may be added to this enum, implementations
    must ensure that unknown values will not cause a crash.</p>
<p>Unknown values here must result in the implementation setting the
    Accepted Condition for the Route to <code>status: False</code>, with a
    Reason of <code>UnsupportedValue</code>.</p>
</p>

<hr />
<p><em>
        Generated with <code>gen-crd-api-reference-docs</code>.
</em></p>