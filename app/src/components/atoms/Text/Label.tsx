import {Text, TextProps} from 'react-native';
import gStyles from '~gStyles';

type LabelProps = TextProps & {
  text: string;
};

export const Label: React.FC<LabelProps> = ({text, ...textProps}) => {
  return <Text style={gStyles.text.bold16}>{text}</Text>;
};
