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
        <router-view/>
      </div>
    </div>
    <div class="circle1"></div>
    <div class="circle2"></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
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
