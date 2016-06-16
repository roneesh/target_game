function populateTargets() {
    
    for (var i = 0; i < 12; i++) {
        var randomDigit = Math.floor(Math.random() * 3),
            target,
            multiplier,
            direction = (Math.random() < 0.5 ? 1 : -1);
        
        // if (randomDigit === 0) {}
            target = targets.create(i * 70, 96, 'square target sheet');
            multiplier = squareTargetMultiplier
        // } else if (randomDigit === 1) {
            // target = targets.create(i * 70, 96, 'grid target sheet'); 
            // multiplier = gridTargetMultiplier       
        // } else if (randomDigit === 2) {
            // target = targets.create(i * 70, 96, 'x target sheet');
            // multiplier = xTargetMultiplier;
        // }

        target.checkWorldBounds = true;
        target.outOfBoundsKill = true;
        target.body.velocity.x = Math.floor(Math.random() * multiplier * direction * 10);
        target.body.gravity.y = Math.floor(Math.random() * multiplier * 300);
        var explode = target.animations.add('explode', [1, 2, 3, 0]);
        explode.killOnComplete = true;
        target.frame = 1;
        target.hasOverlapped = false;
        target.body.bounce.y = 1;
    }

}

function blinkBomb() {
    if (blinkBombs > 0) {
        targets.forEachAlive(function(target) {
            killTarget(target);
        });
        blinkBombs--;
        blinkBombsText.text = 'Blink Bombs: ' + blinkBombs;
    }
}

function fireBullet() {
    if (game.time.now > nextFire && bullets.countDead() > 4) {   
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
    }
}