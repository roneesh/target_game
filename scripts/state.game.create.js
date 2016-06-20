var mainGame = mainGame || {};

mainGame.create = function() {
    console.log('state.MainGame.create')
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // The reticle and its settings
    reticle = this.game.add.sprite( (this.game.world.width / 2) - 15, (this.game.world.height / 2) - 15, 'reticle');
    reticle.inputEnabled = true;
    reticle.input.enableDrag();
    this.game.physics.arcade.enable(reticle);

    // The bottom platform and its settings
    platforms = this.game.add.group();
    platforms.enableBody = true;

    for (var i = 0; i < 24; i++) {
        var grass = platforms.create(i * 32, this.game.world.height - 32, 'grass');
        var leftWall = platforms.create(0, i * 32, 'brick');
        var rightWall = platforms.create(this.game.world.width - 32, i * 32, 'brick');
        var roof = platforms.create(i * 32, 0, 'brick');
        grass.body.immovable = true;
        leftWall.body.immovable = true;
        rightWall.body.immovable = true;
        roof.body.immovable = true;
    }
    platforms.enableBody = true;

    //  The score
    scoreText = this.game.add.text(48, 48, 'Score: 0', scoreTextProps);
    roundText = this.game.add.text(50, 132, 'Round 1', infoText);
    blinkBombsText = this.game.add.text(50, 92, ('Blink Bombs: ' + blinkBombs),  infoText);
    bulletsText = this.game.add.text(50, 112, ('Bullets: ' + bulletCount),  infoText);

    //  Enable the four arrows and spaceKey to be used as controls
    cursors = this.game.input.keyboard.createCursorKeys();
    spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    blinkBombKey = this.game.input.keyboard.addKey(Phaser.Keyboard.K);
    bulletsKey = this.game.input.keyboard.addKey(Phaser.Keyboard.B);

    this.game.input.mouse.capture = true;

    //  Events for the bomb keys
    blinkBombKey.onDown.add(blinkBomb);
    bulletsKey.onDown.add(fireBullet);

    //  The targets we'll shoot, with physics enabled
    squareTargets = this.game.add.group();
    squareTargets.enableBody = true;
    squareTargets.physicsBodyType = Phaser.Physics.ARCADE;
    squareTargets.createMultiple(maxSquareTargets, 'square target sheet');
    squareTargets.setAll('checkWorldBounds', true);
    squareTargets.setAll('outOfBoundsKill', true);
    squareTargets.setAll('hasOverlapped', false);
    squareTargets.setAll('frame', 1);
    squareTargets.callAll('animations.add', 'animations', 'explode', [1, 2, 3, 0], 5, false, true);

    gridTargets = this.game.add.group();
    gridTargets.enableBody = true;
    gridTargets.physicsBodyType = Phaser.Physics.ARCADE;
    gridTargets.createMultiple(maxGridTargets, 'grid target sheet');
    gridTargets.setAll('checkWorldBounds', true);
    gridTargets.setAll('outOfBoundsKill', true);
    gridTargets.setAll('hasOverlapped', false);
    gridTargets.setAll('frame', 1);
    gridTargets.callAll('animations.add', 'animations', 'explode', [1, 2, 3, 0], 5, false, true);
    
    xTargets = this.game.add.group();
    xTargets.enableBody = true;
    xTargets.physicsBodyType = Phaser.Physics.ARCADE;
    xTargets.createMultiple(maxXTargets, 'x target sheet');
    xTargets.setAll('checkWorldBounds', true);
    xTargets.setAll('outOfBoundsKill', true);
    xTargets.setAll('hasOverlapped', false);
    xTargets.setAll('frame', 1);
    xTargets.callAll('animations.add', 'animations', 'explode', [1, 2, 3, 0], 5, false, true);

    console.log('just before create populateTargets')
    populateTargets();

    //  bullets group
    bullets = this.game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(maxBullets, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    //  power UP!
    // powerUp = this.game.add()
}