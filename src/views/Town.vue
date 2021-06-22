<template>
  <b-container fluid class="town-page">
    <div class="town-page-container">
      <h1 class="town-page-title">{{ regionName }}</h1>
      <div class="town-page-content">
        <div class="town-page-list">
          <el-collapse accordion>
            <el-collapse-item
              v-for="(town, index) in towns"
              :key="index"
              :name="index"
              :title="town.name"
            >
              <div>demo 1</div>
            </el-collapse-item>
          </el-collapse>
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
    <!-- <TownModal
      v-show="showTownModal"
      @close="showTownModal = false"
      :townModalId="townId"
    /> -->
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
