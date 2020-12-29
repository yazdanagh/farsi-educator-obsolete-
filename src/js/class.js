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
    static rightMargin = 50
    static minLeftMargin = 30
    static topMargin = 50

    static phiSide = 60
    static phiSpacing = 10
    static phiRow = php.phiSide + 2 * php.phiSpacing
    static phiGutter = 12 

    constructor ( numTiles ) {
       let tilesPerRow = cons.canvasWidth 
       tilesPerRow -= (php.rightMargin + php.minLeftMargin) 
       tilesPerRow -= (numTiles -1)*php.phiGutter  
       tilesPerRow = tilesPerRow/ php.phiSide  
       tilesPerRow = Math.floor(tilesPerRow)

       const numRows = Math.ceil(numTiles / tilesPerRow) 
       console.log(`${numRows} rows with ${tilesPerRow} tiles in each row`)
       const topRight = new paper.Point( 
         cons.canvasWidth - php.rightMargin, php.topMargin );
       const bottomLeft = topRight.subtract( tilesPerRow * php.phiSide + ( tilesPerRow -1 ) * php.phiGutter , -numRows * php.phiRow )
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
      return this.phiRowTR.subtract( (loc)* ( php.phiSide + php.phiGutter),  -php.phiSide )
    }
}


class alphTile {
  // static variables
    static sideL = 100
    static tileRow = 225
    static tileSpacingL = 10

   constructor (loc, ph , letter ) {
     const center = new paper.Point ( alphTile.initialX(loc) , alphTile.initialY()  );
     const rect = new paper.Path.Rectangle({ 
       center, 
       size: [alphTile.sideL,alphTile.sideL]
     })
     rect.strokeColor = 'red'
     rect.fillColor = 'white'
     var alpI = document.getElementById(letter)
     console.log(alpI)
     var raster = new paper.Raster(alpI)  
     raster.position = center 
     console.log(raster.size)
     raster.scale(1, 100/raster.size.height);
     const group = new paper.Group([rect, raster])
     group.onMouseDrag = (event) => { 
       group.position = group.position.add(event.delta)
     }
     group.onMouseUp = (event ) => {
       this.resolve = true 
     }
     this.path = group
     this.origin = group.position
     this.resolve = false
     this.resolved = false
     this.resolving = false
     this.resolvingTarg = null
     this.resolvingPhi = null
     this.ph = ph
     this.group = group
   }
   static initialX = (loc) => {
     return trans((alphTile.sideL + alphTile.tileSpacingL) *loc -alphTile.tileSpacingL)
   }
   static initialY = () => {
     return alphTile.tileRow
   }
  }

  export { php, alphTile, phi };
