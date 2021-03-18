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
              <p>Genera: {{pokemon.genera}} </p>
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
        pokemonName: this.$route.query.name,
        pokemon: {},

        /* stats */
        bars: [
          { variant: 'success', value:10 },
          { variant: 'info', value: 75 },
          { variant: 'warning', value: 75 },
          { variant: 'danger', value: 75 },
          { variant: 'primary', value: 75 },
          { variant: 'secondary', value: 75 },
        ],
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

            // console.log(result1.data);
            // console.log(result2.data);
        let genre = result2.data.genera.find(element => element.language.name == "en");

        this.pokemon = {
          id: result1.data.id,
          name: result1.data.name,
          img: result1.data.sprites.other["official-artwork"].front_default,
          types:result1.data.types,
          typeColor: result1.data.types[0].type.name,
          height: result1.data.height,
          weight: result1.data.weight,
          genera: genre.genus,
          abilities: result1.data.abilities,
          stats: result1.data.stats
        };
      }
    },
  }
</script>

<style lang="scss">
  @import "../styles/pokemon.scss";
  @import "../styles/typeColor.scss";
</style>
