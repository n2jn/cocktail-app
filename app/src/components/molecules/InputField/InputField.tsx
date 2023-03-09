import {TextInputProps, View} from 'react-native';
import {TextInput} from '~components/atoms/Input/TextInput';
import {ErrorText} from '~components/atoms/Text/ErrorText';
import {Label} from '~components/atoms/Text/Label';
import gStyles from '~gStyles';

type InputFieldType = TextInputProps & {
  label: string;
  errorMessage?: string;
};

export const InputField = ({
  label,
  errorMessage,
  ...inputProps
}: InputFieldType) => {
  return (
    <View style={[gStyles.mh8, gStyles.mv8]}>
      <Label text={label} />
      <TextInput {...inputProps} />
      {!!errorMessage && <ErrorText text={errorMessage} />}
    </View>
  );
};
