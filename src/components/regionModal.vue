<template>
  <div class="region-modal-back">
    <div class="region-modal"
      role="dialog">
      <header>
        <slot name="header">
          this is the default title
        </slot>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          X
        </button>
      </header>

      <section class="modal-body">
        <slot name="body">
          <p>this is the default body</p>
          <p>props value: {{regionModalId}}</p>
          <p>{{regionName}}</p>
        </slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer">
          this is the default footer
        </slot>
        <button
          type="button"
          class="btn-green"
          @click="close"
        >
          Close Modal
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'regionModal',
    props: {
      regionModalId: {
        type: Number,
        default: 1
      },
    },
    data() {
      return {
        regionId: 0,
        regionName: ""
      }
    },
    methods: {
      init(id) {
        this.$api
            .get(`https://pokeapi.co/api/v2/region/${id}/`)
            .then (res=>{
              console.log(res.data);
              this.regionName = res.data.name;
            })

      },
      /* close modal */
      close() {
        this.$emit('close');
      }
    },
    watch: {
      regionModalId:function() {
        this.regionId = this.$props.regionModalId;
        this.init(this.regionId);
      }
    },
  }
</script>

<style lang="scss">
  @import "../styles/regionModal.scss";
</style>
