<p>
<p>Package v1alpha1 contains the API Schema definitions for WSO2 APK.</p>
</p>
## Interceptor Service

<p>
<p>InterceptorService is the Schema for the interceptorservices API</p>
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
            <td><code>InterceptorService</code></td>
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
                    <a href="#dp.wso2.com/v1alpha1.InterceptorServiceSpec">
                        InterceptorServiceSpec
                    </a>
                </em>
            </td>
            <td>
                <br />
                <br />
                <table>
                    <tr>
                        <td>
                            <code>backendRef</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha1.BackendReference">
                                    BackendReference
                                </a>
                            </em>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>includes</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha1.InterceptorInclusion">
                                    []InterceptorInclusion
                                </a>
                            </em>
                        </td>
                        <td>
                            <em>(Optional)</em>
                            <p>Includes defines the types of data which should be included when calling the interceptor
                                service</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <code>status</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.InterceptorServiceStatus">
                        InterceptorServiceStatus
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.BackendReference">BackendReference
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.BackendReference" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.InterceptorServiceSpec">InterceptorServiceSpec</a>)
</p>
<p>
<p>BackendReference refers to a Backend resource as the interceptor service.</p>
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
                <p>Name is the name of the Backend resource.</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.InterceptorInclusion">InterceptorInclusion
    (<code>string</code> alias)</p><a class="headerlink" href="#dp.wso2.com%2fv1alpha1.InterceptorInclusion"
        title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.InterceptorServiceSpec">InterceptorServiceSpec</a>)
</p>
<p>
<p>InterceptorInclusion defines the type of data which can be included in the interceptor request/response path</p>
</p>
<table>
    <thead>
        <tr>
            <th>Value</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <p>&#34;invocation_context&#34;</p>
            </td>
            <td>
                <p>InterceptorInclusionInvocationContext is the type to include invocation context</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>&#34;request_body&#34;</p>
            </td>
            <td>
                <p>InterceptorInclusionRequestBody is the type to include request body</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>&#34;request_headers&#34;</p>
            </td>
            <td>
                <p>InterceptorInclusionRequestHeaders is the type to include request headers</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>&#34;request_trailers&#34;</p>
            </td>
            <td>
                <p>InterceptorInclusionRequestTrailers is the type to include request trailers</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>&#34;response_body&#34;</p>
            </td>
            <td>
                <p>InterceptorInclusionResponseBody is the type to include response body</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>&#34;response_headers&#34;</p>
            </td>
            <td>
                <p>InterceptorInclusionResponseHeaders is the type to include response headers</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>&#34;response_trailers&#34;</p>
            </td>
            <td>
                <p>InterceptorInclusionResponseTrailers is the type to include response trailers</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.InterceptorServiceSpec">InterceptorServiceSpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.InterceptorServiceSpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.InterceptorService">InterceptorService</a>)
</p>
<p>
<p>InterceptorServiceSpec defines the desired state of InterceptorService</p>
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
                <code>backendRef</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.BackendReference">
                        BackendReference
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
                <code>includes</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.InterceptorInclusion">
                        []InterceptorInclusion
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Includes defines the types of data which should be included when calling the interceptor service</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.InterceptorServiceStatus">InterceptorServiceStatus
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.InterceptorServiceStatus" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.InterceptorService">InterceptorService</a>)
</p>
<p>
<p>InterceptorServiceStatus defines the observed state of InterceptorService</p>
</p>
<hr />
<p><em>
        Generated with <code>gen-crd-api-reference-docs</code>.
    </em></p>

## Interceptor Service Sample

{!catalogs/samples/interceptor-service.md!}