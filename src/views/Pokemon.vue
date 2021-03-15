<template>
  <div class="pokemon">
    <div class="pokemonDetails">
        <div class="top"
          :class="pokemon.typeColor">
          <div class="idBackground">
            #{{pokemon.id}}
          </div>
          <div class="pokemonImage">
            <img :src="pokemon.img">
          </div>
        </div>
        <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Pokemon",
    data() {
      return {
        pokemonName: this.$route.query.name,
        pokemon: {}
      }
    },
    mounted () {
      this.getPokemon();
    },
    methods: {
      async getPokemon() {
        let result1 = await this.$api
            .get("https://pokeapi.co/api/v2/pokemon/"+ this.pokemonName);
        let result2 = await this.$api
            .get("https://pokeapi.co/api/v2/pokemon-species/"+ this.pokemonName);

        this.pokemon = {
          id: result1.data.id,
          name: result1.data.name,
          img: result1.data.sprites.other["official-artwork"].front_default,
          types:result1.data.types,
          typeColor: result1.data.types[0].type.name,
        };
      }
    },
  }
</script>

<style lang="scss">
  @import "../styles/pokemon.scss";
  @import "../styles/typeColor.scss";
</style>
