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
    </b-row>
    <b-row class="pokemon-list">
      <b-col
        cols="4"
        v-for="pokemon in newPokemonArray"
        :key="pokemon.key"
        >
        <div class="pokemonList"> <!-- :class="pokemon.data.typeColor.type.name" -->
          {{pokemon.name}}
          <img :src="pokemon.img" >
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
        newPokemonArray: [],

        perPage: 12,
        currentPage: 1,

        totalRows: 0
      }
    },
    computed: {
      rows() {
        return this.items.length
      }
    },
    mounted () {
      this.init();
      // this.paginate(this.perPage, 0);
    },
    methods: {
      init() {
        this.$api
            .get('https://pokeapi.co/api/v2/pokemon')
            .then( res => {
              this.totalRows = res.data.results.length;

              let pokemonResults = res.data.results;
              pokemonResults.forEach((element,index) => {
                this.getPokemon(element.name, index);
              });
            })
      },

      /* getPokemon Details */
      getPokemon(name, index) {
        this.$api
            .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then( res => {
              let pokemonDetail = res.data;
              // console.log("index: " + index);
              this.pokemons.push({
                id: pokemonDetail.id,
                name: pokemonDetail.name,
                img: pokemonDetail.sprites.front_default
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
      }
    }
  }
</script>

<style lang="scss">
  @import "../styles/pokedex.scss";
  @import "../styles/typeColor.scss";
</style>
