import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useImperativeHandle, useRef} from 'react';
import {
  Image,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Layout,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';
import {clamp, useVector} from 'react-native-redash';
import {SharedElement} from 'react-navigation-shared-element';
import {DimensionObject} from '../../../hooks/useDimension';
import {Drink} from '../../../store/thecocktaildb/type';
import UnitImage from '../../atoms/RoundImage';

type UnitViewProps = {
  unit: Drink;
  onLayout?: (event: LayoutChangeEvent) => void;
  dimension: DimensionObject;
  onPress: () => void;
};

export type UnitViewRef = {
  isVisible: (isVisible: boolean) => void;
};

const UnitView = React.forwardRef<UnitViewRef, UnitViewProps>(
  ({dimension: {width, height}, onLayout, unit, onPress}, ref) => {
    const opacity = useSharedValue(0);

    useImperativeHandle(ref, () => ({
      isVisible: (isVisible: boolean) => {
        'worklet';
        if (isVisible) {
          opacity.value = 1;
          return;
        }
        opacity.value = 0;
      },
    }));

    const animatedRef = useAnimatedRef<Animated.View>();

    const innerHeight = useCallback(() => {
      return height / 2;
    }, [height])(); // should I do that ? useDimension here

    const innerWidth = useCallback(() => {
      return width / 2;
    }, [width])();

    const origin = useVector(
      (width - innerWidth) / 2,
      (height - innerHeight) / 2,
    );
    const translate = useVector(
      (width - innerWidth) / 2,
      (height - innerHeight) / 2,
    );

    const cursor = useVector();

    const gestureHandler =
      useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onStart: _ => {},
        onActive: event => {
          cursor.x.value = origin.x.value + event.translationX;
          cursor.y.value = origin.y.value + event.translationY;

          translate.x.value = clamp(cursor.x.value, 0, width - innerWidth);
          translate.y.value = clamp(cursor.y.value, 0, height - innerHeight);
        },
        onEnd: event => {
          translate.x.value = origin.x.value;
          translate.y.value = origin.y.value;
          cursor.x.value = 0;
          cursor.y.value = 0;
        },
      });

    const UnitSpringConfig: WithSpringConfig = {
      damping: 10, //	How hard the animation decelerates.
      mass: 0.2, // The weight of the spring. Reducing this value makes the animation faster.
      stiffness: 100, //How bouncy the animation is.
      overshootClamping: false, // Whether the animation can bounce over the specified value.
      restDisplacementThreshold: 0.01, //	The displacement below which the spring is considered to be at rest.
      restSpeedThreshold: 2, //	The speed in pixels per second from which the spring is considered to be at rest.
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: withSpring(opacity.value),

        transform: [
          {
            translateX: withSpring(translate.x.value, UnitSpringConfig),
          },
          {
            translateY: withSpring(translate.y.value, UnitSpringConfig),
          },
        ],
      };
    }, [opacity]);

    const containerAnimatedStyle = useAnimatedStyle(
      () => ({
        opacity: withSpring(opacity.value),
        width,
        height,
      }),
      [width, height],
    );

    return (
      <Animated.View
        onLayout={onLayout}
        style={[
          styles.unitContainer,
          {
            left: 0,
            top: 0,
            overflow: 'hidden',
          },
          containerAnimatedStyle,
        ]}>
        {/* <View
          style={[
            styles.debugContainer,
            {
              left: 0,
              top: 0,
              width,
              height,
              bottom: height - innerHeight,
              right: width - innerWidth,
            },
          ]}></View> */}

        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            ref={animatedRef}
            style={[
              styles.subUnitContainer,
              {
                width: innerWidth,
                height: innerHeight,
                left: 0,
                top: 0,
              },
              animatedStyle,
            ]}>
            <TouchableOpacity onPress={() => onPress(unit.idDrink)}>
              <SharedElement id={unit.idDrink}>
                <UnitImage
                  resizeMode="cover"
                  blurRadius={3}
                  image={unit.strDrinkThumb}
                  style={{height: '100%', width: '100%'}}
                />
              </SharedElement>
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  unitContainer: {
    position: 'absolute',
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
  },
  subUnitContainer: {
    position: 'absolute',
    borderRadius: 16,
    borderWidth: 1,
    left: 0,
    top: 0,
    borderColor: 'green',
    justifyContent: 'center',
  },
  debugContainer: {
    position: 'absolute',
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
});

export default UnitView;
