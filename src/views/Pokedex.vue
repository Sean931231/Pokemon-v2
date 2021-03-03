<template>
  <b-container fluid class="pokedex">
    <b-row class="pokemon-list">
      <b-col
        cols="4"
        v-for="pokemon in pokemons"
        :key="pokemon.key"
        >
        <div class="pokemonList"
          :class="pokemon.typeColor.type.name">
          <div class="pokemonDetail">
            <p class="pokemonName">
              {{ pokemon.name }}
            </p>
            <div class="pokemonTypes">
              <div
                class="types"
                v-for="type in pokemon.types"
                :key="type.key">
                  {{ type.type.name }}
                </div>
            </div>
          </div>
          <div class="pokemonImage">
            <img class="poke" :src="pokemon.img" >
            <img class="ballForBack" src="../assets/svg/pokeball-grey.svg" >
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        pokemons: []
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      init() {
        this.$api
            .get('https://pokeapi.co/api/v2/pokemon')
            .then( response => {
              let result = response.data;
              result.results.forEach(element => {
                this.getPokemon(element.name);
              });
            })
      },

      getPokemon(name) {
        this.$api
            .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then( res => {
              let response = res.data;
              this.pokemons.push({
                id: response.id,
                name: response.name,
                types: response.types,
                typeColor: response.types[0],
                img: response.sprites.other["official-artwork"].front_default
              })
              this.pokemons.sort((a,b) => a.id - b.id);
            })
      }
    },
  }
</script>

<style lang="scss">
  @import "../styles/pokedex.scss";
  @import "../styles/typeColor.scss";
</style>
