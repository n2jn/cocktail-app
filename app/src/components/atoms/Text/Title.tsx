import {Text, TextProps, View} from 'react-native';
import gStyles from '~gStyles';

type TitleProps = TextProps & {
  text: string;
};

const Title = ({text, ...props}: TitleProps) => {
  return (
    <View style={[gStyles.m16]}>
      <Text style={gStyles.text.whiteBold32} {...props}>
        {text}
      </Text>
    </View>
  );
};

export default Title;
