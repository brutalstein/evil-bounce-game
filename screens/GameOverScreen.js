import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const GameOverScreen = ({ score, bestScore, onRestart }) => {
    return (
        <View
            className="absolute bg-black/60 items-center justify-center z-50"
            style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
            <Text className="text-white text-5xl font-bold mb-4">Game Over</Text>
            <Text className="text-white text-2xl mb-2">Score: {score}</Text>
            <Text className="text-white text-xl mb-6">Best: {bestScore}</Text>

            <TouchableOpacity
                className="bg-yellow-400 px-6 py-3 rounded-2xl"
                onPress={onRestart}
            >
                <Text className="text-black text-lg font-bold">Tap to Restart</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GameOverScreen;
