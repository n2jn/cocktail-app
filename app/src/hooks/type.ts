import {SharedValue} from 'react-native-reanimated';

export type SharedGestureObject = {
  isGestureBeingUsed: SharedValue<boolean>;
  isGestureEnabled: SharedValue<boolean>;
  id: number;
  translation: {x: SharedValue<number>; y: SharedValue<number>};
};

export type SharedGesturesArray = Array<SharedGestureObject>;
