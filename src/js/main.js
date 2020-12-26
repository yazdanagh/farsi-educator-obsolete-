  var paper = require('paper');
  //var paper = require('paper/dist/paper-full.js')

  var canvas = document.getElementById('myCanvas');
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  console.log("HERE")
  console.log(canvas)

  //this line eliminates need to access everything through paper object
  // but as a sideeffect will impact global scope for example breaks browsersync
  //paper.install(window)
  paper.setup('myCanvas');
  var path = new paper.Path();
  var tool = new paper.Tool()
  const origin =  new paper.Point(100,100)
  const destination =  new paper.Point(300,100)

  const sideL = 100
  const spacingL = 2
  const placeHolderRow = 100
  const tileRow = 225
  const tileSpacingL = 10

  class placeHolder { 
    constructor ( loc) {
      const center = new paper.Point ( (sideL + spacingL) *loc -spacingL, placeHolderRow );
      this.path = new paper.Path.Rectangle({ 
        center, 
        size: [sideL,sideL]
      })
      this.path.strokeColor = 'black'
    }
    // Getter
    //get area() {
      //  return this.calcArea();
      //}
      // Method
      //calcArea() {
        //  return this.height * this.width;
        //}
  }

  class alphTile {
    constructor (loc, ph ) {
      const center = new paper.Point ( (sideL + tileSpacingL) *loc -tileSpacingL, tileRow );
      const rect = new paper.Path.Rectangle({ 
        center, 
        size: [sideL,sideL]
      })
      //rect.strokeColor = 'red'
      rect.fillColor = 'red'
      rect.onMouseDrag = (event) => { 
        rect.position = rect.position.add(event.delta)
      }
      rect.onMouseUp = (event ) => {
        this.resolve = true 
      }
      this.path = rect
      this.origin = rect.position
      this.resolve = false
      this.resolving = false
      this.resolvingTarg = null
      this.target = ph
    }
  }

  let ph1 = new placeHolder(1)
  let ph2 = new placeHolder(2)
  let ph3 = new placeHolder(3)
  //let at2 = new alphTile(2, ph2)
  //const tiles = [at1, at2 ]
  const tiles = [] 
  tiles.push( new alphTile(1, ph1) )
  tiles.push( new alphTile(2, ph2) )
  tiles.push( new alphTile(3, ph3) )
  window.tiles = tiles
 
  paper.view.onFrame = (event) => { 
    const tile = tiles.find(t =>  {
      return t.resolve || t.resolvingTarg 
    }) 
    if ( !tile ) return
    console.log("Found tile")
    if ( tile.resolve ) {
      tile.resolve = false
      if ( tile.target.path.contains(tile.path.position)) {
        tile.resolvingTarg = tile.target.path.position 
      } else {
        tile.resolvingTarg = tile.origin 
      }
    }

    let vector = tile.resolvingTarg.subtract(tile.path.position) 
    let step = vector  
    console.log('vector length: ' + vector.length )
    if ( vector.length > 20 ) {
      console.log( 'step is: ' +step)
      step = step.divide(10)
      console.log( 'step is: ' +step)
      step = step.floor()
      console.log( 'step is: ' +step)
    } else { 
      step = vector
      console.log( 'step is: ' +step)
    }
    tile.path.position = tile.path.position.add(step)
    if ( tile.path.position.equals(tile.resolvingTarg) ) {
      tile.resolvingTarg = null
    }
  }

