<p>
<p>Package v1alpha1 contains the API Schema definitions for WSO2 APK.</p>
</p>
<h3 id="dp.wso2.com/v1alpha1.API">API
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.API" title="Permanent link">¶</a>
</h3>
<p>
<p>API is the Schema for the apis API</p>
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
            <td><code>API</code></td>
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
                    <a href="#dp.wso2.com/v1alpha1.APISpec">
                        APISpec
                    </a>
                </em>
            </td>
            <td>
                <br />
                <br />
                <table>
                    <tr>
                        <td>
                            <code>apiName</code></br>
                            <em>
                                string
                            </em>
                        </td>
                        <td>
                            <p>APIName is the unique name of the API
                                can be used to uniquely identify an API.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>apiVersion</code></br>
                            <em>
                                string
                            </em>
                        </td>
                        <td>
                            <p>APIVersion is the version number of the API.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>isDefaultVersion</code></br>
                            <em>
                                bool
                            </em>
                        </td>
                        <td>
                            <em>(Optional)</em>
                            <p>IsDefaultVersion indicates whether this API version should be used as a default API</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>definitionFileRef</code></br>
                            <em>
                                string
                            </em>
                        </td>
                        <td>
                            <em>(Optional)</em>
                            <p>DefinitionFileRef contains the OpenAPI 3 or Swagger
                                definition of the API in a ConfigMap.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>definitionPath</code></br>
                            <em>
                                string
                            </em>
                        </td>
                        <td>
                            <p>DefinitionPath contains the path to expose the API definition.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>production</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha1.EnvConfig">
                                    []EnvConfig
                                </a>
                            </em>
                        </td>
                        <td>
                            <em>(Optional)</em>
                            <p>Production contains a list of references to HttpRoutes
                                of type HttpRoute.
                                xref: <a
                                    href="https://github.com/kubernetes-sigs/gateway-api/blob/main/apis/v1beta1/httproute_types.go">https://github.com/kubernetes-sigs/gateway-api/blob/main/apis/v1beta1/httproute_types.go</a>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>sandbox</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha1.EnvConfig">
                                    []EnvConfig
                                </a>
                            </em>
                        </td>
                        <td>
                            <em>(Optional)</em>
                            <p>Sandbox contains a list of references to HttpRoutes
                                of type HttpRoute.
                                xref: <a
                                    href="https://github.com/kubernetes-sigs/gateway-api/blob/main/apis/v1beta1/httproute_types.go">https://github.com/kubernetes-sigs/gateway-api/blob/main/apis/v1beta1/httproute_types.go</a>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>apiType</code></br>
                            <em>
                                string
                            </em>
                        </td>
                        <td>
                            <p>APIType denotes the type of the API.
                                Possible values could be REST, GraphQL, Async</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>basePath</code></br>
                            <em>
                                string
                            </em>
                        </td>
                        <td>
                            <p>BasePath denotes the basepath of the API.
                                e.g: /pet-store-api/1.0.6</p>
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
                            <em>(Optional)</em>
                            <p>Organization denotes the organization.
                                related to the API</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>systemAPI</code></br>
                            <em>
                                bool
                            </em>
                        </td>
                        <td>
                            <em>(Optional)</em>
                            <p>SystemAPI denotes if it is an internal system API.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>apiProperties</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha1.Property">
                                    []Property
                                </a>
                            </em>
                        </td>
                        <td>
                            <em>(Optional)</em>
                            <p>APIProperties denotes the custom properties of the API.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <code>status</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.APIStatus">
                        APIStatus
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.APISpec">APISpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.APISpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.API">API</a>)
</p>
<p>
<p>APISpec defines the desired state of API</p>
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
                <code>apiName</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>APIName is the unique name of the API
                    can be used to uniquely identify an API.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>apiVersion</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>APIVersion is the version number of the API.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>isDefaultVersion</code></br>
                <em>
                    bool
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>IsDefaultVersion indicates whether this API version should be used as a default API</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>definitionFileRef</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>DefinitionFileRef contains the OpenAPI 3 or Swagger
                    definition of the API in a ConfigMap.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>definitionPath</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>DefinitionPath contains the path to expose the API definition.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>production</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.EnvConfig">
                        []EnvConfig
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Production contains a list of references to HttpRoutes
                    of type HttpRoute.
                    xref: <a
                        href="https://github.com/kubernetes-sigs/gateway-api/blob/main/apis/v1beta1/httproute_types.go">https://github.com/kubernetes-sigs/gateway-api/blob/main/apis/v1beta1/httproute_types.go</a>
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <code>sandbox</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.EnvConfig">
                        []EnvConfig
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Sandbox contains a list of references to HttpRoutes
                    of type HttpRoute.
                    xref: <a
                        href="https://github.com/kubernetes-sigs/gateway-api/blob/main/apis/v1beta1/httproute_types.go">https://github.com/kubernetes-sigs/gateway-api/blob/main/apis/v1beta1/httproute_types.go</a>
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <code>apiType</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>APIType denotes the type of the API.
                    Possible values could be REST, GraphQL, Async</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>basePath</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>BasePath denotes the basepath of the API.
                    e.g: /pet-store-api/1.0.6</p>
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
                <em>(Optional)</em>
                <p>Organization denotes the organization.
                    related to the API</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>systemAPI</code></br>
                <em>
                    bool
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>SystemAPI denotes if it is an internal system API.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>apiProperties</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.Property">
                        []Property
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>APIProperties denotes the custom properties of the API.</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.APIStatus">APIStatus
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.APIStatus" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.API">API</a>)
</p>
<p>
<p>APIStatus defines the observed state of API</p>
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
                <code>deploymentStatus</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.DeploymentStatus">
                        DeploymentStatus
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>DeploymentStatus denotes the deployment status of the API</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.DeploymentStatus">DeploymentStatus
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.DeploymentStatus" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.APIStatus">APIStatus</a>)
</p>
<p>
<p>DeploymentStatus contains the status of the API deployment</p>
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
                <code>status</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>Status denotes the state of the API in its lifecycle.
                    Possible values could be Accepted, Invalid, Deploy etc.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>message</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Message represents a user friendly message that explains the
                    current state of the API.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>accepted</code></br>
                <em>
                    bool
                </em>
            </td>
            <td>
                <p>Accepted represents whether the API is accepted or not.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>transitionTime</code></br>
                <em>
                    <a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#time-v1-meta">
                        Kubernetes meta/v1.Time
                    </a>
                </em>
            </td>
            <td>
                <p>TransitionTime represents the last known transition timestamp.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>events</code></br>
                <em>
                    []string
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Events contains a list of events related to the API.</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.EnvConfig">EnvConfig
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.EnvConfig" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.APISpec">APISpec</a>)
</p>
<p>
<p>EnvConfig contains the environment specific configuration</p>
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
                <code>httpRouteRefs</code></br>
                <em>
                    []string
                </em>
            </td>
            <td>
                <p>HTTPRouteRefs denotes the environment of the API.</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.Property">Property
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.Property" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.APISpec">APISpec</a>)
</p>
<p>
<p>Property holds key value pair of APIProperties</p>
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
                <code>value</code></br>
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