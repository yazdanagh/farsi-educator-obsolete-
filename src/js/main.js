const paper = require('paper');
const cons = require('./constants')
//var paper = require('paper/dist/paper-full.js')
import { php, phi, atp, ati }  from './class';


  var canvas = document.getElementById('myCanvas');
  canvas.width = cons.canvasWidth; // window.innerWidth
  canvas.height = cons.canvasHeight; // window.innerHeight
  paper.setup(canvas);
  // scalaing like this wont fix RtoL issue
  // const canvasContext = canvas.getContext('2d');
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

  const paneTopMargin = 50
  const paneRightMargin = 50
  const topRight = new paper.Point( 
  cons.canvasWidth - paneTopMargin, paneRightMargin );
  var phPane = new php( topRight, 5)

  let phInsts = []

  //const kalameh = "be_koochik_chap aa_chasban_rast be_koochik_chap aa_chasban_rast".split(' ')
  //const kalameh = "aa_bakola be_bozorg_tanha".split(' ')
  const kalameh = "be_koochik_chap aa_chasban_rast be_koochik_chap aa_chasban_rast faseleh aa_bakola be_bozorg_tanha faseleh de_tanha aa_bikola de_tanha".split(' ') 

  //window.phPane = phPane
  const atInsts = [] 
  console.log(kalameh)
  let idx = 0
  for ( let harf of kalameh ) {
    phInsts.push( new phi(phPane.getPhiTopRight(idx+1), phPane.getPhiBottomLeft(idx+1)))
    idx++
  }
  window.phInsts = phInsts
  // iterate twice to make sure all ati are create on top phi
  idx = 0
  const atPaneCreated = {}
  for ( let harf of kalameh ) {
    if ( atPaneCreated[harf] ) { continue }
    
  //console.log(cons)
  let alphaGroup = cons.alphaGroups.find( g => g.includes(harf))
  let atPane = new atp(phPane.phpRect.bounds.bottomRight.add(0,idx*(atp.atpRow+10)), cons.alphaGroups.length  )
  let idx2=1
  for ( let alpha of alphaGroup ) { 

    const occurances = kalameh.reduce( (tot,elem,harfIndex) => { 
      if (elem === alpha) { 
        tot.push(harfIndex)
      } 
      return tot 
    } , [] )
    console.log(occurances)
    const plHoldersArray = occurances.map( a => phInsts[a] )

    atPaneCreated[alpha] = true
    let atInst
    //if ( alpha === harf ) {
      atInst = new ati( atPane.getAtiTopRight(idx2) , atPane.getAtiBottomLeft(idx2), plHoldersArray, alpha  )
      atInsts.push(atInst)
      atInst = new ati( atPane.getAtiTopRight(idx2) , atPane.getAtiBottomLeft(idx2), plHoldersArray, alpha  )
      atInsts.push(atInst)
    //} else {
     //atInst = new ati( atPane.getAtiTopRight(idx2) , atPane.getAtiBottomLeft(idx2), [], alpha  )
     //atInsts.push(atInst)
     //atInst = new ati( atPane.getAtiTopRight(idx2) , atPane.getAtiBottomLeft(idx2), [], alpha  )
     //atInsts.push(atInst)
    //}
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
  
  paper.view.onFrame = (event) => { 
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

