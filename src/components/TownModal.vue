<template>
  <div class="town-modal-back">
    <div class="town-modal" role="dialog">
      <header class="town-modal-header">
        <slot name="header"> this is the default title </slot>
        <button type="button" class="btn-close" @click="close">X</button>
      </header>

      <section class="town-modal-body">
        <slot name="body">
          <p>this is the default body</p>
          <p>props value: {{ townModalId }}</p>
          <p>{{ locationName }}</p>
        </slot>
      </section>

      <footer class="town-modal-footer">
        <slot name="footer"> this is the default footer </slot>
        <button type="button" class="btn-green" @click="close">
          Close Modal
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "townModal",
  // props: {
  //   townModalId: {
  //     type: Number,
  //     default: 0,
  //   },
  // },
  data() {
    return {
      townId: 0,
      locationName: "",
    };
  },
  methods: {
    init(id) {
      this.$api.get(`https://pokeapi.co/api/v2/location/${id}/`).then((res) => {
        console.log(res.data);
        this.locationName = res.data.name;
      });
    },
    /* close modal */
    close() {
      this.$emit("close");
    },
  },
  watch: {
    townModalId: function () {
      this.townId = this.$props.townModalId;
      this.init(this.townId);
    },
  },
};
</script>

<style lang="scss">
@import "../styles/townModal.scss";
</style>
