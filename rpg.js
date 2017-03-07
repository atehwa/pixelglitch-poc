"use strict";

var bg, oppo, lucy, bar;

function rpg_initialise() {
	bg = whop.makeSprite("img/battle-bg.png",0,0);
	oppo = whop.makeSprite("img/Cheforoni1.png", 120-32, 0);
	lucy = whop.makeSprite("img/LucyBattleSprite.png",120-32,80-32);
	lucy.setGhost(0.5);
	bar = whop.makeSprite('img/battle-bar.png',0,160-48);
}

