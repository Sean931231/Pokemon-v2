<template>
  <div class="home">
    <div class="title">
      {{ title }}
    </div>
    <div class="centerBox">
      <div class="dashboard">
        <div class="profile-img">
          <img src="../assets/svg/pokeball.svg" >
        </div>
        <div class="navigation">
          <router-link to="index" class="nav-btn">
            <i class="fas fa-th"></i>
            Generation
          </router-link>
          <router-link to="pokedex" class="nav-btn">
            <i class="fas fa-digital-tachograph"></i>
            Pokedex
          </router-link>
          <router-link to="town" class="nav-btn">
            <i class="fas fa-city"></i>
            Town
          </router-link>
          <router-link to="about" class="nav-btn">
            <i class="fas fa-cogs"></i>
            About
          </router-link>
        </div>

      </div>
      <div class="content">
        <transition-page>
          <router-view/>
        </transition-page>
      </div>
    </div>
    <div class="circle1"></div>
    <div class="circle2"></div>
  </div>
</template>

<script>
import TransitionPage from '../components/TransitionPage.vue';
export default {
  name: 'Home',
  components: {
    TransitionPage,
  },
  data() {
    return {
      title: "Pokémon",
      data: ''
    }
  },
  mounted () {},
  methods: {},

}
</script>

<style lang="scss">
  @import "../styles/home.scss";
</style>
