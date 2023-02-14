import {
  runDecay,
  SkiaMutableValue,
  SkMatrix,
  SkRect,
} from '@shopify/react-native-skia';
import {Skia, useSharedValueEffect} from '@shopify/react-native-skia';
import React from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  useValue,
  withDecay,
} from 'react-native-reanimated';
import {Matrix4, multiply4, toMatrix3, identity4} from 'react-native-redash';

import {concat, vec3} from './MatrixHelpers';

interface GestureHandlerProps {
  matrix: SkiaMutableValue<SkMatrix>;
  dimensions: SkRect;
  debug?: boolean;
}

const GestureHandler = ({
  matrix: skMatrix,
  dimensions,
  debug,
}: GestureHandlerProps) => {
  const {x, y, width, height} = dimensions;
  const origin = useSharedValue(vec3(0, 0, 0));
  const matrix = useSharedValue(identity4);
  const offset = useSharedValue(identity4);
  const velocityX = useSharedValue(0);
  const velocityY = useSharedValue(0);

  useSharedValueEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    skMatrix.current = Skia.Matrix(toMatrix3(matrix.value) as any);
  }, matrix);

  useDerivedValue(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log('velocityX', velocityX.value);
    console.log('velocityY', velocityY.value);

    // matrix.value = multiply4(
    //   Matrix4.translate(velocityX.value, velocityY.value, 0),
    //   matrix.value,
    // );
  }, [velocityX, velocityY]);

  const pan = Gesture.Pan()
    .onChange(e => {
      matrix.value = multiply4(
        Matrix4.translate(e.changeX, e.changeY, 0),
        matrix.value,
      );
    })
    .onEnd(e => {
      //matrix.value
      console.log('matrix', matrix.value);
      velocityX.value = e.velocityX;
      velocityY.value = e.velocityY;

      // velocity.value = {
      //   x: withDecay({velocity: e.velocityX}),
      //   y: withDecay({velocity: e.velocityY}),
      // };
    });

  const rotate = Gesture.Rotation()
    .onBegin(e => {
      origin.value = [e.anchorX, e.anchorY, 0];
      offset.value = matrix.value;
    })
    .onChange(e => {
      matrix.value = concat(offset.value, origin.value, [
        {rotateZ: e.rotation},
      ]);
    });

  const scale = Gesture.Pinch()
    .onBegin(e => {
      origin.value = [e.focalX, e.focalY, 0];
      offset.value = matrix.value;
    })
    .onChange(e => {
      matrix.value = concat(offset.value, origin.value, [{scale: e.scale}]);
    });

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    left: x,
    top: y,
    width,
    height,
    backgroundColor: debug ? 'rgba(100, 200, 300, 0.4)' : 'transparent',
    transform: [
      {translateX: -width / 2},
      {translateY: -height / 2},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {matrix: matrix.value as any},
      {translateX: width / 2},
      {translateY: height / 2},
    ],
  }));
  return (
    <GestureDetector gesture={Gesture.Race(scale, rotate, pan)}>
      <Animated.View style={style} />
    </GestureDetector>
  );
};
export default GestureHandler;
