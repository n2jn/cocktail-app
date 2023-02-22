import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useDerivedValue} from 'react-native-reanimated';
import {SharedGestureRefType} from '../../../hooks/type';
import useAnimatedDimension from '../../../hooks/useAnimatedDimension';
import useDimension from '../../../hooks/useDimension';

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

  useDerivedValue(() => {
    console.log('layoutSize', {layoutSizes});
    console.log('contentSize', {contentSizes});
  }, [contentSizes, layoutSizes]);

  useEffect(() => {
    console.log('childRefs', childRefs.length);
    if (childRefs) {
      //childRefs[0].current?.getGestureType();
      childRefs.forEach(({current}, index) => {
        console.log(index, {current});
        // current?.showContent();
        // const type = current?.getGestureType();
        // setGestureType
      });
    }
  }, [childRefs]);

  const onLayout = useCallback(
    (index: number) => (e: LayoutChangeEvent) => {
      const {height: h, width: w} = e.nativeEvent.layout;
      const lHeight = parseInt(h.toFixed(0));
      const lWidth = parseInt(w.toFixed(0));

      layoutSizes[index].height.value = lHeight;
      layoutSizes[index].width.value = lWidth;
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
        <GestureHandler key={index} node={child} />
      )) ?? SharedChildren}
    </>
  );
};
