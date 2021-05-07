<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      This site is a Pokémon Fan create page, is not for ads webpage, is a page for page owner to learn vueJS.
      <br>
      Thanks to fans from all over the world for all resources in Google search.
    </p>
    <div class="poweredBy">
      Powered by:
      <div class="link">
        <a href="https://pokeapi.co/" target="_blank">
          <img alt="PokeApi logo" src="../assets/logo/pokeapi.png" >
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img alt="Vue logo" src="../assets/logo.png">
        </a>
      </div>
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
.poweredBy {
  width: 800px;
  margin: 0 auto;
  text-align: center;
  padding-top: 20px;

  .link {
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      flex: 1;
      width: 40%;

      img {
        width: 40%;
      }
    }
  }

}
</style>
