## RoutePolicy

<p>
<p>RoutePolicy is the Schema for the routepolicies API</p>
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
					<a href="#dp.wso2.com/v2alpha1.RoutePolicySpec">
						RoutePolicySpec
					</a>
				</em>
			</td>
			<td>
				<br />
				<br />
				<table>
					<tr>
						<td>
							<code>requestMediation</code></br>
							<em>
								<a href="#dp.wso2.com/v2alpha1.Mediation">[]Mediation</a>
							</em>
						</td>
						<td>
							<em>(Optional)</em>
						</td>
					</tr>
					<tr>
						<td>
							<code>responseMediation</code></br>
							<em>
								<a href="#dp.wso2.com/v2alpha1.Mediation">[]Mediation</a>
							</em>
						</td>
						<td>
							<em>(Optional)</em>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td>
				<code>status</code></br>
				<em>
					<a href="#dp.wso2.com/v2alpha1.PolicyStatus">
						PolicyStatus
					</a>
				</em>
			</td>
			<td>
			</td>
		</tr>
	</tbody>
</table>

<h3 id="dp.wso2.com/v2alpha1.RoutePolicySpec">RoutePolicySpec
	<a class="headerlink" href="#dp.wso2.com%2fv2alpha1.RoutePolicySpec" title="Permanent link">¶</a>
</h3>
<p>
	(<em>Appears on:</em>
	<a href="#dp.wso2.com/v2alpha1.RoutePolicy">RoutePolicy</a>)
</p>
<p>
<p>RoutePolicySpec defines the desired state of RoutePolicy</p>
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
				<code>requestMediation</code></br>
				<em>
					<a href="#dp.wso2.com/v2alpha1.Mediation">[]Mediation</a>
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
		<tr>
			<td>
				<code>responseMediation</code></br>
				<em>
					<a href="#dp.wso2.com/v2alpha1.Mediation">[]Mediation</a>
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
	</tbody>
</table>

<h3 id="dp.wso2.com/v2alpha1.Mediation">Mediation
	<a class="headerlink" href="#dp.wso2.com%2fv2alpha1.Mediation" title="Permanent link">¶</a>
</h3>
<p>
	(<em>Appears on:</em>
	<a href="#dp.wso2.com/v2alpha1.RoutePolicySpec">RoutePolicySpec</a>)
</p>
<p>
<p>Mediation represents a policy mediation configuration. It can be used for both request and response mediation.</p>
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
				<code>policyID</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<strong>Required.</strong>
			</td>
		</tr>
		<tr>
			<td>
				<code>policyName</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<strong>Required.</strong>
			</td>
		</tr>
		<tr>
			<td>
				<code>policyVersion</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
		<tr>
			<td>
				<code>parameters</code></br>
				<em>
					<a href="#dp.wso2.com/v2alpha1.Parameter">[]Parameter</a>
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
	</tbody>
</table>

<h3 id="dp.wso2.com/v2alpha1.Parameter">Parameter
	<a class="headerlink" href="#dp.wso2.com%2fv2alpha1.Parameter" title="Permanent link">¶</a>
</h3>
<p>
	(<em>Appears on:</em>
	<a href="#dp.wso2.com/v2alpha1.Mediation">Mediation</a>)
</p>
<p>
<p>Parameter represents a key-value or key-valueFrom pair for policy parameters</p>
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
				<code>key</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<strong>Required.</strong>
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
				<em>(Optional)</em>
			</td>
		</tr>
		<tr>
			<td>
				<code>valueRef</code></br>
				<em>
					<a href="#dp.wso2.com/v2alpha1.ValueRef">ValueRef</a>
				</em>
			</td>
			<td>
				<em>(Optional)</em>
			</td>
		</tr>
	</tbody>
</table>

<h3 id="dp.wso2.com/v2alpha1.ValueRef">ValueRef
	<a class="headerlink" href="#dp.wso2.com%2fv2alpha1.ValueRef" title="Permanent link">¶</a>
</h3>
<p>
	(<em>Appears on:</em>
	<a href="#dp.wso2.com/v2alpha1.Parameter">Parameter</a>)
</p>
<p>
<p>ValueRef is used to reference a value from another resource (ConfigMap, Secret, or other resources).</p>
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
				<code>group</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<strong>Required.</strong>
			</td>
		</tr>
		<tr>
			<td>
				<code>kind</code></br>
				<em>
					string
				</em>
			</td>
			<td>
				<strong>Required.</strong>
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
				<strong>Required.</strong>
			</td>
		</tr>
	</tbody>
</table>

<h3 id="dp.wso2.com/v2alpha1.PolicyStatus">PolicyStatus
	<a class="headerlink" href="#dp.wso2.com%2fv2alpha1.PolicyStatus" title="Permanent link">¶</a>
</h3>
<p>
	(<em>Appears on:</em>
	<a href="#dp.wso2.com/v2alpha1.RoutePolicy">RoutePolicy</a>)
</p>
<p>
<p>PolicyStatus defines the common attributes that all Policies should include within their status.</p>
</p>

<hr />
<p><em>
		Generated with <code>gen-crd-api-reference-docs</code>.
</em></p>
