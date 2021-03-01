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
          <div class="nav-btn">
            <router-link to="/">
              Generation
            </router-link>
          </div>
          <div class="nav-btn">
            <router-link to="/pokedex">
              Pokedex
            </router-link>
          </div>
          <div class="nav-btn">
            <router-link to="/">
              Town
            </router-link>
          </div>
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
