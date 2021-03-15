<template>
  <div class="pokemon">
    this is pokemon page.
    {{ this.$route.query }}
  </div>
</template>

<script>
  export default {
    name: "Pokemon",
    data() {
      return {
        pokemonName: this.$route.query.name
      }
    },
    mounted () {
      this.getPokemon();
    },
    methods: {
      getPokemon() {
        this.$api
            .get("https://pokeapi.co/api/v2/pokemon/"+ this.pokemonName)
            .then( response => {
              console.log(response.data);
            })
      }
    },
  }
</script>

<style lang="scss">

</style>
