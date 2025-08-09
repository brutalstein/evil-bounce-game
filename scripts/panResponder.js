import React, { useRef } from 'react'
import { PanResponder } from 'react-native';

const wall_controller = (currentX, wallPos) => {
    const pan_responder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
    
          onPanResponderGrant: () => {
    
          },
    
          onPanResponderMove: (_, gestureState) => {
            const newX = currentX.current + gestureState.dx;
            wallPos.setValue(newX);
          },
    
          onPanResponderRelease: (_, gestureState) => {
            currentX.current = currentX.current + gestureState.dx;
            wallPos.setValue(currentX.current);
          },
        })
      ).current;

      return pan_responder;
}

export default wall_controller;
