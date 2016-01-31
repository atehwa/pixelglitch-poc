
// vim:sw=2:

var whop = whop || (function () {

var node = document.createElement.bind(document);
var elem = document.getElementById.bind(document);
var stage;
var sprites = [];

function movenode(n, x, y) {
  n.style.left = x + 'px';
  n.style.top = y + 'px';
}

function img(src, x, y) {
  var n = node('img');
  n.src = src;
  n.style.position = 'absolute';
  movenode(n, x, y);
  stage.appendChild(n);
  return n;
}

function makeSprite(src, x, y) {
  var xd = 0, yd = 0;
  var node = img(src, x, y);

  function move(nx, ny) {
    x = nx;
    y = ny;
    movenode(node, x, y);
  }

  function update() { move(x + xd, y + yd); }
  function setSpeed(nxd, nyd) { xd = nxd; yd = nyd; }
  function accel(xdd, ydd) { setSpeed(xd + xdd, yd + ydd); }

  var inst = { move: move, update: update, setSpeed: setSpeed, accel: accel };
  sprites.push(inst);

  return inst;
}

function nextFrame() {
  sprites.forEach(function(sprite) { sprite.update(); });
  requestAnimationFrame(nextFrame);
}

function init(stagename) {
  stage = elem(stagename);
  stage.removeChild(elem('jswarning'));
  requestAnimationFrame(nextFrame);
}

return { initialise: init, makeSprite: makeSprite };

})();

