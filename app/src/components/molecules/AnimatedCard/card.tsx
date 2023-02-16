import React, {useImperativeHandle} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {DimensionObject} from '../../../hooks/useDimension';

export type CardRefType = {
  setVisible: (isVisible: boolean) => void;
};

type DrinkCardComponentProps = {
  dimension: DimensionObject;
  children: React.ReactNode;
};

export const AnimatedCard = React.forwardRef<
  CardRefType,
  DrinkCardComponentProps
>(({dimension, children}, ref) => {
  const opacity = useSharedValue(1); // full opacity by default

  useImperativeHandle(ref, () => ({
    setVisible: (isVisible: boolean) => {
      'worklet';
      if (isVisible) {
        opacity.value = 1;
        return;
      }
      opacity.value = 0;
    },
  }));

  const animatedStyle = useAnimatedStyle(() => {
    const {width, height} = dimension;
    return {
      width,
      height,
      opacity: withSpring(opacity.value),
    };
  }, [opacity, dimension]);

  return (
    <Animated.View style={[styles.container, dimension, animatedStyle]}>
      {children}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});
