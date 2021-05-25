<template>
  <div class="pokemon">
    <div class="pokemon-container">
      <div class="left-card">
        <div class="pokemon-card" :class="pokemon.typeColor">
          <div class="netbackground"></div>
          <div class="pokemon-info">
            <div class="pokemon-info-upper">
              <div class="pokemon-info-header">
                <div class="pokemon-id">#{{ pokemon.id }}</div>
                <div class="pokemon-type-icon-position">
                  <div
                    class="pokemon-type-icon"
                    v-for="type in pokemon.types"
                    :key="type.key"
                  >
                    <img class="info-type-icon" :src="type" alt="" />
                  </div>
                </div>
              </div>
              <img
                class="pokemono-info-bg"
                src="../assets/image/pokeball-bg-01.png"
              />
              <div class="pokemonImage animate__animated animate__zoomIn">
                <img :src="pokemon.img" />
              </div>
            </div>
            <div class="pokemon-info-lower">
              <div class="pokemon-info-content">
                <div class="pokemon-info-content-top">
                  <div class="pokemon-info-box">
                    <div>- Name -</div>
                    <div class="pokemon-info-box-name">
                      {{ pokemon.name }}
                    </div>
                  </div>
                  <div class="pokemon-info-box">
                    <div>- Genera -</div>
                    <div>{{ pokemonRace.genus }}</div>
                  </div>
                </div>
                <div class="pokemon-info-content-bottom">
                  <div class="pokemon-info-box">
                    <div>- Weight -</div>
                    <div>{{ pokemon.weight }}</div>
                  </div>
                  <div class="pokemon-info-box">
                    <div>- Height -</div>
                    <div>{{ pokemon.height }}</div>
                  </div>
                  <div class="pokemon-info-box">
                    <div>- Abilities -</div>
                    <div
                      v-for="ability in pokemon.abilities"
                      :key="ability.key"
                    >
                      <div class="pokemon-info-box-ability">
                        {{ ability.ability.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-card">
        <div class="right-card-content">
          <div class="menuNav">
            <div class="nav-button">
              <i
                class="fas fa-caret-left"
                @click="previousIndex(pokemon.id)"
              ></i>
              <i class="fas fa-th" @click="$router.go(-1)"></i>
              <i class="fas fa-caret-right" @click="nextIndex(pokemon.id)"></i>
            </div>
          </div>
          <!-- STATS -->
          <div class="stats">
            <div class="stats-title">STATS</div>
            <div
              class="stats-graph"
              v-for="stat in pokemon.stats"
              :key="stat.key"
            >
              <div class="stats-graph-title">{{ stat.stat.name }}</div>
              <b-progress class="stats-graph-bar" max="200">
                <b-progress-bar
                  :value="stat.base_stat"
                  class="animate__animated animate__slideInLeft animate__delay-1s"
                  >{{ stat.base_stat }}
                </b-progress-bar>
              </b-progress>
            </div>
          </div>
          <!-- divider -->
          <hr class="divider" />
          <div class="evolution-chain">
            <div class="evolution-chain-title">Evolution</div>
            <div class="evolution-chain-content">
              <div
                class="pokemon-evolution-chain"
                v-for="evolution in evoChain"
                :key="evolution.key"
              >
                <div
                  class="evolution-chain-trigger"
                  v-if="evolution.trigger_name"
                >
                  <div class="evolution-min-level" v-if="evolution.min_level">
                    {{ evolution.min_level }}
                  </div>
                  <div class="evolution-trigger-item" v-if="evolution.item">
                    {{ evolution.item.name }}
                  </div>
                  <div
                    class="evolution-trigger-happiness"
                    v-if="evolution.min_happiness"
                  >
                    Happiness<br />{{ evolution.min_happiness }}
                  </div>
                  <div
                    class="evolution-trigger-heldItem"
                    v-if="evolution.held_item"
                  >
                    Holding<br />{{ evolution.held_item.name }}
                  </div>
                  <div class="evolution-knownMove" v-if="evolution.known_move">
                    Knowing<br />"{{ evolution.known_move.name }}"
                  </div>
                  <i class="fas fa-angle-double-right"></i>
                  <div>{{ evolution.trigger_name }}</div>
                </div>

                <div class="pokemon-chain">
                  <div
                    class="evolution-chain-avatar"
                    :class="pokemon.typeColor"
                    @click="pokemonDetail(evolution.id)"
                  >
                    <img :src="evolution.avatar" />
                  </div>
                  <div class="evolutoin-chain-name">
                    {{ evolution.species_name }}
                  </div>
                </div>
              </div>
            </div>
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
      pokemonTypesIcon: [],
      value: 0,

      /* evolution chain */
      evoChain: [],
      avatar: "",

      /* alert */
      showDismissibleAlert: false,
    };
  },
  mounted() {
    this.getPokemon(this.pokemonID);
  },
  methods: {
    async getPokemon(id) {
      let result = await this.$api.get(
        `https://pokeapi.co/api/v2/pokemon/${id}/`
      );
      // let result2 = await this.$api
      //     .get("https://pokeapi.co/api/v2/pokemon-species/"+ this.pokemonID);
      //

      let species = result.data.species;
      let pokemonAvatar = "";
      let getSplitUrl = species.url.split("/");
      this.getPokemonSpecies(getSplitUrl[6]);

      if (result.data.sprites.other["official-artwork"].front_default == null) {
        pokemonAvatar = result.data.sprites.front_default;
      } else {
        pokemonAvatar =
          result.data.sprites.other["official-artwork"].front_default;
      }

      let pokemonTypesArray = result.data.types;
      pokemonTypesArray.forEach((element) => {
        this.pokemonTypesIcon.push(
          `../assets/typeIcon/${element.type.name}.png`
        );
      });

      this.pokemon = {
        // id: result.data.id,
        id: this.padLeadingZeros(result.data.id, 3),
        name: result.data.name,
        img: pokemonAvatar,
        types: this.pokemonTypesIcon,
        typeColor: result.data.types[0].type.name + "-Gradient",
        height: result.data.height,
        weight: result.data.weight,
        abilities: result.data.abilities,
        stats: result.data.stats,
      };
    },

    getPokemonSpecies(id) {
      this.$api
        .get("https://pokeapi.co/api/v2/pokemon-species/" + id)
        .then((res) => {
          let result = res.data;
          let genre = result.genera.find(
            (element) => element.language.name == "en"
          );
          this.pokemonRace = genre;
          this.getEvolutinoChain(result.evolution_chain.url);
        });
    },

    /* evochain */
    getEvolutinoChain(url) {
      this.$api.get(url).then((results) => {
        this.evoChain = [];
        let evoData = results.data.chain;
        var speciesUrl = evoData["species"]["url"];
        var id = speciesUrl.split("/")[6];

        do {
          var evoDetails = evoData["evolution_details"][0];
          speciesUrl = evoData["species"]["url"];
          id = speciesUrl.split("/")[6];

          this.evoChain.push({
            id: id,
            avatar: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            species_name: evoData.species.name,
            min_level: !evoDetails ? 1 : evoDetails.min_level,
            item: !evoDetails ? null : evoDetails.item,
            held_item: !evoDetails ? null : evoDetails.held_item,
            min_happiness: !evoDetails ? null : evoDetails.min_happiness,
            known_move: !evoDetails ? null : evoDetails.known_move,
            trigger_name: !evoDetails ? null : evoDetails.trigger.name,
          });

          evoData = evoData["evolves_to"][0];
        } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
      });
    },

    /* prepending 0 */
    padLeadingZeros(num, size) {
      var s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    },

    /* navigation */
    previousIndex(id) {
      let newIndex = parseInt(id);
      if (newIndex == 1) {
        this.$bvToast.toast(`Already the first pokemon`, {
          title: "Pokédex",
          autoHideDelay: 3000,
          toaster: "b-toaster-top-center",
          variant: "success",
        });
        return false;
      }

      this.$router.push({
        name: "Pokemon",
        query: {
          id: newIndex - 1,
        },
      });
      window.location.reload();
    },

    nextIndex(id) {
      let newIndex = parseInt(id);
      this.$router.push({
        name: "Pokemon",
        query: {
          id: newIndex + 1,
        },
      });
      window.location.reload();
    },

    /* go to current pokemon */
    pokemonDetail(id) {
      if (id == this.$route.query.id) {
        return false;
      }

      let newIndex = parseInt(id);
      this.$router.push({
        name: "Pokemon",
        query: {
          id: newIndex,
        },
      });
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
@import "../styles/pokemon.scss";
@import "../styles/typeGradientColor.scss";
</style>
