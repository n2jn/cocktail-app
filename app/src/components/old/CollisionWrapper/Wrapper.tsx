import React, {RefObject, useEffect} from 'react';
import Animated, {
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import Swipe from '../SwipeModal';

type WrapperProps = {
  children: React.ReactNode[];
};

export type ViewPositionObject = {
  [k: string]: {
    x: number;
    y: number;
    width: number;
    height: number;
    id: number;
  };
};

const Wrapper: React.FC<WrapperProps> = props => {
  const positions = useSharedValue<ViewPositionObject>({});

  useEffect(() => {
    if (!positions.value[props.children.length - 1]) {
      positions.value = {
        ...positions.value,
        [props.children.length - 1]: {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          id: props.children.length - 1,
        },
      };
    }
  }, [props.children]);

  useDerivedValue(() => {
    console.log('children', props.children);
    if (_WORKLET) {
      Object.values(positions.value).map((m, i) => {
        console.log(`------- ${i} -------`);
        console.log('p: ', m);
      });
    }
  }, [positions]);

  return (
    <>
      {props.children.map((child, i) => (
        <Swipe positions={positions} viewId={i}>
          {child}
        </Swipe>
      ))}
    </>
  );
};

export default Wrapper;
