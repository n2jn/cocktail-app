import {useState} from 'react';
import {SharedValue, useSharedValue} from 'react-native-reanimated';

export type AnimatedDimensionObject = {
  width: SharedValue<number>;
  height: SharedValue<number>;
};

const useAnimatedDimension = (
  w: number = 0,
  h: number = 0,
): AnimatedDimensionObject => {
  return {
    width: useSharedValue(w),
    height: useSharedValue(h),
  };
};

export default useAnimatedDimension;
