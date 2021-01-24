<template>
<v-container>
<v-spacer> </v-spacer>

<v-row>
<v-col cols="9" class="mb-4">
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
     <audio :src="audioDars" :id="audioDarsId"  > </audio>
     <audio v-for="(aG,aIdx) in horoof" :src="audioAlph(aG)" :id="audioAlphId(aG)" :key="aIdx" >
     </audio>
   </div>
</v-col>

</v-row>

</v-container>
</template>

<script>
const cons = require('../constants.js');
const paper =  require('paper');
import { php, phi }  from '../class';
//import { mdiHome, mdiChevronLeft, mdiChevronRight, mdiArrowRightBold, mdiArrowLeftBold } from '@mdi/js';
import { mdiHome, mdiChevronLeft, mdiChevronDoubleLeft, mdiChevronRight, mdiChevronDoubleRight  } from '@mdi/js';
import axios from 'axios';
import pn from 'persian-number';


export default {
  name: 'Main',
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
    try {
      
      let res
    //this.code = this.$route.params.code
    res = await axios.get(`${this.backendHost}/darses`)
    this.darses = res.data
    res = await axios.get(`${this.backendHost}/horoof`)
    this.horoof = res.data
    this.initCanvas()
    //this.student = this.$route.query.student
    this.clearCanvas()
    setTimeout ( () => { 
      console.log("WAAIIIITT")
      this.updateCanvas()
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
    audioDars() {
      return '/audios/' + this.darsKalameh + '.m4a'
    },
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
    createEar( earPosition, audio ) { 
      let ear = document.getElementById("ear")
      let earRaster = new paper.Raster(ear)  
      earRaster.position = earPosition  
      earRaster.strokeColor = "yellow"
      //window.earRaster = earRaster
      earRaster.onMouseDown= ( ) => {
        document.getElementById(audio).play()
      }
      //console.log("created ear for : " + audio)
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
      this.canvas.height = 2000 // cons.canvasHeight; // window.innerHeight
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
        this.updateCanvas()
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
    async updateCanvas() {

      

      window.paper = paper
      let phPanes = []

      for ( let darsIdLoc of Array.from(Array(10).keys())) {
        this.dars = this.darses[darsIdLoc]
        this.darsId = this.dars['darsId']
      const paneTopMargin = 50 + darsIdLoc*100
      const paneRightMargin = 50
      const topRight = new paper.Point( 
      paper.view.size._width - paneRightMargin, paneTopMargin );
      var phPane = new php( topRight, this.darsHarfForms.length )
      const earPosition = topRight.add( php.phiSpacing + php.phiSide/4 , php.phiSpacing + php.phiSide/2 ) 
      this.createEar(earPosition, this.darsKalameh);
      let phInsts = []
      phPanes.push({phPane,phInsts})

      let idx = 0
        for ( idx of this.darsHarfForms.keys() ) {
          phInsts.push( new phi(phPane.getPhiTopRight(idx+1), phPane.getPhiBottomLeft(idx+1)))
          idx++
        }
      }
    // iterate twice to make sure all ati are create on top phi
    
  const renderLine = () => {
    for ( let obj of phPanes ) { 
      let phPane = obj['phPane' ]
      let phInsts = obj['phInsts' ]
    let startingTopRight = phPane.phiRowTR
    for ( let [idx,plh] of phInsts.entries() ) {
      console.log("--------" + idx)
      if ( plh.aTile === null ) {
        const newBound = new paper.Rectangle(startingTopRight, startingTopRight.subtract(php.phiSide, -php.phiSide ))
        console.log(plh.phiRect.bounds)
        console.log(newBound)
        plh.phiRect.bounds = newBound
        startingTopRight = startingTopRight.subtract(php.phiSide, 0) 
      } else { 
        const tile = plh.aTile.group
        //window.tile = tile
        console.log("HERE")
        console.log(tile.bounds)
        console.log(tile.firstChild.bounds)
        console.log(tile.lastChild.bounds)
        const newBound = new paper.Rectangle(startingTopRight, startingTopRight.subtract(tile.lastChild.bounds.width, -tile.lastChild.bounds.height ))
        console.log(newBound)
        tile.bounds = newBound 
        startingTopRight = startingTopRight.subtract(tile.bounds.width, 0) 
      }

    }
    }
  }
  renderLine();

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
