import React, {useImperativeHandle} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {SharedGestureObject} from '../../../hooks/type';
import useAnimatedDimension, {
  AnimatedDimensionObject,
} from '../../../hooks/useAnimatedDimension';
import {DimensionObject} from '../../../hooks/useDimension';
import {Cursor} from './cursor';

type SliderProps = {
  sharedGesture: SharedGestureObject;
  containerSize: DimensionObject;
  cursorSize: DimensionObject;
};

type SliderRefType = {
  setTranslation: (x: number, y: number) => void;
  getContentSize: () => DimensionObject;
};

export const Slider = React.forwardRef<SliderRefType, SliderProps>(
  ({sharedGesture: sg, containerSize, cursorSize}, ref) => {
    const contentSize = useAnimatedDimension();
    useImperativeHandle(ref, () => ({
      setTranslation,
      getContentSize: () => containerSize,
    }));

    const setTranslation = (x: number, y: number) => {
      'worklet';
      sg.translation.x.value = x;
      sg.translation.y.value = y;
    };

    const onLayout = (layout: LayoutChangeEvent) => {};

    return (
      <View onLayout={onLayout} style={[containerSize, styles.container]}>
        <Cursor sharedGesture={sg} dimension={cursorSize} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'red',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
  },
});
