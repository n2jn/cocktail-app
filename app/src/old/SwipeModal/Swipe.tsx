import React, {RefObject, useEffect} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  measure,
  runOnJS,
  runOnUI,
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import {
  isTranslateX,
  useVector,
  Vector,
  withBouncing,
} from 'react-native-redash';
import {ViewPositionObject} from '../CollisionWrapper/Wrapper';
import {ModalProps} from './Modal';

const WITDH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

type SwipeProps = {
  positions: SharedValue<ViewPositionObject>;
  viewId: number;
  //dimension: Vector<Animated.SharedValue<number>>;
};

const Swipe: React.FC<React.PropsWithChildren<SwipeProps>> = props => {
  const gRef = useAnimatedRef<Animated.View>();
  const velocity = useVector();
  const offset = useVector();

  const translation = useVector();

  /** REF DIMENSIONS */
  const posOffset = useVector();

  useDerivedValue(() => {
    // const m = measure(gRef);
    if (_WORKLET) {
      // bof
      if (
        posOffset.x.value !== translation.x.value ||
        posOffset.y.value !== translation.y.value
      ) {
        const viewPosition = props.positions.value[props.viewId];
        console.log('viewposition', viewPosition);
        console.log('viewId', translation);
        console.log('positions', props.positions.value);

        const m = measure(gRef);
        console.log('m', m);

        /** update position of view for parent */
        props.positions.value = {
          ...props.positions.value,
          [props.viewId]: {
            ...m,
            id: props.viewId,
          },
        };

        posOffset.x.value = translation.x.value;
        posOffset.y.value = translation.y.value;
      }

      //}
    }
  }, [translation]);

  /** SCALE */

  const hasShrinked = useSharedValue<boolean>(false);
  // scale of the view, changes height and width
  const scale = useDerivedValue(() => {
    if (hasShrinked.value) {
      return 0.2;
    }
    return interpolate(
      translation.y.value,
      [0, 10],
      [1, 0.2],
      Extrapolate.CLAMP,
    );
  }, [translation.y.value]);

  useAnimatedReaction(
    () => {
      return interpolate(
        translation.y.value,
        [0, 10],
        [1, 0.5],
        Extrapolate.CLAMP,
      );
    },
    data => {
      if (translation.y.value > 10) {
        hasShrinked.value = true;
        // call js thread
        // runOnJS(props.onClose)();
      }
    },
    [translation.y.value],
  );

  /** GESTURE HANDLER */

  const gestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>(
      {
        onStart: event => {
          offset.x.value = translation.x.value ?? 0;
          offset.y.value = translation.y.value ?? 0;
        },
        onActive: event => {
          translation.y.value = offset.y.value + event.translationY;
          translation.x.value = offset.x.value + event.translationX;
        },
        onEnd: event => {
          const m = measure(gRef);

          translation.y.value = withBouncing(
            withDecay({
              velocity: event.velocityY,
            }),
            0,
            HEIGHT - m.height,
          );
          translation.x.value = withBouncing(
            withDecay({
              velocity: event.velocityX,
            }),
            0,
            WITDH - m.width,
          );
        },
      },
      [],
    );

  /** ANIMATED STYLE */

  const gBoxStyle = useAnimatedStyle(() => {
    // get measurements when translation is moving
    return {
      height: interpolate(scale.value, [1, 0.2], [HEIGHT, 50]),
      width: interpolate(scale.value, [1, 0.2], [WITDH, 50]),

      transform: [
        {
          translateX: translation.x.value,
        },
        {
          translateY: translation.y.value,
        },
      ],
    };
  }, []);

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
          ref={gRef}
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
};

export default Swipe;
