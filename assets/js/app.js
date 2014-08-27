  var player = new VersalPlayerAPI();

  player.on('editableChanged', function(editableObj){
    console.log('editableChanged', editableObj);
  });

  player.on('attributesChanged', function(attrs){
    console.log('attributesChanged', attrs);
  });

  // send this command to receive initial events
  player.startListening();

  // continuously watch for changes in height
  player.watchBodyHeight();


player.on('editableChanged', function(editableObj){
 if(editableObj.editable) {
   document.querySelector('p.role').innerHTML = 'author';
 } else {
   document.querySelector('p.role').innerHTML = 'learner';
 }
});


// save a textarea
var textarea = document.querySelector('input.diagramName');
textarea.addEventListener('blur', function(){
 player.setAttributes({
   textareaValue: textarea.value
 });
});



// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('c');

function addRect(){
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
