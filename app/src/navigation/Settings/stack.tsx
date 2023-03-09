import Stack from '~navigation/root.stack';
import {SettingsScreen} from '~screens/SettingsScreen';

export const SettingsStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);
