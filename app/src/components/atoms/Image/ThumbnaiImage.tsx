import {Image, ImageProps} from 'react-native';
import {useImageProps} from './hooks/useImageProps';

type ThumbnailImageProps = Omit<ImageProps, 'source'> & {
  image: string;
  size?: number;
};

const ThumbnailImage: React.FC<ThumbnailImageProps> = ({
  image,
  size,
  ...other
}) => {
  const {onError, source} = useImageProps(image, size);

  return (
    <Image
      resizeMode="cover"
      source={source}
      onError={onError}
      style={{height: '100%', width: '100%'}}
      {...other}
    />
  );
};
export default ThumbnailImage;
