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
        {{updated}}
          <div v-if="pokemon.data">

          <div class="pokemonList"
          :class="pokemon.data.typeColor.type.name">
          <div class="pokemonDetail">
            <p class="pokemonName">
              {{ pokemon.data.name }}
            </p>
            <div class="pokemonTypes">
              <div
                class="types"
                v-for="type in pokemon.data.types"
                :key="type.key">
                  {{ type.type.name }}
                </div>
            </div>
          </div>
          <div class="pokemonImage">
            <img class="poke" :src="pokemon.data.img" >
            <img class="ballForBack" src="../assets/svg/pokeball-grey.svg" >
          </div>
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
        newPokemonArray: [],

        /* demo */
        perPage: 12,
        currentPage: 1,
        paginatedItems: [],
        totalRows: 0,
        updated: 0,

        /* demo */
      }
    },
    computed: {
      rows() {
        return this.items.length
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      init() {
        /* demo split */
        this.$api
            .get('https://pokeapi.co/api/v2/pokemon')
            .then( res => {
              let pokemonResult = res.data.pokemon_species;
              this.paginatedItems = res.data.results;
              this.totalRows = this.paginatedItems.length;

              this.paginate(this.perPage, 0);
            })
      },
      /* pagination */
      paginate(page_size, page_number) {
        let itemsToParse = this.paginatedItems;
        this.newPokemonArray = itemsToParse.slice(
          page_number * page_size,
          (page_number + 1) * page_size
        );
        this.newPokemonArray.forEach((e, index) => {
          this.getPokemon(e.name, (data) => {
            this.newPokemonArray[index].data = data;
            this.updated++;
          });
        });

      },
      onPageChanged(page) {
        this.paginate(this.perPage, page - 1);
      },

      getPokemon(name, callback) {
        this.$api
            .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then( res => {
              let response = res.data;
              callback({
                id: response.id,
                name: response.name,
                types: response.types,
                typeColor: response.types[0],
                img: response.sprites.other["official-artwork"].front_default
              });
            });
      }
    },
  }
</script>

<style lang="scss">
  @import "../styles/pokedex.scss";
  @import "../styles/typeColor.scss";
</style>
