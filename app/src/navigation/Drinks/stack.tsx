import React from 'react';
import Stack from '~navigation/root.stack';
import DetailsScreen from '~screens/DetailsScreen';
import DrinkScreen from '~screens/DrinkScreen';

export const DrinkStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Drink"
      component={DrinkScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Detail"
      component={DetailsScreen}
      options={{
        cardStyle: {backgroundColor: 'transparent'},
        headerShown: false,
        presentation: 'modal',
      }}
      sharedElements={(route, otherRoute, showing) => {
        const {id} = route.params;

        return [
          {
            id,
          },
        ];
      }}
    />
  </Stack.Navigator>
);
