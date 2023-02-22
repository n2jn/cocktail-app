import {StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {SharedGestureObject} from '../../../hooks/type';
import {DimensionObject} from '../../../hooks/useDimension';
import {Circle, Line, Svg} from 'react-native-svg';
import {GestureHandler} from '../../GestureHandler/GestureHandler';

type CursorType = {
  sharedGesture: SharedGestureObject;
  dimension: DimensionObject;
};

export const Cursor: React.FC<CursorType> = ({dimension, sharedGesture}) => {
  const cursorAnimationStyle = useAnimatedStyle(() => {
    const {translation} = sharedGesture;
    return {
      dimension,
      transform: [
        {
          translateX: translation.x.value,
        },
        {
          translateY: translation.y.value,
        },
      ],
    };
  }, [sharedGesture, dimension]);

  return (
    <Animated.View style={[styles.cursor, cursorAnimationStyle]}>
      <CursorSVG />
    </Animated.View>
  );
};

const CursorSVG = () => {
  return (
    <Svg height="100%" width="100%" viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="50"
        r="45"
        stroke="blue"
        strokeWidth="2.5"
        fill="green"></Circle>
      <Line
        x={'0'}
        y={'25'}
        x2="100"
        y2="0"
        stroke="blue"
        strokeWidth="5"></Line>
      <Line
        x={'0'}
        y={'50'}
        x2="100"
        y2="0"
        stroke="blue"
        strokeWidth="5"></Line>
      <Line
        x={'0'}
        y={'75'}
        x2="100"
        y2="0"
        stroke="blue"
        strokeWidth="5"></Line>
    </Svg>
  );
};

const styles = StyleSheet.create({
  cursor: {
    position: 'absolute',
    borderColor: 'yellow',
    borderWidth: 3,
    left: 0,
    top: 0,
    backgroundColor: 'green',
  },
});
