import {Text} from 'react-native';
import {Icon} from '~components/atoms/Icon';
import {SectionObject} from '~components/type';

export const CardSection: React.FC<{
  dataToDisplay: SectionObject;
}> = ({dataToDisplay: {text, icon, onPress}}) => {
  return (
    <>
      {!!icon && (
        <Icon
          name={icon}
          size={16}
          backgroundColor={'transparent'}
          iconStyle={{marginRight: 0}}
          disabled={!onPress}
          onPress={onPress}
        />
      )}
      {!!text && <Text style={{color: 'white'}}>{text}</Text>}
    </>
  );
};
