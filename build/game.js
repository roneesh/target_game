(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

require('./state.mainmenu.js');
require('./state.preload.js');
require('./state.game.preload.js');
require('./state.game.create.js');
require('./state.game.update.js');
require('./state.game.utility.js');

var squareTargetMultiplier = 1,
    gridTargetMultiplier = 5,
    xTargetMultiplier = 15,
    maxSquareTargets = 12,
    maxGridTargets = 12,
    maxXTargets = 12,
    reticle,
    reticleVelocity = 300,
    platforms,
    squareTargets,
    gridTargets,
    xTargets,
    cursors,
    spaceKey,
    infoText = {
        fontSize: '16px', font: 'Helvetica', fill: '#FFF'
    },
    scoreText = {
        fontSize: '38px', font: 'Helvetica', fill: '#FFF'
    },
    score = 0,
    scoreText,
    round = 0,
    roundText;

var blinkBombKey,       //the keyboard key that triggers it
    blinkBombsText,     //the text that indicates qty.
    blinkBombs = 1,     //the initial qty.
    bulletsKey,         //the key to fire a bullet
    bulletsText,        //the text of bullet qty.
    fireRate = 1000,     //increasing this decreases the rate of fire
    nextFire = 0,
    maxBullets = 12,    //max # of bullets on screen 
    bulletVelocity = 500    //velocity of bullets
    bulletCount = 20;   //# of bullets you start with

var powerUp,
    powerUpProbability;

game.state.add('Preload', Preload);
game.state.add('MainMenu', MainMenu);
game.state.add('Game', MainGame);

game.state.start('Preload');
},{"./state.game.create.js":2,"./state.game.preload.js":3,"./state.game.update.js":4,"./state.game.utility.js":5,"./state.mainmenu.js":6,"./state.preload.js":7}],2:[function(require,module,exports){
MainGame = function() { };

MainGame.prototype.create = function() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // The reticle and its settings
    reticle = game.add.sprite( (game.world.width / 2) - 15, (game.world.height / 2) - 15, 'reticle');
    reticle.inputEnabled = true;
    reticle.input.enableDrag();
    game.physics.arcade.enable(reticle);

    // The bottom platform and its settings
    platforms = game.add.group();
    platforms.enableBody = true;

    for (var i = 0; i < 24; i++) {
        var grass = platforms.create(i * 32, game.world.height - 32, 'grass');
        var leftWall = platforms.create(0, i * 32, 'brick');
        var rightWall = platforms.create(game.world.width - 32, i * 32, 'brick');
        var roof = platforms.create(i * 32, 0, 'brick');
        grass.body.immovable = true;
        leftWall.body.immovable = true;
        rightWall.body.immovable = true;
        roof.body.immovable = true;
    }
    platforms.enableBody = true;

    //  The score
    scoreText = game.add.text(48, 48, 'Score: 0', scoreText);
    roundText = game.add.text(50, 132, 'Round 1', infoText);
    blinkBombsText = game.add.text(50, 92, ('Blink Bombs: ' + blinkBombs),  infoText);
    bulletsText = game.add.text(50, 112, ('Bullets: ' + bulletCount),  infoText);

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
    squareTargets = game.add.group();
    squareTargets.enableBody = true;
    squareTargets.physicsBodyType = Phaser.Physics.ARCADE;
    squareTargets.createMultiple(maxSquareTargets, 'square target sheet');
    squareTargets.setAll('checkWorldBounds', true);
    squareTargets.setAll('outOfBoundsKill', true);
    squareTargets.setAll('hasOverlapped', false);
    squareTargets.setAll('frame', 1);
    squareTargets.callAll('animations.add', 'animations', 'explode', [1, 2, 3, 0], 5, false, true);

    gridTargets = game.add.group();
    gridTargets.enableBody = true;
    gridTargets.physicsBodyType = Phaser.Physics.ARCADE;
    gridTargets.createMultiple(maxGridTargets, 'grid target sheet');
    gridTargets.setAll('checkWorldBounds', true);
    gridTargets.setAll('outOfBoundsKill', true);
    gridTargets.setAll('hasOverlapped', false);
    gridTargets.setAll('frame', 1);
    gridTargets.callAll('animations.add', 'animations', 'explode', [1, 2, 3, 0], 5, false, true);
    
    xTargets = game.add.group();
    xTargets.enableBody = true;
    xTargets.physicsBodyType = Phaser.Physics.ARCADE;
    xTargets.createMultiple(maxXTargets, 'x target sheet');
    xTargets.setAll('checkWorldBounds', true);
    xTargets.setAll('outOfBoundsKill', true);
    xTargets.setAll('hasOverlapped', false);
    xTargets.setAll('frame', 1);
    xTargets.callAll('animations.add', 'animations', 'explode', [1, 2, 3, 0], 5, false, true);

    populateTargets();

    //  bullets group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(maxBullets, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    //  power UP!
    // powerUp = game.add()
}

module.exports = MainGame;
},{}],3:[function(require,module,exports){
MainGame = function() { }

MainGame.prototype.preload = function() {
    game.load.image('reticle', 'assets/reticle.png');
    game.load.image('grass', 'assets/grass.png');
    game.load.image('brick', 'assets/brick.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('power up', 'assets/power_up.png');
    game.load.spritesheet('grid target sheet', 'assets/grid_target_spritesheet.png', 42, 42, 4);
    game.load.spritesheet('x target sheet', 'assets/x_target_spritesheet.png', 42, 42, 4);
    game.load.spritesheet('square target sheet', 'assets/square_target_spritesheet.png', 42, 42, 4);
}

module.exports = MainGame;
},{}],4:[function(require,module,exports){
MainGame = function() { }

MainGame.prototype.update = function() {

    game.physics.arcade.collide(squareTargets, platforms);
    game.physics.arcade.overlap(reticle, squareTargets, reticleOnTarget, null, this);
    game.physics.arcade.overlap(bullets, squareTargets, targetShot, null, this);

    game.physics.arcade.collide(gridTargets, platforms);
    game.physics.arcade.overlap(reticle, gridTargets, reticleOnTarget, null, this);
    game.physics.arcade.overlap(bullets, gridTargets, targetShot, null, this);

    game.physics.arcade.collide(xTargets, platforms);
    game.physics.arcade.overlap(reticle, xTargets, reticleOnTarget, null, this);
    game.physics.arcade.overlap(bullets, xTargets, targetShot, null, this);

    game.physics.arcade.overlap(bullets, platforms, bulletHitWall);

    game.physics.arcade.collide(reticle, powerUp, getPowerUp, null, this);

    if (squareTargets.countLiving() === 0 &&
        gridTargets.countLiving() === 0 &&
        xTargets.countLiving() === 0) {
        populateTargets();
        round++;
        roundText.text = 'Round ' + round;
        powerUpProbability = Math.random();
        if (powerUpProbability > 0.01) {
            powerUp = game.add.sprite(200, 200, 'power up');
        }
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

module.exports = MainGame;
},{}],5:[function(require,module,exports){
function populateTargets() {
    
    for (var i = 1; i < 9; i++) {
        var randomDigit = Math.floor(Math.random() * 3),
            target,
            multiplier;

        if (randomDigit === 0) {
            target = squareTargets.getFirstDead();
            multiplier = squareTargetMultiplier
        } else if (randomDigit === 1) {
            target = gridTargets.getFirstDead();
            multiplier = gridTargetMultiplier       
        } else if (randomDigit === 2) {
            target = xTargets.getFirstDead();
            multiplier = xTargetMultiplier;
        }

        target.reset(i * (game.world.width / 8), 96);
        target.frame = 1;
        target.hasOverlapped = false;
        target.body.velocity.x = Math.floor(Math.random() * multiplier * 50);
        target.body.velocity.y = Math.floor(Math.random() * multiplier * 50);
        target.body.bounce.set(1);
    }

}

function blinkBomb() {
    if (blinkBombs > 0) {
        squareTargets.forEachAlive(function(target) {
            killTarget(target);
        });
        gridTargets.forEachAlive(function(target) {
            killTarget(target);
        })
        xTargets.forEachAlive(function(target) {
            killTarget(target);
        })
        blinkBombs--;
        blinkBombsText.text = 'Blink Bombs: ' + blinkBombs;
    }
}

function fireBullet() {
    if (game.time.now > nextFire && bullets.countDead() > 4 && bulletCount > 0) {   
        //this is what pauses firing for a bit
        nextFire = game.time.now + fireRate;

        var bullet1 = bullets.getFirstDead();
        bullet1.reset(reticle.position.x + 40, reticle.position.y);
        bullet1.body.velocity.x = bulletVelocity;
        
        var bullet2 = bullets.getFirstDead();
        bullet2.reset(reticle.position.x, reticle.position.y);
        bullet2.angle = 270;
        bullet2.body.velocity.y = -bulletVelocity;

        var bullet3 = bullets.getFirstDead();
        bullet3.reset(reticle.position.x - 40, reticle.position.y + 30)
        bullet3.body.velocity.x = -bulletVelocity;
        bullet3.angle = 180;

        var bullet4 = bullets.getFirstDead();
        bullet4.reset(reticle.position.x + 40, reticle.position.y + 40);
        bullet4.angle = 90;
        bullet4.body.velocity.y = bulletVelocity;

        bulletCount = bulletCount - 4;
        bulletsText.text = 'Bullets: ' + bulletCount;
    }
}

function reticleOnTarget(reticle, target) {
    if (spaceKey.isDown && !target.hasOverlapped) {
        target.hasOverlapped = true;  
        killTarget(target);
    }
}

function getPowerUp(reticle, powerUp) {
    console.log(reticle.key, powerUp.key);
}

function targetShot(bullet, target) {
    killTarget(target);
    bullet.kill();
}

function bulletHitWall(bullet, wall) {
    bullet.kill();
}

function killTarget(target) {
    var type = target.key;
    if (type === 'square target sheet') {
        changeScore(10)
    }
    if (type === 'grid target sheet') {
        changeScore(20)
    }
    if (type === 'x target sheet') {
        changeScore(30)
    }
    target.animations.play('explode', 5, false, true);
}

function changeScore(amount) {
    if (typeof amount === 'number') {
        score = score + amount;
    }
    scoreText.text = 'Score: ' + score;
}

},{}],6:[function(require,module,exports){
MainMenu = function() { }

MainMenu.prototype = {
	preload: function() { },

	create: function() {
		var bar = game.add.graphics();
		bar.beginFill(0xFFFFFF, 1);
		bar.drawRect(100, 100, 600, 100);

		var introText = 'Shootin\' Gallery!',
			introStyle = { font: '32px Helvetica', fill: '#000',boundsAlignH: "", boundsAlignV: "middle"};
        
        game.add.text(100,100, introText, introStyle);
        
        var instructionText = 'press [spacebar] to shoot targets, [b] to shoot bullets and [k] to shoot blink bombs',
        	instructionStyle = {font: '14px Helvetica', fill: '#000'}

        game.add.text(100,140, instructionText, instructionStyle) 
        
        var that = this;

        setTimeout(function() {
        	that.state.start('Game');
        }, 5000)
	}
}

module.exports = MainMenu;
},{}],7:[function(require,module,exports){
Preload = function() { }

Preload.prototype = {
	preload: function() { 

	},
	create: function() {
		this.state.start('MainMenu');
	}
}

module.exports = Preload;
},{}]},{},[1]);
