var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', 
    { preload: preload, create: create, update: update }),
    squareTargetSprite,
    reticle,
    reticleVelocity = 300,
    platforms,
    targets,
    cursors,
    spaceKey,
    score = 0,
    scoreText;

function preload() {

    game.load.image('reticle', 'assets/reticle.png');
    game.load.image('grass', 'assets/grass.png');

    game.load.spritesheet('grid target sheet', 'assets/grid_target_spritesheet.png', 42, 42, 4);
    game.load.spritesheet('x target sheet', 'assets/x_target_spritesheet.png', 42, 42, 4);
    game.load.spritesheet('square target sheet', 'assets/square_target_spritesheet.png', 42, 42, 4);
}

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
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

    //  The targets we'll shoot, with physics enabled
    targets = game.add.group();
    targets.enableBody = true;
    populateTargets();

    //  The score
    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF', font: 'Helvetica' });

    //  Enable the four arrows and spaceKey to be used as controls
    cursors = game.input.keyboard.createCursorKeys();
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.input.mouse.capture = true;

}

function populateTargets() {
    
    for (var i = 0; i < 12; i++) {
        var randomDigit = Math.floor(Math.random() * 3),
            target;
        
        if (randomDigit === 0) {
            target = targets.create(i * 70, 96, 'square target sheet');
            target.body.gravity.y = 300;

        } else if (randomDigit === 1) {
            target = targets.create(i * 70, 96, 'grid target sheet');
            target.body.gravity.y = 1500;
        
        } else if (randomDigit === 2) {
            target = targets.create(i * 70, 96, 'x target sheet');
            target.body.gravity.y = 3000;
        }

        target.animations.add('explode', [1, 2, 3, 0])
        target.frame = 1;
        target.hasOverlapped = false;
        target.body.bounce.y = 1;
    }

}

function update() {

    game.physics.arcade.collide(targets, platforms);
    game.physics.arcade.overlap(reticle, targets, reticleOnTarget, null, this);

    if (targets.countLiving() === 0) {
        populateTargets();
    }

    reticle.body.velocity.x = 0;
    reticle.body.velocity.y = 0;

    if (cursors.left.isDown) {
        reticle.body.velocity.x = -reticleVelocity;
    } else if (cursors.right.isDown) {
        reticle.body.velocity.x = reticleVelocity;
    } else if (cursors.up.isDown) {
        reticle.body.velocity.y = -reticleVelocity;
    } else if (cursors.down.isDown) {
        reticle.body.velocity.y = reticleVelocity;
    }

}

function reticleOnTarget(reticle, target) {
    if (spaceKey.isDown && !target.hasOverlapped) {
        
        target.animations.play('explode', 5,false, true);
        target.hasOverlapped = true;  

        if (target.key === 'square target sheet') {
            score += 10;
        } else if (target.key === 'grid target sheet') {
            score += 20;
        } else if (target.key === 'x target sheet') {
            score += 30;
        }

        updateScore()
    }

}

function updateScore() {
    scoreText.text = 'Score: ' + score;
}
