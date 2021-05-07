<template>
  <b-container fluid class="generation">
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-row class="generation-content">
          <b-col cols="4"
            class="gen-card"
            v-for="(generation, index) in generations"
            :key="index">
            <b-skeleton-img></b-skeleton-img>
          </b-col>
        </b-row>
      </template>
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
    </b-skeleton-wrapper>
  </b-container>
</template>

<script>
  export default {
    name: "Generation",
    data() {
      return {
        generations: 0,

        /* loading */
        loading: false,
        loadingTime: 0,
        maxLoadingTime: 1,
      }
    },
    created () {
      this.$_loadingTimeInterval = null
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

        this.startLoading()
      },

      pokedex(id) {
        this.$router.push({
          name: 'Pokedex',
          query: {
            id: id,
          }
        })
      },

      /* loading */
      clearLoadingTimeInterval() {
        clearInterval(this.$_loadingTimeInterval)
        this.$_loadingTimeInterval = null
      },
      startLoading() {
        this.loading = true
        this.loadingTime = 0
      }
    },
    watch: {
      loading(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.clearLoadingTimeInterval()

          if (newValue) {
            this.$_loadingTimeInterval = setInterval(() => {
              this.loadingTime++
            }, 1000)
          }
        }
      },
      loadingTime(newValue, oldValue) {
        if (newValue !== oldValue) {
          if (newValue === this.maxLoadingTime) {
            this.loading = false
          }
        }
      }
    },
  }
</script>

<style lang="scss">
  @import "../styles/generation.scss";
</style>
