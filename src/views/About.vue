<template>
  <div class="about">
    <HelloWorld msg="Welcome to My Pokémon-v2 App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
