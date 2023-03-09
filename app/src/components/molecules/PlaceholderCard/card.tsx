import {StyleSheet} from 'react-native';
import Animated, {
  FadeOut,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export const PlaceholderCard = ({
  cardSize,
}: {
  cardSize: {width: number; height: number};
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    // backgroundColor is changed in JS thread, don't know how to fix that
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
      exiting={FadeOut.duration(1000)}
      style={[cardSize, styles.container, animatedStyle]}></Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderRadius: 40,
    borderWidth: 1,
  },
});
