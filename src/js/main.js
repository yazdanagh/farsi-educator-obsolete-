const paper = require('paper');
const cons = require('./constants')
//var paper = require('paper/dist/paper-full.js')
import { php, phi, alphTile }  from './class';


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
  var phPane = new php(5)

  let plHolders = []
  plHolders.push( new phi(phPane.getLocTopRight(1), phPane.getLocBottomLeft(1)))
  plHolders.push( new phi(phPane.getLocTopRight(2), phPane.getLocBottomLeft(2)))
  plHolders.push( new phi(phPane.getLocTopRight(3), phPane.getLocBottomLeft(3)))

  const tiles = [] 
  tiles.push( new alphTile(1, plHolders[1]) )
  tiles.push( new alphTile(2, plHolders[0]) )
  tiles.push( new alphTile(3, plHolders[2]) )
 


  const renderLine = () => {
  return
      for ( let [idx,plh] of plHolders.entries() ) {
        console.log("--------" + idx)
        if ( plh.aTile === null ) {
          continue
        }
        console.log(plh.path.position)
        console.log(plh.aTile.path.firstChild.bounds.width)
        console.log(plh.aTile.path.lastChild.bounds.width)

        if ( idx > 0 ) {
          // move plh first
        }

        const tile = plh.aTile.path.lastChild
        console.log(tile.bounds)
        console.log(plh)
        tile.position = tile.position.add([plh.path.bounds.x + plh.path.bounds.width - tile.bounds.x - tile.bounds.width , 0 ])

        //plh.path.position = plh.path.position.add( [ plh.aTile.path.firstChild.bounds.width - plh.aTile.path.lastChild.bounds.width , 0 ] )
        //plh.aTile.path.position = plh.aTile.path.position.subtract([ 30 , 0 ])
        window.aTile = plh.aTile
      }
  }

  
  paper.view.onFrame = (event) => { 
    const tile = tiles.find(t =>  {
      return t.resolve || t.resolvingTarg 
    }) 
    if ( !tile ) return
    console.log("Found tile")
    if ( tile.resolve ) {
      tile.resolve = false
      if ( tile.ph.path.contains(tile.path.position)) {
        tile.resolvingTarg = tile.ph.path.position 
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
    }
    tile.path.position = tile.path.position.add(step)
    if ( tile.path.position.equals(tile.resolvingTarg) ) {
      tile.resolvingTarg = null
    }
    if ( tile.path.position.equals(tile.ph.path.position) ) {
      tile.resolved = true
      tile.group.firstChild.visible = false
      tile.ph.aTile = tile
      //tile.ph.path.bounds = tile.group.lastChild.bounds 
      //tile.ph.path.visible = true
      console.log("resolved")
      console.log(tile)
      renderLine()
    } else if ( tile.path.position.equals(tile.origin))  {
      tile.group.firstChild.visible = true
      tile.resolved = false
      console.log(" non resolved")
      //console.log(tile.group)
      console.log(tile.ph.path)
      //tile.ph.path.bounds = tile.ph.origBound
      console.log(tile.ph.path.bounds)
      renderLine()
    }
  }

