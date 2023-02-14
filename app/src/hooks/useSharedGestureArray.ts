import {SharedValue, useSharedValue} from 'react-native-reanimated';

export type SharedGestureObject = {
  isGestureBeingUsed: SharedValue<boolean>;
  isGestureEnabled: SharedValue<boolean>;
  id: number;
  translation: {x: SharedValue<number>; y: SharedValue<number>};
};

export type SharedGesturesArray = Array<SharedGestureObject>;

export const useSharedGestureArray = (
  numObject: number = 2,
): SharedGesturesArray => {
  return [...Array(numObject)].map((_, i) => ({
    id: i,
    isGestureBeingUsed: useSharedValue(false),
    isGestureEnabled: useSharedValue(true),
    translation: {
      x: useSharedValue(0),
      y: useSharedValue(0),
    },
  }));
};
