import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import gStyles from '~gStyles';

type AcceptedButtonType =
  | 'error'
  | 'success'
  | 'warning'
  | 'disabled'
  | 'default';

type ButtonProps = TouchableOpacityProps & {
  text: string;
  type?: AcceptedButtonType;
  isDisabled?: boolean;
};

export const Button = ({
  text,
  type = 'default',
  isDisabled,
  ...buttonProps
}: ButtonProps) => {
  const buttonStyle = buttonTypeStyles[type];
  const textStyle = textTypeStyles[type];

  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[gStyles.pv8, gStyles.mh16, styles.container, buttonStyle]}
      {...buttonProps}>
      <Text style={[styles.text, gStyles.text.bold16, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const buttonTypeStyles = StyleSheet.create({
  disabled: {
    backgroundColor: 'grey',
  },
  error: {
    backgroundColor: 'red',
  },
  warning: {
    backgroundColor: 'orange',
  },
  success: {
    backgroundColor: 'green',
  },
  default: {
    backgroundColor: 'black',
  },
});

const textTypeStyles = StyleSheet.create({
  disabled: {},
  error: {},
  warning: {},
  success: {},
  default: {},
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
