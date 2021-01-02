
  var canvas = document.getElementById('myCanvas');
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  //var canvas = document.getElementsByTagName('canvas')[0];
  console.log("HERE")
  console.log(canvas)
  console.log(document.getElementById('myCanvas'))
  console.log(document.getElementsByTagName('canvas'))
  paper.setup(canvas)
  paper.install(window)

    var path = new Path();
    
  var tool = new Tool()
  console.log(tool)
		// Give the stroke a color
		path.strokeColor = 'black';
		var start = new Point(100, 100);
		// Move to start and draw a line from there
		path.moveTo(start);
		// Note that the plus operator on Point objects does not work
		// in JavaScript. Instead, we need to call the add() function:
		path.lineTo(start.add([ 200, -50 ]));
		// Draw the view now:
		view.draw();
    let circle = new Path.Circle( { 
        center: new Point(100, 100), 
        radius: 50,
        fillColor: 'blue'
        })
    circle.strokeColor = 'black';
		//view.draw();
   //tool.onMouseDown = (event) => {
   //  // The mouse was clicked, so let's put a newly created Path into
   //  // myPath, give it the color black and add the location as the
   //  // path's first segment.
   //  myPath = new Path();
   //  myPath.moveTo(start)
   //  myPath.strokeColor = 'black';
   //  myPath.add(event.point);
   //  view.draw();
   //  console.log(event)
   //}
   circle.onMouseDrag = (event) => {
     //circle.position = circle.position.add(event.delta)
     circle.position = circle.position + event.delta
     console.log(event.delta)
     //view.draw();
   }

