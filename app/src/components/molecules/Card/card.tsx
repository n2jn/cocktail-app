import React, {useImperativeHandle} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {DimensionObject} from '../../../hooks/useDimension';
import {Drink} from '../../../store/thecocktaildb/type';
import ThumbnailImage from '../../atoms/ThumbnaiImage';

export type CardRefType = {
  isVisible: (isVisible: boolean) => void;
};

export const CardRef = React.forwardRef<CardRefType, CardComponentProps>(
  (props, ref) => {
    const opacity = useSharedValue(props.opacity ? 1 : 0);

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

    return <CardComponent {...props} opacity={opacity}></CardComponent>;
  },
);

type CardComponentProps = {
  dimension: DimensionObject;
  content: Drink;
  onPress: (id: string) => void;
  opacity?: SharedValue<number>;
};

const CardComponent: React.FC<CardComponentProps> = ({
  dimension,
  content,
  onPress,
  opacity,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      ...dimension,
      opacity: opacity ? withSpring(opacity.value) : 1,
    };
  }, [opacity]);

  return (
    <>
      <Animated.View style={[styles.container, animatedStyle]}>
        <TouchableOpacity onPress={() => onPress(content.idDrink)}>
          <ThumbnailImage image={content.strDrinkThumb} />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});
