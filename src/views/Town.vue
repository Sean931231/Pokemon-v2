<template>
  <b-container fluid class="town-page">
    <div class="town-page-container">
      <h1 class="town-page-title">{{ regionName }}</h1>
      <div class="town-page-content">
        <div class="town-page-list">
          <b-button v-b-toggle.collapse-1 variant="primary"
            >Toggle Collapse</b-button
          >
          <b-collapse id="collapse-1" class="mt-2">
            <b-card>
              <p class="card-text">Collapse contents Here</p>
              <b-button v-b-toggle.collapse-1-inner size="sm"
                >Toggle Inner Collapse</b-button
              >
              <b-collapse id="collapse-1-inner" class="mt-2">
                <b-card>Hello!</b-card>
              </b-collapse>
            </b-card>
          </b-collapse>
        </div>
      </div>
      <!-- <div class="">
        <table border="1">
          <tr>
            <th>Town Name</th>
            <th>Town Area</th>
          </tr>
          <tr v-for="(town, index) in towns" :key="index">
            <td>{{ town.name }}</td>
            <td v-if="town.areas != 'Not Ready Yet'">
              <div v-for="townArea in town.areas" :key="townArea.key">
                <p>{{ townArea.name }}</p>
              </div>
            </td>
            <td v-else>Not Yet</td>
          </tr>
        </table>
      </div> -->
    </div>
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
      regionName: "",
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
          let results = response.data;
          this.regionName = results.name;
          let locations = results.locations;
          locations.forEach((element) => {
            let getSplitUrl = element.url.split("/");
            this.getLocation(getSplitUrl[6]);
          });
        });
    },

    getLocation(id) {
      this.$api
        .get(`https://pokeapi.co/api/v2/location/${id}/`)
        .then((response) => {
          let locationResults = response.data;
          let location_name = locationResults.name;
          let location_area = [];

          if (locationResults.areas != "") {
            location_area = locationResults.areas;
          } else {
            location_area = "Not Ready Yet";
          }

          this.towns.push({
            name: location_name,
            areas: location_area,
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
    // openTownModal(id) {
    //   this.showTownModal = true;
    //   this.townId = id;
    // },
  },
};
</script>

<style lang="scss">
@import "../styles/town.scss";
</style>
