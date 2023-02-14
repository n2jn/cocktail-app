import {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import {useAnimatedGestureHandler} from 'react-native-reanimated';
import {clamp, useVector} from 'react-native-redash';
import {SharedGestureObject} from './type';
import {DimensionObject} from './useDimension';

export const useGestureHandler = (
  {translation}: SharedGestureObject,
  {width, height}: DimensionObject,
) => {
  const cursor = useVector();
  const origin = useVector();

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {offsetX: number; offsetY: number}
  >({
    onStart: (_, ctx) => {
      ctx.offsetX = translation.x.value;
      ctx.offsetY = translation.y.value;
    },
    onActive: event => {
      cursor.x.value = origin.x.value + event.translationX;
      cursor.y.value = origin.y.value + event.translationY;

      translation.x.value = clamp(cursor.x.value, 0, width);
      translation.y.value = clamp(cursor.y.value, 0, height);
    },
    onEnd: _ => {
      translation.x.value = origin.x.value;
      translation.y.value = origin.y.value;
      cursor.x.value = 0;
      cursor.y.value = 0;
    },
  });

  return gestureHandler;
};
