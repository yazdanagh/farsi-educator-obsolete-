<template>
<v-container>
<v-row class="text-center">

<v-col cols="3">
<v-spacer> </v-spacer>
<div class="mt-5">


  <v-card
    class="mx-auto mt-5"
    max-width="374"
  >

    <v-img
      height="200"
      :src='imgProfile'
    ></v-img>

    <v-card-title class="d-flex flex-row-reverse">
   {{ this.student.naam }}
    </v-card-title>

    <v-divider class="mx-3"></v-divider>
    <v-card-text style="display:block" class="text-right">
    <div>
      .
      {{ pn(this.student.darsId) }} 
    درس را خوانده است
  </div>
  <div>
      .
      <router-link :to="{ path: '/ui/alefba' }">
       {{ this.pn(this.numHarfLearned) }}
      </router-link>
     تا از الفبا را آموخته است  
    </div>
    </v-card-text>

  </v-card>

   <v-btn style="width:100%" @click="goToDarses" large class=" mt-5" color="blue lighten-1" > 
       ادامه درسها
       <v-icon >  
          {{ mdiViewQuilt }} 
       </v-icon>
   </v-btn>
</div>
<div>
  <v-row dense >
<v-col cols="6">
  <v-btn x-large style="width:100%"   @click="page++" large :class="{'disable-btn': page >= lastPage }" class="mt-5" v-bind:color=" darsDone ? 'blue lighten-1' : 'blue lighten-1'" >  
  <!-- درس بعد --> 
  <v-icon large >  
  {{ mdiChevronLeft }} 
  </v-icon>
</v-btn>
</v-col>
<v-col cols="6">

<v-btn x-large style="width:100%" @click="page--" large :class="{'disable-btn': page == 1}" class="mt-5" color="blue lighten-1" >  
<!-- درس قبل  -->
<v-icon large >  
{{ mdiChevronRight }} 
</v-icon>
</v-btn>
</v-col>
</v-row>
<v-row dense >
<v-col cols="6">
<v-btn x-large style="width:100%"   @click="page=lastPage" large :class="{'disable-btn': page >= lastPage }" class="mt-5" v-bind:color=" darsDone ? 'blue lighten-1' : 'blue lighten-1'" >  
  <!-- درس بعد --> 
  <v-icon large >  
  {{ mdiChevronDoubleLeft }} 
  </v-icon>
</v-btn>
</v-col>
<v-col cols="6">

<v-btn x-large style="width:100%" @click="page=1" large :class="{'disable-btn': page == 1}" class="mt-5" color="blue lighten-1" >  
<!-- درس قبل  -->
<v-icon large >  
{{ mdiChevronDoubleRight }} 
</v-icon>
</v-btn>
</v-col>
  </v-row>

</div>
<div>
  <!--
  <v-row>
  <v-col cols="1">
  </v-col>
  <v-col cols="6">
  <v-text-field class="mt-5"
  v-model="selectedDarsId"
  label="شماره درس"
  ></v-text-field>
  </v-col>
  <v-col cols="5">
  <v-btn x-large  style="width:100%" @click="goToDars(selectedDarsId)" large class="mt-5" color="blue lighten-1" > برو به درس
  </v-btn>
  </v-col>
  </v-row>
  -->
  <v-select reverse class="mt-5"
  :items="goToPages"
  item-text="text"
  item-value="value"
  background-color="blue lighten-1"
  v-model="page"
  solo
  >

  <template v-slot:label>
     <p> برو به صفحه </p>
    </template>
  </v-select>

</div>
</v-col>


<v-col cols="9" class="mb-4">
<!--<img id="ear" style="display:none" src="images2/ear.jpg" >  -->
   <canvas id="myCanvas" resize class="mt-5" style="border: 1px solid black; float: right;width:100%">
   </canvas>
   <div  id="allImages">
     <div v-for="(aG,aIdx) in horoof" :key="aIdx" >
     <img v-for="alpha in aG['harfForms']" :key="alpha" style="display:none"  v-bind:id="alpha" v-bind:src="imgAlph[alpha]"> 
      <img id="ear" style="display:none" src="/images2/ear.jpg" > 
     </div>
   </div>
   <div id="allAudios">
     <audio v-for="dars in darses" :key="dars.kalameh" :id="dars.kalameh"  > 
        <source :src="audioDars[dars.kalameh]" type="audio/mp3">
     </audio>
   </div>
   </v-col>

</v-row>

</v-container>
</template>

<script>
const cons = require('../constants.js');
const paper =  require('paper');
import { ati, utils }  from '../class';
//import { mdiHome, mdiChevronLeft, mdiChevronRight, mdiArrowRightBold, mdiArrowLeftBold } from '@mdi/js';
import { mdiViewQuilt, mdiChevronLeft, mdiChevronDoubleLeft, mdiChevronRight, mdiChevronDoubleRight  } from '@mdi/js';
import axios from 'axios';
import pn from 'persian-number';
import Vuex from 'vuex'


export default {
  name: 'AllDarses',
  data: function () {
    return {
      dars: null,
      page: 1,
      darses: [],
      horoof: [],
      darsDone: false,
      student: '',
      numHarfLearned: '',
      selectedPageId: '', 
      //mdiArrowRightBold,
      //mdiArrowLeftBold,
      audioDars: {} ,
      audioAlph: {},
      imgAlph:{},
      imgProfile: null,
      mdiChevronRight,
      mdiChevronLeft,
      mdiChevronDoubleRight,
      mdiChevronDoubleLeft,
      mdiViewQuilt,
      canvas: null,
      goToPages: [], 
      backendHost: process.env.NODE_ENV === 'development' ? 'http://localhost:3085'  : ''
    }
  },
  watch: {
    async page(newVal) {
      await this.goToPage(newVal)
    },

  },
  async mounted() {

    console.log("Mounted")
    //try {
      const resMain = await axios.get(`${this.backendHost}/main`, this.headerConfig)
      this.student = resMain.data
      const studentDarsId = parseInt(resMain.data['darsId']) 

      const resDars = await axios.get(`${this.backendHost}/darses/${studentDarsId + 1}`,this.headerConfig);
      this.numHarfLearned = resDars.data.numHarfLearned

      this.page = this.$route.query.page
      res = await axios.get(`${this.backendHost}/darses?page=${this.page}`, this.headerConfig)
      this.darses = res.data


      let blob
      let url
      for ( let dars of this.darses ) {
        this.addKalamehAudio(dars);
      }

      let res = await axios.get(`${this.backendHost}/horoof`)
      this.horoof = res.data

      for ( let harf of this.horoof ) {
        blob = new Blob([ new Buffer(harf.harfAudio.data, 'base64')], { type: 'audio/m4a' });
        url = window.URL.createObjectURL(blob)




      this.audioAlph[harf.harfSound ]  = url
      for ( let [idx,harfImage] of harf.harfImages.entries() ) {
        blob = new Blob([ new Buffer(harfImage.data, 'base64')], { type: 'image/png' });
        url = window.URL.createObjectURL(blob)
        this.imgAlph[harf.harfForms[idx]]  = url
      }
    }



    console.log(this.student.profileImage)
    blob = new Blob([ new Buffer(this.student.profileImage.data, 'base64')], { type: 'image/jpg' });
    url = window.URL.createObjectURL(blob)
    this.imgProfile  = url
    const numPages = Math.floor(this.student.darsId/10)  
    this.goToPages = Array.from(Array(numPages).keys()).map( a => { 
      return { 
        text: `برو به صفحه  ${this.pn(a+1)}`,
        value: a+1
      }

    })
    this.initCanvas()
    //this.$emit('darsId', this.darsId )
    const canvasWait = 1000
    setTimeout ( () => { 
        console.log("WAIT for Canvas " + canvasWait)
        this.updateCanvasDarses()
    }, canvasWait) 
  },
  computed: { 
    ...Vuex.mapState({ 
      accessToken: state => state.accessToken
    }),
   lastPage() {
     const numPages = Math.floor(this.student.darsId/10)  
     return numPages
   },
   headerConfig () { 
    const config = {
      headers: { Authorization: `Bearer ${this.accessToken}` }
    }
    return config
   },
   
   darsHarfForms() {  
     return this.dars ? this.dars['kalamehHarfForms'] : [] 
   },
   darsKalameh() {
     return this.dars ? this.dars['kalameh'] : ''
   },
  },
  //
  methods: {

    addKalamehAudio(dars) {
      let blob
      let url
      if ( dars && dars.kalamehAudio.data ) {
        blob = new Blob([ new Buffer(dars.kalamehAudio.data, 'base64')], { type: 'audio/m4a' });
        //window.x = dars.kalamehAudio.data
        url = window.URL.createObjectURL(blob)
        //window.audio = new Audio();
        //window.audio.src = url;
        //window.audio.play();
        this.audioDars[dars.kalameh] = url
        console.log("HERE  " + url)
        
      }
    },

    
    pn(num) {
      return pn.convert(num)
    },
    async initCanvas() {
      this.canvas = document.getElementById('myCanvas');
      //this.canvas.width =   cons.canvasWidth; // window.innerWidth
      this.canvas.height = cons.canvasHeight // cons.canvasHeight; // window.innerHeight
      console.log(cons)
      await paper.setup(this.canvas);
      // scalaing like this wont fix RtoL issue
      // const canvasContext = canvas.getContext('2d');
      // canvasContext.translate(window.innerWidth, 0);
      // canvasContext.scale(-1,1 );
      // canvasContext.save()

      //this line eliminates need to access everything through paper object
      // but as a sideeffect will impact global scope for example breaks browsersync
      //paper.install(window)
      console.log(this.canvas.width)

     //if ( this.canvas.width < 800 ) {
     //  php.phiSide = 40
     //}
    },
    async goToDarses() {
      this.$router.push({name: 'main',params: {darsId:'latest'}})
    },
    async goToPage() { 
      await this.$router.push(`/ui/all_darses?page=${this.page}`)
      const res = await axios.get(`${this.backendHost}/darses?page=${this.page}`, this.headerConfig)
      this.darses = res.data
      const canvasWait = 1000
      setTimeout ( () => { 
        console.log("WAIT for Canvas " + canvasWait)
        this.updateCanvasDarses()
      }, canvasWait) 
    },
    
    async clearCanvas() {
      paper.project.activeLayer.removeChildren();
      paper.view.draw();
    },
    async updateCanvasDarses() {
      this.clearCanvas()
      window.paper = paper
      let phPanes = []

      for ( let darsIdLoc of Array.from(Array(this.darses.length).keys())) {
        const dars = this.darses[darsIdLoc]
        const paneTopMargin = 50 + darsIdLoc*100
        const paneRightMargin = 50
        const topRight = new paper.Point( 
        paper.view.size._width - paneRightMargin, paneTopMargin );
        const phPane = utils.createPlaceHolderPane( topRight, dars['kalamehHarfForms'] , dars.kalameh)
        let idx=0;
        for ( let phInst of phPane.phInsts ) {
          let atInst = new ati( phPane.getPhiTopRight(idx) , phPane.getPhiBottomLeft(idx), phPane.phInsts, dars['kalamehHarfForms'][idx]  )
          atInst.group.position = phInst.phiRect.position
          phInst.aTile = atInst
          atInst.resolved = true
          atInst.group.firstChild.visible = false
          //this.ph.group.bounds = this.group.lastChild.bounds 
          phInst.phiRect.visible = false

          idx++
        }
      phPane.renderPlaceHolderInsts(true)
      phPanes.push(phPane)
      }

      // iterate twice to make sure all ati are create on top phi
      var sto = null
      paper.view.onResize = async () => {
        if ( sto ) {
          clearTimeout(sto)
        }
        sto = await setTimeout(this.updateCanvasDarses, 250 )
      }

    }
  }
}
</script>

<style scoped>
.disable-btn {
  pointer-events: none;
  opacity: 0.2;
}
a {
    text-decoration: none;
}
</style>
