import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ThumbnailImage from '../../atoms/Image/ThumbnaiImage';
import {CARD_HEIGHT, CARD_WIDTH} from './model';
import {SectionProps} from '../../type';
import {CardSection} from './section';
import ViewGrid from '~components/atoms/ViewGrid';

type ProductCardProps = SectionProps & {
  id: string;
  onPress: () => void;
  backgroundImage: string | null;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  onPress,
  backgroundImage,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}) => {
  return (
    <View testID={`product.card.${id}`} style={styles.container}>
      {!!backgroundImage && (
        <TouchableOpacity onPress={onPress}>
          <ThumbnailImage image={backgroundImage} />
        </TouchableOpacity>
      )}

      {!!topLeft && (
        <ViewGrid.Absolute position="topLeft">
          <CardSection dataToDisplay={topLeft} />
        </ViewGrid.Absolute>
      )}

      {!!topRight && (
        <ViewGrid.Absolute position="topRight">
          <CardSection dataToDisplay={topRight} />
        </ViewGrid.Absolute>
      )}

      {!!bottomLeft && (
        <ViewGrid.Absolute position="bottomLeft">
          <CardSection dataToDisplay={bottomLeft} />
        </ViewGrid.Absolute>
      )}

      {!!bottomRight && (
        <ViewGrid.Absolute position="bottomRight">
          <CardSection dataToDisplay={bottomRight} />
        </ViewGrid.Absolute>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderRadius: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    flex: 1,
    margin: 10,
    overflow: 'hidden',
  },
});
