import {StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {DimensionObject} from '../../../hooks/type';
import {Circle, Line, Svg} from 'react-native-svg';
import {useVector} from 'react-native-redash';

type CursorType = {
  dimension: DimensionObject;
};

export const Cursor: React.FC<CursorType> = ({dimension}) => {
  const translation = useVector();

  const cursorAnimationStyle = useAnimatedStyle(() => {
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
  }, [translation, dimension]);

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
