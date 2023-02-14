import {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useVector, withBouncing} from 'react-native-redash';
import {DimensionObject} from '../../../hooks/useDimension';

type FallingAnimationProps = {
  index: number;
  total: number;
  size: number;
  imageUrl: string;
  viewDimension: DimensionObject;
};

const FallingAnimation: React.FC<FallingAnimationProps> = ({
  size,
  imageUrl,
  viewDimension,
  index,
  total,
}) => {
  let x = Math.round(Math.random() * viewDimension.width);

  const translation = useVector(0);
  const lifeTime = 20000;
  const horizontalMoveDuringLifeTime = 6;
  const animationDelay = (lifeTime / total) * index;

  useEffect(() => {
    const animations = [];
    const maxHorizontalMove = viewDimension.width / 10;
    for (let i = 0; i < horizontalMoveDuringLifeTime; i++) {
      const horizontalMove = Math.round(Math.random() * maxHorizontalMove);
      x += i % 2 === 0 ? horizontalMove : -horizontalMove;
      animations.push(
        withTiming(x, {
          duration: lifeTime / horizontalMoveDuringLifeTime,
        }),
      );
    }
    translation.x.value = withSequence(...animations);
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
      left: 0,
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

export default FallingAnimation;
