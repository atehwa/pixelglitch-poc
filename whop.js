
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
  var hooks = [];

  function moveTo(nx, ny) {
    x = nx;
    y = ny;
    movenode(node, x, y);
  }

  function move(xd, yd) {
    moveTo(x + xd, y + yd);
  }

  var inst = {
    x: function getX() { return x; },
    y: function getY() { return y; },
    xSpeed: function getXSpeed() { return xd; },
    ySpeed: function getYSpeed() { return yd; },

    move: move,
    moveTo: moveTo,
    update: function update() {
      hooks.forEach(function(hook) { hook(); });
      move(xd, yd);
    },

    setSpeed: function setSpeed(nxd, nyd) { xd = nxd; yd = nyd; },
    accel: function accel(xdd, ydd) { inst.setSpeed(xd + xdd, yd + ydd); },
    whenMoved: function whenMoved(cb) { hooks.push(cb); },

    clear: function clear() {
      hooks = [];
      inst.setSpeed(0, 0);
    }
  }

  sprites.push(inst);

  return inst;
}

function nextFrame() {
  sprites.forEach(function(sprite) { sprite.update(); });
  requestAnimationFrame(nextFrame);
}


return {
  initialise: function init(stagename) {
    stage = elem(stagename);
    stage.removeChild(elem('jswarning'));
    requestAnimationFrame(nextFrame);
  },
  makeSprite: makeSprite,
  allSprites: function allSprites() { return sprites; }
};

})();

