import React from 'react';
import { Animated } from 'react-native';
import "../global.css";

const Ball = ({ ballPos }) => (
  <Animated.Text
    className='text-5xl'
    style={{
      transform: [
        { translateX: ballPos.x },
        { translateY: ballPos.y }
      ]
    }}
  >
    🏀
  </Animated.Text>
);

export default Ball;