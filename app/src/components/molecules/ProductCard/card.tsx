import {TouchableOpacity} from 'react-native';
import ThumbnailImage from '../../atoms/ThumbnaiImage';

export const ProductCard: React.FC<{
  onPress: () => void;
  imageUrl: string;
}> = ({onPress, imageUrl}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <ThumbnailImage image={imageUrl} />
      </TouchableOpacity>
    </>
  );
};
