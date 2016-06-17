function update() {

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

