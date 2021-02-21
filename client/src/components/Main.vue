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
      <!-- <router-link :to="{ path: '/ui/all_darses' , query: { page: 1 }}"> -->
      {{ pn(this.student.darsId) }} 
      <!-- </router-link> -->
      درس را خوانده است
    </div>
    <div>
      .
      <router-link :to="{ path: '/ui/alefba' }">
       {{ this.pn(this.numHarfLearned) }}
      </router-link>
     تا از الفبا را آموخته است  
    </div>
          <!--
      <v-row
        class="mx-0"
        >
        <div >
        </div>
        <div>
          {{ pn(this.darsId/2) }} تا از الفبا را آموخته است 
        </div>

      </v-row>
      -->
    </v-card-text>

  </v-card>

   <v-btn style="width:100%" @click="goToAllDarses" large class=" mt-5" color="blue lighten-1" > 
      بازبینی کلمه ها
         <v-icon >  
           {{ mdiViewHeadline }} 
         </v-icon>
   </v-btn>
</div>
<div>
  <v-row dense >
<v-col cols="6">
  <v-btn x-large style="width:100%"   @click="goToNextDars" large :class="{'disable-btn': darsId > student.darsId && !darsDone}" class="mt-5" v-bind:color=" darsDone ? 'blue lighten-1' : 'blue lighten-1'" >  
  <!-- درس بعد --> 
  <v-icon large >  
  {{ mdiChevronLeft }} 
  </v-icon>
</v-btn>
</v-col>
<v-col cols="6">

<v-btn x-large style="width:100%" @click="goToPrevDars" large :class="{'disable-btn': darsId == 1}" class="mt-5" color="blue lighten-1" >  
<!-- درس قبل  -->
<v-icon large >  
{{ mdiChevronRight }} 
</v-icon>
</v-btn>
</v-col>
</v-row>
<v-row dense >
<v-col cols="6">
  <v-btn x-large style="width:100%"   @click="goToLastDars" large :class="{'disable-btn': darsId > student.darsId && !darsDone}" class="mt-5" v-bind:color=" darsDone ? 'blue lighten-1' : 'blue lighten-1'" >  
  <!-- درس بعد --> 
  <v-icon large >  
  {{ mdiChevronDoubleLeft }} 
  </v-icon>
</v-btn>
</v-col>
<v-col cols="6">

<v-btn x-large style="width:100%" @click="goToFirstDars" large :class="{'disable-btn': darsId == 1}" class="mt-5" color="blue lighten-1" >  
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
  <v-select class="mt-5"
  :items="goToDarses"
  item-text="text"
  item-value="value"
  background-color="blue lighten-1"
  v-model="selectedDarsId"
  solo
  label="برو به درس"
  ></v-select>

</div>
</v-col>


<v-col cols="9" class="mb-4">
<!--<img id="ear" style="display:none" src="images2/ear.jpg" >  -->
   <canvas id="myCanvas" resize class="mt-5" style="border: 1px solid black; float: right;width:100%">
   </canvas>
   <div  id="allImages">
     <div v-for="(aG,aIdx) in darsHoroof" :key="aIdx" >
     <img v-for="alpha in aG['harfForms']" :key="alpha" style="display:none"  v-bind:id="alpha" v-bind:src="imgAlph[alpha]"> 
      <img id="ear" style="display:none" src="/images2/ear.jpg" > 
     </div>
   </div>
   <div id="allAudios">
     <audio :src="audioDars" :id="audioDarsId"  > </audio>
     <audio v-for="(aG,aIdx) in darsHoroof" :src="audioAlph[aG.harfSound]" :id="audioAlphId(aG)" :key="aIdx" >
     </audio>
   </div>
</v-col>

</v-row>

</v-container>
</template>

<script>
const cons = require('../constants.js');
const paper =  require('paper');
import { atp, utils }  from '../class';
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
      darsId: 1,
      email: '',
      code: '',
      dars: null,
      horoof: [],
      selectedDarsId: '',
      darsDone: false,
      student: '',
      //mdiArrowRightBold,
      //mdiArrowLeftBold,
      audioDars: null ,
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
    async darsId(newVal) {
      let res = await axios.get(`${this.backendHost}/darses/${newVal}`, this.headerConfig)
      this.dars = res.data
      //  //await this.updateCanvas(newVal)
      this.$emit('darsId', newVal )
    }

  },
  async mounted() {
      
    //try {
    //this.email = this.$route.query.email
    //this.code = this.$route.params.code
    //let res = await axios.get(`${this.backendHost}/students/${this.code}?email=${this.email}`)
    let res = await axios.get(`${this.backendHost}/main`, this.headerConfig)
    console.log(res.data)
    const studentDarsId = parseInt(res.data['darsId']) 
    this.darsId = this.$route.params.darsId === 'latest' ? studentDarsId + 1 : this.$route.params.darsId 
    this.student = res.data
    res = await axios.get(`${this.backendHost}/darses/${this.darsId}`,this.headerConfig);
    this.dars = res.data;
    let blob
    let url
    if ( this.dars.kalamehAudio.data ) {
      blob = new Blob([ new Buffer(this.dars.kalamehAudio.data, 'base64')], { type: 'audio/m4a' });
      //window.x = this.dars.kalamehAudio.data
      url = window.URL.createObjectURL(blob)
      //window.audio = new Audio();
      //window.audio.src = url;
      //window.audio.play();
      this.audioDars = url
    }
    //const x = new Audio(this.dars.kalamehAudio)
    //x.play()
    res = await axios.get(`${this.backendHost}/horoof`)
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
    blob = new Blob([ new Buffer(this.student.profileImage.data, 'base64')], { type: 'image/jpg' });
    url = window.URL.createObjectURL(blob)
    this.imgProfile  = url
    console.log("this")
    console.log(this)
    this.goToDarses = Array.from(Array(this.student.darsId).keys()).map( a => { 
      return { 
        text: `درس شماره  ${this.pn(a+1)}`,
        value: a
      }

    })
    this.initCanvas()
    this.$emit('darsId', this.darsId )
    //this.student = this.$route.query.student
    this.clearCanvas()
    const canvasWait = 1000
    setTimeout ( () => { 
      console.log("Wait for Canvasl " + canvasWait)
      this.updateCanvas()
    }, canvasWait) 
   // } catch (e) {
   //   console.log(e)
   //   this.$router.push('/')
   // }
  },
  computed: { 

    ...Vuex.mapState({ 
      accessToken: state => state.accessToken
    }),
   //goToDarses() {
   //  return 
   //},
   headerConfig () { 
    const config = {
      headers: { Authorization: `Bearer ${this.accessToken}` }
    }
    return config
   },
   numHarfLearned () {
     if ( this.dars ) { 
       return this.dars.numHarfLearned 
     } else {
       return ""
     }
   },
   //audioDars() {
   //  return '/audios/' + this.darsKalameh + '.m4a'
   //},
    audioDarsId() {
      return this.darsKalameh
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
      paper.view.onResize = this.cleanUpdateCanvas

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
      return pn.convert(num)
    },
    async initCanvas() {
      this.canvas = document.getElementById('myCanvas');
      //this.canvas.width =   cons.canvasWidth; // window.innerWidth
      this.canvas.height = cons.canvasHeight; // window.innerHeight
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
      this.$router.push({name: 'main',params: {darsId:this.darsId}})
      await this.cleanUpdateCanvas()
    },
    async goToFirstDars() {
      this.darsId = 1
      await this.cleanUpdateCanvas()
    },
    async goToLastDars() {
      this.darsId = this.student.darsId 
      await this.cleanUpdateCanvas()
    },
    async goToPrevDars() {
      this.darsId--;
      this.$router.push({name: 'main',params: {darsId:this.darsId}})
      await this.cleanUpdateCanvas()
    },
    async goToDars(n) { 
      this.darsId = n
      await this.cleanUpdateCanvas()
    },
    async cleanUpdateCanvas() {
      //await this.$router.push(`/dars/${this.darsId}`)
      this.clearCanvas()
      setTimeout ( () => { 
        this.updateCanvas()
      }, 1000 )

    },
    //audioAlph(aG) {
    //  return '/audios/' + aG['harfSound'] + '.m4a'
    //},
    audioAlphId(aG) {
      return aG['harfSound']
    },

    async clearCanvas() {
      paper.project.activeLayer.removeChildren();
      await paper.view.draw();
      paper.view.clearRect(0, 0, paper.width,paper.height)
    },
    async updateCanvas() {

      const paneTopMargin = 50
      const paneRightMargin = 50
      const topRight = new paper.Point( 
      paper.view.size._width - paneRightMargin, paneTopMargin );
      const phPane = utils.createPlaceHolderPane( topRight, this.darsHarfForms, this.darsKalameh)

      let atPanes = [] 
      let idx

      // iterate twice to make sure all ati are create on top phi
      idx = 0
      //const atPaneCreated = {}
      console.log(this.darsHoroof)
      for ( let harf of this.shuffle(this.darsHoroof) ) {

        let topRight = phPane.phpRect.bounds.bottomRight.add(0, 20 ) 
        topRight = topRight.add(0,  idx*(atp.atpRow+10))

        let atPane = utils.createAlphatilePane(topRight, harf, phPane, this.darsHarfForms) 
        atPanes.push(atPane)

        idx++
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
</style>
