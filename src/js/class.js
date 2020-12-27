var paper = require('paper');
const cons = require('./constants.js')

const trans = (a ) => { return cons.canvasWidth - a } 

const rasterWidth = 512
class placeHolder { 

    // static variables
    static spacingL = 4 
    static sideL = 100
    static placeHolderRow = 100
    constructor ( loc) {
      const center = new paper.Point ( placeHolder.initialX(loc), placeHolder.initialY() );
      
      this.path = new paper.Path.Rectangle({ 
        center, 
        size: [placeHolder.sideL, placeHolder.sideL]
      })
      this.origBound = this.path.bounds
      this.path.strokeColor = 'black'
    }
    getPath() {
      return this.path
    }
    static initialX = (loc) => { 
      return trans((placeHolder.sideL + placeHolder.spacingL) *loc -placeHolder.spacingL)
    }
    static initialY = () => { 
      return placeHolder.placeHolderRow 
    }
    // Method
    //calcArea() {
    //  return this.height * this.width;
    //}
  }

 class alphTile {
    // static variables
    static sideL = 100
    static tileRow = 225
    static tileSpacingL = 10

    constructor (loc, ph ) {
      const center = new paper.Point ( alphTile.initialX(loc) , alphTile.initialY()  );
      const rect = new paper.Path.Rectangle({ 
        center, 
        size: [alphTile.sideL,alphTile.sideL]
      })
      rect.strokeColor = 'red'
      rect.fillColor = 'red'
      var url = 'http://assets.paperjs.org/images/marilyn.jpg';
      var raster = new paper.Raster({
        source: url,
        position: center
      });
      raster.scale(30/512, 100/512);
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
      this.target = ph
      this.group = group
    }
    static initialX = (loc) => {
      return trans((alphTile.sideL + alphTile.tileSpacingL) *loc -alphTile.tileSpacingL)
    }
    static initialY = () => {
      return alphTile.tileRow
    }
  }

  export { alphTile, placeHolder };
