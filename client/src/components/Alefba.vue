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
    <v-card-text class="">
    <div>
      .
      {{ pn(this.student.darsId) }} 
    درس را خوانده است
  </div>
  <div>
      .
      <router-link :to="{ path: '/ui/dars/latest' }">
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
    <v-btn style="width:100%" @click="goToAllDarses" large class=" mt-5" color="blue lighten-1" > 
      بازبینی کلمه ها
         <v-icon >  
           {{ mdiViewHeadline }} 
         </v-icon>
   </v-btn>

</div>
<div>

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
     <audio v-for="dars in darses" :key="dars.kalameh" :src="audioDars(dars.kalameh)" :id="dars.kalameh"  > </audio>
   </div>
   </v-col>

</v-row>

</v-container>
</template>

<script>
const cons = require('../constants.js');
const paper =  require('paper');
import { ati,  utils }  from '../class';
//import { mdiHome, mdiChevronLeft, mdiChevronRight, mdiArrowRightBold, mdiArrowLeftBold } from '@mdi/js';
import { mdiViewQuilt, mdiViewHeadline, mdiChevronLeft, mdiChevronDoubleLeft, mdiChevronRight, mdiChevronDoubleRight  } from '@mdi/js';
import axios from 'axios';
import pn from 'persian-number';
import Vuex from 'vuex'


export default {
  name: 'Alefba',
  data: function () {
    return {
      dars: null,
      page: 1,
      darses: [],
      horoof: [],
      darsDone: false,
      student: '',
      selectedPageId: '', 
      //mdiArrowRightBold,
      //mdiArrowLeftBold,
      audioAlph: {},
      imgAlph:{},
      imgProfile: null,
      mdiChevronRight,
      mdiChevronLeft,
      mdiChevronDoubleRight,
      mdiChevronDoubleLeft,
      mdiViewQuilt,
      mdiViewHeadline,
      canvas: null,
      goToPages: [], 
      backendHost: process.env.NODE_ENV === 'development' ? 'http://localhost:3085'  : ''
    }
  },
  watch: {

  },
  async mounted() {
    //debugger
    //try {
      let res
      res = await axios.get(`${this.backendHost}/main`, this.headerConfig)
      this.student = res.data
      this.page = this.$route.query.page
      //res = await axios.get(`${this.backendHost}/darses?page=${this.page}`, this.headerConfig)
      //this.darses = res.data
      res = await axios.get(`${this.backendHost}/horoof`)
      this.horoof = res.data

      const studentDarsId = this.student['darsId']
      res = await axios.get(`${this.backendHost}/darses/${studentDarsId}`,this.headerConfig)
      this.dars = res.data
      this.horoof = this.horoof.slice(0,this.numHarfLearned)
      let blob,url
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
    blob = new Blob([ new Buffer(this.student.profileImage.data, 'base64')], { type: 'image/jpg' });
    url = window.URL.createObjectURL(blob)
    this.imgProfile  = url
    console.log("this")
    console.log(this)

      this.initCanvas()
      const canvasWait = 1000
      setTimeout ( () => { 
        console.log("WAIT for Canvas " + canvasWait)
        this.updateCanvasHoroof()
      }, canvasWait) 
   //} catch (e) {
   //  console.log(e)
   //  this.$router.push('/')
   //}
  },
  computed: { 
    ...Vuex.mapState({ 
      accessToken: state => state.accessToken
    }),
   numHarfLearned() {
     if ( this.dars ) { 
       return this.dars.numHarfLearned 
     } else {
       return ""
     }
   },
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
    async goToAllDarses() {
      this.$router.push({name: 'all_darses' , query: { page:1 }  })
    },
    audioDars(kalameh) {
      return '/audios/' + kalameh + '.m4a'
    },
    pn(num) {
      return pn.convert(num)
    },
    async initCanvas() {
      this.canvas = document.getElementById('myCanvas');
      this.canvas.width =   cons.canvasWidth; // window.innerWidth
      this.canvas.height = 8000 // cons.canvasHeight; // window.innerHeight
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
        this.updateCanvasHoroof()
      }, canvasWait) 
    },
    
    async clearCanvas() {
      paper.project.activeLayer.removeChildren();
      paper.view.draw();
    },
    async updateCanvasHoroof() {
      this.clearCanvas()
      window.paper = paper
      let phPanes = []

        const paneTopMargin = 50 
        const paneRightMargin = 50
        const topRight = new paper.Point( 
        paper.view.size._width - paneRightMargin, paneTopMargin );
        const phPane = utils.createPlaceHolderPane( topRight, this.horoof, null)
       let idx=0;
       for ( let phInst of phPane.phInsts ) {
         let atInst = new ati( phPane.getPhiTopRight(idx) , phPane.getPhiBottomLeft(idx), phPane.phInsts, this.horoof[idx]['harfLead']  )
         atInst.group.position = phInst.phiRect.position
         phInst.aTile = atInst
         atInst.resolved = true
         atInst.group.firstChild.visible = false
         //this.ph.group.bounds = this.group.lastChild.bounds 
         phInst.phiRect.visible = false

         idx++
       }
      phPane.renderPlaceHolderInsts()
      phPanes.push(phPane)

      // iterate twice to make sure all ati are create on top phi


    }
  }
}
</script>

<style scoped>
.disable-btn {
  pointer-events: none;
  opacity: 0.2;
}
</style>
