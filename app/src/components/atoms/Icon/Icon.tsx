import {View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {IconButtonProps as FeatherIconButtonProps} from 'react-native-vector-icons/Icon';
import {scale} from '~gStyles/size';

type AcceptableIconSize = 8 | 16 | 24 | 32 | 64;

type IconProps = Omit<FeatherIconButtonProps, 'size'> & {
  size: AcceptableIconSize;
};

export const Icon = ({size, onPress, ...iconprops}: IconProps) => {
  return (
    <FeatherIcon.Button
      disabled={!onPress}
      onPress={onPress}
      size={scale(size)}
      {...iconprops}
    />
  );
};
