<template>

<v-container>
<div v-if="noRender">
  <h1>
  این صفحه قابل نمایش نیست
  </h1>
 <h2>  
    ۱. پهنای مرورگر را افزایش دهید یا

  </h2>
  <h2>  
۲. دستگاه خود را در حالت منظره نگاه دارید
  </h2>
</div>
<div v-else>
<v-row class="text-center">

<v-col cols="9" class="mb-4">
<!--<img id="ear" style="display:none" src="images2/ear.jpg" >  -->
  <div>
   <canvas id="myCanvas"  class="mt-3" style="border: 1px solid black; float: right">
   </canvas>
 </div>
   <div  id="allImages">
     <div v-for="(aG,aIdx) in darsHoroof" :key="aIdx" >
     <img v-for="alpha in aG['harfForms']" :key="alpha" style="display:none"  v-bind:id="alpha" v-bind:src="imgAlph[alpha]"> 
      <img id="ear" style="display:none" src="/images2/ear.jpg" > 
     </div>
   </div>
   <div id="allAudios">
     <audio  :id="audioDarsId"  > 
        <source :src="audioDars" type="audio/mp3">
     </audio>
     <audio v-for="(aG,aIdx) in darsHoroof" :id="audioAlphId(aG)" :key="aIdx" >
        <source :src="audioAlph[aG.harfSound]" type="audio/mp3">
     </audio>
   </div>
</v-col>
<v-col cols="3" id="navColumn">
<!-- <v-spacer> </v-spacer> -->
  <v-card
    class="mx-auto mt-3"
  >

    <v-img
      height="200"
      :src='imgProfile'
    ></v-img>

    <v-card-title class="d-flex flex-row">
   {{ this.student.naam }}
    </v-card-title>

    <v-divider class="mx-3"></v-divider> 
    <v-card-text style="display:block" class="text-right">
    <div>
      {{ pn(this.student.darsId) }}
       درس را خوانده است    
     
  </div>
  <div>
      
      <router-link :to="{ path: '/ui/alefba' }">
       {{ this.pn(this.numHarfLearned) }}
      </router-link>
     تا از الفبا را آموخته است  
    </div>
    </v-card-text>

  </v-card>

   <v-btn style="width:100%" @click="goToAllDarses" large class=" mt-2" color="blue lighten-1" > 
      بازبینی کلمه ها
         <v-icon >  
           {{ mdiViewHeadline }} 
         </v-icon>
   </v-btn>
<div>
  <v-row dense >


<v-col cols="6">
<v-btn style="width:100%" @click="goToPrevDars" :class="{'disable-btn': darsId == 1}" class="mt-2" color="blue lighten-1" >  
<!-- درس قبل  -->
<v-icon large >  
{{ mdiChevronRight }} 
</v-icon>
</v-btn>
</v-col>
<v-col cols="6">
  <v-btn style="width:100%"   @click="goToNextDars" :class="{'disable-btn': darsId > student.darsId && !darsDone}" class="mt-2" v-bind:color=" darsDone ? 'blue lighten-1' : 'blue lighten-1'" >  
  <!-- درس بعد --> 
  <v-icon large >  
  {{ mdiChevronLeft }} 
  </v-icon>
</v-btn>
</v-col>

</v-row>


<v-row dense >
<v-col cols="6">
<v-btn style="width:100%" @click="goToFirstDars" :class="{'disable-btn': darsId == 1}" class="mt-2" color="blue lighten-1" >  
<!-- درس قبل  -->
<v-icon large >  
{{ mdiChevronDoubleRight }} 
</v-icon>
</v-btn>
</v-col>


<v-col cols="6">
  <v-btn style="width:100%"   @click="goToLastDars" :class="{'disable-btn': darsId > student.darsId && !darsDone}" class="mt-2" v-bind:color=" darsDone ? 'blue lighten-1' : 'blue lighten-1'" >  
  <!-- درس بعد --> 
  <v-icon large >  
  {{ mdiChevronDoubleLeft }} 
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
  <v-select reverse class="mt-2"
  :items="goToDarses"
  item-text="text"
  item-value="value"
  background-color="blue lighten-1"
  v-model="selectedDarsId"
  solo
  >

  <template v-slot:label>
      <p>برو به درس</p>
    </template>

  </v-select>

</div>
</v-col>




</v-row>

</div>
</v-container>
</template>

<script>
const cons = require('../constants.js');
const paper =  require('paper');
import { utils }  from '../class';
//import { mdiHome, mdiChevronLeft, mdiChevronRight, mdiArrowRightBold, mdiArrowLeftBold } from '@mdi/js';
import { mdiViewHeadline, mdiChevronLeft, mdiChevronDoubleLeft, mdiChevronRight, mdiChevronDoubleRight  } from '@mdi/js';
import axios from 'axios';
import lodash from 'lodash'
import pn from 'persian-number';
import Vuex from 'vuex'


export default {
  name: 'Main',
  data: function () {
    return {
      noRender: false,
      darsId: null,
      email: '',
      code: '',
      dars: null,
      horoof: [],
      selectedDarsId: '',
      darsDone: false,
      student: '',
      numHarfLearned: '',
      //mdiArrowRightBold,
      //mdiArrowLeftBold,
      audioDars: '' ,
      audioAlph: {},
      imgAlph:{},
      imgProfile: null,
      mdiChevronRight,
      mdiChevronLeft,
      mdiChevronDoubleRight,
      mdiChevronDoubleLeft,
      mdiViewHeadline,
      canvas: null,
      goToDarses: [], 
      backendHost: process.env.NODE_ENV === 'development' ? 'http://localhost:3085'  : ''
    }
  },
  watch: {
    async selectedDarsId(newVal) {
      await this.goToDars(newVal)
    },
    async darsId(newVal, oldVal) {
      //console.log(` new val: ${newVal}, old val: ${oldVal}`)
      if ( oldVal === null || newVal == oldVal ) { 
        //console.log("returning ...")
        return
      }
      let res = await axios.get(`${this.backendHost}/darses/${newVal}`, this.headerConfig)
      this.dars = res.data
      await this.addKalamehAudio()
      await this.cleanUpdateCanvas()
      //  //await this.updateCanvas(newVal)
      await this.$router.push({name: 'main',params: {darsId:this.darsId}})
      this.$emit('darsId', newVal )
    }

  },
  async mounted() {

    this.changeRTL()
    if ( window.innerWidth < 800 ) {    
      this.noRender = true
      return
    }
    const height = document.getElementById("navColumn").offsetHeight

    console.log("Height: " + window.innerHeight + ",Width: " + window.innerWidth)
    //const height = window.innerHeight - 110 
    console.log(`Mounted with height ${height}`)
    //try {
      const resMain = await axios.get(`${this.backendHost}/main`, this.headerConfig)
      this.student = resMain.data
      const studentDarsId = parseInt(resMain.data['darsId']) 

      const resDars = await axios.get(`${this.backendHost}/darses/${studentDarsId + 1}`,this.headerConfig);
      this.numHarfLearned = resDars.data.numHarfLearned

      if ( this.$route.params.darsId === 'latest' ) {
        // do nothing
        this.darsId = studentDarsId + 1  
        this.dars = resDars.data
      } else {
        this.darsId = this.$route.params.darsId
        const resDars2 = await axios.get(`${this.backendHost}/darses/${this.darsId}`,this.headerConfig);
        this.dars = resDars2.data
      }
      let blob
      let url
      this.addKalamehAudio();

      let res = await axios.get(`${this.backendHost}/horoof`)
      this.horoof = res.data

      for ( let harf of this.horoof ) {
      //if ( harf.harfAudio.data ) { 
        blob = new Blob([ new Buffer(harf.harfAudio.data, 'base64')], { type: 'audio/m4a' });
        url = window.URL.createObjectURL(blob)
      //} else {
      //  console.log(` No audio for ${harf.harfName}`)
       // url = "no_audio"
      //}
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

    this.goToDarses = Array.from(Array(this.student.darsId).keys()).map( a => { 
      return { 
        text: `درس شماره  ${this.pn(a+1)}`,
        value: a
      }

    })
    this.initCanvas(height)
    this.$emit('darsId', this.darsId )
    await this.cleanUpdateCanvas()
  },
  computed: { 

    ...Vuex.mapState({ 
      accessToken: state => state.accessToken
    }),
   //goToDarses() {
   //  return 
   //},
   audioDarsId() {
     return this.darsKalameh
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
   darsHoroof() {
     if (this.horoof.length == 0 ) return []
     let harfHash = {}
     const darsUniqueHarfForms = this.darsHarfForms.filter((value, index, self) => {return self.indexOf(value) === index; })
     let darsHarfs = darsUniqueHarfForms.reduce((tot,harfForm) => { 
       let harf = this.horoof.find( g => g.harfForms.includes(harfForm))
       if ( harfHash[harf.harfName] ) return tot 
       tot.push(harf)
       harfHash[harf.harfName] = 1
       return tot
     }, [])
     return darsHarfs
   }
  },
  //
  methods: {
    
    changeRTL () {
      this.$vuetify.rtl = true
    },
    addKalamehAudio() {
      let blob
      let url
      if ( this.dars && this.dars.kalamehAudio.data ) {
        blob = new Blob([ new Buffer(this.dars.kalamehAudio.data, 'base64')], { type: 'audio/m4a' });
        //window.x = this.dars.kalamehAudio.data
        url = window.URL.createObjectURL(blob)
        //window.audio = new Audio();
        //window.audio.src = url;
        //window.audio.play();
        this.audioDars = url
        //console.log("HERE  " + url)
        
      }
    },
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      },
    installTileAnimator(paper,phPane, atPanes) {
      paper.view.onFrame = async () => { 

        const atInsts = lodash.flatten(atPanes.map(a => a.atInsts) )
        const tile = atInsts.find(t => { 
          return t.resolve || t.resolvingTarg 
        })
        if ( !tile ) return
        console.log("Found tile: " + tile)
        tile.animate()

        if ( tile.resolvingPhi && tile.group.position.equals(tile.resolvingPhi.phiRect.position) ) {
          phPane.renderPlaceHolderInsts(true)
          this.darsDone = await checkFinished()
        } else if ( tile.group.position.equals(tile.origin))  {
          phPane.renderPlaceHolderInsts(true)
          this.darsDone = await checkFinished()
        }
      }
      // Do not try window.onresize or addEventListener("resize"... as they dont work
      var sto = null
      paper.view.onResize = async () => {
        if ( sto ) {
          clearTimeout(sto)
        }
        sto = await setTimeout(this.cleanUpdateCanvas, 250 )
      }

      const checkFinished = async () => {
        //let done = true
        for ( let phInst of phPane.phInsts ) {  
          if ( !phInst.aTile ) {
            return false
          }
        }
        return true
      }

      
      //document.getElementById("myCanvas").style.opacity =  1 
    },
    alefba(darsId) {
      if ( darsId < 2 ) {
        return this.pn(2)
      } else if ( darsId < 5 ) {
        return this.pn(3)
      } else if ( darsId < 10 ) {
        return this.pn(4)
      } else if ( darsId < 15 ) {
        return this.pn(5)
      } else {
        return this.pn(6)
      }
    },
   //totalDarses() {
   //  return cons.darses.length
   //},
    pn(num) {
      return pn.convertEnToPe(num)
    },
    async initCanvas( height) {
      this.canvas = document.getElementById('myCanvas');
      //this.canvas.width =   cons.canvasWidth; // window.innerWidth
      //this.canvas.height = cons.canvasHeight; // window.innerHeight
      console.log(cons)
      this.canvas.height = height; // window.innerHeight
      this.canvas.width = this.canvas.parentElement.clientWidth; // window.innerHeight
      console.log("canvas width: " + this.canvas.width )
      console.log("canvas height: " + this.canvas.height)
      await paper.setup(this.canvas);
      window.paper = paper
      // scalaing like this wont fix RtoL issue
      // const canvasContext = canvas.getContext('2d');
      // canvasContext.translate(window.innerWidth, 0);
      // canvasContext.scale(-1,1 );
      // canvasContext.save()

      //this line eliminates need to access everything through paper object
      // but as a sideeffect will impact global scope for example breaks browsersync
      console.log(height)
      console.log("canvas width: " + this.canvas.width)
      console.log("canvas height: " + this.canvas.height)

     //if ( this.canvas.width < 800 ) {
     //  php.phiSide = 40
     //}
    },
    async goToAllDarses() {
      this.$router.push({name: 'all_darses' , query: { page:1 }  })
    },
    async goToNextDars() {
      this.darsId++;
      if ( this.darsId <= this.student.darsId ) { 
        // nothing
      } else { 
        this.student.darsId++
        await axios.put(`${this.backendHost}/students/${this.student._id}`, this.student , this.headerConfig)
        //await axios.put(`${this.backendHost}/students/${this.code}?email=${this.email}`, { student: this.student.student, darsId: this.darsId  })
       //this.student = (await axios.get(`${this.backendHost}/students/${this.code}?email=${this.email}`)).data
       //this.darsDone = false
      }
      //await this.$router.push({name: 'main',params: {darsId:this.darsId}})
      //await this.addKalamehAudio()
    },
    async goToFirstDars() {
      this.darsId = 1
    },
    async goToLastDars() {
      this.darsId = this.student.darsId + 1
    },
    async goToPrevDars() {
      this.darsId--;
      //this.$router.push({name: 'main',params: {darsId:this.darsId}})
    },
    async goToDars(n) { 
      this.darsId = n
      //await this.addKalamehAudio()
    },
    async cleanUpdateCanvas() {
      //await this.$router.push(`/dars/${this.darsId}`)
      await this.clearCanvas()
      await setTimeout ( async () => { 
        await this.updateCanvas()
      }, 1000 )

    },
    //audioAlph(aG) {
    //  return '/audios/' + aG['harfSound'] + '.m4a'
    //},
    audioAlphId(aG) {
      return aG['harfSound']
    },

    async clearCanvas() {
      if ( paper.project )
        paper.project.activeLayer.removeChildren();
      if ( paper.view )
        await paper.view.draw();
      //paper.view.clearRect(0, 0, paper.width,paper.height)
    },
    async updateCanvas() {

      console.log("Update canvas...")
      const renderPane = utils.getRenderArea(this.darsHarfForms.length, this.darsHoroof.length)
      window.renderPane = renderPane
      const phPane = utils.createPlaceHolderPane( renderPane, this.darsHarfForms, this.darsKalameh)
      window.phPane = phPane

      const phPaneBR = phPane.phpRect.bounds.bottomRight


      // Temp for here, to move inside class

      const avaiHeight = renderPane.rectBL.y - phPaneBR.y
      console.log("Avai Height " + avaiHeight )
      //const atiSide = 
      //


      let atPanes = [] 

      // iterate twice to make sure all ati are create on top phi
      //const atPaneCreated = {}
      //console.log(this.darsHoroof)

      let topRight = phPane.phpRect.bounds.bottomRight.add(0,10) 
      for ( let harf of this.shuffle(this.darsHoroof) ) {

  //topRight = topRight.add(0,  idx*(atp.atpRow+10))
        let atPane = utils.createAlphatilePane(renderPane, topRight, harf, phPane, this.darsHarfForms) 
        topRight = atPane.atpRect.bounds.bottomRight
        console.log(topRight)
        atPanes.push(atPane)

      }
      this.installTileAnimator(paper,phPane,atPanes) 
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
