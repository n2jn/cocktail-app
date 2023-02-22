import {useSharedValue} from 'react-native-reanimated';
import {AnimatedDimensionObject} from './type';

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
