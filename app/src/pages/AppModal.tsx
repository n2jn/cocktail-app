import {Dimensions, StyleSheet, View} from 'react-native';
import {Drink} from '../store/thecocktaildb/type';
import {
  BackdropBlur,
  BlurMask,
  Canvas,
  Circle,
  Fill,
  Group,
  Image,
  ImageShader,
  interpolate,
  Mask,
  Rect,
  rect,
  rrect,
  runDecay,
  Skia,
  TileMode,
  useClockValue,
  useComputedValue,
  useImage,
  useTouchHandler,
  useValue,
} from '@shopify/react-native-skia';
import GestureHandler from '../components/GestureHandler/GestureHandler';
import {useHeaderHeight} from '@react-navigation/elements';
import {Matrix4, multiply4, toMatrix3} from 'react-native-redash';
import {useSharedValue} from 'react-native-reanimated';

const WITDH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const interval = 3000;

type AppModalProps = {
  close: (id: number) => void;
  modals: {isOpen: Boolean; data: Drink; id: number}[];
};

type ViewType = {
  id: number;
  offsetX: number;
  offsetY: number;
  x: number;
  y: number;
  height: number;
  width: number;
};
const AppModal: React.FC<AppModalProps> = props => {
  // const tap = Gesture.Tap().onStart(() => {
  //   console.log('tap');
  // });
  const headerHeight = useHeaderHeight();

  const modaMatrix = useValue(Skia.Matrix());

  const cx = useValue(100);
  const cy = useValue(100);

  // const rct = useComputedValue(() => {
  //   console.log('size', size);
  //   return rect(0, 0, size.current.width, size.current.height / 2);
  // }, [size]);

  const image = useImage(props.modals[0]?.data.strDrinkThumb);
  // const matrix = useSharedValue(identity4);

  // const touchHandler = useTouchHandler({
  //   onActive: ({x, y}) => {
  //     // cx.current = x;
  //     // cy.current = y;
  //     modaMatrix.current =
  //     // multiply4(
  //     //   Matrix4.translate(e.changeX, e.changeY, 0),
  //     //   matrix.value,
  //     // );
  //   },
  //   onEnd: ({velocityX, velocityY}) => {
  //     // runDecay(cx);
  //     //    runDecay(cy);
  //   },
  // });

  // const clock = useClockValue();
  if (!image) {
    return null;
  }
  const size = 256;
  const padding = 32;
  const r = 8;
  const roundedRect = rrect(
    rect(0, headerHeight, size - padding * 2, size - padding * 2),
    r,
    r,
  );

  return (
    <>
      <Canvas style={{width: WITDH, height: HEIGHT}}>
        <Group clip={roundedRect} matrix={modaMatrix} color={'red'}>
          <Image image={image} width={size} height={size} fit="cover" />
        </Group>
      </Canvas>
      <GestureHandler
        debug
        matrix={modaMatrix}
        dimensions={rect(
          0,
          headerHeight,
          size - padding * 2,
          size - padding * 2,
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    backgroundColor: 'white',

    height: HEIGHT,
    width: WITDH,
    left: 0,
    top: 0,
  },
});

export default AppModal;
