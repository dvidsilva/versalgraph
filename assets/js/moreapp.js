function clearAll() {
  canvas.clear().renderAll();
};
document.getElementById('clear-all').onclick = clearAll;

function saveDiagram() {
  player.setAttributes({
    diagramContent: JSON.stringify(canvas.toJSON())
  });
};

player.on('attributesChanged', function (attrs) {
  if (attrs && attrs.diagramContent) {
    canvas.clear().renderAll().loadFromJSON(attrs.diagramContent);
  }
});

document.getElementById('save-all').onclick = saveDiagram;