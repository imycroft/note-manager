<template>
  <v-app class="primary lighten-4">
    <v-content transition="slide-x-transition">
      <Navbar/>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
   Navbar,
  },
  data: () => ({
    //
  }),
};
</script>
<style>

</style>
