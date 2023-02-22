import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {DimensionObject} from '../../../hooks/type';

export const PlaceholderCard = ({cardSize}: {cardSize: DimensionObject}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withRepeat(
        withSequence(
          withTiming('white', {
            duration: 1000,
          }),
          withTiming('grey', {
            duration: 3000,
          }),
          withTiming('white', {
            duration: 3000,
          }),
        ),
        -1,
      ),
    };
  }, []);

  return (
    <Animated.View
      style={[cardSize, styles.container, animatedStyle]}></Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 1,
  },
});
