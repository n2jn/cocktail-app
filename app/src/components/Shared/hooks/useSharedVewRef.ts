import {Ref, useImperativeHandle, useRef} from 'react';
import {SharedRefType} from '../type';

export const useSharedViewRef = <T extends unknown>(
  ref: Ref<SharedRefType>,
  customRefFunction?: Partial<SharedRefType>,
) => {
  const viewRef = useRef<T>(null);

  useImperativeHandle(ref, () => ({
    setTranslation: () => {},
    getGestureType: () => 'StickyPan',
    showContent: () => {},
    ...(customRefFunction ?? {}),
  }));

  return viewRef;
};
