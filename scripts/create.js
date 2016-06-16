function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // The reticle and its settings
    reticle = game.add.sprite( (game.world.width / 2) - 15, (game.world.height / 2) - 15, 'reticle');
    reticle.inputEnabled = true;
    reticle.input.enableDrag();
    game.physics.arcade.enable(reticle);

    // The bottom platform and its settings
    platforms = game.add.group();
    platforms.enableBody = true;

    for (var i = 0; i < 25; i++) {
        var grass = platforms.create(i * 32, game.world.height - 64, 'grass');
        grass.body.immovable = true;
    }
    platforms.enableBody = true;

    //  The score
    scoreText = game.add.text(16, 16, 'Score: 0', scoreText);
    roundText = game.add.text(18, 100, 'Round 1', infoText);
    blinkBombsText = game.add.text(18, 60, ('Blink Bombs: ' + blinkBombs),  infoText);
    bulletsText = game.add.text(18, 80, ('Bullets: infinite'),  infoText);

    //  Enable the four arrows and spaceKey to be used as controls
    cursors = game.input.keyboard.createCursorKeys();
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    blinkBombKey = game.input.keyboard.addKey(Phaser.Keyboard.K);
    bulletsKey = game.input.keyboard.addKey(Phaser.Keyboard.B);

    game.input.mouse.capture = true;

    //  Events for the bomb keys
    blinkBombKey.onDown.add(blinkBomb);
    bulletsKey.onDown.add(fireBullet);

    //  The targets we'll shoot, with physics enabled
    targets = game.add.group();
    targets.enableBody = true;
    targets.physicsBodyType = Phaser.Physics.ARCADE;
    populateTargets();

    //  bullets group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(maxBullets, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

}

function createTargets() {
    targets.createMultiple(12, '')
}