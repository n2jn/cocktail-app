import React, {
  FC,
  ReactNode,
  RefObject,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  measure,
  runOnJS,
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useHandler,
  useSharedValue,
  withDecay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {withBouncing} from 'react-native-redash';
import Modal from '../modal/modal';
import {ModalProps} from './Modal';
const WITDH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
type ViewType = {
  id: number;
  offsetX: number;
  offsetY: number;
  x: number;
  y: number;
  height: number;
  width: number;
};
type SwipeGestureHandlerProps = {
  //views: SharedValue<Record<number, ViewType>>;
};

// type GestureStateType = {
//   offsetX: number;
//   offsetY: number;
//   x: number;
//   y: number;
// };

const SwipeGestureHandler = React.forwardRef<
  Animated.View,
  React.PropsWithChildren<SwipeGestureHandlerProps>
>((props, ref) => {
  const scale = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({});

  const gBoxStyle = useAnimatedStyle(() => {
    return {};
  });

  const childrens = React.Children.map(props.children, child =>
    React.cloneElement(
      child as React.ReactElement<
        ModalProps,
        string | React.JSXElementConstructor<any>
      >,
      {scale: scale},
    ),
  );

  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          ref={ref}
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: 'red'},
            gBoxStyle,
          ]}>
          {childrens}
        </Animated.View>
      </PanGestureHandler>
    </>
  );
});

const SwipeGestureHandlerZ: React.FC<
  React.PropsWithChildren<SwipeHandlerProps>
> = props => {
  const y = useSharedValue(0);
  const x = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const velocityX = useSharedValue(0);
  const velocityY = useSharedValue(0);
  const actionIsBeingDone = useSharedValue(false);

  const aref = useAnimatedRef<Animated.View>();
  const hasShrinked = useSharedValue<boolean>(false);
  const handlerId = useSharedValue(-1);
  const scale = useDerivedValue(() => {
    if (hasShrinked.value) {
      return 0.2;
    }
    return interpolate(y.value, [0, 10], [1, 0.2], Extrapolate.CLAMP);
  }, [y.value]);

  useAnimatedReaction(
    () => {
      return interpolate(y.value, [0, 10], [1, 0.5], Extrapolate.CLAMP);
    },
    data => {
      // data holds what was returned from the first worklet's execution
      if (translateY.value > 10) {
        hasShrinked.value = true;
        // call js thread
        // runOnJS(props.onClose)();
      }
    },
    [y.value],
  );

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureStateType
  >({
    onStart: (event, ctx) => {
      //  console.log('before', props.views.value);
      const m = measure(aref);

      // props.views.value = {
      //   ...(props.views.value ?? {}),
      //   [event.handlerTag]: {
      //     ...(props.views.value?.[event.handlerTag] ?? {}),
      //     id: event.handlerTag,
      //     offsetY: translateY.value,
      //     offsetX: translateX.value,
      //     x: m.x,
      //     y: m.y,
      //   },
      // };

      handlerId.value = event.handlerTag;

      props.handledId.value = event.handlerTag;
      velocityY.value = event.velocityY;
      velocityX.value = event.velocityX;

      // runOnJS(props.changeHandledId)(event.handlerTag);
      // handlerId.value = event.handlerTag;

      //  console.log(props.views.value);
    },
    onActive: (event, ctx) => {
      translateY.value =
        props.views.value?.[event.handlerTag]?.offsetY + event.translationY;
      translateX.value =
        props.views.value?.[event.handlerTag]?.offsetX + event.translationX;

      const m = measure(aref);

      x.value = m.x;
      y.value = m.y;
      // console.log(props.views.value);

      // props.views.value = {
      //   ...(props.views.value ?? {}),
      //   [event.handlerTag]: {
      //     ...(props.views.value?.[event.handlerTag] ?? {}),
      //     x: event.x,
      //     y: event.y,
      //   },
      // };
    },
    onEnd: (event, ctx) => {
      const m = measure(aref);

      // Actual Bubble
      // console.log('-- M --');
      // console.log('x: ', m.x);
      // console.log('y: ', m.y);

      // other bubbles
      const views = props.views.value || {};

      Object.values(views).map((v, i) => {
        // console.log(`--- View ${v.id} ---`);
        // console.log('x: ', v.x);
        // console.log('y: ', v.y);
        // console.log('offset x: ', v.offsetX);
        // console.log('offset y: ', v.offsetY);
      });

      props.views.value = {
        ...(props.views.value ?? {}),
        [event.handlerTag]: {
          ...(props.views.value?.[event.handlerTag] ?? {}),
          x: m.x,
          y: m.y,
        },
      };

      translateY.value = withBouncing(
        withDecay({
          velocity: event.velocityY,
        }),
        0,
        HEIGHT - m.height,
      );
      translateX.value = withBouncing(
        withDecay({
          velocity: event.velocityX,
        }),
        0,
        WITDH - m.width,
      );

      x.value = withBouncing(
        withDecay({
          velocity: event.velocityX,
          //clamp: [0, WITDH - m.width],
        }),
        0,
        WITDH - m.width,
      );
      y.value = withBouncing(
        withDecay({
          velocity: event.velocityY,
          //clamp: [0, HEIGHT - m.height - 50],
        }),
        0,
        HEIGHT - m.height,
      );

      velocityY.value = event.velocityY;
      velocityX.value = event.velocityX;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    if (props.handledId.value === handlerId.value) {
      console.log('handlerId', props.handledId);
      console.log('HId', handlerId.value);

      Object.values(props.views.value).forEach(view => {
        const isHandlediew = view.id === props.handledId.value;
        //  console.log('isOwnView', isOwnView);

        if (isHandlediew) {
          return;
        }

        const vPosX = view.x;
        const vPosY = view.y;
        // console.log('hello');
        const margin = 50;

        // this view
        const upperY = y.value;
        const bottomY = y.value + margin;
        const middleY = y.value + margin / 2;

        const leftX = x.value;
        const rightX = x.value + margin;
        const middleX = x.value + margin / 2;

        // console.log('Collision: upperY', upperY);
        // console.log('Collision: x.value', x.value);
        // console.log('Collision: y.value', y.value);

        // other view
        console.log(`----- ${view.id} ----`);

        const vUpperY = view.y;
        const vBottomY = view.y + margin;
        const vMiddleY = view.y + margin / 2;

        const vLeftX = view.x;
        const vRightX = view.x + margin;
        const vMiddleX = view.x + margin / 2;

        // check UP for other

        const hasCollisionUp =
          upperY >= vMiddleY &&
          upperY <= vBottomY &&
          middleX >= vLeftX &&
          middleX <= vRightX;

        const hasCollisionBottom =
          vUpperY >= middleY &&
          vUpperY <= bottomY &&
          vMiddleX >= leftX &&
          vMiddleX <= rightX;

        const hasCollisionLeft =
          vRightX <= middleX &&
          vRightX >= leftX &&
          vMiddleY >= upperY &&
          vMiddleY <= bottomY;

        const hasCollisionRight =
          rightX <= vMiddleX &&
          rightX >= vLeftX &&
          middleY >= vUpperY &&
          middleY <= vBottomY;

        // const hasCollisionLeft =
        //   upperY <= vBottomY && x.value >= vLeftX && x.value <= vRightX;
        // console.log('Collision: vBottomY', vBottomY);
        // console.log('Collision: vLeftX', vLeftX);
        // console.log('Collision: vRightX', vRightX);
        // console.log('Collision: x', vPosX);
        // console.log('Collision: y', vPosY);
        const m = measure(aref);

        if (hasCollisionUp && !actionIsBeingDone.value) {
          translateY.value = withBouncing(
            withDecay({
              velocity: -velocityY.value,
              //clamp: [0, HEIGHT - m.height - 50],
            }),
            0,
            HEIGHT - m.height,
          );
          translateX.value = withBouncing(
            withDecay({
              velocity: velocityX.value,
              //clamp: [0, WITDH - m.width],
            }),
            0,
            WITDH - m.width,
          );

          console.log('UP');
          actionIsBeingDone.value = true;
        } else if (hasCollisionBottom && !actionIsBeingDone.value) {
          translateY.value = withBouncing(
            withDecay({
              velocity: -velocityY.value,
              //clamp: [0, HEIGHT - m.height - 50],
            }),
            0,
            HEIGHT - m.height,
          );
          translateX.value = withBouncing(
            withDecay({
              velocity: velocityX.value,
              //clamp: [0, WITDH - m.width],
            }),
            0,
            WITDH - m.width,
          );
          console.log('Bottom');
          actionIsBeingDone.value = true;
        } else if (hasCollisionLeft && !actionIsBeingDone.value) {
          translateY.value = withBouncing(
            withDecay({
              velocity: velocityY.value,
              //clamp: [0, HEIGHT - m.height - 50],
            }),
            0,
            HEIGHT - m.height,
          );
          translateX.value = withBouncing(
            withDecay({
              velocity: -velocityX.value,
              //clamp: [0, WITDH - m.width],
            }),
            0,
            WITDH - m.width,
          );
          console.log('Left');
          actionIsBeingDone.value = true;
        } else if (hasCollisionRight && !actionIsBeingDone.value) {
          translateY.value = withBouncing(
            withDecay({
              velocity: velocityY.value,
              //clamp: [0, HEIGHT - m.height - 50],
            }),
            0,
            HEIGHT - m.height,
          );
          translateX.value = withBouncing(
            withDecay({
              velocity: -velocityX.value,
              //clamp: [0, WITDH - m.width],
            }),
            0,
            WITDH - m.width,
          );
          console.log('Right');
          actionIsBeingDone.value = true;
        } else {
          actionIsBeingDone.value = false;
        }

        // if (upperY >= vBottomY && ) {
        //   console.log('CENTER UP');
        // }

        if (
          x.value.toFixed(0) >= (vPosX - margin).toFixed(0) &&
          x.value.toFixed(0) <= (vPosX + margin).toFixed(0) &&
          y.value.toFixed(0) >= (vPosY - margin).toFixed(0) &&
          y.value.toFixed(0) <= (vPosY + margin).toFixed(0)
        ) {
          // console.log('TOUUUUUUUUUUUUCHEDDEDEDEDE');
          // y.value = withSpring(10);
          // x.value = withSpring(10);
        }
      });
    }

    return {
      // left: x.value,
      // top: y.value,
      height: interpolate(scale.value, [1, 0.2], [HEIGHT, 50]),
      width: interpolate(scale.value, [1, 0.2], [WITDH, 50]),

      transform: [
        // {
        //   scale: withSpring(scale.value),
        // },
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        // {
        //   matrix: Matrix4.translate(x.value, y.value, 0),
        // },
      ],
    };
  }, [scale, x.value, y.value]);

  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          ref={aref}
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: 'red'},
            animatedStyle,
          ]}>
          <Modal scale={scale} close={props.onClose} />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default SwipeGestureHandler;
