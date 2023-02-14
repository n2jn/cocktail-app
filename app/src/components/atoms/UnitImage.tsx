import {Image, ImageProps} from 'react-native';

type UnitImageProps = ImageProps & {
  image: string;
};

const UnitImage: React.FC<UnitImageProps> = ({image, ...other}) => {
  return (
    <Image
      resizeMode="cover"
      source={{uri: image}}
      style={{height: '100%', width: '100%'}}
      {...other}
    />
  );
};
export default UnitImage;
