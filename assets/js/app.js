

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
      fill: 'red',
      width: 20,
      height: 20
    });

    // "add" rectangle onto canvas
    canvas.add(rect);
  }


  function addCircle() {
    var circle = new fabric.Circle({
      radius: 20,
      fill: 'green',
      left: 100,
      top: 100
    });

    canvas.add(circle);

  }

  function addTriangle() {
    var triangle = new fabric.Triangle({
      width: 20,
      height: 30,
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


  function addLine() {
    var line = new fabric.Line([50, 100, 200, 200], {
      stroke: 'red',
      strokeWidth: 5,
      left: 50,
      top: 50

    });
    canvas.add(line);

  }


  function clearAll() {
    canvas.clear().renderAll();
  };
  document.getElementById('clear-all').onclick = clearAll;