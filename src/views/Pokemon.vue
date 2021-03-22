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
          <div class="bottom-part-two">
            <div class="evolution-chain">
              <div class="chain" v-for="evolution in evoChain" :key="evolution.key">
                <div v-if="evolution.trigger_name">
                  <div v-if="evolution.min_level"> {{evolution.min_level}} </div>
                  <div v-if="evolution.item">{{evolution.item.name}} </div>
                  <div> {{evolution.trigger_name}} </div>
                </div>

                <div>
                  <img :src="evolution.avatar">
                  {{evolution.species_name}}
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="bottom-part-one">
            <div class="info">
              Pokemon Info:
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
              <div v-for="stat in pokemon.stats" :key="stat.key">
                {{ stat.stat.name }}
                <b-progress max="200">
                  <b-progress-bar :value="stat.base_stat">
                    {{stat.base_stat}}
                  </b-progress-bar>
                </b-progress>
              </div>
            </div>
          </div>
          <hr>

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
        value: 0,

        /* evolution chain */
        evoChain: [],
        avatar: ""
      }
    },
    mounted () {
      this.getPokemon();
    },
    methods: {
      async getPokemon() {
        let result = await this.$api
            .get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonID}/`);
        // let result2 = await this.$api
        //     .get("https://pokeapi.co/api/v2/pokemon-species/"+ this.pokemonID);
        //

        let species = result.data.species;
        let pokemonAvatar = ""
        let getSplitUrl = species.url.split('/');
        this.getPokemonSpecies(getSplitUrl[6]);

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

      getPokemonSpecies(id) {
        this.$api
            .get("https://pokeapi.co/api/v2/pokemon-species/"+ id)
            .then( res => {
              let result = res.data;
              let genre = result.genera.find(element => element.language.name == "en");
              this.pokemonRace = genre;
              this.getEvolutinoChain(result.evolution_chain.url);
            });
      },

      /* evochain */
      getEvolutinoChain(url) {
        this.$api
            .get(url)
            .then(results => {
              this.evoChain = [];
              let evoData = results.data.chain;
              var speciesUrl = evoData['species']['url'];
              var id =speciesUrl.split('/')[6];

              do {
                var evoDetails = evoData['evolution_details'][0];
                speciesUrl = evoData['species']['url'];
                id = speciesUrl.split('/')[6];

                this.evoChain.push({
                  "avatar":`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                  "species_name": evoData.species.name,
                  "min_level": !evoDetails ? 1 : evoDetails.min_level,
                  "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
                  "item": !evoDetails ? null : evoDetails.item,
                });

                evoData = evoData['evolves_to'][0];
              } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
            })
      },
    },
  }
</script>

<style lang="scss">
  @import "../styles/pokemon.scss";
  @import "../styles/typeColor.scss";
</style>
