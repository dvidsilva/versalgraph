  var player = new VersalPlayerAPI();

  player.on('editableChanged', function (editableObj) {
    console.log('editableChanged', editableObj);
  });

  player.on('attributesChanged', function (attrs) {
    console.log('attributesChanged', attrs);
  });

  // send this command to receive initial events
  player.startListening();

  // continuously watch for changes in height
  player.watchBodyHeight();


  player.on('editableChanged', function (editableObj) {
    if (editableObj.editable) {
      document.querySelector('p.role').innerHTML = 'author';
    } else {
      document.querySelector('p.role').innerHTML = 'learner';
    }
  });


  // save a textarea
  var textarea = document.querySelector('input.diagramName');
  textarea.addEventListener('blur', function () {
    player.setAttributes({
      diagramName: textarea.value
    });
  });


  player.on('attributesChanged', function (attrs) {
    if (attrs && attrs.textareaValue) {
      textarea.value = attrs.diagramName;
      document.querySelector('.title').innerHTML = attrs.diagramName;
    }
  });


  // create a wrapper around native canvas element (with id="c")
  var canvas = new fabric.Canvas('c');
  canvas.setHeight(500);
  canvas.setWidth(500);

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


  function addDiamond() {
    // create a rectangle with angle=45
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20,
      angle: 45
    });

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

  function addLine() {
    var line = new fabric.Line({
      fill: 'red',
      stroke: 'red',
      strokeWidth: 5,
      selectable: false,
      left: 50,
      top: 50

    });
    canvas.add(line);

  }