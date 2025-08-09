function ball_speed_change(score, ballPhysics) {
    if (score <= 5) {
        ballPhysics.velocityX *= 1.1;
        ballPhysics.velocityY *= 1.1;
    } else if (5 < score <= 10) {
        ballPhysics.velocityX *= 1.04;
        ballPhysics.velocityY *= 1.04;
    } else if (10 < score <= 15) {
        ballPhysics.velocityX *= 1;
        ballPhysics.velocityY *= 1;
    } else if (15 < score <= 20) {
        ballPhysics.velocityX *= 1.03;
        ballPhysics.velocityY *= 1.03;
    } else if (20 < score <= 25) {
        ballPhysics.velocityX *= 1;
        ballPhysics.velocityY *= 1;
    } else if (25 < score <= 30) {
        ballPhysics.velocityX *= 1.02;
        ballPhysics.velocityY *= 1.02;
    } else if (30 < score <= 35) {
        ballPhysics.velocityX *= 1;
        ballPhysics.velocityY *= 1;
    } else if (35 < score <= 40) {
        ballPhysics.velocityX *= 1.01;
        ballPhysics.velocityY *= 1.01;
    } else {
        ballPhysics.velocityX *= 1;
        ballPhysics.velocityY *= 1;
    }

}

export default ball_speed_change;