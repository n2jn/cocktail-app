import {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useVector, withBouncing} from 'react-native-redash';
import {DimensionObject} from '../../../hooks/useDimension';

type OfficeDVDAnimationProps = {
  index: number;
  total: number;
  size: number;
  imageUrl: string;
  viewDimension: DimensionObject;
};

const OfficeDVDAnimation: React.FC<OfficeDVDAnimationProps> = ({
  size,
  imageUrl,
  viewDimension,
  index,
  total,
}) => {
  const translation = useVector(0);

  useEffect(() => {
    translation.x.value = withBouncing(
      withRepeat(
        withTiming(viewDimension.width - total * size, {
          duration: 7000,
          easing: Easing.linear,
        }),
        -1,
        true,
      ),
      0,
      viewDimension.width - total * size,
    );
    translation.y.value = withBouncing(
      withRepeat(
        withTiming(viewDimension.height - size, {
          duration: 15000,
          easing: Easing.linear,
        }),
        -1,
        true,
      ),
      0,
      viewDimension.height,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: index * size,
      transform: [
        {translateX: translation.x.value},
        {translateY: translation.y.value},
      ],
    };
  }, [translation, index]);

  return (
    <Animated.Image
      style={[
        {
          height: size,
          width: size,
          position: 'absolute',
          opacity: 0.6,
        },
        animatedStyle,
      ]}
      source={{
        uri: imageUrl,
      }}></Animated.Image>
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
  },
});

export default OfficeDVDAnimation;
