import {RefObject} from 'react';
import Animated, {
  useAnimatedRef,
  useDerivedValue,
} from 'react-native-reanimated';

type ViewPositions = {};

const useViewLayoutPositions = () => {
  const refs = new Array<RefObject<Animated.View>>(10).fill(
    useAnimatedRef<Animated.View>(),
  );

  const viewPosition = useDerivedValue(() => {}, []);

  return {
    refs,
    viewPosition,
  };
};

export default useViewLayoutPositions;
