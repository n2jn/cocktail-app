import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useDerivedValue, useSharedValue} from 'react-native-reanimated';
import {SharedGestureRefType} from '../../hooks/type';
import useAnimatedDimension from '../../hooks/useAnimatedDimension';
import useDimension from '../../hooks/useDimension';
import {scale} from '../helper';
import {useSharedGestureArray} from './hooks/useSharedGestureArray';

const Pan = Gesture.Pan().onChange(e => console.log(e));

type GestureHandlerProps = {
  node: React.ReactNode;
  key: number;
};

const GestureHandler = ({node}: GestureHandlerProps) => {
  return <GestureDetector gesture={Gesture.Race(Pan)}>{node}</GestureDetector>;
};

// rename
export const SharedWrapper = ({children}: {children: React.ReactNode[]}) => {
  const childRefs = new Array(children.length)
    .fill(0)
    .map(() => useRef<SharedGestureRefType>(null));

  const layoutSizes = new Array(children.length)
    .fill(0)
    .map(() => useAnimatedDimension());

  const contentSizes = new Array(children.length)
    .fill(0)
    .map(() => useAnimatedDimension());

  // const layoutSize = useAnimatedDimension();
  // const contentSize = useAnimatedDimension();

  //const gesture = getGestureHandlerByType('scroll');

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

  // const ViewScalesByContent = useScaleByContent();

  /**
   * Gesture handler
   */

  // const scaleUp = useDerivedValue(
  //   () => scale(listDimension, contentDimension),
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

  // useDerivedValue(() => {
  //   console.log('layoutSize', {layoutSizes});
  //   console.log('contentSize', {contentSizes});

  //   // make a list of the biggest to the lowest sizes
  //   if (contentSizes) {
  //   }

  //   if (layoutSizes) {
  //   }

  //   if (childRefs) {
  //     childRefs.forEach(({current}, index) => {
  //       console.log(index, {current});
  //       // check if
  //     });
  //   }
  // }, [contentSizes, layoutSizes, childRefs]);

  const sharedGestureArray = useSharedGestureArray(children.length);
  const indexedBySize = new Array(children.length)
    .fill(0)
    .map((_, index) => index);

  useDerivedValue(() => {
    sharedGestureArray.forEach(
      (sg, sIndex) => {
        //  console.log('sharedGestureArray', sharedGestureArray);
        if (sg.isGestureBeingUsed.value) {
          const scaleIndex = indexedBySize?.findIndex(v => v === sIndex);
          console.log('scaleIndex', scaleIndex);

          childRefs.forEach((ref, cIndex) => {
            if (cIndex < scaleIndex) {
              const s = scale(contentSizes[sIndex], layoutSizes[cIndex]);
              ref.current?.setTranslation(
                sg.translation.x.value * s.x,
                sg.translation.y.value * s.y,
              );
            } else if (cIndex > scaleIndex) {
              const s = scale(layoutSizes[cIndex], contentSizes[sIndex]);
              ref.current?.setTranslation(
                sg.translation.x.value * s.x,
                sg.translation.y.value * s.y,
              );
            }
          });
          // upadate other childs
          // based on indexedBySize
        }
      },
      [indexedBySize, sharedGestureArray],
    );
    // if (sgList.isGestureBeingUsed.value) {
    //   mRef.current?.setTranslation(
    //     sgList.translation.x.value * scaleDown.value.x,
    //     sgList.translation.y.value * scaleDown.value.y,
    //   );
    //   // console.log('list upatae', sgList.translation);
    // }
  }, [sharedGestureArray]);

  useDerivedValue(() => {
    indexedBySize.sort(
      (a, b) => layoutSizes[b].height.value - layoutSizes[a].height.value,
    );
  }, [layoutSizes]);

  const onLayout = useCallback(
    (index: number) => (e: LayoutChangeEvent) => {
      const {height: h, width: w} = e.nativeEvent.layout;
      const lHeight = parseInt(h.toFixed(0));
      const lWidth = parseInt(w.toFixed(0));

      layoutSizes[index].height.value = lHeight;
      layoutSizes[index].width.value = lWidth;
      // make a list of the biggest to the lowest sizes
    },
    [],
  );

  const onContentSizeChange = useCallback(
    (index: number) => (w: number, h: number) => {
      const cHeight = parseInt(h.toFixed(0));
      const cWidth = parseInt(w.toFixed(0));

      contentSizes[index].height.value = cHeight;
      contentSizes[index].width.value = cWidth;
    },
    [],
  );

  const getRef = useCallback(
    (index: number) => (n: SharedGestureRefType) => {
      childRefs[index].current = n;
    },
    [],
  );

  const SharedChildren = useMemo(
    () =>
      React.Children.map(children, (child, index) =>
        React.cloneElement(
          child as React.ReactElement<
            any,
            string | React.JSXElementConstructor<any>
          >,
          {
            ref: getRef(index),
            onLayout: onLayout(index),
            onContentSizeChange: onContentSizeChange(index),
          },
        ),
      ),
    [children],
  );

  return (
    <>
      {SharedChildren?.map((child, index) => (
        <GestureDetector key={index} gesture={Gesture.Race(Pan)}>
          {child}
        </GestureDetector>
      )) ?? SharedChildren}
    </>
  );
};
