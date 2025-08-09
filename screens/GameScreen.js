import { Text, View, SafeAreaView, Animated, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import '../global.css'
import TapToStartGame from '../components/TapToStartGame'
import Wall from '../components/Wall'
import Ball from '../components/Ball'
import ScoreBoard from '../components/ScoreBoard'
import GameOverScreen from './GameOverScreen'
import setBallSpeed from '../scripts/setBallSpeed'
import wallCtrl from '../scripts/panResponder'

const GameScreen = () => {
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [isOver, setIsOver] = useState(false);
  const [started, setStarted] = useState(false);

  const curX = useRef(0);
  const ballXY = useRef(new Animated.ValueXY()).current;
  const wallX = useRef(new Animated.Value(0)).current;
  const wallBounce = 1;

  const { width: sw, height: sh } = Dimensions.get('window');

  const right = sw * 0.45;
  const left = -right;
  const top = -sh * 0.43;
  const bottom = sh * 0.48;
  const wallY = sh * 0.40;
  const baseSpeed = 5;

  const ball = useRef({
    vx: 0,
    vy: 0,
    x: 0,
    y: 0,
    moving: false
  }).current;

  const reflect = (v, n) => {
    const dot = v.x * n.x + v.y * n.y;
    return { x: v.x - 2 * dot * n.x, y: v.y - 2 * dot * n.y };
  };

  const loop = () => {
    const wl = wallX.__getValue() - 60;
    const wr = wallX.__getValue() + 60;

    if (!ball.moving) return;

    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x >= right) {
      const r = reflect({ x: ball.vx, y: ball.vy }, { x: -1, y: 0 });
      ball.vx = r.x * wallBounce;
      ball.vy = r.y * wallBounce;
      ball.x = right;
    }

    if (ball.x <= left) {
      const r = reflect({ x: ball.vx, y: ball.vy }, { x: 1, y: 0 });
      ball.vx = r.x * wallBounce;
      ball.vy = r.y * wallBounce;
      ball.x = left;
    }

    if (ball.y <= top) {
      const r = reflect({ x: ball.vx, y: ball.vy }, { x: 0, y: 1 });
      ball.vx = r.x * wallBounce;
      ball.vy = r.y * wallBounce;
      ball.y = top;
    }

    if (ball.x >= wl && ball.x <= wr && ball.y >= wallY) {
      const r = reflect({ x: ball.vx, y: ball.vy }, { x: 0, y: -1 });
      ball.vx = r.x * wallBounce;
      ball.vy = r.y * wallBounce;
      ball.y = wallY;

      setScore(prev => prev + 1);
      setBallSpeed(score, ball);
    }
    else if (ball.y >= bottom) {
      ball.y = bottom;
      ball.moving = false;
      setIsOver(true);
    }

    ballXY.setValue({ x: ball.x, y: ball.y });

    if (ball.moving) {
      requestAnimationFrame(loop);
    }
  };

  const startBall = (angle, speed) => {
    const rad = (angle * Math.PI) / 180;
    ball.x = 0;
    ball.y = 0;
    ball.vx = Math.cos(rad) * speed;
    ball.vy = Math.sin(rad) * speed;
    ball.moving = true;
    loop();
  };

  const startRnd = () => {
    const rndAngle = Math.random() * 120 + 30;
    startBall(rndAngle, baseSpeed);
  };

  useEffect(() => {
    if (started && !isOver) {
      startRnd();
    } else if (isOver) {
      setBest(prev => Math.max(prev, score));
    }
  }, [started, isOver]);

  const wallPan = wallCtrl(curX, wallX);

  return (
    <SafeAreaView className='bg-yellow-100 flex-auto'>
      <ScoreBoard bestScore={best} />
      <View className='flex-1 justify-center items-center'>
        <Text className='absolute text-[130px] text-[50]'>{score}</Text>
        <Ball ballPos={ballXY} />
        <TapToStartGame
          isGameStart={started}
          onStart={() => {
            setScore(0);
            setIsOver(false);
            setStarted(true);
          }}
        />
      </View>
      <Wall wallPos={wallX} panHandlers={wallPan.panHandlers} />
      {isOver && (
        <GameOverScreen
          score={score}
          bestScore={best}
          onRestart={() => {
            setScore(0);
            setIsOver(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default GameScreen;
