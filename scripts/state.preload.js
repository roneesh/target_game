var preload = {
	preload: function() { 
		console.log('state.Preload.preload');
		this.game.load.image('reticle', 'assets/reticle.png');
	    this.game.load.image('grass', 'assets/grass.png');
	    this.game.load.image('brick', 'assets/brick.png');
	    this.game.load.image('bullet', 'assets/bullet.png');
	    this.game.load.image('power up', 'assets/power_up.png');
	    this.game.load.spritesheet('grid target sheet', 'assets/grid_target_spritesheet.png', 42, 42, 4);
	    this.game.load.spritesheet('x target sheet', 'assets/x_target_spritesheet.png', 42, 42, 4);
	    this.game.load.spritesheet('square target sheet', 'assets/square_target_spritesheet.png', 42, 42, 4);
	},
	create: function() {
		this.state.start('MainMenu');
		console.log('state.Preload.create')
	}
}