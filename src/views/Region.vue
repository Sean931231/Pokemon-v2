<template>
    <b-container fluid class="region-page">
      <b-row
        class="region-list-container"
        >
        <b-col
          cols="4"
          class="region-list"
          v-for="(region, index) in regions"
          :key="index"
          @click="redirectRegion(region.url)"
          >
          <img :src='"../assets/region/"+(index+1)+".jpg"'>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
  export default {
    name: 'Region',
    data() {
      return {
        regions: {},
      }
    },
    mounted () {
      this.getRegion();
    },
    methods: {
      getRegion() {
        this.$api
            .get("https://pokeapi.co/api/v2/region/")
            .then( response => {
              let result = response.data;
              this.regions = result.results;
            })
      },
      redirectRegion(url) {
        let splitUrl = url.split("/");

        this.$router.push({
          path: 'town',
          query: {
            id: splitUrl[6],
          }
        })
      },
    },
  }
</script>

<style lang="scss">
  @import "../styles/region.scss";
</style>
