<template>
<v-container>
<v-row class="text-center">

<v-col cols="3">

</v-col>

<v-col cols="9" class="mb-4">
<!--<img id="ear" style="display:none" src="images2/ear.jpg" >  -->
   <canvas id="myCanvas" resize style="border: 1px solid black; float: right;">
   </canvas>
   <div  id="allImages">
     <div v-for="(aG,aIdx) in alphaGroups" :key="aIdx" >
     <img v-for="alpha in aG" :key="alpha" style="display:none"  v-bind:id="alpha" v-bind:src="`/images2/${alpha}.png`"> 
      <img id="ear" style="display:none" src="/images2/ear.jpg" > 
     </div>
   </div>
   <div id="allAudios">
     <audio :src="audioKalameh" :id="audioKalamehId"  > </audio>
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
import axios from 'axios';

  export default {
    name: 'Main',
    data: function () {
      return {
        darsId: 1,
        student: '',
        canvas: null
      }
    },
    watch: {
   //async darsId(newVal) {
   //  //await this.initCanvas(newVal)
   //}
   },
    async mounted() {
      console.log("Hello")
      this.canvas = document.getElementById('myCanvas');
      this.canvas.width =  cons.canvasWidth; // window.innerWidth
      this.canvas.height = cons.canvasHeight; // window.innerHeight
      paper.setup(this.canvas);
      this.darsId = this.$route.params.darsId
      this.student = this.$route.query.student
      console.log(this.$route.params)
      console.log(this.darsId)
      //this.initCanvas()
      setTimeout ( () => { 
        console.log("WAAIIIITT")
        this.initCanvas()
      }, 500) 
    },
   computed: { 
     audioKalameh() {
       return '/audios/' + cons.darses[this.darsId][1] + '.m4a'
     },
     audioKalamehId() {
       return cons.darses[this.darsId][1]
     },
     kalameh () {  
        return cons.darses[this.darsId][0].split(' ')
     },
     alphaGroups() {

       let harfHash = {}
       const kalamehUnique = this.kalameh.filter((value, index, self) => {return self.indexOf(value) === index; })
       let alphaGrps=  kalamehUnique.reduce((tot,harf) => { 
         if ( harfHash[harf] ) return tot 
         let alphaGroup = cons.alphaGroups.find( g => g.includes(harf))
         tot.push(alphaGroup)
         for ( let harf of alphaGroup ) {
           harfHash[harf] = 1
         }
         return tot
       }, [])
       return alphaGrps
     }
   },
   //
   methods: {

     
     async changeRoute() {
       console.log("INJJAAA")
       await this.$router.push(`/dars/${this.darsId}`)
       setTimeout ( () => { 
             console.log("WAAIIIITT")
             this.initCanvas()
           }, 2000)

     },
     audioAlph(aG) {
       return '/audios/' + aG[0].match(/([a-z]*)_/).[1] + '.m4a'
     },
     audioAlphId(aG) {
       return aG[0].match(/([a-z]*)_/).[1]
     },

     async initCanvas() {

  //    const a = await setTimeout( function () {}, 200000) 
  //    console.log(a)



  // scalaing like this wont fix RtoL issue
  // const canvasContext = canvas.getContext('2d');
  // canvasContext.translate(window.innerWidth, 0);
  // canvasContext.scale(-1,1 );
  // canvasContext.save()
  console.log("HEREs")

  //this line eliminates need to access everything through paper object
  // but as a sideeffect will impact global scope for example breaks browsersync
  //paper.install(window)
  //var path = new paper.Path();
  //var tool = new paper.Tool()


  const paneTopMargin = 50
  const paneRightMargin = 50
  const topRight = new paper.Point( 
  cons.canvasWidth - paneTopMargin, paneRightMargin );
  //const kalameh = cons.darses[this.darsId][0].split(' ')
  var phPane = new php( topRight, this.kalameh.length + 2)

  // ear
  //
  let earPosition = topRight.add( php.phiSpacing + php.phiSide/4 , php.phiSpacing + php.phiSide/2 ) 
  const createEar = ( earPosition, audio ) => { 

   //let audioElem = document.createElement("audio");
   //audioElem.setAttribute("src", `audios/${audio}.m4a`);
   //audioElem.setAttribute("id", `${audio}`);
   //document.getElementById("allAudios").appendChild(audioElem);
    let ear = document.getElementById("ear")
    let earRaster = new paper.Raster(ear)  
    earRaster.position = earPosition  
    earRaster.strokeColor = "yellow"
    //window.earRaster = earRaster
    earRaster.onMouseDown= ( ) => {
      document.getElementById(audio).play()
    }
    console.log("created ear for : " + audio)
  }
  createEar(earPosition, cons.darses[this.darsId][1]);

  let phInsts = []

  //const kalameh = "be_koochik_chap aa_chasban_rast be_koochik_chap aa_chasban_rast".split(' ')
  //const kalameh = "aa_bakola be_bozorg_tanha".split(' ')
  //const kalameh = "be_koochik_chap aa_chasban_rast be_koochik_chap aa_chasban_rast faseleh aa_bakola be_bozorg_tanha faseleh de_tanha aa_bikola de_tanha".split(' ') 

  //const kalamehUnique = this.kalameh.filter((value, index, self) => {return self.indexOf(value) === index; })
  //const kalamehRand = shuffle(kalamehUnique)

 //for ( let harf of this.kalamehUnique){
 //  
 //  console.log(harf)
 //  //let alphaGroup = cons.alphaGroups.find( g => g.includes(harf))
 //  //let alphaGroup = this.alphaGroups[harf]
 // //let firstAlph = alphaGroup[0].match(/([a-z]*)_/).[1]
 // //let audioElem = document.createElement("audio");
 // //audioElem.setAttribute("src", `audios/${firstAlph}.m4a`);
 // //audioElem.setAttribute("id", `${firstAlph}`);
 // //document.getElementById("allAudios").appendChild(audioElem);
 // //for ( let alpha of alphaGroup ) {
 // //  let elem = document.createElement("img");
 // //  elem.setAttribute("src", `images2/${alpha}.png`);
 // //  elem.setAttribute("id", alpha);
 // //  elem.setAttribute("style", "display:none");
 // //  document.getElementById("allImages").appendChild(elem);
 // //}
 //}

  //window.phPane = phPane
  const atInsts = [] 
  //console.log(this.kalameh)
  let idx = 0
  for ( idx of this.kalameh.keys() ) {
    phInsts.push( new phi(phPane.getPhiTopRight(idx+1), phPane.getPhiBottomLeft(idx+1)))
    idx++
  }
  window.phInsts = phInsts
  // iterate twice to make sure all ati are create on top phi
  idx = 0
  //const atPaneCreated = {}
  for ( let alphaGroup of this.alphaGroups ) {
    
  //console.log(cons)
  let topRight = phPane.phpRect.bounds.bottomRight.add(0, 20 ) 
  topRight = topRight.add(0,  idx*(atp.atpRow+10))
  
 //if ( harf != "faseleh" ) {
 //  const audio = harf.match(/([a-z]*)_/).[1]
 //  createEar(topRight.add( atp.atpSpacing + atp.atiSide/4  , atp.atpSpacing + atp.atiSide/2   ) ,audio)
 //}
  let atPane = new atp( topRight, alphaGroup.length  )
  let idx2=1
    for ( let harf of alphaGroup ) {

      const audio = harf.match(/([a-z]*)_/).[1]
      createEar(topRight.add( atp.atpSpacing + atp.atiSide/4  , atp.atpSpacing + atp.atiSide/2   ) ,audio)
    const occurances = this.kalameh.reduce( (tot,elem,harfIndex) => { 
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
      const done = checkFinished()
      if ( done ) {
           console.log(this.$router)
        console.log("DDDDDDDOOONNE")
        this.darsId++;
         await axios.put('http://localhost:3085/users', { student: this.student, dars: this.darsId  })
           await this.changeRoute()
           //this.$router.push({  name: 'main', params: { darsId:this.darsId } })
          //setTimeout ( () => { 
          //  console.log("WAAIIIITT")
          //  this.initCanvas()
          //}, 2000)
           //location.reload()

      }
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
    }
  }

  const checkFinished = () => {
    //let done = true
    for ( let phInst of phInsts ) {  
      if ( !phInst.aTile ) {
        return false
      }
    }
    return true
  }


 //function shuffle(array) {
 //  var currentIndex = array.length, temporaryValue, randomIndex;

 //  // While there remain elements to shuffle...
 //  while (0 !== currentIndex) {

 //    // Pick a remaining element...
 //    randomIndex = Math.floor(Math.random() * currentIndex);
 //    currentIndex -= 1;

 //    // And swap it with the current element.
 //    temporaryValue = array[currentIndex];
 //    array[currentIndex] = array[randomIndex];
 //    array[randomIndex] = temporaryValue;
 //  }

 //  return array;
 //}







  }

  
  


    }
  }
</script>
