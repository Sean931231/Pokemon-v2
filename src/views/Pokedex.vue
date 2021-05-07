<template>
  <b-container fluid class="pokedex">
    <b-row class="seachFilter">
      <b-col
        cols="6">
        <b-form-input v-model="filter" placeholder="Filter by name"></b-form-input>
      </b-col>
    </b-row>
    <!-- content -->
      <b-row class="pokemon-list">
        <b-col
          cols="4"
          v-for="pokemon in filteredPokemon"
          :key="pokemon.key"
          class="pokemonList"
          >
          <div class="pokemonCard"
            :class="pokemon.typeColor.type.name"
            @click="toPokemonPage(pokemon.id)">
            <div class="pokemonDetail">
              <p class="pokemonName">
                #{{pokemon.id}}<br> {{ pokemon.name }}
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
        /* content */
        pokemons: [],
        pokemonList:[],
        /* search filter */
        filter: '',
      }
    },
    mounted () {
      this.init();
    },
    computed: {
      filteredPokemon() {
        return this.pokemons.filter( element => {
          return element.name.includes(this.filter.toLowerCase());
        })
      }
    },
    methods: {
      init() {
        if (this.$route.query.id) {
          let queryId = this.$route.query.id;
          this.$api
              .get('https://pokeapi.co/api/v2/generation/'+queryId)
              .then( res => {
                let pokemonResults = res.data.pokemon_species;
                pokemonResults.forEach( element => {
                  let splitUrl = element.url.split('/');
                  this.grabPokemonList(splitUrl[5], splitUrl[6]);
                });
              });

        } else {
          this.$api
              .get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
              .then( res => {
                let pokemonResults = res.data.results;
                pokemonResults.forEach(element => {
                   let splitUrl = element.url.split('/');
                  this.getPokemon(splitUrl[6]);
                });
              })
        }
      },

      /* getPokemon Details */
      grabPokemonList(method, id) {
        this.$api
            .get(`https://pokeapi.co/api/v2/${method}/${id}/`)
            .then ( res => {
              let passData = res.data.varieties;
              passData.forEach( element => {
                let splitUrl = element.pokemon.url.split('/');
                this.getPokemon(splitUrl[6]);
              })
            });
      },

      getPokemon(id) {
        this.$api
            .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then( res => {
              let pokemonDetail = res.data;
              let pokemonAvatar = '';

              if(pokemonDetail.sprites.other["official-artwork"].front_default == null) {
                pokemonAvatar = pokemonDetail.sprites.front_default;
              } else {
                pokemonAvatar = pokemonDetail.sprites.other["official-artwork"].front_default
              }
              this.pokemons.push({
                img: pokemonAvatar,
                id: pokemonDetail.id,
                name: pokemonDetail.name,
                types: pokemonDetail.types,
                typeColor: pokemonDetail.types[0],
              })
              this.pokemons.sort((a,b) => a.id - b.id);
            });
      },

      /* redirect to pokemon page */
      toPokemonPage(id) {
        this.$router.push({
          path: 'pokemon',
          query: {
            id: id,
          }
        })
      }
    },
    watch: {},
  }
</script>

<style lang="scss">
  @import "../styles/pokedex.scss";
  @import "../styles/typeColor.scss";
</style>
