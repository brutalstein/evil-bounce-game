import React from 'react';
import { View, Text } from 'react-native';
import "../global.css"

const ScoreBoard = ({ bestScore }) => (
  <View className='items-center'>
    <Text className='font-bold text-[20px] text-[100]'>
      👑 Best Score: {bestScore}
    </Text>
  </View>
);

export default ScoreBoard;
