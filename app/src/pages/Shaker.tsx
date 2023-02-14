import Animated, {SharedValue} from 'react-native-reanimated';
import {Circle, G, Path, Polygon, Svg, Text} from 'react-native-svg';
import ShakerSvg from './shaker.svg';
type ShakerProps = {
  //scale: SharedValue<number>;
};

const Shaker = () => {
  return (
    <Animated.View
      style={{
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
      }}>
      <ShakerSvg width={'100%'} height={'100%'} />
    </Animated.View>
  );
};

export default Shaker;
