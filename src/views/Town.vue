<template>
  <b-container fluid class="town-page">
    <b-row class="town-page-container">
      <b-col cols="12" class="town-page-list">
        <div class="" v-for="(town, index) in towns" :key="index">
          <p>{{ town.name }}</p>
          <p>{{ town.townArea }}</p>
        </div>
      </b-col>
    </b-row>
    <!-- modal -->
    <TownModal
      v-show="showTownModal"
      @close="showTownModal = false"
      :townModalId="townId"
    />
  </b-container>
</template>

<script>
import TownModal from "../components/TownModal.vue";
export default {
  name: "Town",
  components: {
    TownModal,
  },
  data() {
    return {
      regionId: this.$route.query.id,
      towns: [],

      showTownModal: false,
      townId: 0,
    };
  },
  mounted() {
    this.getRegionData();
  },
  methods: {
    getRegionData() {
      this.$api
        .get(`https://pokeapi.co/api/v2/region/${this.regionId}/`)
        .then((response) => {
          let locations = response.data.locations;

          locations.forEach((element) => {
            let splitUrl = element.url.split("/");
            this.getLocations(splitUrl[6]);
          });
        });
    },
    getLocations(locationId) {
      this.$api
        .get(`https://pokeapi.co/api/v2/location/${locationId}/`)
        .then((response) => {
          let result = response.data;
          // let area = result.areas;
          let area = result.areas == "" ? "Not Yet Ready" : result.areas;
          let names = result.name.replace(/[^a-zA-Z0-9 ]/g, " ");
          $is_admin = this.towns.push({
            name: names,
            townArea: area,
          });

          /* sort according name alphabet */
          this.towns.sort(function (a, b) {
            var nameA = a.name;
            var nameB = b.name;
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
        });
    },
    /* modal */
    openTownModal(id) {
      this.showTownModal = true;
      this.townId = id;
    },
  },
};
</script>

<style lang="scss">
@import "../styles/town.scss";
</style>
