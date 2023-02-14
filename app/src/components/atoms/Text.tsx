import {Text, TextProps} from 'react-native';

type UnitTextProps = TextProps & {
  text: string;
};

const UnitText: React.FC<UnitTextProps> = ({text, ...other}) => {
  return <Text {...other}>{text}</Text>;
};

export default UnitText;
