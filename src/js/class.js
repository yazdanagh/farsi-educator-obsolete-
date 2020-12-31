var paper = require('paper');
const cons = require('./constants.js')

const trans = (a ) => { return cons.canvasWidth - a } 

const rasterWidth = 512



// placeHolderItem
class phi { 

  // static variables
  constructor ( topRight, bottomLeft) {

   console.log(topRight)
   console.log(bottomLeft)
   this.phiRect = new paper.Path.Rectangle(topRight, bottomLeft )
   this.origBound = this.phiRect.bounds
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
    
    // external margins
    static minLeftMargin = 30

    static phiSide = 80
    static phiSpacing = 10
    static phpRow = php.phiSide + 2 * php.phiSpacing
    static phiGutter = 4 

    constructor ( paneTopRight, numTiles ) {
       window.ptr = paneTopRight
       let tilesPerRow = (paneTopRight.x - php.minLeftMargin) 
       tilesPerRow -= (numTiles -1)*php.phiGutter  
       tilesPerRow = tilesPerRow/ php.phiSide  
       tilesPerRow = Math.floor(tilesPerRow)

       const numRows = Math.ceil(numTiles / tilesPerRow) 
       console.log(`${numRows} rows with ${tilesPerRow} tiles in each row`)
       const topRight = paneTopRight 
       const bottomLeft = topRight.subtract( tilesPerRow * php.phiSide + ( tilesPerRow -1 ) * php.phiGutter , -numRows * php.phpRow )
       this.phpRect = paper.Path.Rectangle(
           topRight, bottomLeft
         )
       this.phiRowTR = topRight.subtract ( php.phiSpacing, -php.phiSpacing )
       this.phpRect.fillColor = '#d3d3d3'
    }
    getPhiTopRight(loc,row=1) { 
      // TODO : implement Row
      return this.phiRowTR.subtract( (loc-1)* ( php.phiSide + php.phiGutter), 0 )
    }
    getPhiBottomLeft(loc,row=1)  {
      // TODO : implement Row
      return this.phiRowTR.subtract( (loc)* ( php.phiSide + php.phiGutter) -php.phiGutter,  -php.phiSide )
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

  static atiSide = 80
  static atpSpacing = 10
  static atpRow = atp.atiSide + 2 * atp.atpSpacing
  static atiGutter = 10
  constructor (TR , numAlphs ) {
    const topRight = TR.add(0, atp.topMargin)  
    const bottomLeft = topRight.subtract( numAlphs * atp.atiSide + ( numAlphs -1 ) * atp.atiGutter + 2 * atp.atpSpacing, -atp.atpRow  )
    this.atpRect = paper.Path.Rectangle(
      topRight, bottomLeft
    )
    window.atpRect = this.atpRect

    this.atpRect.strokeColor = 'red'
    this.atpRect.fillColor = '#ea3c53'
    this.atiRowTR = topRight.subtract ( atp.atpSpacing, -atp.atpSpacing )
  }
  getAtiTopRight(loc) { 
    return this.atiRowTR.subtract( (loc-1)* ( atp.atiSide + atp.atiGutter), 0 )
  }
  getAtiBottomLeft(loc)  {
    return this.atiRowTR.subtract( (loc)* ( atp.atiSide + atp.atiGutter) - atp.atiGutter,  -atp.atiSide )
    }
}

// alphabet tile instance
class ati {
    static rasterMargin = 5
  constructor ( topRight, bottomLeft, phList, letter) {
    //console.log(topRight)
    //console.log(bottomLeft)
    this.atiRect = new paper.Path.Rectangle(topRight, bottomLeft )
    this.atiRect.strokeColor = 'red'
    this.atiRect.fillColor = 'white'
    let alpI = document.getElementById(letter)
     console.log(alpI)
     var raster = new paper.Raster(alpI)  
     raster.position = this.atiRect.position 
     console.log(raster.size)
     raster.scale(1, (atp.atiSide-ati.rasterMargin)/raster.size.height);
     const group = new paper.Group([this.atiRect, raster])
     group.onMouseDrag = (event) => { 
       group.position = group.position.add(event.delta)
       window.gr = this
     }
       group.onMouseUp = (event ) => {
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
}

 export { php, atp, ati, phi };
