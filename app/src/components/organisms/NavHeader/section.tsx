import {Text, TouchableOpacity} from 'react-native';
import {Icon} from '~components/atoms/Icon';
import {RoundedImage} from '~components/atoms/Image/RoundedImage';
import {SectionObject} from '~components/type';

export const HeaderSection: React.FC<{
  dataToDisplay: SectionObject;
}> = ({dataToDisplay: {text, icon, onPress, image}}) => {
  return (
    <>
      {!!icon && (
        <Icon
          name={icon}
          size={24}
          backgroundColor={'transparent'}
          iconStyle={{marginRight: 0}}
          disabled={!onPress}
          onPress={onPress}
        />
      )}

      {!!image && (
        <TouchableOpacity onPress={onPress}>
          <RoundedImage image={image} size={32} />
        </TouchableOpacity>
      )}
      {!!text && (
        <Text
          style={{color: 'white', textAlign: 'center', alignSelf: 'center'}}>
          {text}
        </Text>
      )}
    </>
  );
};
