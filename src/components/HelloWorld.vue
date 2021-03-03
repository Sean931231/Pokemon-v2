<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      This site is a Pokémon Fan create page, is not for ads webpage, is a page for page owner to learn vueJS.
      <br>
      Thanks to fans from all over the world for all resources in Google search.
    </p>
    <div class="text">
      Powered by:
      <a href="https://pokeapi.co/" target="_blank">
        <img src="../assets/logo/pokeapi.png" >
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
