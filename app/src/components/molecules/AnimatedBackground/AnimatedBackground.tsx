import {StyleSheet, View} from 'react-native';
import {DimensionObject} from '../../../hooks/useDimension';
import FallingAnimation from './OfficeDVDAnimation';

type AnimatedBackgroundProps = {
  viewDimension: DimensionObject;
};

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  viewDimension,
}) => {
  const sizeOfItems = Math.max(viewDimension.width, viewDimension.height) / 9;
  const imageUrl =
    'https://raw.githubusercontent.com/vgvishal538/vgvishal538.github.io/main/H1.png';
  const numberOfItems = Math.floor(viewDimension.width / sizeOfItems / 2);

  return (
    <View pointerEvents="none" style={[viewDimension, styles.container]}>
      {[...Array(numberOfItems)].map((e, i) => (
        <FallingAnimation
          key={i}
          index={i}
          total={numberOfItems}
          size={sizeOfItems}
          imageUrl={imageUrl}
          viewDimension={viewDimension}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'green',
  },
});

export default AnimatedBackground;
