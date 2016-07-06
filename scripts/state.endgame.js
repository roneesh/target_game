var endGame = {
	preload: function() { 
		console.log('state.EndGame.preload');
	},
	create: function() {
		console.log('state.EndGame.create');
		var bar = this.game.add.graphics();
		bar.beginFill(0xFFFFFF, 1);
		bar.drawRect(100, 100, 600, 100);

		var introText = 'Game Over!',
			introStyle = { font: '32px Helvetica', fill: '#000',boundsAlignH: "", boundsAlignV: "middle"};
        
        this.game.add.text(100,100, introText, introStyle);
	
		var button = this.game.add.button(this.game.world.centerX - 95, 400, 'button', this.reStart, this, 2, 1, 0);
	},
	reStart: function() {
		blinkBombs = 2;
		bulletCount = 20;
		changeScore(0);
		this.state.start('MainGame');
	}
}