function update() {

    game.physics.arcade.collide(targets, platforms);
    game.physics.arcade.overlap(reticle, targets, reticleOnTarget, null, this);
    game.physics.arcade.overlap(bullets, targets, targetShot, null, this);

    if (targets.countLiving() === 0) {
        populateTargets();
        round++;
        roundText.text = 'Round ' + round;
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

function targetShot(bullet, target) {
    killTarget(target);
    bullet.kill();
}

function killTarget(target) {
    var type = target.key;
    console.log('target in killTarget')
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

