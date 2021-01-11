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
      :src='"/images2/" + student.name + ".jpg"'
    ></v-img>

    <v-card-title class="d-flex flex-row-reverse">
   {{ this.student.naam }}
    </v-card-title>

    <v-divider class="mx-3"></v-divider>
    <v-card-text class="d-flex flex-row-reverse">
          {{ pn(this.student.darsId) }} درس را خوانده است 
          <br>
          {{ alefba(this.student.darsId) }} تا از الفبا را آموخته است 
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

  <!--
  <v-card-text>
  Name: {{ this.student.name }}
   <br/>
  Studied {{ this.darsId }} of 100 lessons
   <br/>
  Learned: 6 out of 28 alphabets
  </v-card-text>
  -->

  <!--
  
   {{ this.student.naam }}
   <br/>
   <br/>
   ۱۰۰ از {{ this.pn(this.darsId) }} درس 
   -->
   <v-btn style="width:100%" @click="goToUsers" large class="disable-btn mt-5" color="blue lighten-1" > الفبا ( بزودی ) 
<v-icon large>  {{ mdiHome }} </v-icon>
</v-btn>
</div>
<div>
  <v-btn style="width:100%"  @click="goToNextDars" large :class="{'disable-btn': darsId > student.darsId && !darsDone}" class="mt-5" v-bind:color=" darsDone ? 'blue lighten-1' : 'blue lighten-1'" >  درس بعد 
<v-icon large>  {{ mdiArrowLeftBold }} </v-icon>
</v-btn>
</div>

<div>
<v-btn style="width:100%" @click="goToPrevDars" large class="mt-5" color="blue lighten-1" >  درس قبل 
<v-icon large>  {{ mdiArrowRightBold }} </v-icon>
</v-btn>
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
  color="blue lighten-1"
  outlined
  v-model="selectedDarsId"
  label="برو به درس"
  ></v-select>
</div>
</v-col>


<v-col cols="9" class="mb-4">
<!--<img id="ear" style="display:none" src="images2/ear.jpg" >  -->
   <canvas id="myCanvas" resize class="mt-5" style="border: 1px solid black; float: right;width:100%">
   </canvas>
   <div  id="allImages">
     <div v-for="(aG,aIdx) in alphaGroups" :key="aIdx" >
     <img v-for="alpha in aG[0]" :key="alpha" style="display:none"  v-bind:id="alpha" v-bind:src="`/images2/${alpha}.png`"> 
      <img id="ear" style="display:none" src="/images2/ear.jpg" > 
     </div>
   </div>
   <div id="allAudios">
     <audio :src="audioDars" :id="audioDarsId"  > </audio>
     <audio v-for="(aG,aIdx) in alphaGroups" :src="audioAlph(aG)" :id="audioAlphId(aG)" :key="aIdx" >
     </audio>
   </div>
</v-col>

</v-row>

</v-container>
</template>

<script>
const cons = require('../constants.js');
const paper =  require('paper');
import { php, phi, atp, ati }  from '../class';
import { mdiHome, mdiArrowRightBold, mdiArrowLeftBold } from '@mdi/js';
import axios from 'axios';
import pn from 'persian-number';


export default {
  name: 'Main',
  data: function () {
    return {
      darsId: 1,
      dars: null,
      horoof: null,
      selectedDarsId: '',
      darsDone: false,
      student: '',
      mdiArrowRightBold,
      mdiArrowLeftBold,
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
      
    this.email = this.$route.query.email
    this.code = this.$route.params.code
    let res = await axios.get(`${this.backendHost}/students/${this.code}?email=${this.email}`)
    console.log(res.data)
    this.darsId = parseInt(res.data['darsId']) + 1 
    this.student = res.data
    res = await axios.get(`${this.backendHost}/darses/${this.darsId}`)
    this.dars = res.data
    res = await axios.get(`${this.backendHost}/horoof`)
    this.horoof = res.data
    console.log("this")
    console.log(this)
    this.goToDarses = Array.from(Array(20).keys()).map( a => { 
     return `درس شماره  ${this.pn(a)}`
    })
    this.initCanvas()
      this.$emit('darsId', this.darsId )
    //this.student = this.$route.query.student
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
   darsHoroof() {  
     return this.dars ? this.dars['horoof'].split(' ') : [] 
   },
   darsKalameh() {
     return this.dars ? this.dars['kalameh'] : ''
   },
    alphaGroups() {

      let harfHash = {}
      const kalamehUnique = this.darsHoroof.filter((value, index, self) => {return self.indexOf(value) === index; })
      let alphaGrps = kalamehUnique.reduce((tot,harf) => { 
        if ( harfHash[harf] ) return tot 
        if (!this.horoof ) return tot
        //let alphaGroup = cons.alphaGroups.find( g => g.includes(harf))
        let horoof = this.horoof.find( g => g.harfGroup.includes(harf))
        let alphaGroup = [ horoof['harfGroup'].split(' '), horoof['harfName'] ] 
        tot.push(alphaGroup)
        for ( let harf of alphaGroup[0] ) {
          harfHash[harf] = 1
        }
        return tot
      }, [])
      return alphaGrps
    }
  },
  //
  methods: {
    alefba() {
      if ( this.darsId < 2 ) {
        return this.pn(2)
      } else if ( this.darsId < 5 ) {
        return this.pn(3)
      } else if ( this.darsId < 10 ) {
        return this.pn(4)
      } else if ( this.darsId < 15 ) {
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
      setTimeout ( () => { 
        this.updateCanvas()
      }, 1000 )

    },
    audioAlph(aG) {
      return '/audios/' + aG[1] + '.m4a'
    },
    audioAlphId(aG) {
      return aG[1]
    },

    async updateCanvas() {

      const createEar = ( earPosition, audio ) => { 
        let ear = document.getElementById("ear")
        let earRaster = new paper.Raster(ear)  
        earRaster.position = earPosition  
        earRaster.strokeColor = "yellow"
        //window.earRaster = earRaster
        earRaster.onMouseDown= ( ) => {
          document.getElementById(audio).play()
        }
        //console.log("created ear for : " + audio)
      }

      paper.project.activeLayer.removeChildren();
      paper.view.draw();
      //document.getElementById("myCanvas").style.opacity = 0.2;

      window.paper = paper
      const paneTopMargin = 50
      const paneRightMargin = 50
      const topRight = new paper.Point( 
      paper.view.size._width - paneTopMargin, paneRightMargin );
      var phPane = new php( topRight, this.darsHoroof.length + 2)
      const earPosition = topRight.add( php.phiSpacing + php.phiSide/4 , php.phiSpacing + php.phiSide/2 ) 
      createEar(earPosition, this.darsKalameh);

      let phInsts = []
      const atInsts = [] 
      let idx = 0
      for ( idx of this.darsHoroof.keys() ) {
        phInsts.push( new phi(phPane.getPhiTopRight(idx+1), phPane.getPhiBottomLeft(idx+1)))
        idx++
      }
    // iterate twice to make sure all ati are create on top phi
    idx = 0
    //const atPaneCreated = {}
    for ( let alphaGroup of shuffle(this.alphaGroups) ) {

      //console.log(cons)
      let topRight = phPane.phpRect.bounds.bottomRight.add(0, 20 ) 
      topRight = topRight.add(0,  idx*(atp.atpRow+10))

      //if ( harf != "faseleh" ) {
        //  const audio = harf.match(/([a-z]*)_/).[1]
        //  createEar(topRight.add( atp.atpSpacing + atp.atiSide/4  , atp.atpSpacing + atp.atiSide/2   ) ,audio)
        //}
        let atPane = new atp( topRight, alphaGroup[0].length  )
        let idx2=1
        const audio = alphaGroup[1] 
        createEar(topRight.add( atp.atpSpacing + atp.atiSide/4  , atp.atpSpacing + atp.atiSide/2   ) ,audio)
        for ( let harf of alphaGroup[0] ) {
          const occurances = this.darsHoroof.reduce( (tot,elem,harfIndex) => { 
            if (elem === harf) { 
              tot.push(harfIndex)
            } 
            return tot 
          } , [] )
          //console.log( harf + " Occurs:" ) 
          //console.log( occurances)
          const plHoldersArray = occurances.map( a => phInsts[a] )

          let atInst
          atInst = new ati( atPane.getAtiTopRight(idx2) , atPane.getAtiBottomLeft(idx2), plHoldersArray, harf  )
          atInsts.push(atInst)
          atInst = new ati( atPane.getAtiTopRight(idx2) , atPane.getAtiBottomLeft(idx2), plHoldersArray, harf  )
          atInsts.push(atInst)
          idx2++
        }
      //window.at = atInst1
      //window.atp = atPane
      idx++
    }
  const renderLine = () => {
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

  paper.view.onFrame = async () => { 
    const tile = atInsts.find(t => { 
      return t.resolve || t.resolvingTarg 
    })
    if ( !tile ) return
    console.log("Found tile: " + tile)
    if ( tile.resolve ) {
      tile.resolve = false
      for ( let ph of tile.ph ) {
        if ( ph.aTile ) { 
          continue
        }
        if ( ph.phiRect.contains(tile.group.position)) {
          tile.resolvingTarg = ph.phiRect.position 
          tile.resolvingPhi = ph 
          console.log("then here ")
          //window.ph = ph
          break
        } 
      }
      tile.resolvingTarg = tile.resolvingTarg || tile.origin
    }

    let vector = tile.resolvingTarg.subtract(tile.group.position) 
    let step = vector  
    console.log('vector length: ' + vector.length )
    if ( vector.length > 20 ) {
      //console.log( 'step is: ' +step)
      step = step.divide(10)
      //console.log( 'step is: ' +step)
      step = step.floor()
      //console.log( 'step is: ' +step)
    } else { 
      step = vector
    }
    tile.group.position = tile.group.position.add(step)
    if ( tile.group.position.equals(tile.resolvingTarg) ) {
      tile.resolvingTarg = null
    }
    if ( tile.resolvingPhi && tile.group.position.equals(tile.resolvingPhi.phiRect.position) ) {
      tile.resolved = true
      tile.group.firstChild.visible = false
      tile.resolvingPhi.aTile = tile
      //tile.ph.group.bounds = tile.group.lastChild.bounds 
      tile.resolvingPhi.phiRect.visible = false
      console.log("resolved")
      console.log(tile)
      renderLine()
      this.darsDone = await checkFinished()
    } else if ( tile.group.position.equals(tile.origin))  {
      tile.group.firstChild.visible = true
      tile.resolved = false
      if ( tile.resolvingPhi ) {
        tile.resolvingPhi.aTile = null
        tile.resolvingPhi.phiRect.visible = true
      }
      console.log(" non resolved")
      //console.log(tile.group)
      console.log(tile.ph.phiRect)
      tile.resolvingPhi = null
      //tile.ph.group.bounds = tile.ph.origBound
      renderLine()
      this.darsDone = await checkFinished()
    }
  }

  const checkFinished = async () => {
    //let done = true
    for ( let phInst of phInsts ) {  
      if ( !phInst.aTile ) {
        return false
      }
    }
    return true
  }

  function shuffle(array) {
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
  }
  //document.getElementById("myCanvas").style.opacity =  1 
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
