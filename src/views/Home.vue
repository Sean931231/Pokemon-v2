<template>
  <div class="home">
    <div class="title">
      {{ title }}
    </div>
    <div class="centerBox">
      <div class="dashboard">
        <div class="profile-img">
          <img src="../assets/svg/pokeball.svg" />
        </div>
        <div
          class="navigation"
          v-for="navigation in navigations"
          :key="navigation.key"
        >
          <router-link :to="navigation.path" class="nav-btn">
            <i :class="navigation.icon"></i>
            {{ navigation.pathname }}
          </router-link>
        </div>
      </div>
      <div class="content">
        <transition-page>
          <router-view />
        </transition-page>
      </div>
    </div>
    <div class="circle1"></div>
    <div class="circle2"></div>
  </div>
</template>

<script>
import TransitionPage from "../components/TransitionPage.vue";
export default {
  name: "Home",
  components: {
    TransitionPage,
  },
  data() {
    return {
      // title: "Pokémon",
      title: "Pokédex",
      navigations: [
        {
          path: "index",
          pathname: "Generation",
          icon: "fas fa-grip-horizontal",
        },
        {
          path: "pokedex",
          pathname: "Pokedex",
          icon: "fas fa-digital-tachograph",
        },
        {
          path: "region",
          pathname: "Region",
          icon: "fas fa-city",
        },
        {
          path: "about",
          pathname: "About",
          icon: "fas fa-cogs",
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
@import "../styles/home.scss";
</style>
