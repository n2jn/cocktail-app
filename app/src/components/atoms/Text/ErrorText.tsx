import {StyleSheet, Text} from 'react-native';
import gStyles from '~gStyles';

type ErrorTextProps = {
  text: string;
};

export const ErrorText = ({text}: ErrorTextProps) => {
  return <Text style={[gStyles.text.italic12, styles.text]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
  },
});
