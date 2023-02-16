import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useEvent,
  useHandler,
  withSpring,
} from 'react-native-reanimated';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {withBouncing} from 'react-native-redash';
import {Polygon, Svg, SvgUri, SvgXml} from 'react-native-svg';

const WITDH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

export type ModalProps = {
  scale?: SharedValue<number>;
  // close: (id: number) => void;
};

const SwipeModalScreen: React.FC<ModalProps> = props => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(
        interpolate(props.scale?.value || 1, [1, 0.2], [HEIGHT, 50]),
      ),
      width: withSpring(
        interpolate(props.scale?.value || 1, [1, 0.2], [WITDH, 50]),
      ),

      borderRadius: interpolate(
        props.scale?.value || 1,
        [1, 0.2],
        [0, 50],
        Extrapolate.CLAMP,
      ),
      justifyContent: 'center',
      alignItems: 'center',
      aspectRatio: 1,
    };
  }, []);

  return (
    <Animated.View style={[styles.modal, animatedStyle]}>
      {/* <SVGImg width={'100%'} height={'100%'} /> */}

      {/* <SvgUri
        width="100%"
        height="100%"
        uri="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/debian.svg"
      /> */}
    </Animated.View>
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

export default SwipeModalScreen;
