import React, {RefObject, useCallback, useImperativeHandle} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedRef,
  useDerivedValue,
} from 'react-native-reanimated';
import {ViewCollisionHandler} from '../CollisionWrapper/hooks/useViewCollisionHandler';
import Modal from './Modal';
import Swipe from './Swipe';

type SwipeModalContainerProps = {
  collisionHandler: ViewCollisionHandler;
  handledById: SharedValue<number>;
};

type SwipeModalContainerRef = {};

const SwipeModal = React.forwardRef<Animated.View, SwipeModalContainerProps>(
  (props, ref) => {
    // const gBoxRef = useAnimatedRef<Animated.View>();

    //useImperativeHandle(gBoxRef, () => );

    //const isGestureOccupied = useDerivedValue(() => props.handledById.value !== , [props.handledById]);
    return (
      <>
        <Swipe
          collisionHandler={props.collisionHandler}
          ref={ref}
          handledId={props.handledById}>
          <Modal />
        </Swipe>
      </>
    );
  },
);

export default SwipeModal;
