import React from 'react';
import { Animated } from 'react-native';
import "../global.css";

const Wall = ({ wallPos, panHandlers }) => (
  <Animated.View
    {...panHandlers}
    className='bg-black h-12 w-[120] self-center rounded-3xl'
    style={{ transform: [{ translateX: wallPos }] }}
  />
);

export default Wall;