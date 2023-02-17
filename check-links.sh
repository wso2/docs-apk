#!/usr/bin/env bash

### Detects any broken links in the generated HTML site
### Script based on the idea in https://matthewsetter.com/writing-tools/npm-broken-link-checker/
### Broken Link Checker NPM library: https://github.com/stevenvachon/broken-link-checker

# For the broken link checker to work, we need to serve the docs locally. We are using npm serve command for this
PORT=4567

# Kill any running serves we used to host the docs
lsof -ti:$PORT | xargs kill

# Make a temporary directory to host apk docs in apk/docs/ path

# npm run build
cd docs/.vuepress/dist || exit
# https://www.npmjs.com/package/serve
serve -p $PORT &
sleep 5

# Some services like `https://docs.github.com` or `https://api.github.com` require a valid user-agent header.
# The deafult user agent header set by the `broken link checker` lib doesn't seem to work in some cases.
# See https://stackoverflow.com/a/39912696
USER_AGENT=""
GITHUB_DOCS_DOMAIN="https://docs.github.com"
# https://www.npmjs.com/package/broken-link-checker
# shellcheck disable=SC2086
if blc --input http://localhost:$PORT/apk/docs/  --user-agent=$USER_AGENT --exclude=$GITHUB_DOCS_DOMAIN -grf; then
  echo "No broken links found."
  exit 0
else
  echo "Broken links found."
  exit 1
fi
