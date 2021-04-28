var paper = require('paper');
//const cons = require('./constants.js')


// render Pane
class rp {
  static verMargin = 25
  static horizMargin = 50 
  constructor ( ) {
    const topRight = new paper.Point( 
      paper.view.size._width - rp.horizMargin, rp.verMargin 
    );
    const bottomLeft = new paper.Point( 
      rp.horizMargin, paper.view.size._height - rp.verMargin 
    );
    this.rectTR = topRight
    this.rectBL = bottomLeft
   }

   setPhiSide(numPhis) {
     this.avaiWidth = (this.rectTR.x -  this.rectBL.x) 
     this.phiSide = Math.min ( Math.floor(this.avaiWidth/(numPhis + 1)/5) * 5 , 60)
     this.phpRow = this.phiSide + 2 * php.phiSpacing
     this.phiPerRow = numPhis
     console.log( "Phi Side should be: " + this.phiSide + ", row is: " + this.phpRow)
   }

   setAtiSide( numAtps ) { 
     let phpTR = this.rectTR 
     let phpBL = phpTR.subtract(this.avaiWidth, - this.phpRow )
     this.avaiHeight = this.rectBL.y - phpBL.y 
     console.log("Avai Height " + this.avaiHeight )
     this.atiSide = Math.min ( Math.floor((this.avaiHeight/(numAtps) - atp.atpBetRow - 2* atp.atpSpacing ) )  , 60) // atp.atpBetRow + atp.atpSpacing 
     this.atpRow = this.atiSide + 2 * atp.atiSpacing
     console.log( "Ati Side should be: " + this.atiSide )
   }

}

// placeHolderItem
class phi { 

  // static variables
  constructor ( topRight, bottomLeft) {

   //console.log("Hala")
   //console.log(topRight)
   //console.log(bottomLeft)
   this.phiRect = new paper.Path.Rectangle(topRight, bottomLeft )
   this.origBound = this.phiRect.bounds
   //console.log(this.phiRect.bounds)
   this.aTile = null
   this.phiRect.strokeColor = 'black'
   this.phiRect.fillColor = 'white'
  }
  getPhiRect() {
    return this.phiRect
  }
}
// placeHolderPane
class php {
    

    static phiSpacing = 10
    static phiGutter = 3 

    constructor ( rp, TR, numTiles ) {
      //console.log("Num Tiles " + numTiles)
      //
      this.numRows = Math.ceil(numTiles/rp.phiPerRow)
      this.tilesPerRow = rp.phiPerRow  
      this.phiSide = rp.phiSide
      this.phpRow = rp.phpRow

      this.topRight = TR 
      this.bottomLeft = TR.subtract(rp.avaiWidth, - this.phpRow * this.numRows ) 

      this.phpRect = paper.Path.Rectangle(
        this.topRight, this.bottomLeft
      )
     // console.log(topRight)
     // console.log(bottomLeft)
      this.phiRowTR = this.topRight.subtract ( php.phiSpacing, -php.phiSpacing )
      this.phpRect.fillColor = '#d3d3d3'
      this.phInsts = []
      this.numRows = 3
    }
    getPhiTopRight(loc) { // todo: add row 
      // TODO : implement Row
      const locX = (loc - 1) % this.tilesPerRow + 1 
      const locY = (loc - locX)/this.tilesPerRow
      //console.log(locX,locY)
      let tr = this.phiRowTR.subtract( (locX-1)* ( this.phiSide + php.phiGutter), -locY * this.phpRow )
      //console.log(tr)
      return tr
    }
    getPhiBottomLeft(loc)  { // todo : add row
      // TODO : implement Row
      const locX = (loc - 1) % this.tilesPerRow  + 1 
      const locY = (loc - locX)/this.tilesPerRow
      const bl =  this.phiRowTR.subtract( locX*  this.phiSide + ( locX-1)* php.phiGutter, -(locY+1) * this.phiSide )
      //console.log(bl)
      return bl
    }
    addPhInsts(phInsts ) {
      this.phInsts = this.phInsts.concat(phInsts)
    }
    renderPlaceHolderInsts (resize) {
      let startingTopRight = this.phiRowTR
      for ( let [idx,plh] of this.phInsts.entries() ) {
        //console.log("--------" + idx)
        if ( plh.aTile === null ) {
          const newBound = new paper.Rectangle(this.getPhiTopRight(idx+1), this.getPhiBottomLeft(idx+1))
          //console.log(plh.phiRect.bounds)
          //console.log(newBound)
          plh.phiRect.bounds = newBound
          startingTopRight = startingTopRight.subtract(this.phiSide, 0) 
        } else { 
          const tile = plh.aTile.group
          //window.tile = tile
          //console.log(tile.bounds)
          //console.log(tile.firstChild.bounds)
          //console.log(tile.lastChild.bounds)
          ////////  MOHEM const scaling =  this.phiSide / tile.lastChild.bounds.height
          //const scaling = 1
          const newBound = new paper.Rectangle(startingTopRight, startingTopRight.subtract(tile.lastChild.bounds.width , -tile.lastChild.bounds.height ))
          //console.log ( "Scaling by: " + this.phiSide / tile.lastChild.bounds.height )
          //console.log ( "phiSide: " + this.phiSide )
          //console.log ( "tiles last child: " + tile.lastChild.bounds.height )
          //console.log(newBound)
          if ( resize ) {
            console.log("Resize")
            tile.bounds = newBound 
            startingTopRight = startingTopRight.subtract(tile.bounds.width, 0) 
          }
        }

      }
    }
}


// alphabet tile pane
class atp {
  // static variables
  //static atiSide = 80
  //static tileRow = 225
  //static tileSpacingL = 10

  // external margins
  static rightMargin = 50
  //static topMargin = 30

  //static atiSide = 50 
  static atpBetRow = 10
  static atpSpacing = 5 
  //static atpRow = atp.atiSide + 2 * atp.atpSpacing
  static atiGutter = 10
  constructor (TR , atiSide, numAlphs ) {
    this.atiSide = atiSide
    this.atpRow = this.atiSide + 2 * atp.atpSpacing
    const topRight = TR.add(0, atp.topMargin)  
    const bottomLeft = topRight.subtract( numAlphs * this.atiSide + ( numAlphs -1 ) * atp.atiGutter + 2 * atp.atpSpacing, -this.atpRow  )
    this.atpRect = paper.Path.Rectangle(
      topRight, bottomLeft
    )
    window.atpRect = this.atpRect

    this.atpRect.strokeColor = 'red'
    this.atpRect.fillColor = 'red'
    this.atiRowTR = topRight.subtract ( atp.atpSpacing, -atp.atpSpacing )
    this.atInsts = []
  }
  getAtiTopRight(loc) { 
    return this.atiRowTR.subtract( (loc-1)* ( this.atiSide + atp.atiGutter), 0 )
  }
  getAtiBottomLeft(loc)  {
    return this.atiRowTR.subtract( (loc)* ( this.atiSide + atp.atiGutter) - atp.atiGutter,  -this.atiSide )
  }
  addAtInsts(atInsts ) {
    this.atInsts = this.atInsts.concat(atInsts)
  }
  
}

// alphabet tile instance
class ati {
    static rasterMargin = 5
  constructor ( topRight, bottomLeft, atiSide, phList, letter) {
    //console.log(topRight)
    //console.log(bottomLeft)
    this.atiRect = new paper.Path.Rectangle(topRight, bottomLeft )
    this.atiRect.strokeColor = 'red'
    this.atiRect.fillColor = 'white'
    let alpI = document.getElementById(letter)
    //console.log(document)
    //console.log(letter)
    //console.log(alpI)
     var raster = new paper.Raster(alpI)  
     raster.position = this.atiRect.position 
     //console.log(raster.size)
     raster.scale(1, (atiSide-ati.rasterMargin)/raster.size.height);
     const group = new paper.Group([this.atiRect, raster])
     group.onMouseDrag = (event) => { 
       group.position = group.position.add(event.delta)
       window.gr = this
     }
       group.onMouseUp = ( ) => {
         this.resolve = true 
       }
       this.group = group
       this.origin = group.position
       this.resolve = false
       this.resolved = false
       this.resolving = false
       this.resolvingTarg = null
       this.resolvingPhi = null
       this.ph = phList
       this.group = group
  }
  animate() {
    if ( this.resolve ) {
      this.resolve = false
      for ( let ph of this.ph ) {
        if ( ph.aTile ) { 
          continue
        }
        if ( ph.phiRect.contains(this.group.position)) {
          this.resolvingTarg = ph.phiRect.position 
          this.resolvingPhi = ph 
          console.log("then here ")
          //window.ph = ph
          break
        } 
      }
      this.resolvingTarg = this.resolvingTarg || this.origin
    }

    let vector = this.resolvingTarg.subtract(this.group.position) 
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
    this.group.position = this.group.position.add(step)
    if ( this.group.position.equals(this.resolvingTarg) ) {
      this.resolvingTarg = null
    }
    if ( this.resolvingPhi && this.group.position.equals(this.resolvingPhi.phiRect.position) ) {
      this.resolved = true
      this.group.firstChild.visible = false
      this.resolvingPhi.aTile = this
      //this.ph.group.bounds = this.group.lastChild.bounds 
      this.resolvingPhi.phiRect.visible = false
      console.log("resolved")
      //console.log(this)
    } else if ( this.group.position.equals(this.origin))  {
      this.group.firstChild.visible = true
      this.resolved = false
      if ( this.resolvingPhi ) {
        this.resolvingPhi.aTile = null
        this.resolvingPhi.phiRect.visible = true
      }
      console.log(" non resolved")
      //console.log(this.group)
      console.log(this.ph.phiRect)
      this.resolvingPhi = null
      //this.ph.group.bounds = this.ph.origBound
    }
  }
}

const createEar = ( earPosition, audio ) => { 
  let ear = document.getElementById("ear")
  let earRaster = new paper.Raster(ear)  
  earRaster.position = earPosition  
  earRaster.strokeColor = "yellow"
  //window.earRaster = earRaster
  earRaster.onMouseDown= async ( ) => {
    await document.getElementById(audio).load()
    await document.getElementById(audio).play()
  }
  //console.log("created ear for : " + audio)
}

const createPlaceHolderPane = ( renderArea, TR, harfForms, darsKalameh) => {

  var phPane = new php( renderArea, TR, harfForms.length )
  console.log(phPane)
  
  const earPosition = phPane.topRight.add( php.phiSpacing + renderArea.phiSide/4 , php.phiSpacing + renderArea.phiSide/2 ) 
  if (darsKalameh) 
    createEar(earPosition, darsKalameh);

  let phInsts = []
  let idx = 0
  for ( idx of harfForms.keys() ) {
    const phInst = new phi(phPane.getPhiTopRight(idx+1), phPane.getPhiBottomLeft(idx+1))
    phInsts.push(phInst )
    idx++
  }
   phPane.addPhInsts(phInsts)
   return phPane 
}

const createAlphatilePane = (rp, anchorTopRight, harf, phPane , harfForms) => {

  let topRight = anchorTopRight.add(0, atp.atpBetRow ) 
  //if ( harf != "faseleh" ) {
    //  const audio = harf.match(/([a-z]*)_/).[1]
    //  createEar(topRight.add( atp.atpSpacing + atp.atiSide/4  , atp.atpSpacing + atp.atiSide/2   ) ,audio)
    //}
    let atPane = new atp( topRight, rp.atiSide, harf['harfForms'].length  )
    let idx2=1
    const audio = harf['harfSound'] 
    //console.log(harf['harfSound'])
    createEar(topRight.add( atp.atpSpacing + atPane.atiSide/4  , atp.atpSpacing + atPane.atiSide/2   ) ,audio)
    for ( let harf of harf['harfForms'] ) {
      const occurances = harfForms.reduce( (tot,elem,harfIndex) => { 
        if (elem === harf) { 
          tot.push(harfIndex)
        } 
        return tot 
      } , [] )
      //console.log( harf + " Occurs:" ) 
      //console.log( occurances)
      const plHoldersArray = occurances.map( a => phPane.phInsts[a] )

      let atInst
      atInst = new ati( atPane.getAtiTopRight(idx2) , atPane.getAtiBottomLeft(idx2), atPane.atiSide, plHoldersArray, harf  )
      atPane.addAtInsts([atInst])
      atInst = new ati( atPane.getAtiTopRight(idx2) , atPane.getAtiBottomLeft(idx2), atPane.atiSide, plHoldersArray, harf  )
      atPane.addAtInsts([atInst])
      idx2++
    }
  return atPane
}

const getRenderArea = (n, m) => {
  const renderPane = new rp(n, m);
  return renderPane
}
  

const utils = {
  createPlaceHolderPane,
  createAlphatilePane, 
  getRenderArea,
}

export { 
  atp, 
  ati, 
  phi,
  utils
};

