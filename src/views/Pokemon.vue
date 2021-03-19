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
        <div class="bottom">
          <div class="info">
            Pokemon Info:
            <hr>
            <div>
              <p>name: {{ pokemon.name }}</p>
              <p>weight: {{ pokemon.height }}</p>
              <p>height: {{ pokemon.weight }}</p>
              <p>Genera: {{pokemonRace.genus}} </p>
              <p>abilities : </p>
              <div v-for="ability in pokemon.abilities" :key="ability.key">
                - {{ability.ability.name}} -
              </div>
            </div>
          </div>

          <!-- stats -->
          <div class="stats">
            Base States:
            <hr>
            <div v-for="stat in pokemon.stats" :key="stat.key">
              {{ stat.stat.name }}
              <b-progress :value="stat.base_stat" max="200" show-progress></b-progress>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Pokemon",
    data() {
      return {
        pokemonID: this.$route.query.id,
        pokemon: {},
        pokemonRace: {},
      }
    },
    mounted () {
      this.getPokemon();
    },
    methods: {
      async getPokemon() {
        let result = await this.$api
            .get("https://pokeapi.co/api/v2/pokemon/"+ this.pokemonID);
        // let result2 = await this.$api
        //     .get("https://pokeapi.co/api/v2/pokemon-species/"+ this.pokemonID);
            // console.log(result1.data);
            // console.log(result2.data);
        //

        let species = result.data.species;
        let pokemonAvatar = ""
        let getSplitUrl = species.url.split('/');
        this.getPokemonRace(getSplitUrl[6]);

        if(result.data.sprites.other["official-artwork"].front_default == null) {
          pokemonAvatar = result.data.sprites.front_default;
        } else {
          pokemonAvatar = result.data.sprites.other["official-artwork"].front_default;
        }

        this.pokemon = {
          id: result.data.id,
          name: result.data.name,
          img: pokemonAvatar,
          types:result.data.types,
          typeColor: result.data.types[0].type.name,
          height: result.data.height,
          weight: result.data.weight,
          abilities: result.data.abilities,
          stats: result.data.stats
        };
      },

      getPokemonRace(id) {
        this.$api
            .get("https://pokeapi.co/api/v2/pokemon-species/"+ id)
            .then( res => {
              let result = res.data;
              let genre = result.genera.find(element => element.language.name == "en");
              this.pokemonRace = genre;
            });
      }
    },
  }
</script>

<style lang="scss">
  @import "../styles/pokemon.scss";
  @import "../styles/typeColor.scss";
</style>
