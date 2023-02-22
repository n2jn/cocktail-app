import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {DimensionObject} from '../../../hooks/type';
import ThumbnailImage from '../../atoms/ThumbnaiImage';

export const ProductCard: React.FC<{
  onPress: () => void;
  imageUrl: string;
  dimension: DimensionObject;
}> = ({onPress, imageUrl, dimension}) => {
  return (
    <>
      <View style={[dimension, styles.container]}>
        <TouchableOpacity onPress={onPress}>
          <ThumbnailImage image={imageUrl} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderRadius: 40,
    borderWidth: 1,
    overflow: 'hidden',
  },
});
