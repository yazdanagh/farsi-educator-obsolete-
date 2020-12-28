var paper = require('paper');
const cons = require('./constants.js')

const trans = (a ) => { return cons.canvasWidth - a } 

const rasterWidth = 512



// placeHolderItem
class phi { 

  // static variables
  static sideL = 100
  constructor ( topRight, bottomLeft) {
    //const center = new paper.Point ( phi.initialX(loc,topRight), phi.initialY() );

   //this.path = new paper.Path.Rectangle({ 
   //  center, 
   //  size: [phi.sideL, phi.sideL]
   //})
   console.log(topRight)
   console.log(bottomLeft)
   this.path = new paper.Path.Rectangle(topRight, bottomLeft )
   this.origBound = this.path.bounds
    this.aTile = null
    this.path.strokeColor = 'black'
    this.path.fillColor = 'white'
  }
  getPath() {
    return this.path
  }
  //static initialX = (loc,topRight) => { 
  //  return topRight - (phi.sideL + phi.spacingL) *loc -phi.spacingL
  //}
  //static initialY = () => { 
  //  return phi.placeHolderRow 
  //}
  //Method
  //calcArea() {
    //  return this.height * this.width;
    //}
}
// placeHolderPane
class php {
    
    static internalSpacing = 10
    static placeHolderRow = phi.sideL + 2 * php.internalSpacing
    static spacingL = 4 
    static rightMargin = 50
    static minLeftMargin = 30
    static topMargin = 50
    constructor ( numTiles ) {
       let tilesPerRow = cons.canvasWidth 
       tilesPerRow -= (php.rightMargin + php.minLeftMargin) 
       tilesPerRow -= (numTiles -1)*php.spacingL  
       tilesPerRow = tilesPerRow/ phi.sideL  
       tilesPerRow = Math.floor(tilesPerRow)

       const numRows = Math.ceil(numTiles / tilesPerRow) 
       console.log(tilesPerRow + ":" + numRows)
       const topRight = new paper.Point( 
         cons.canvasWidth - php.rightMargin, php.topMargin );
       const bottomLeft = new paper.Point(
         cons.canvasWidth - php.rightMargin -tilesPerRow * phi.sideL - ( tilesPerRow -1 ) * php.spacingL ,  php.topMargin + numRows * php.placeHolderRow )
       this.path = paper.Path.Rectangle(
           topRight, bottomLeft
         )
       this.topRight = topRight.subtract ( php.internalSpacing, -php.internalSpacing )
       this.path.fillColor = '#d3d3d3'
    }
    getLocTopRight( loc ) { 
      return this.topRight.subtract( (loc-1)* ( phi.sideL + php.spacingL), 0 )
    }
    getLocBottomLeft(loc)  {
      return this.topRight.subtract( (loc)* ( phi.sideL + php.spacingL),  -phi.sideL )
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
