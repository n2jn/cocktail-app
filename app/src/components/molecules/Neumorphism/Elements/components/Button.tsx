import type {SkiaValue} from '@shopify/react-native-skia';
import {
  FitBox,
  rect,
  rrect,
  Box,
  BoxShadow,
  useComputedValue,
  mix,
} from '@shopify/react-native-skia';
import type {ReactNode} from 'react';
import React from 'react';

import {Theme} from './Theme';

const border = rrect(rect(0, 0, 24, 24), 5, 5);
const container = rrect(rect(1, 1, 22, 22), 5, 5);

interface ButtonProps {
  x: number;
  y: number;
  width: number;
  height: number;
  pressed: SkiaValue<number>;
  children: ReactNode | ReactNode[];
}

export const Button = ({
  x,
  y,
  width,
  height,
  pressed,
  children,
}: ButtonProps) => {
  const c1 = useComputedValue(() => {
    console.log('pressed changed', pressed.current);
    return `rgba(117,113,113, ${mix(pressed.current, 0, 0.7)})`;
  }, [pressed]);
  const c2 = useComputedValue(
    () => `rgba(159,153,153, ${mix(pressed.current, 0, 0.5)})`,
    [pressed],
  );

  return (
    <FitBox src={rect(0, 0, width, height)} dst={rect(x, y, width, height)}>
      <Box
        box={rrect(rect(0, 0, width, height), 5, 5)}
        color={'rgba(138, 133, 133, 1)'}>
        <BoxShadow dx={-1} dy={-1} blur={0} color="rgba(117,113,113, 0.7)" />
        <BoxShadow dx={1.5} dy={1.5} blur={0} color="rgba(159,153,153, 0.6)" />
      </Box>
      <Box
        box={rrect(rect(1, 1, width - 2, height - 2), 100, 100)}
        color={'rgba(138, 133, 133, 1)'}>
        <BoxShadow dx={-1} dy={-1} blur={0} color={c1} inner />
        <BoxShadow dx={1.5} dy={1.5} blur={0} color={c2} inner />
      </Box>
      {children}
    </FitBox>
  );
};
