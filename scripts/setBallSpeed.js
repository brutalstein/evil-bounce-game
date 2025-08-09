function ball_speed_change(score, ball) {
    if (score <= 5) {
        ball.vx *= 1.1;
        ball.vy *= 1.1;
    } else if (5 < score <= 10) {
        ball.vx *= 1.04;
        ball.vy *= 1.04;
    } else if (10 < score <= 15) {
        ball.vx *= 1;
        ball.vy *= 1;
    } else if (15 < score <= 20) {
        ball.vx *= 1.03;
        ball.vy *= 1.03;
    } else if (20 < score <= 25) {
        ball.vx *= 1;
        ball.vy *= 1;
    } else if (25 < score <= 30) {
        ball.vx *= 1.02;
        ball.vy *= 1.02;
    } else if (30 < score <= 35) {
        ball.vx *= 1;
        ball.vy *= 1;
    } else if (35 < score <= 40) {
        ball.vx *= 1.01;
        ball.vy *= 1.01;
    } else {
        ball.vx *= 1;
        ball.vy *= 1;
    }

}

export default ball_speed_change;