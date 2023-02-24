import {SharedValue} from 'react-native-reanimated';
import {DimensionObject} from '../../hooks/type';

export type SharedGestureObject = {
  isGestureBeingUsed: SharedValue<boolean>;
  isGestureEnabled: SharedValue<boolean>;
  id: number;
  translation: {x: SharedValue<number>; y: SharedValue<number>};
};

export type SharedGesturesArray = Array<SharedGestureObject>;

export type SharedRefType = {
  setTranslation: (x: number, y: number) => void;
  getContentSize?: () => DimensionObject;
  getGestureType: () => 'StickyPan' | 'onScroll';
  showContent: () => void;
};
