import {TouchableOpacity} from 'react-native';
import {DimensionObject} from '../../../hooks/useDimension';
import ThumbnailImage from '../../atoms/ThumbnaiImage';

export const ProductCard: React.FC<{
  onPress: () => void;
  imageUrl: string;
  dimension: DimensionObject;
}> = ({onPress, imageUrl, dimension}) => {
  return (
    <>
      <TouchableOpacity style={dimension} onPress={onPress}>
        <ThumbnailImage image={imageUrl} />
      </TouchableOpacity>
    </>
  );
};
