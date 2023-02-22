import React, {useImperativeHandle, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {
  DimensionObject,
  SharedGestureObject,
  SharedGestureRefType,
} from '../../../hooks/type';
import useAnimatedDimension from '../../../hooks/useAnimatedDimension';
import {PlaceholderCard} from '../PlaceholderCard';
import {Cursor} from './cursor';

type SliderProps = {
  sharedGesture: SharedGestureObject;
  containerSize: DimensionObject;
  cursorSize: DimensionObject;
};

export const Slider = React.forwardRef<SharedGestureRefType, SliderProps>(
  ({sharedGesture: sg, containerSize, cursorSize}, ref) => {
    const contentSize = useAnimatedDimension();
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    useImperativeHandle(ref, () => ({
      setTranslation,
      getContentSize: () => containerSize,
      getGestureType: () => 'StickyPan',
      showContent: () => setShowPlaceholder(false),
    }));

    const setTranslation = (x: number, y: number) => {
      'worklet';
      sg.translation.x.value = x;
      sg.translation.y.value = y;
    };

    const onLayout = (layout: LayoutChangeEvent) => {};

    if (showPlaceholder) {
    }

    return (
      <View onLayout={onLayout} style={[containerSize, styles.container]}>
        {showPlaceholder && <PlaceholderCard cardSize={containerSize} />}
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
