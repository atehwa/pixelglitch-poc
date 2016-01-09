
var whop = whop || (function () {

var node = document.createElement.bind(document);
var elem = document.getElementById.bind(document);
var $$ = document.querySelectorAll.bind(document);
var stage;

function move(n, x, y) {
	n.style.left = x + 'px';
	n.style.top = y + 'px';
}

function img(src, x, y) {
	var n = node('IMG');
	n.src = src;
	n.style.position = 'absolute';
	move(n, x, y);
	stage.appendChild(n);
	return n;
}

function init() {
	stage = elem('game');
	stage.removeChild(elem('jswarning'));
}

return { img: img, initialise: init, move: move };

})();

