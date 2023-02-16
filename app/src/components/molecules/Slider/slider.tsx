import React, {useImperativeHandle} from 'react';
import {View} from 'react-native';
import {SharedGestureObject} from '../../../hooks/type';
import {DimensionObject} from '../../../hooks/useDimension';
import {Cursor} from './cursor';

type SliderProps = {
  sharedGesture: SharedGestureObject;
  dimension: DimensionObject;
  cursorDimension: DimensionObject;
};

type SliderRefType = {
  setTranslation: (x: number, y: number) => void;
  getTranslation: () => void;
};

export const AnimatedSlider = React.forwardRef<SliderRefType, SliderProps>(
  ({sharedGesture: sg, ...props}, ref) => {
    useImperativeHandle(ref, () => ({
      setTranslation,
      getTranslation,
    }));

    const setTranslation = (x: number, y: number) => {
      'worklet';
      sg.translation.x.value = x;
      sg.translation.y.value = y;
    };

    const getTranslation = () => ({
      x: sg.translation.x.value,
      y: sg.translation.y.value,
    });

    return <SliderComponent sharedGesture={sg} {...props} />;
  },
);

export const SliderComponent: React.FC<SliderProps> = ({
  dimension,
  cursorDimension,
  sharedGesture,
}) => {
  return (
    <View
      style={[
        dimension,
        {
          backgroundColor: 'transparent',
          borderColor: 'black',
          borderRadius: 10,
          borderWidth: 1,
        },
      ]}>
      <Cursor sharedGesture={sharedGesture} dimension={cursorDimension} />
    </View>
  );
};
