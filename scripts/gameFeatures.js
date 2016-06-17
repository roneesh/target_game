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