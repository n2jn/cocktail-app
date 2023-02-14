import {StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {clamp, useVector} from 'react-native-redash';
import {SharedGestureObject} from '../../hooks/type';
import {DimensionObject} from '../../hooks/useDimension';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../model';

export type GestureHandlerProps = {
  sharedGesture: SharedGestureObject;
  dimension: DimensionObject;
};

export const GestureHandler = ({
  sharedGesture: {translation},
  dimension,
  children,
}: GestureHandlerProps) => {
  const cursor = useVector();
  const origin = useVector();

  /**
   * config available : {@link https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/pan-gesture#config}
   *
   * callbacks available : {@link https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/pan-gesture#callbacks}
   *
   */
  const pan = Gesture.Pan()
    .onChange(event => {
      cursor.x.value = origin.x.value + event.translationX;
      cursor.y.value = origin.y.value + event.translationY;
      translation.x.value = clamp(cursor.x.value, 0, SCREEN_WIDTH);
      translation.y.value = clamp(cursor.y.value, 0, SCREEN_HEIGHT);
    })
    .onEnd(_ => {
      translation.x.value = origin.x.value;
      translation.y.value = origin.y.value;
      cursor.x.value = 0;
      cursor.y.value = 0;
    });

  const animatedStyle = useAnimatedStyle(() => {
    const {width, height} = dimension;
    return {
      width,
      height,
      transform: [
        {translateX: translation.x.value},
        {translateY: translation.y.value},
      ],
    };
  }, [translation]);

  return (
    <GestureDetector gesture={Gesture.Race(pan)}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {position: 'absolute'},
});
