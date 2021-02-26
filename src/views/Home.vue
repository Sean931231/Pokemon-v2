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

        </div>
      </div>
      <div class="content">
        <router-view/>
      </div>
    </div>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <!--
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    -->

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
  mounted () {
    this.getInit();
  },
  methods: {
    getInit() {
      console.log("ready")
    }
  },

}
</script>

<style lang="scss">
  @import "../styles/home.scss";
</style>
