import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SettingsStackNavigator} from './Settings/stack';
import {IngredientStackNavigator} from './Ingredient/stack';
import {DrinkStackNavigator} from './Drinks/stack';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name={'Drink-tab'}
      component={DrinkStackNavigator}
      options={{title: 'Drinks', headerShown: false}}
    />
    <Tab.Screen
      name={'Ingredient-tab'}
      component={IngredientStackNavigator}
      options={{title: 'Ingredient', headerShown: false}}
    />
    <Tab.Screen
      name={'Setting-tab'}
      component={SettingsStackNavigator}
      options={{title: 'Settings', headerShown: false}}
    />
  </Tab.Navigator>
);
