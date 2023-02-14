import {Image, ImageProps} from 'react-native';

type ThumbnailImageProps = ImageProps & {
  image: string;
};

const ThumbnailImage: React.FC<ThumbnailImageProps> = ({image, ...other}) => {
  return (
    <Image
      resizeMode="cover"
      source={{uri: image}}
      style={{height: '100%', width: '100%'}}
      {...other}
    />
  );
};
export default ThumbnailImage;
