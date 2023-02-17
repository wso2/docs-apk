---
home: true
heroText: APK Documentation
heroImage: /assets/img/apk-logo-b.png
tagline: Let's use the WSO2 API Platform for Kubernetes (WSO2 APK) documentation to learn how to seamlessly create, deploy, and publish APIs using APK.
homeBannerText: Work In Progress! Bear with us while we perfect our documentation for you.
actionText: Quick Start →
actionLink: /get-started/
getStartedText: Get Started
getStartedLink: /get-started/
whatIsAPKText: What is APK
whatIsAPKLink: /get-started/

features:
- title: Login
  details: Enable secure login for your applications using APK as the identity provider.
  link: /guides/authentication/add-login-to-apps/
  icon: icons/feature-login.svg
  cssClass: login
  subLinks:
  - name: "For Single-Page Applications"
    link: /guides/authentication/add-login-to-single-page-app/

  - name: "For Web Applications"
    link: /guides/authentication/add-login-to-web-app/

- title: Social Login
  details: Enable your application users to log in with their existing social identities.
  link: /guides/authentication/social-login/
  icon: icons/feature-social-login.svg
  cssClass: social-login
  subLinks:
  - name: "Facebook Login"
    link: /guides/authentication/social-login/add-facebook-login/

  - name: "Github Login"
    link: /guides/authentication/social-login/add-github-login/

  - name: "Google Login"
    link: /guides/authentication/social-login/add-google-login/

- title: Standard-Based IDPs
  details: Enable your application users to log in using a standard-based identity provider.
  link: /guides/authentication/enterprise-login/
  icon: icons/feature-enterprise-idp.svg
  cssClass: enterprise-idp
  subLinks:
  - name: "SAML IdPs"
    link: /guides/authentication/enterprise-login/add-saml-idp-login/

  - name: "OpenID Connect IdPs"
    link: /guides/authentication/enterprise-login/add-oidc-idp-login/

- title: Multi-Factor Authentication
  details: Add strong authentication to your application by enabling multiple authentication factors.
  link: /guides/authentication/mfa/
  icon: icons/feature-mfa.svg
  cssClass: mfa
  subLinks:
  - name: "TOTP"
    link: /guides/authentication/mfa/add-totp-login/

  - name: "Email OTP"
    link: /guides/authentication/mfa/add-emailotp-login/

- title: Conditional Authentication
  details: Add strong authentication to your application by customizing the login flow using a script.
  link: /guides/authentication/conditional-auth/
  icon: icons/feature-conditional-access.svg
  cssClass: conditional-access
  subLinks:
  - name: "Access Control"
    link: /guides/authentication/conditional-auth/access-control/

  - name: "Adaptive MFA"
    link: /guides/authentication/conditional-auth/adaptive-mfa/

  - name: "Custom Authentication Flows"
    link: /guides/authentication/conditional-auth/write-your-first-script/
  
- title: Users
  details: Manage users in your organizations and enable users to manage their own profiles.
  link: /guides/users/
  icon: icons/feature-users.svg
  cssClass: users
  subLinks:
  - name: "Administrators"
    link: /guides/users/manage-collaborators/

  - name: "Users"
    link: /guides/users/manage-customers/

  - name: "User Self-Service"
    link: /guides/user-self-service/

technologies:
- name: React
  icon: images/technologies/react-logo.svg
  sdkPath: /get-started/try-your-own-app/react/
  samplePath: /get-started/try-samples/qsg-spa-react/
  cssClass: react

- name: Javascript
  icon: images/technologies/javascript-logo.svg
  sdkPath: /get-started/try-your-own-app/javascript/
  samplePath: /get-started/try-samples/qsg-spa-javascript/
  cssClass: javascript
  
- name: Java EE-OIDC
  icon: images/technologies/oidc-idp-illustration.png
  sdkPath: /get-started/try-your-own-app/java-ee-oidc/
  samplePath: /get-started/try-samples/qsg-oidc-webapp-java-ee/
  cssClass: oidc
  
- name: Java EE-SAML
  icon: images/technologies/saml-logo.svg
  sdkPath: /get-started/try-your-own-app/java-ee-saml/
  samplePath: /get-started/try-samples/qsg-saml-webapp-java-ee/
  cssClass: saml
