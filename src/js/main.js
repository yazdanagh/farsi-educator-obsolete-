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

  let circle = new paper.Path.Circle( { 
    center: origin, 
    radius: 50,
    fillColor: 'orange'
  })
  let targRect = new paper.Path.Rectangle({ 
    center: destination, 
    size: [100,100]
  })

  circle.strokeColor = 'black';
  targRect.strokeColor = 'black';
  //paper.view.draw();
  //tool.onMouseDown = (event) => {
    //  // The mouse was clicked, so let's put a newly created Path into
    //  // myPath, give it the color black and add the location as the
    //  // path's first segment.
    //  myPath = new paper.Path();
    //  myPath.moveTo(start)
    //  myPath.strokeColor = 'black';
    //  myPath.add(event.point);
    //  paper.view.draw();
    //  console.log(event)
    //}
   circle.onMouseDrag = (event) => {
     circle.position = circle.position.add(event.delta)
     //circle.position = circle.position + event.delta
     //console.log(event.delta)
     //paper.view.draw();
   }
   circle.onMouseUp = (event ) => {
     circle.resolve = true 
   }
   paper.view.onFrame = (event) => { 
     let targ
     if ( circle.resolve ) {
     if ( targRect.contains(circle.position)) {
       targ = destination
       console.log("YOOHOO")
     } else {
       targ = origin
     }
       
     let vector = targ.subtract(circle.position) 
     let step  
     console.log('vector length: ' + vector.length )
     if ( vector.length > 10 ) {
       step = vector.divide(10)
       step = step.floor()
     } else { 
       step = vector
     }
     console.log( 'step is: ' +step)
     //console.log(circle.position)
     circle.position = circle.position.add(step)
     }
     if ( circle.position.equals(targ) ) {
       circle.resolve = false
     }
   }

