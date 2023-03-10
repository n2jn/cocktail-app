import React, {useImperativeHandle, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {clamp, useVector} from 'react-native-redash';
import {DimensionObject} from '../../../hooks/useDimension';
import {SharedGestureObject} from '../../../hooks/useSharedGestureArray';
import Cursor from './Cursor';

type MapProps = {
  scale: SharedValue<{x: number; y: number}>;
  sharedGestureHandler: SharedGestureObject;
  mapDimension: DimensionObject;
  listDimension: DimensionObject;
};
export type MapRef = {
  setTranslation: (x: number, y: number) => void;
  getTranslation: () => {x: number; y: number};
};

const Map = React.forwardRef<MapRef, MapProps>(
  (
    {
      sharedGestureHandler: {isGestureEnabled, translation, isGestureBeingUsed},
      scale,
      mapDimension,
      listDimension,
    },
    ref,
  ) => {
    // const translation = useVector();
    const cursor = useVector();
    const [canMove, setCanMove] = useState(isGestureEnabled.value);

    useDerivedValue(() => {
      runOnJS(setCanMove)(isGestureEnabled.value);
    }, [isGestureEnabled]);

    const gestureHandler = useAnimatedGestureHandler<
      PanGestureHandlerGestureEvent,
      {offsetX: number; offsetY: number}
    >(
      {
        onStart: (_, ctx) => {
          isGestureBeingUsed.value = true;
          ctx.offsetX = translation.x.value;
          ctx.offsetY = translation.y.value;
        },
        onActive: (event, ctx) => {
          cursor.x.value = ctx.offsetX + event.translationX;
          cursor.y.value = ctx.offsetY + event.translationY;

          translation.x.value = clamp(
            cursor.x.value,
            0,
            mapDimension.width - listDimension.width * scale.value.x,
          );
          translation.y.value = clamp(
            cursor.y.value,
            0,
            mapDimension.height - listDimension.height * scale.value.y,
          );
        },
        onEnd: () => {
          isGestureBeingUsed.value = false;
        },
        onFinish: () => {},
      },
      [],
    );

    useImperativeHandle(ref, () => ({
      setTranslation,
      getTranslation,
    }));

    const setTranslation = (x: number, y: number) => {
      'worklet';
      translation.x.value = x;
      translation.y.value = y;
    };

    const getTranslation = () => ({
      x: translation.x.value,
      y: translation.y.value,
    });

    const cursorAnimationStyle = useAnimatedStyle(() => {
      return {
        width: listDimension.width * scale.value.x,
        height: listDimension.height * scale.value.y,
        transform: [
          {
            translateX: translation.x.value,
          },
          {
            translateY: translation.y.value,
          },
        ],
      };
    }, [scale, translation, listDimension]);

    return (
      <>
        <View
          style={{
            height: mapDimension.height,
            width: mapDimension.width,
            backgroundColor: 'transparent',
            borderColor: 'black',
            borderRadius: 10,
            borderWidth: 1,
          }}>
          <PanGestureHandler enabled={canMove} onGestureEvent={gestureHandler}>
            <Animated.View
              style={[
                styles.cursor,
                {
                  left: 0,
                  top: 0,
                  backgroundColor: 'green',
                },
                cursorAnimationStyle,
              ]}>
              <Cursor />
            </Animated.View>
          </PanGestureHandler>
        </View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  cursor: {
    position: 'absolute',
    borderColor: 'yellow',
    borderWidth: 3,
  },
});

export default Map;
