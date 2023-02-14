import React, {useImperativeHandle} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {SharedGestureObject} from '../../../hooks/type';
import {DimensionObject} from '../../../hooks/useDimension';
import {Drink} from '../../../store/thecocktaildb/type';
import {GestureHandler} from '../../atoms/GestureHandler';
import {Content} from './content';

type CardProps = {
  dimension: DimensionObject;
  sharedGesture: SharedGestureObject;
  content: Drink;
  onContentPress: (id: string) => void;
};

export type CardRef = {
  isVisible: (isVisible: boolean) => void;
};

export const Card = React.forwardRef<CardRef, CardProps>(
  ({dimension, sharedGesture, content, onContentPress}, ref) => {
    // create hook for ref maybe
    const opacity = useSharedValue(1);
    useImperativeHandle(ref, () => ({
      isVisible: (isVisible: boolean) => {
        'worklet';
        if (isVisible) {
          opacity.value = 1;
          return;
        }
        opacity.value = 0;
      },
    }));

    const animatedStyle = useAnimatedStyle(() => {
      return {
        ...dimension,
        opacity: withSpring(opacity.value),
      };
    }, [sharedGesture, opacity]);

    return (
      <>
        <GestureHandler dimension={dimension} sharedGesture={sharedGesture}>
          <Animated.View style={[styles.container, animatedStyle]}>
            <Content content={content} onPress={onContentPress}></Content>
          </Animated.View>
        </GestureHandler>
      </>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});
