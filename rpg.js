"use strict";

var bg, oppo, lucy, bar;

var chefo_stand = "img/Cheforoni1.png";
var chefo_walk_1 = "img/Cheforoni2.png";
var chefo_walk_2 = "img/Cheforoni3.png";

function rpg_initialise() {
	bg = whop.makeSprite("img/battle-bg.png",0,0);
	oppo = whop.makeSprite(chefo_stand, 120-32, 0);
	lucy = whop.makeSprite("img/LucyBattleSprite.png",120-32,80-32);
	lucy.setGhost(0.5);
	bar = whop.makeSprite('img/battle-bar.png',0,160-48);
}

var walk_animation = [chefo_stand, chefo_walk_1, chefo_stand, chefo_walk_2];

function oppo_walks(direction) {
	var delay = 4;
	var frame = 0;
	oppo.whenMoved(function() {
		if (--delay <= 0) {
			++frame;
			delay = 8;
			oppo.setPicture(walk_animation[frame % 4]);
		}
		oppo.move(0, direction);
		return frame < 16;
	});
}

