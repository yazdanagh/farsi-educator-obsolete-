<template>
<v-container>
<v-spacer> </v-spacer>

<v-row>
<!--<img id="ear" style="display:none" src="images2/ear.jpg" >  -->
   <canvas id="myCanvas" resize class="mt-5" style="border: 1px solid black; float: right;width:100%">
   </canvas>
   <div  id="allImages">
     <div v-for="(aG,aIdx) in horoof" :key="aIdx" >
     <img v-for="alpha in aG['harfForms']" :key="alpha" style="display:none"  v-bind:id="alpha" v-bind:src="`/images2/${alpha}.png`"> 
      <img id="ear" style="display:none" src="/images2/ear.jpg" > 
     </div>
   </div>
   <div id="allAudios">
     <audio v-for="dars in darses" :key="dars.kalameh" :src="audioDars(dars.kalameh)" :id="dars.kalameh"  > </audio>
   </div>

</v-row>

</v-container>
</template>

<script>
const cons = require('../constants.js');
const paper =  require('paper');
import { ati, utils }  from '../class';
//import { mdiHome, mdiChevronLeft, mdiChevronRight, mdiArrowRightBold, mdiArrowLeftBold } from '@mdi/js';
import { mdiHome, mdiChevronLeft, mdiChevronDoubleLeft, mdiChevronRight, mdiChevronDoubleRight  } from '@mdi/js';
import axios from 'axios';
import pn from 'persian-number';


export default {
  name: 'AllDarses',
  data: function () {
    return {
      darsId: 1,
      dars: null,
      darses: [],
      horoof: [],
      selectedDarsId: '',
      darsDone: false,
      student: '',
      //mdiArrowRightBold,
      //mdiArrowLeftBold,
      mdiChevronRight,
      mdiChevronLeft,
      mdiChevronDoubleRight,
      mdiChevronDoubleLeft,
      mdiHome,
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
      let res = await axios.get(`${this.backendHost}/darses/${newVal}`)
      this.dars = res.data
      //  //await this.updateCanvas(newVal)
      this.$emit('darsId', newVal )
    }

  },
  async mounted() {
    //debugger
    try {
      
    let res
    this.code = this.$route.params.code
    this.email = this.$route.query.email
    res = await axios.get(`${this.backendHost}/all_darses/${this.code}?email=${this.email}`)
    this.darses = res.data
    res = await axios.get(`${this.backendHost}/horoof`)
    this.horoof = res.data
    this.initCanvas()
    //this.student = this.$route.query.student
    this.clearCanvas()
    setTimeout ( () => { 
      console.log("WAAIIIITT")
      this.updateCanvasDarses()
    }, 1000) 
    } catch (e) {
      console.log(e)
      this.$router.push('/')
    }
  },
  computed: { 
   //goToDarses() {
   //  return 
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
    audioDars(kalameh) {
      return '/audios/' + kalameh + '.m4a'
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
    async goToUsers() {
      await this.$router.push(`/`)
    },
    async goToNextDars() {
      if ( this.darsId <= this.student.darsId ) { 
        // nothing
      } else { 
        await axios.put(`${this.backendHost}/students/${this.code}?email=${this.email}`, { student: this.student.student, darsId: this.darsId  })
        this.student = (await axios.get(`${this.backendHost}/students/${this.code}?email=${this.email}`)).data
        this.darsDone = false
      }
      this.darsId++;
      await this.fetchDars()
    },
    async goToFirstDars() {
      this.darsId = 1
      await this.fetchDars()
    },
    async goToLastDars() {
      this.darsId = this.student.darsId 
      await this.fetchDars()
    },
    async goToPrevDars() {
      this.darsId--;
      await this.fetchDars()
    },
    async goToDars(n) { 
      this.darsId = n
      await this.fetchDars()
    },
    async fetchDars() {
      //await this.$router.push(`/dars/${this.darsId}`)
      this.clearCanvas()
      setTimeout ( () => { 
        this.updateCanvasDarses()
      }, 1000 )

    },
    audioAlph(aG) {
      return '/audios/' + aG['harfSound'] + '.m4a'
    },
    audioAlphId(aG) {
      return aG['harfSound']
    },

    async clearCanvas() {
      paper.project.activeLayer.removeChildren();
      paper.view.draw();
    },
    async updateCanvasDarses() {

      

      window.paper = paper
      let phPanes = []

      for ( let darsIdLoc of Array.from(Array(this.darses.length).keys())) {
        this.dars = this.darses[darsIdLoc]
        this.darsId = this.dars['darsId']
      const paneTopMargin = 50 + darsIdLoc*100
      const paneRightMargin = 50
      const topRight = new paper.Point( 
      paper.view.size._width - paneRightMargin, paneTopMargin );
      const phPane = utils.createPlaceHolderPane( topRight, this.darsHarfForms, this.darsKalameh)
      let idx=0;
      for ( let phInst of phPane.phInsts ) {
        let atInst = new ati( phPane.getPhiTopRight(idx) , phPane.getPhiBottomLeft(idx), phPane.phInsts, this.darsHarfForms[idx]  )
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
      }

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
