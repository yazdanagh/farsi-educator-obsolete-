<template>
 <div id='app'>
    
  <v-app >
    <v-app-bar
      app
      color="blue lighten-2"
      dark
    >

    <!--
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
      -->

      <v-spacer></v-spacer>

      <v-btn
        href="/"
        text
      >
      <span style="font-size: 1.8em" class="mr-2">آموزش فارسی 
        <span v-if="darsIdCopy">
     - درس شماره  {{ pn(this.darsIdCopy) }}
      </span>
      </span>
        <!-- <v-icon>mdi-open-in-new</v-icon> -->
      </v-btn>
    </v-app-bar>

    
    <v-main  :style="`background-image: url('images2/shekar7.png')`" 
    class="fill-height bg-image"
    >
      <router-view @darsId="onClickChild"></router-view> 
      <!-- <Main> </Main> -->
    </v-main>
  </v-app>
</div>
</template>

<script>
//import Main from './components/Main';
import pn from 'persian-number';

export default {
  name: 'App',

  components: {
    //Main,
  },
  methods: {
    pn(num) {
      return pn.convert(num)
    },
    onClickChild (value) {
      this.darsIdCopy = value
    }
  },

  data: () => ({
    darsIdCopy: '' 
  }),
};
</script>


<style >
.bg-image {
   background-repeat: repeat;
   background-position: center center;
   background-attachment: fixed;
   background-size: cover;
 }
</style>
