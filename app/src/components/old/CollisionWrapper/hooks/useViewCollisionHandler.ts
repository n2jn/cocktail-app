import {RefObject, useCallback, useEffect} from 'react';
import Animated, {
  makeMutable,
  measure,
  runOnUI,
  SharedValue,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {Vector} from 'react-native-redash';
import useViewLayoutPositions from './useViewLayoutPositions';

export type ViewCollisionHandler = {
  handleCollisionUp: (
    refId: number,
    self: Vector<Animated.SharedValue<number>>,
    other?: Vector<Animated.SharedValue<number>>,
  ) => void;
};

type RefsAndCollision = {
  collisionViews: CollisionViewObject;
  collisionHandler: ViewCollisionHandler;
};

type CollisionViewObject = {
  [z: number]: {
    x: number;
    y: number;
  };
};

const useViewCollisionHandler = (): RefsAndCollision => {
  // const collisionViews = useDerivedValue<CollisionViewObject>(() => {
  //   return {
  //     0: {
  //       x: 0,
  //       y: 0,
  //     },
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log('collisionViews', collisionViews);
  // }, [collisionViews]);

  // const sharedRef = useDerivedValue<RefObject<Animated.View>[]>(() => {
  //   return refs;
  // }, [refs]);

  // useEffect(() => {
  //   refs.value.map(mRef => {
  //     if (mRef.current) {
  //       console.log('initislized', mRef.current);
  //     }
  //   });
  // }, [refs]);

  // const collisionViews = useViewLayoutPositions();

  const collisionPoints = (
    {x, y}: Vector<Animated.SharedValue<number>>,
    margin: number,
  ) => ({
    up: y.value,
    bottom: y.value + margin,
    centerY: y.value + margin / 2,
    left: x.value,
    right: x.value + margin,
    centerX: x.value + margin / 2,
  });

  const hasCollisionUp = (
    self: Vector<Animated.SharedValue<number>>,
    other: Vector<Animated.SharedValue<number>>,
  ) => {
    const S = collisionPoints(self, 50);
    const O = collisionPoints(other, 50);

    return (
      S.up >= O.centerY &&
      S.up <= O.bottom &&
      S.centerX >= O.left &&
      S.centerX <= O.right
    );
  };

  const hasCollisionBottom = (
    self: Vector<Animated.SharedValue<number>>,
    other: Vector<Animated.SharedValue<number>>,
  ) => {
    const S = collisionPoints(self, 50);
    const O = collisionPoints(other, 50);

    return (
      O.up >= S.centerY &&
      O.centerY <= S.bottom &&
      O.centerX >= S.left &&
      O.centerX <= S.right
    );
  };

  const hasCollisionLeft = (
    self: Vector<Animated.SharedValue<number>>,
    other: Vector<Animated.SharedValue<number>>,
  ) => {
    const S = collisionPoints(self, 50);
    const O = collisionPoints(other, 50);

    return (
      O.right <= S.centerX &&
      O.centerX >= S.left &&
      O.centerY >= S.up &&
      O.centerY <= S.bottom
    );
  };

  const hasCollisionRight = (
    self: Vector<Animated.SharedValue<number>>,
    other: Vector<Animated.SharedValue<number>>,
  ) => {
    const S = collisionPoints(self, 50);
    const O = collisionPoints(other, 50);

    return (
      S.right <= O.centerX &&
      S.right >= O.left &&
      S.centerY >= O.up &&
      S.centerY <= O.bottom
    );
  };

  // const hasCollisionRight =
  //   rightX <= vMiddleX &&
  //   rightX >= vLeftX &&
  //   middleY >= vUpperY &&
  //   middleY <= vBottomY;

  const gg = (ref: RefObject<Animated.View>) => {
    'worklet';
    if (!ref.current) {
      console.log('empty');
      return;
    }

    const m = measure(ref);
    console.log('m', m);
  };

  const handleCollisionUp = useCallback(
    (
      refId: number,
      self: Vector<Animated.SharedValue<number>>,
      other?: Vector<Animated.SharedValue<number>>,
    ) => {
      // console.log('toto', refs.find(r => refId === r())?.current);
      // collisionViews.value[0].x = self.x.value;
      // refs.forEach(ref => {
      //   console.log('current', ref.current);
      //   runOnUI(gg)(ref);
      // });
      // if (other) {
      //   refs[refId];
      // }
    },
    [],
  );

  return {
    collisionViews: {},
    collisionHandler: {
      handleCollisionUp,
    },
  };
};

export default useViewCollisionHandler;
