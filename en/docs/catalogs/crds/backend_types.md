<p>
<p>Package v1alpha1 contains the API Schema definitions for WSO2 APK.</p>
</p>
## Backend

<p>
<p>Backend is the Schema for the backends API</p>
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
            <td><code>Backend</code></td>
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
                    <a href="#dp.wso2.com/v1alpha1.BackendSpec">
                        BackendSpec
                    </a>
                </em>
            </td>
            <td>
                <br />
                <br />
                <table>
                    <tr>
                        <td>
                            <code>services</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha1.Service">
                                    []Service
                                </a>
                            </em>
                        </td>
                        <td>
                            <p>Services holds hosts and ports</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>protocol</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha1.BackendProtocolType">
                                    BackendProtocolType
                                </a>
                            </em>
                        </td>
                        <td>
                            <em>(Optional)</em>
                            <p>Protocol defines the backend protocol</p>
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
                            <em>(Optional)</em>
                            <p>BasePath defines the base path of the backend</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>tls</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha1.TLSConfig">
                                    TLSConfig
                                </a>
                            </em>
                        </td>
                        <td>
                            <p>TLS defines the TLS configurations of the backend</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>security</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha1.SecurityConfig">
                                    SecurityConfig
                                </a>
                            </em>
                        </td>
                        <td>
                            <p>Security defines the security configurations of the backend</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>circuitBreaker</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha1.CircuitBreaker">
                                    CircuitBreaker
                                </a>
                            </em>
                        </td>
                        <td>
                            <p>CircuitBreaker defines the circuit breaker configurations</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>timeout</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha1.Timeout">
                                    Timeout
                                </a>
                            </em>
                        </td>
                        <td>
                            <p>Timeout configuration for the backend</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>retry</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha1.RetryConfig">
                                    RetryConfig
                                </a>
                            </em>
                        </td>
                        <td>
                            <p>Retry configuration for the backend</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <code>healthCheck</code></br>
                            <em>
                                <a href="#dp.wso2.com/v1alpha1.HealthCheck">
                                    HealthCheck
                                </a>
                            </em>
                        </td>
                        <td>
                            <p>HealthCheck configuration for the backend tcp health check</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <code>status</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.BackendStatus">
                        BackendStatus
                    </a>
                </em>
            </td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.BackendProtocolType">BackendProtocolType
    (<code>string</code> alias)</p><a class="headerlink" href="#dp.wso2.com%2fv1alpha1.BackendProtocolType"
        title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.BackendSpec">BackendSpec</a>)
</p>
<p>
<p>BackendProtocolType defines the backend protocol type.</p>
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
                <p>&#34;http&#34;</p>
            </td>
            <td>
                <p>HTTPProtocol is the http protocol</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>&#34;https&#34;</p>
            </td>
            <td>
                <p>HTTPSProtocol is the https protocol</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>&#34;ws&#34;</p>
            </td>
            <td>
                <p>WSProtocol is the ws protocol</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>&#34;wss&#34;</p>
            </td>
            <td>
                <p>WSSProtocol is the wss protocol</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.BackendSpec">BackendSpec
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.BackendSpec" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.Backend">Backend</a>)
</p>
<p>
<p>BackendSpec defines the desired state of Backend</p>
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
                <code>services</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.Service">
                        []Service
                    </a>
                </em>
            </td>
            <td>
                <p>Services holds hosts and ports</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>protocol</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.BackendProtocolType">
                        BackendProtocolType
                    </a>
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Protocol defines the backend protocol</p>
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
                <em>(Optional)</em>
                <p>BasePath defines the base path of the backend</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>tls</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.TLSConfig">
                        TLSConfig
                    </a>
                </em>
            </td>
            <td>
                <p>TLS defines the TLS configurations of the backend</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>security</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.SecurityConfig">
                        SecurityConfig
                    </a>
                </em>
            </td>
            <td>
                <p>Security defines the security configurations of the backend</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>circuitBreaker</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.CircuitBreaker">
                        CircuitBreaker
                    </a>
                </em>
            </td>
            <td>
                <p>CircuitBreaker defines the circuit breaker configurations</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>timeout</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.Timeout">
                        Timeout
                    </a>
                </em>
            </td>
            <td>
                <p>Timeout configuration for the backend</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>retry</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.RetryConfig">
                        RetryConfig
                    </a>
                </em>
            </td>
            <td>
                <p>Retry configuration for the backend</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>healthCheck</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.HealthCheck">
                        HealthCheck
                    </a>
                </em>
            </td>
            <td>
                <p>HealthCheck configuration for the backend tcp health check</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.BackendStatus">BackendStatus
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.BackendStatus" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.Backend">Backend</a>)
</p>
<p>
<p>BackendStatus defines the observed state of Backend</p>
</p>
<h3 id="dp.wso2.com/v1alpha1.BasicSecurityConfig">BasicSecurityConfig
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.BasicSecurityConfig" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.SecurityConfig">SecurityConfig</a>)
</p>
<p>
<p>BasicSecurityConfig defines basic security configurations</p>
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
                <code>secretRef</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.SecretRef">
                        SecretRef
                    </a>
                </em>
            </td>
            <td>
                <p>SecretRef to credentials</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.CircuitBreaker">CircuitBreaker
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.CircuitBreaker" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.BackendSpec">BackendSpec</a>)
</p>
<p>
<p>CircuitBreaker defines the circuit breaker configurations</p>
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
                <code>maxConnections</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>MaxConnections is the maximum number of connections that will make to the upstream cluster.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>maxPendingRequests</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>MaxPendingRequests is the maximum number of pending requests that will allow to the upstream cluster.
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <code>maxRequests</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>MaxRequests is the maximum number of parallel requests that will make to the upstream cluster.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>maxRetries</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>MaxRetries is the maximum number of parallel retries that will allow to the upstream cluster.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>maxConnectionPools</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>MaxConnectionPools is the maximum number of parallel connection pools that will allow to the upstream
                    cluster.
                    If not specified, the default is unlimited.</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.HealthCheck">HealthCheck
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.HealthCheck" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.BackendSpec">BackendSpec</a>)
</p>
<p>
<p>HealthCheck defines the health check configurations</p>
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
                <code>timeout</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Timeout is the time to wait for a health check response.
                    If the timeout is reached the health check attempt will be considered a failure.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>interval</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>Interval is the time between health check attempts in seconds.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>unhealthyThreshold</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>UnhealthyThreshold is the number of consecutive health check failures required
                    before a backend is marked unhealthy.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>healthyThreshold</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>HealthyThreshold is the number of healthy health checks required before a host is marked healthy.
                    Note that during startup, only a single successful health check is required to mark a host healthy.
                </p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.RefConfig">RefConfig
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.RefConfig" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.TLSConfig">TLSConfig</a>)
</p>
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
<h3 id="dp.wso2.com/v1alpha1.RetryConfig">RetryConfig
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.RetryConfig" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.BackendSpec">BackendSpec</a>)
</p>
<p>
<p>RetryConfig defines retry configurations</p>
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
                <code>count</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <p>Count defines the number of retries.
                    If exceeded, TooEarly(425 response code) response will be sent to the client.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>baseIntervalMillis</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>BaseIntervalMillis is exponential retry back off and it defines the base interval between retries in
                    milliseconds.
                    maximum interval is 10 times of the BaseIntervalMillis</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>statusCodes</code></br>
                <em>
                    []uint32
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>StatusCodes defines the list of status codes to retry</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.SecretRef">SecretRef
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.SecretRef" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.BasicSecurityConfig">BasicSecurityConfig</a>)
</p>
<p>
<p>SecretRef to credentials</p>
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
                <p>Name of the secret</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>usernameKey</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>Namespace of the secret</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>passwordKey</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>Key of the secret</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.SecurityConfig">SecurityConfig
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.SecurityConfig" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.BackendSpec">BackendSpec</a>)
</p>
<p>
<p>SecurityConfig defines enpoint security configurations</p>
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
                <code>basic</code></br>
                <em>
                    <a href="#dp.wso2.com/v1alpha1.BasicSecurityConfig">
                        BasicSecurityConfig
                    </a>
                </em>
            </td>
            <td>
                <p>Basic security configuration</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.Service">Service
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.Service" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.BackendSpec">BackendSpec</a>)
</p>
<p>
<p>Service holds host and port information for the service</p>
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
                <code>host</code></br>
                <em>
                    string
                </em>
            </td>
            <td>
                <p>Host is the hostname of the service</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>port</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <p>Port of the service</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.TLSConfig">TLSConfig
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.TLSConfig" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.BackendSpec">BackendSpec</a>)
</p>
<p>
<p>TLSConfig defines enpoint TLS configurations</p>
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
                    <a href="#dp.wso2.com/v1alpha1.RefConfig">
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
                    <a href="#dp.wso2.com/v1alpha1.RefConfig">
                        RefConfig
                    </a>
                </em>
            </td>
            <td>
                <p>ConfigMapRef denotes the reference to the ConfigMap that contains the Certificate</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>allowedSANs</code></br>
                <em>
                    []string
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>AllowedCNs is the list of allowed Subject Alternative Names (SANs)</p>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="dp.wso2.com/v1alpha1.Timeout">Timeout
    <a class="headerlink" href="#dp.wso2.com%2fv1alpha1.Timeout" title="Permanent link">¶</a>
</h3>
<p>
    (<em>Appears on:</em>
    <a href="#dp.wso2.com/v1alpha1.BackendSpec">BackendSpec</a>)
</p>
<p>
<p>Timeout defines the timeout configurations</p>
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
                <code>upstreamResponseTimeout</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <p>UpstreamResponseTimeout spans between the point at which the entire downstream request (i.e.
                    end-of-stream) has been processed and
                    when the upstream response has been completely processed.
                    A value of 0 will disable the route’s timeout.</p>
            </td>
        </tr>
        <tr>
            <td>
                <code>downstreamRequestIdleTimeout</code></br>
                <em>
                    uint32
                </em>
            </td>
            <td>
                <em>(Optional)</em>
                <p>DownstreamRequestIdleTimeout bounds the amount of time the request&rsquo;s stream may be idle.
                    A value of 0 will completely disable the route&rsquo;s idle timeout.</p>
            </td>
        </tr>
    </tbody>
</table>
<hr />
<p><em>
        Generated with <code>gen-crd-api-reference-docs</code>.
    </em></p>

{!catalogs/samples/backend.md!}