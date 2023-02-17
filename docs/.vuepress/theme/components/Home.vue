<template>
  <main
    :aria-labelledby="$frontmatter.heroText !== null ? 'main-title' : null"
    class="home"
  >
    <!-- <Banner v-if="$frontmatter.homeBannerText" :bannerText="$frontmatter.homeBannerText"/> -->
    <header class="hero">
      <div class="hero-info">
        <MyTransition :delay="0.04">
          <h1
            v-if="$frontmatter.heroText !== false"
            id="main-title"
            v-text="$frontmatter.heroText || $title || 'Hello'"
          />
        </MyTransition>
        <MyTransition :delay="0.08">
          <p
            class="description"
            v-text="
              $frontmatter.tagline ||
              $description ||
              'Welcome to your VuePress site'
            "
          />
        </MyTransition>
        <MyTransition :delay="0.08">
          <div class="button-row">
            <!-- <Button buttonType='primary-outlined' :buttonText="$frontmatter.whatIsAPKText" :buttonPath="$frontmatter.whatIsAPKLink" /> -->
            <Button buttonType='primary' :buttonText="$frontmatter.getStartedText" :buttonPath="$frontmatter.getStartedLink" />
          </div>
        </MyTransition>
        <MyTransition :delay="0.12">
          <p v-if="$frontmatter.action" class="action">
            <NavLink
              v-for="action in actionLinks"
              :key="action.text"
              :item="action"
              class="action-button"
              :class="action.type || ''"
            />
          </p>
        </MyTransition>
      </div>
    </header>

    <!-- Feature Section -->
    <MyTransition :delay="0.1">
      <div class="features-section">
        <h2>Pick Your Use Case</h2>
        <p class="features-description">Explore what you can do with APK to build your solution</p>
        <div
            v-if="$frontmatter.features && $frontmatter.features.length"
            class="features"
        >
          <div
              v-for="(feature, index) in $frontmatter.features"
              :key="index"
              :class="{ link: feature.link, [`feature${index % 9}`]: true }"
              class="feature"
          >
            <div class="feature-icon-container" :class="feature.cssClass">
              <img
                  class="feature-icon"
                  :src="require(`../../theme/assets/${ feature.icon }`)"
                  height="20"
                />
            </div>
            <h4>{{ feature.title }}</h4>
            <p>{{ feature.details }}</p>
            <div v-if="feature.subLinks && feature.subLinks.length" class="sub-link-container">
              <div
                  v-for="(subLink, index) in feature.subLinks"
                  :key="index"
                  @click="subLink.link ? navigate(subLink.link) : ''"
              >
                <a class="sub-link">{{ subLink.name }}</a>
              </div>
            </div>
            <div class="sub-link-spacer"></div>
            <p class="learn-more-4" @click="feature.link ? navigate(feature.link) : ''">Learn more</p>
          </div>
        </div>
      </div>
    </MyTransition>

    <!-- Technology Section -->
    <MyTransition :delay="0.14">
      <div class="technology-section">
       <h2>Technologies</h2>
        <p class="technologies-description">Choose a technology to add login to your own application. Alternatively, you can try out our sample applications</p>
        <div
            v-if="$frontmatter.technologies && $frontmatter.technologies.length"
            class="technologies"
        >
          <div
              v-for="(technology, index) in $frontmatter.technologies"
              :key="index"
              class="technology-card-container"
          >
            <div class="technology-card" :class="technology.cssClass">
              <a>
                <img
                  class="technology-icon"
                  :src="require(`../../theme/assets/${ technology.icon }`)"
                  width="100"
                  height="100"
                />
              </a>
              <p class="technology-name">{{ technology.name }}</p>
            </div>
            <div class="bottom-button-bar">
              <a class="sdk-button" :class="technology.cssClass" @click="technology.sdkPath ? navigate(technology.sdkPath) : ''">
                SDK
              </a>
              <a class="sample-button" :class="technology.cssClass" @click="technology.samplePath ? navigate(technology.samplePath) : ''">
                Sample
              </a>
            </div>
          </div>
        </div>
      </div>
    </MyTransition>

    <!-- Explore Section -->
    <!--<MyTransition :delay="0.14">
      <div class="explore-section">
        <h1>Explore APK</h1>
        <p>Checkout how APK fits your business plan for identity and access management</p>
        <div
            v-if="$frontmatter.services && $frontmatter.services.length"
            class="services"
        >
          <div
              v-for="(service, index) in $frontmatter.services"
              :key="index"
              class="service"
          >
            <div class="img-header-container">
              <img v-if="service.icon === 'supportedPluginsIcon'" src="../assets/icons/supportedPluginsIcon.svg" width="22" height="22" />
              <img v-if="service.icon === 'securityComplianceIcon'" src="../assets/icons/securityComplianceIcon.svg" width="22" height="22" />
              <img v-if="service.icon === 'solutionsIcon'" src="../assets/icons/solutionsIcon.svg" width="24" height="24" />
              <a @click="service.link ? navigate(service.link) : ''">{{ service.title }}</a>
            </div>
            <p>{{ service.details }}</p>
          </div>
        </div>
      </div>
    </MyTransition>-->

    <MyTransition :delay="0.24">
      <Content class="theme-default-content custom" />
    </MyTransition>
  </main>
</template>

<script src="./Home" />
<style src="../styles/components/home.styl" lang="stylus"/>
