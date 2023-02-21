import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {useDerivedValue} from 'react-native-reanimated';
import {SharedGestureRef} from '../../../old/Unit/types';
import {downScale} from '../../helper';

export const SharedWrapper = ({children}: {children: React.ReactNode[]}) => {
  const childRefs = new Array(children.length)
    .fill(0)
    .map(() => useRef<SharedGestureRef>(null));

  // const scaleDown = useDerivedValue(
  //   () =>
  //     downScale(
  //       mapDimension?.width ?? 0,
  //       mapDimension?.height ?? 0,
  //       contentDimension.x.value,
  //       contentDimension.y.value,
  //     ),
  //   [contentDimension, mapDimension],
  // );

  // const scaleUp = useDerivedValue(
  //   () =>
  //     upScale(
  //       listDimension.width,
  //       listDimension.height,
  //       contentDimension.x.value,
  //       contentDimension.y.value,
  //     ),
  //   [contentDimension, listDimension],
  // );

  // useDerivedValue(() => {
  //   if (sgList.isGestureBeingUsed.value) {
  //     mRef.current?.setTranslation(
  //       sgList.translation.x.value * scaleDown.value.x,
  //       sgList.translation.y.value * scaleDown.value.y,
  //     );
  //     // console.log('list upatae', sgList.translation);
  //   }
  // }, [sgList.translation, sgList.isGestureBeingUsed, mRef]);

  // useDerivedValue(() => {
  //   if (sgMap.isGestureBeingUsed.value) {
  //     lRef.current?.setTranslation(
  //       sgMap.translation.x.value * scaleUp.value.x,
  //       sgMap.translation.y.value * scaleUp.value.y,
  //     );
  //     // console.log('map update', sgMap.translation);
  //   }
  // }, [sgMap.translation, sgMap.translation, lRef]);

  console.log('childRefs', childRefs);

  useEffect(() => {
    console.log('childRefs', childRefs.length);
    //  console.log('childRefs', childRefs[0].current?.onLayout());
  }, [childRefs]);

  const SharedChildren = useMemo(
    () =>
      React.Children.map(
        children,
        (child, index) =>
          React.cloneElement(
            child as React.ReactElement<
              any,
              string | React.JSXElementConstructor<any>
            >,
            {
              ref: n => {
                childRefs[index].current = n;
              },
              onLayout: (e: LayoutChangeEvent) =>
                console.log('layout', {layout: e}),
              onContentSizeChange: (w: number, h: number) =>
                console.log('layout', {w, h}),
            },
          ), // bridgeEvent
      ),
    [children],
  );

  return SharedChildren;
};
