jest.unmock('react-native');
import {TouchableOpacity, View} from 'react-native';

const mockedIcon = View.bind({
  size: NaN,
  name: '',
  disabled: true,
});
export default {Button: mockedIcon};
