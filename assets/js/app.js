

  // create a wrapper around native canvas element (with id="c")
  var canvas = new fabric.Canvas('c', {
    hoverCursor: 'pointer',
  });

  // customize target when moving
  canvas.on({
    'object:moving': function (e) {
      e.target.opacity = 0.6;
    },
    'object:modified': function (e) {
      e.target.opacity = 1;
    }
  });

  // find object that is being selected
  canvas.findTarget = (function (originalFn) {
    return function () {
      var target = originalFn.apply(this, arguments);
      if (target) {
        if (this._hoveredTarget !== target) {
          canvas.fire('object:over', {
            target: target
          });
          if (this._hoveredTarget) {
            canvas.fire('object:out', {
              target: this._hoveredTarget
            });
          }
          this._hoveredTarget = target;
        }
      } else if (this._hoveredTarget) {
        canvas.fire('object:out', {
          target: this._hoveredTarget
        });
        this._hoveredTarget = null;
      }
      return target;
    };
  })(canvas.findTarget);

  document.getElementById('remove-selected').onclick = function () {
    var activeObject = canvas.getActiveObject(),
      activeGroup = canvas.getActiveGroup();
    if (activeObject) {
      canvas.remove(activeObject);
    } else if (activeGroup) {
      var objectsInGroup = activeGroup.getObjects();
      canvas.discardActiveGroup();
      objectsInGroup.forEach(function (object) {
        canvas.remove(object);
      });
    }
  };
  document.getElementById('bring-to-front').onclick = function () {
    var activeObject = canvas.getActiveObject(),
      activeGroup = canvas.getActiveGroup();
    if (activeObject) {
      activeObject.bringToFront();
    } else if (activeGroup) {
      var objectsInGroup = activeGroup.getObjects();
      canvas.discardActiveGroup();
      objectsInGroup.forEach(function (object) {
        object.bringToFront();
      });
    }
  };
  document.getElementById('send-to-back').onclick = function () {
    var activeObject = canvas.getActiveObject(),
      activeGroup = canvas.getActiveGroup();
    if (activeObject) {
      activeObject.sendToBack();
    } else if (activeGroup) {
      var objectsInGroup = activeGroup.getObjects();
      canvas.discardActiveGroup();
      objectsInGroup.forEach(function (object) {
        object.sendToBack();
      });
    }
  };


  canvas.setHeight(500);
  canvas.setWidth(700);

  function addRect() {
    // create a rectangle object
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'white',
      stroke: 'black',
      width: 100,
      height: 100
    });

    // "add" rectangle onto canvas
    canvas.add(rect);
  }


  function addCircle() {
    var circle = new fabric.Circle({
      radius: 50,
      fill: 'green',
      left: 100,
      top: 100
    });

    canvas.add(circle);

  }

  function addTriangle() {
    var triangle = new fabric.Triangle({
      width: 100,
      height: 100,
      fill: 'blue',
      left: 50,
      top: 50
    });
    canvas.add(triangle);

  }

  function addText() {
    var text = new fabric.Text(document.querySelector('.text').value, {
      left: 50, //Take the block's position
      top: 50,
      fill: 'block'
    });
    canvas.add(text);
  }

  document.querySelector('#add-text-input').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key == 13) { // 13 is enter
      addText();
    }
  });



function addLine(x1, y1, x2, y2) {
  x1 = x1 || 50;
  x2 = x2 || 100;
  y1 = y1 || 200;
  y2 = y2 || 210;
  console.log('<3');
  var line = new fabric.Line([x1, y1, x2, y2], {
    fill: 'red',
    stroke: borderColor,
    strokeWidth: 5,
    selectable: false,
    originX: 'center',
    originY: 'center'

  });
  canvas.add(line);
}

  var fillColor = 'blue', borderColor = 'black';
  $('#text-fontcolor').miniColors({
			change: function(hex, rgb) {
              fillColor = this.value;

			  var activeObject = canvas.getActiveObject();
		      if (activeObject) {
		    	  activeObject.fill = this.value;
		    	  canvas.renderAll();
		      }
			},
			open: function(hex, rgb) {
				//
			},
			close: function(hex, rgb) {
				//
			}
		});


		$('#text-strokecolor').miniColors({
			change: function(hex, rgb) {
              borderColor = this.value;
			  var activeObject = canvas.getActiveObject();
		      if (activeObject) {
		    	  activeObject.stroke = this.value;
		    	  canvas.renderAll();
		      }
			},
			open: function(hex, rgb) {
				//
			},
			close: function(hex, rgb) {
				//
			}
		});

  function clearAll() {
    canvas.clear().renderAll();
  }
  document.getElementById('clear-all').onclick = clearAll;



  // FREE DRAW LINE
  var linepos = {}, freedrawline = true;
  function toggleFreeDrawLine (nv){
    freedrawline = !freedrawline;
    document.querySelector('.add-line').style.borderColor = 'lightgray';
    if(freedrawline){
      document.querySelector('.add-line').style.borderColor = 'black';
    }
  }
  toggleFreeDrawLine();
  function resetLinePos(){
    linepos = { start: {}, end: {}};
  }

  canvas.on('mouse:down', function (options) {
    linepos.start = {
      x: options.e.clientX - canvas._offset.left ,
      y: options.e.clientY - canvas._offset.top
    };
  });
  canvas.on('mouse:up', function (options) {
    // draw the line;
    linepos.end = {
      x: options.e.clientX - canvas._offset.left ,
      y: options.e.clientY - canvas._offset.top
    };
    if(freedrawline){
      addLine(linepos.start.x,linepos.start.y,linepos.end.x,linepos.end.y);
    }
    resetLinePos();
  });


  document.getElementById('free-draw-line').onclick = toggleFreeDrawLine;
