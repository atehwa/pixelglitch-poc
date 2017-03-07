"use strict";
// vim:sw=2:

var whop = whop || (function () {

var node = document.createElement.bind(document);
var elem = document.getElementById.bind(document);
var stage;
var sprites = [];
var keyHandlers = {};

function movenode(n, x, y) {
  n.style.left = x + 'px';
  n.style.top = y + 'px';
}

function resizenode(n, w, h) {
  n.style.width = w + 'px';
  n.style.height = h + 'px';
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
  var index_in_sprites = 0;

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

    setDims: function setDims(nwidth, nheight) {
      resizenode(node, nwidth, nheight);
    },

    setGhost: function setGhost(transparency) {
      if (transparency === 1) node.style.visibility = 'hidden';
      else {
	node.style.opacity = (1-transparency);
	node.style.visibility = 'visible';
      }
    },

    setSpeed: function setSpeed(nxd, nyd) { xd = nxd; yd = nyd; },
    accel: function accel(xdd, ydd) { inst.setSpeed(xd + xdd, yd + ydd); },
    whenMoved: function whenMoved(cb) { hooks.push(cb); },

    clear: function clear() {
      hooks = [];
      inst.setSpeed(0, 0);
    },

    destroy: function destroy() {
      delete sprites[index_in_sprites];
      node.parentElement.removeChild(node);
    }
  }

  index_in_sprites = sprites.push(inst) - 1;

  return inst;
}

function nextFrame() {
  sprites.forEach(function(sprite) { sprite.update(); });
  requestAnimationFrame(nextFrame);
}

function handleKey(e) {
  var handler = keyHandlers[e.keyCode];
  if (!handler) return true;
  handler();
  if (e.preventDefault) e.preventDefault();
  return false;
}

function whenPressed(c, f) {
  keyHandlers[c.charCodeAt(0)] = f;
}

function installHandler(keyCode) {
  return function handleKey(f) {
    keyHandlers[keyCode] = f;
  }
}

return {
  initialise: function init(stagename) {
    stage = elem(stagename);
    stage.removeChild(elem('jswarning'));
    document.onkeydown = handleKey;
    requestAnimationFrame(nextFrame);
  },
  makeSprite: makeSprite,
  handleKey: handleKey,
  allSprites: function allSprites() { return sprites; },
  whenPressed: whenPressed,
  whenLeft: installHandler(37),
  whenUp: installHandler(38),
  whenRight: installHandler(39),
  whenDown: installHandler(40)
};

})();

