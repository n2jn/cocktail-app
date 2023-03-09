import Stack from '~navigation/root.stack';
import FavoritePage from '~screens/IngredientScreen';

export const IngredientStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Ingredient"
      component={FavoritePage}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);
