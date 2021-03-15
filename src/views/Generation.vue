<template>
  <b-container fluid class="generation">
    <b-row class="generation-content">
      <b-col
        cols="4"
        class="gen-card"
        v-for="(generation, index) in generations"
        :key="index">
        <b-card
          :title="generation.name"
          :img-src="'./generation/generation_'+(index+1)+'.jpg'"
          :img-alt="generation.name"
          img-bottom
          @click="pokedex(index+1)"
        >
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: "Generation",
    data() {
      return {
        generations: 0,
      }
    },
    mounted () {
      this.getGenerationInfo();
    },
    methods: {
      getGenerationInfo() {
        this.$api
            .get ("https://pokeapi.co/api/v2/generation/")
            .then (res => {
              this.generations = res.data.results;
            });
      },

      pokedex(id) {
        this.$router.push({
          name: 'Pokedex',
          query: {
            id: id,
          }
        })
      }
    },
  }
</script>

<style lang="scss">
  @import "../styles/generation.scss";
</style>
