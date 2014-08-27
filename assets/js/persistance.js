  var player = new VersalPlayerAPI();

  player.on('editableChanged', function (editableObj) {
    console.log('editableChanged', editableObj);
  });


  // send this command to receive initial events
  player.startListening();

  // continuously watch for changes in height
  player.watchBodyHeight();


  function saveDiagram() {
    player.setAttributes({
      diagramContent: JSON.stringify(canvas.toJSON())
    });
  };

  player.on('attributesChanged', function (attrs) {
    if (attrs && attrs.diagramContent) {
      canvas.loadFromJSON(attrs.diagramContent).renderAll();
    }
    if (attrs && attrs.diagramName) {
      document.querySelector('h1.title').innerHTML = attrs.diagramName;
    }
  });

  var textarea = document.querySelector('h1.title');
  textarea.addEventListener('blur', function () {
    player.setAttributes({
      diagramName: textarea.innerHTML
    });
  });



  document.getElementById('save-all').onclick = saveDiagram;