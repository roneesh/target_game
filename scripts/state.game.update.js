var mainGame = mainGame || {}

mainGame.update = function() {

    this.game.physics.arcade.collide(squareTargets, platforms);
    this.game.physics.arcade.overlap(reticle, squareTargets, reticleOnTarget, null, this);
    this.game.physics.arcade.overlap(bullets, squareTargets, targetShot, null, this);

    this.game.physics.arcade.collide(gridTargets, platforms);
    this.game.physics.arcade.overlap(reticle, gridTargets, reticleOnTarget, null, this);
    this.game.physics.arcade.overlap(bullets, gridTargets, targetShot, null, this);

    this.game.physics.arcade.collide(xTargets, platforms);
    this.game.physics.arcade.overlap(reticle, xTargets, reticleOnTarget, null, this);
    this.game.physics.arcade.overlap(bullets, xTargets, targetShot, null, this);

    this.game.physics.arcade.overlap(bullets, platforms, bulletHitWall);

    this.game.physics.arcade.collide(reticle, powerUp, getPowerUp, null, this);

    if (squareTargets.countLiving() === 0 &&
        gridTargets.countLiving() === 0 &&
        xTargets.countLiving() === 0) {

        if (score >= 200) {
            this.state.start('EndGame');
        } else {
            populateTargets();
            round++;
            roundText.text = 'Round ' + round;
            powerUpProbability = Math.random();
            // if (powerUpProbability > 0.01) {
            //     powerUp = this.game.add.sprite(200, 200, 'power up');
            // }
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