import React, {useEffect, useMemo, useRef, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {SharedGestureRefType} from '../../../hooks/type';

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

  const [childTypes, setChildTypes] = useState([]);

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

  useEffect(() => {
    console.log('childRefs', childRefs.length);
    if (childRefs) {
      //childRefs[0].current?.getGestureType();
      childRefs.forEach(({current}) => {
        // current?.showContent();
        // const type = current?.getGestureType();
        // setGestureType
      });
      // console.log(childRefs[0].current?.getGestureType());
      // console.log(childRefs[1].current?.getGestureType());
    }
  }, [childRefs]);

  const SharedChildren = useMemo(
    () =>
      React.Children.map(children, (child, index) =>
        React.cloneElement(
          child as React.ReactElement<
            any,
            string | React.JSXElementConstructor<any>
          >,
          {
            ref: n => {
              console.log('n', n?.getGestureType());
              childRefs[index].current = n;
            },
            onLayout: (e: LayoutChangeEvent) =>
              console.log('layout', {layout: e}),
            onContentSizeChange: (w: number, h: number) =>
              console.log('onContentSizeChange', {w, h}),
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
