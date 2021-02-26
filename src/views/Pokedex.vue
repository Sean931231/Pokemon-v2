<template>
  <div>
    <h5> YOLO </h5>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    mounted () {
      this.init();
    },
    methods: {
      init() {
        console.log(this.$route.name)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
