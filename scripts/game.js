var shootingGallery = shootingGallery || {};

shootingGallery.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

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

shootingGallery.game.state.add('Preload', preload);
shootingGallery.game.state.add('MainMenu', mainMenu);
shootingGallery.game.state.add('MainGame', mainGame);
shootingGallery.game.state.add('EndGame', endGame);

shootingGallery.game.state.start('Preload');