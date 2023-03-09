import {useCallback, useState} from 'react';
import {
  StyleSheet,
  TextInput as Input,
  View,
  TextInputProps as InputProps,
} from 'react-native';
import gStyles from '~gStyles';

type TextInputProps = InputProps & {};

export const TextInput = (inputProps: TextInputProps) => {
  const [text, setText] = useState<string>('');

  const onChangeText = useCallback((text: string) => {
    setText(text);
  }, []);

  return (
    <View style={[gStyles.pv8, gStyles.ph8, styles.container]}>
      <Input
        {...inputProps}
        value={text}
        onChangeText={onChangeText}
        placeholder={'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
});
