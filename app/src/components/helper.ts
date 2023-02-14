import {useEffect, useState} from 'react';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import {useVector, Vector} from 'react-native-redash';
import {SharedGestureObject, SharedGesturesArray} from './types';

/**
 *
 * @param w width of SMALLEST view
 * @param h height of SMALLEST view
 * @param W width of BIGGEST view
 * @param H height of BIGGEST view
 * @returns
 */
export const upScale = (w: number, h: number, W: number, H: number) => {
  'worklet';
  if (!w || !h || !W || !H) {
    return {
      x: 1,
      y: 1,
    };
  }
  return {
    x: W / w,
    y: H / h,
  };
};

/**
 *
 * @param w width of SMALLEST view
 * @param h height of SMALLEST view
 * @param W width of BIGGEST view
 * @param H height of BIGGEST view
 * @returns
 */
export const downScale = (w: number, h: number, W: number, H: number) => {
  'worklet';
  if (!w || !h || !W || !H) {
    return {
      x: 1,
      y: 1,
    };
  }
  return {
    x: w / W,
    y: h / H,
  };
};
