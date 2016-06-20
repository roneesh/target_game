var mainMenu = {
	preload: function() { 
		console.log('state.MainMenu.preload');
	},
	create: function() {
		console.log('state.MainMenu.create');
		var bar = this.game.add.graphics();
		bar.beginFill(0xFFFFFF, 1);
		bar.drawRect(100, 100, 600, 100);

		var introText = 'Shootin\' Gallery!',
			introStyle = { font: '32px Helvetica', fill: '#000',boundsAlignH: "", boundsAlignV: "middle"};
        
        this.game.add.text(100,100, introText, introStyle);
        
        var instructionText = 'press [spacebar] to shoot targets, [b] to shoot bullets and [k] to shoot blink bombs\nPress any key to begin',
        	instructionStyle = {font: '14px Helvetica', fill: '#000'}

        this.game.add.text(100,140, instructionText, instructionStyle) 
        
        var button = this.game.add.button(this.game.world.centerX - 95, 400, 'button', this.start, this, 2, 1, 0);
	},
	start: function() {
		this.state.start('MainGame');
	}
}