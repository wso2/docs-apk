<div class="homePage">
    <div class="section01">
        <div class="leftContent">
            <div class="about-home">
                    <div>
                        APK is WSO2's cloud native API management platform. APK is designed to help you build, deploy, and manage APIs in a cloud environment. Our platform is built on top of a microservices architecture and uses containerization technologies to ensure scalability and flexibility. With features like automatic failover and load balancing, our APK platform is designed to be highly available and able to handle large numbers of API requests without performance degradation. We've also added support for continuous delivery and deployment, so you can quickly and easily push updates to your API services.
                    </div>
                <div>
                    <a href="https://wso2.com/blogs/thesource/announcing-wso2-api-platform-for-kubernetes/" class="banner-link"></a>
                </div>
            </div>
            <div class="download-btn-wrapper">
                 <h2>Download</h2>
                <a href="https://github.com/wso2/apk/releases">
                    <i class="fa-solid fa-file-arrow-down"></i>
                </a>
            </div>
        </div>
        <!--<div class="md-main .md-content " style="float:right; width: 55%; align:right;  flex-shrink: 0;min-width: 40%; max-height: 100%; max-width:50%; margin-left:10px; margin-top:20px">
        < IMAGE >
        </div>-->
    </div>
    <div class="section02">
        <!--<h3>APK in a Nutshell</h3>-->
        <div class="linkWrapper">
            <div class="linkSet2" onclick="location.href='get-started/quick-start-guide', '_blank')">
                <a href="get-started/quick-start-guide" target="_blank"><h3>Quick Start Guide</h3></a>
                <p>
                    The Quick Start Guide for WSO2 API Platform for Kubernetes is a good starting point for developers and architects aiming to build innovative apps and services using APIs. It offers a comprehensive overview of APK platform installation, configuration, and API creation and publishing. The guide is user-friendly, featuring step-by-step instructions, making it ideal for beginners and those wanting to explore advanced features. It is an excellent foundation for building secure, scalable, and robust APIs, enhancing your overall API management capabilities. Get started with quick start guideline to take your API development to the next level.
                </p>
            </div>
            <div class="linkSet2 middle" onclick="location.href='about-apk/what-is-apk', '_blank')">
                <a href="about-apk/what-is-apk" target="_blank"><h3>What is APK?</h3></a>
                <p>
                    WSO2 API Platform for Kubernetes (APK) provides a complete solution for API management, covering the entire API lifecycle from design and development to publishing and consumption. With its support for API gateway, developer portal, and marketplace capabilities, the platform offers a robust set of tools for managing APIs. Additionally, WSO2 APK includes key architectural features specifically designed for Kubernetes environments, making it easy to deploy and manage APIs in a cloud-native way.
                </p>
            </div>
            <div class="linkSet2 last" onclick="location.href='about-apk/architecture', '_blank')">
                <a href="about-apk/architecture" target="_blank"><h3>Architecture</h3></a>
                <p>
                    WSO2 APK's microservices architecture is built on top of a containerized infrastructure, which enables rapid deployment and scalability in Kubernetes environments. The platform's architecture is composed of various components, including API Gateway, Developer Portal, Analytics, Key Manager, and Traffic Manager, all of which can be deployed independently or together to create a comprehensive API management solution. This modular approach allows organizations to choose only the components they need, reducing the platform's overall footprint while still providing enterprise-grade API management capabilities.
                </p>
            </div>
        </div>
    </div>
<!--    <div class="section03">
        <div class="linkSet2" onclick="location.href='../get-started/overview';">
            <h3>Overview</h3>
            <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            </p>
            <a href='../get-started/overview'><h4>Read a Short Overview</h4></a>
        </div>
        <div class="linkSet2 middle" onclick="location.href='../about-apk/key-concepts/key-concept';">
            <h3>Concepts</h3>
            <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            </p>
            <a href='../about-apk/key-concepts/key-concept'><h4>Understand the Concepts</h4></a>
        </div>
        <div class="linkSet2 last" onclick="location.href='/about-apk/architecture';">
            <h3>Architecture</h3>
            <p>
                The architecture of a software platform is an important factor in determining its performance, scalability, and reliability. Get a better understanding of the architecture of the WSO2 APK platform.
            </p>
            <a href='/about-apk/architecture'><h4>View Architecture</h4></a>
        </div>
    </div>-->
</div>
{% raw %}
<style>
.md-sidebar.md-sidebar--primary {
    display: none;
}
.md-sidebar.md-sidebar--secondary{
    display: none;
}
.section02 {
    display: flex;
    justify-content: space-between;
}
header.md-header .md-header__button:not([hidden]) {
    /* display: none; */
}
.about-home {
    display: flex;
}
.about-home div:first-child {
    width: 50%;
    padding-top: 50px;
}
.about-home div:nth-child(2) {
    width: 50%;
}
@media screen and (max-width: 76.1875em) {
    .md-sidebar.md-sidebar--primary {
        display: block;
    }
}
@media screen and (max-width: 945px) {
    .about-home div:first-child {
        width: 100%;
    }
    .about-home div:nth-child(2) {
        width: 100%;
    }
    .about-home {
        flex-direction: column;
    }
    .md-typeset a {
        background-position-x: left;
    }
    .download-btn-wrapper {
        display: block;
        text-align: center;
    }
}
.md-typeset h1{
    visibility: hidden;
    margin-bottom: 0;
}
</style>
{% endraw %}
