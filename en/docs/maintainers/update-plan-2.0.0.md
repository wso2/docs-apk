# Documentation Update Plan — Kubernetes Gateway 2.0.0

This document is the working plan to update `docs-apk` to match the new 2.x (2.0.0-alpha) product in `apk/`. It lists what to change, where to change it, and what facts to pull from the source of truth (the `apk/` repository) to make accurate edits.

## Goals and scope

- Update all install/upgrade/uninstall instructions to the new Helm chart and repo.
- Align configuration docs with the new values schema and defaults.
- Refresh CRD Catalog to match the actual CRDs shipped in 2.0.0.
- Validate and update “API Management” flows, samples, and screenshots.
- Clean up old 1.3.x references, artifact URLs, and product naming.
- Update About/Release pages to 2.0.0 and architecture deltas.

Success criteria
- No occurrences of `apk-helm` or `--version 1.3.0` remain.
- “Get Started” completes successfully against 2.0.0-alpha (smoke tested).
- CRD Catalog reflects only CRDs present in `apk/helm-charts/crds/`.
- Site builds with no broken links or warnings in strict mode.

## Sources of truth to extract from `apk/`

- Helm chart metadata
  - File: `apk/helm-charts/Chart.yaml`
  - Facts: chart name `kubernetes-gateway-helm`, chart version `2.0.0-alpha`, dependencies, minimum supported Envoy Gateway version.

- Helm values (defaults and examples)
  - Files: `apk/helm-charts/values.yaml`, `apk/samples/helm/quickstart.yaml`, `apk/helm-charts/samples/apk/2.0.0-qsg-values.yaml`
  - Facts: new keys (e.g., `wso2.kgw.*`, `dp.*`), default hostnames/ports, image tags (`wso2/kgw-*:*`).

- Helm repo and commands
  - Repo add: `https://github.com/wso2/apk/releases/download/2.0.0-alpha`
  - Install/upgrade base commands use chart `wso2apk/kubernetes-gateway-helm`.

- CRDs shipped with the chart
  - Folder: `apk/helm-charts/crds/`
  - Facts: the list of CRDs to document (e.g., `cp.wso2.com_*`, `dp.wso2.com_*`, `cert-manager.crds.yaml`). Anything not in this folder should be considered deprecated/removed from the catalog unless otherwise noted.

- APIs and protocol definitions
  - REST/OpenAPI: `apk/adapter/api-docs/*`
  - Protobuf/gRPC: `apk/adapter/api/proto/*`
  - Facts: changed/added endpoints, request/response shapes for “Develop and Deploy” guides and API references.

- Component images and tags
  - Parse from `apk/helm-charts/values.yaml` and `apk/samples/helm/quickstart.yaml` (e.g., `wso2/kgw-enforcer:2.0.0-alpha`, `kgw-common-controller`, `kgw-config-deployer-service`, `kgw-envoy-gateway-extension-server`).

## Global updates (cross-cutting)

- Version and site variables in `en/mkdocs.yml`
  - Confirm `site_name`, `site_url`, `edit_uri`, and `site_version` for 2.0.0 (final vs. `-alpha`).

- Helm chart name and repo
  - Replace `apk-helm` with `kubernetes-gateway-helm` in all pages.
  - Replace ArtifactHub links/commands with GitHub release repo add/install.

- Sample values and paths
  - Replace references to `helm-charts/samples/apk/*1.3.0*.yaml` with either
    - `apk/samples/helm/quickstart.yaml` (preferred), or
    - `apk/helm-charts/samples/apk/2.0.0-qsg-values.yaml` where appropriate.

- Product naming
  - Ensure “WSO2 Kubernetes Gateway” is used consistently. Keep site_description as “WSO2 API Platform for Kubernetes” only if still required by branding.

## Area-by-area tasks and inputs

### 1) Get Started

Files to update
- `docs/get-started/quick-start-guide.md` (already partially updated to 2.0.0; verify end-to-end)
- `docs/get-started/quick-start-guide-as-gateway.md` (contains 1.3.0, `apk-helm`)

What to extract from source
- Confirm Helm repo URL and chart name from `apk/helm-charts/Chart.yaml`.
- Use `apk/samples/helm/quickstart.yaml` for values.

Edits
- Replace all `apk-helm` with `kubernetes-gateway-helm`.
- Replace `--version 1.3.0` and similar with `--version 2.0.0-alpha` (or final tag once released).
- Update links to sample values (use quickstart.yaml).

### 2) Includes (reusable install snippets)

Files to update
- `docs/includes/start-apk.md` (already 2.0.0-alpha; verify)
- `docs/includes/start-apk-cp.md` (uses 1.3.0, `apk-helm`)
- `docs/includes/customize-installation.md` (1.3.0 -> 2.0.0; chart rename)

What to extract
- New values keys/options from `apk/helm-charts/values.yaml`.

Edits
- Normalize commands to the new chart and repo.
- Ensure upgrade examples use `--no-hooks` only if still applicable.

### 3) Setup (install, deployment patterns, ingress, cert-manager, HPA, uninstall)

Files to update (examples)
- `docs/setup/install.md`
- `docs/setup/deployment/apk-dataplane-per-cluster.md`
- `docs/setup/deployment/apk-dataplane-per-namespace*.md`
- `docs/setup/cert-manager.md`
- `docs/setup/Customize-Configurations.md`
- `docs/setup/uninstall.md` (update screenshots and output references)
- `docs/setup/listeners/configure-gateway-listeners.md` (mentions old template paths)

What to extract
- Chart defaults and toggles from `values.yaml`.
- CRDs installed by the chart for the “prereqs” and “permissions” sections.

Edits
- Replace chart name/version and sample paths.
- Update any references to template file paths that no longer exist in 2.x (e.g., adapter/gateway.yaml). Point to values and the relevant Helm templates if needed.

### 4) Control Plane (APIM integration and agent)

Files to review/update
- `docs/control-plane/**` including `apk-as-gateway-in-apim/*` and `start-*.md` pages.
- Pages referencing `apim-apk-agent` or `product-apim-tooling` helm charts.

What to extract
- Confirm whether APIM agent charts/flows are still valid for 2.0.0 and update versions/links.

Edits
- Replace deprecated helm references and sample values links where still supported; otherwise mark as changed or deprecated for 2.x.

### 5) Catalogs — CRD Catalog and Config Catalog

Files to update
- `docs/catalogs/kubernetes-crds.md` and all under `docs/catalogs/crds/`.

What to extract
- The authoritative CRD list from `apk/helm-charts/crds/`.
- For each CRD: group/version/kind, high-level purpose, key spec fields, example YAML.

Edits
- Remove/retire CRD pages that no longer exist in 2.0.0.
- Create/update pages for present CRDs (e.g., `cp.wso2.com_*`, `dp.wso2.com_*`).
- Consider generating reference from CRD schemas to minimize drift.

### 6) API Management (Create/Deploy, Policies, Security, AI/gRPC)

Files to review/update (examples)
- `docs/create-api/**` and `docs/develop-and-deploy-api/**`

What to extract
- Any API/CR changes from: `apk/adapter/api-docs/*`, `apk/adapter/api/proto/*`, CRD schemas.
- Updated examples that conform to new CRDs and values.

Edits
- Update example manifests and curl commands.
- Validate sections like Weighted Routing, Interceptors, Rate Limiting against new policy model (see `dp.wso2.com_routepolicies` CRD).

### 7) Administration (logging, tracing, metrics, analytics, IdPs)

Files to review/update
- `docs/administration/**`, `docs/setup/identity-platform/**`, `docs/administration/prometheus-metric-support.md`, etc.

What to extract
- Logging configs, env vars and images from `values.yaml` and component charts.

Edits
- Update config keys and screenshots to align with 2.0.0 components and defaults.

### 8) About (What is, Architecture, About this Release, Performance)

Files to update
- `docs/about-apk/about-this-release.md` (currently claims 1.3.0)
- `docs/about-apk/architecture.md`
- `docs/index.md` (download links, wording)

What to extract
- 2.0.0 key changes: lighter runtime (Envoy-based), chart rename, CRD model changes, features added/removed.
- Compatibility matrix and links to GitHub releases/issues for 2.0.0.

Edits
- Refresh copy to reflect 2.0.0. Update download links and badges.

## Concrete file checklist (initial)

Update immediately
- `en/mkdocs.yml` — verify all 2.0.0 settings and nav.
- `docs/includes/start-apk-cp.md` — 1.3.0 -> 2.0.0-alpha, chart rename.
- `docs/get-started/quick-start-guide-as-gateway.md` — replace 1.3.0 and `apk-helm`.
- `docs/setup/deployment/*` — replace 1.3.0 and `apk-helm`; update values links.
- `docs/setup/Customize-Configurations.md`, `docs/setup/cert-manager.md`, `docs/setup/webhook-customization.md` — chart rename and version.
- `docs/about-apk/about-this-release.md`, `docs/index.md` — copy refresh and links.

Audit and reshape
- `docs/catalogs/crds/*` — sync with `apk/helm-charts/crds/*`.
- `docs/create-api/**`, `docs/develop-and-deploy-api/**` — validate samples and CR usage.
- `docs/control-plane/**` — validate APIM agent content or deprecate if changed.

Search-and-replace pass (then manual review)
- Replace all occurrences of:
  - `apk-helm` -> `kubernetes-gateway-helm`
  - `--version 1.3.0` / `1.3.0-1` -> `2.0.0-alpha` (or final)
  - `helm-charts/samples/apk/1.3.0*` -> `samples/helm/quickstart.yaml` or `helm-charts/samples/apk/2.0.0-qsg-values.yaml`

## Automation ideas (optional but recommended)

- Scripted grep-based replacements with a whitelist of files; leave `assets/files/*.yaml` templates untouched unless required.
- Generate CRD Reference from YAML schemas to reduce manual drift.
- Validate all code blocks that include `helm` or `kubectl` with a lint pass (e.g., regex sanity check) in CI.

## Risks and open questions

- APIM agent and CP integration flows: confirm supported paths for 2.0.0 vs. deprecations.
- Some “Catalogs” pages may describe resources no longer shipped; align messaging and provide migration notes.
- Branding: ensure the site description/product naming is consistent with marketing guidance.

## Working cadence

1) Global search-and-replace + Get Started fixed, then smoke test locally.
2) Setup section alignment to `values.yaml` and samples.
3) About/Index updates.
4) Catalogs regenerated and linked.
5) API Management walkthroughs validated and updated.
6) Control Plane/APIM agent pages verified.
7) Admin/analytics/logging/tracing refreshed.

## Local validation checklist

- Build and serve the site from `docs-apk/en/`:
  - Install dependencies from `en/requirements.txt`.
  - Run `mkdocs serve` and verify nav, links, code blocks, images.
- Run a link checker (optional) and ensure zero 404s.
- Grep ensures no `apk-helm` and no `1.3.0` remain.

---

Maintainers: update this plan as discoveries are made during editing. Keep a running checklist and mark pages complete as they are migrated to 2.0.0.
