<template>
  <b-container fluid class="pokedex">
    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          @change="onPageChanged"
          :total-rows="totalRows"
          :per-page="perPage"
          v-model="currentPage"
          class="my-0"
        />
      </b-col>

      <b-col>
        <b-form-input v-model="filter" placeholder="Enter your name"></b-form-input>
      </b-col>

    </b-row>
    <b-row class="pokemon-list">
      <b-col
        cols="4"
        v-for="pokemon in newPokemonArray"
        :key="pokemon.key"
        >
        <div class="pokemonList"
          :class="pokemon.typeColor.type.name"
          @click="toPokemonPage(pokemon.id, pokemon.name)">
          <div class="pokemonDetail">
            <p class="pokemonName">
              #{{pokemon.id}} {{ pokemon.name }}
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
        pokemons: [],
        pokemonList:[],
        newPokemonArray: [],

        perPage: 9,
        currentPage: 1,

        totalRows: 0,

        filter: null,
      }
    },
    computed: {
      rows() {
        return this.totalRows.length
      },
    },
    mounted () {
      this.init();
    },
    methods: {
      init() {
        if (this.$route.query.id) {
          let queryId = this.$route.query.id;
          this.$api
              .get('https://pokeapi.co/api/v2/generation/'+queryId)
              .then( res => {
                // this.totalRows = res.data.pokemon_species.length;

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
                this.totalRows = res.data.results.length;

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
            .get(`https://pokeapi.co/api/v2/${method}/${id}`)
            .then ( res => {
              let passData = res.data.varieties;
              passData.forEach( element => {
                this.pokemonList.push({
                  name: element.pokemon.name
                });

                let splitUrl = element.pokemon.url.split('/');
                this.getPokemon(splitUrl[6]);
              })

              this.totalRows = this.pokemonList.length;
            });
      },

      getPokemon(id) {
        this.$api
            .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then( res => {
              let pokemonDetail = res.data;
              this.pokemons.push({
                id: pokemonDetail.id,
                name: pokemonDetail.name,
                img: pokemonDetail.sprites.other["official-artwork"].front_default,
                types: pokemonDetail.types,
                typeColor: pokemonDetail.types[0],
              })
              this.pokemons.sort((a,b) => a.id - b.id);
              this.paginate(this.perPage, 0);
            });
      },

      /* pagination */
      paginate(page_size, page_number) {
        let itemsToParse = this.pokemons;
        this.newPokemonArray = itemsToParse.slice(
          page_number * page_size,
          (page_number + 1) * page_size
        );
      },
      onPageChanged(page) {
        this.paginate(this.perPage, page - 1);
      },

      /* redirect to pokemon page */
      toPokemonPage(id, name) {
        this.$router.push({
          path: 'pokemon',
          query: {
            id: id,
            name: name
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../styles/pokedex.scss";
  @import "../styles/typeColor.scss";
</style>
