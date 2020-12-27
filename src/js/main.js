const paper = require('paper');
const cons = require('./constants')
//var paper = require('paper/dist/paper-full.js')
import { placeHolder, alphTile }  from './class';


  var canvas = document.getElementById('myCanvas');
  canvas.width = cons.canvasWidth; // window.innerWidth
  canvas.height = cons.canvasHeight; // window.innerHeight
  paper.setup(canvas);
 //const canvasContext = canvas.getContext('2d');
 // canvasContext.translate(window.innerWidth, 0);
 // canvasContext.scale(-1,1 );
 // canvasContext.save()
  console.log("HEREs")
  console.log(canvas)

  //this line eliminates need to access everything through paper object
  // but as a sideeffect will impact global scope for example breaks browsersync
  //paper.install(window)
  var path = new paper.Path();
  var tool = new paper.Tool()

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
 


  const renderLine = () => {
  }

  
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
      //console.log( 'step is: ' +step)
      step = step.divide(10)
      //console.log( 'step is: ' +step)
      step = step.floor()
      //console.log( 'step is: ' +step)
    } else { 
      step = vector
      
      renderLine()
    }
    tile.path.position = tile.path.position.add(step)
    if ( tile.path.position.equals(tile.resolvingTarg) ) {
      tile.resolvingTarg = null
    }
    if ( tile.path.position.equals(tile.target.path.position) ) {
      tile.resolved = true
      tile.group.firstChild.visible = false

      tile.target.path.origBound = tile.target.path.bounds
      tile.target.path.bounds = tile.group.lastChild.bounds 
      console.log("resolved")
      console.log(tile)
    } else if ( tile.path.position.equals(tile.origin))  {
      tile.group.firstChild.visible = true
      tile.resolved = false
      console.log(" non resolved")
      console.log(tile.group)
      tile.target.path.bounds = tile.target.path.origBound

    }
  }

