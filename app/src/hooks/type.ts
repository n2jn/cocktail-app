import {SharedValue} from 'react-native-reanimated';
import {DimensionObject} from './useDimension';

export type DimensionObject = {
  width: number;
  height: number;
  update: (w: number, h: number) => void;
};

export type SharedGestureRefType = {
  setTranslation: (x: number, y: number) => void;
  getContentSize?: () => DimensionObject;
  getGestureType: () => 'StickyPan' | 'onScroll';
  showContent: () => void;
};

export type SharedGestureObject = {
  isGestureBeingUsed: SharedValue<boolean>;
  isGestureEnabled: SharedValue<boolean>;
  id: number;
  translation: {x: SharedValue<number>; y: SharedValue<number>};
};

export type SharedGesturesArray = Array<SharedGestureObject>;

export type AnimatedDimensionObject = {
  width: SharedValue<number>;
  height: SharedValue<number>;
};
