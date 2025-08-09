import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import "../global.css";

const TapToStartGame = ({ isGameStart, onStart }) => {
    if (isGameStart) return null;

    return (
        <TouchableOpacity
            onPress={onStart}
            activeOpacity={0.8}
            className='absolute bottom-32 w-[80%] h-[200] items-center justify-center'
        >
            <Text className='text-2xl text-[50] font-semibold text-center'>
                Tap here to start game
            </Text>
        </TouchableOpacity>
    );
};

export default TapToStartGame