import React from 'react';
import HomeScreen from './src/pages/Home.page';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/store';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import DetailsScreen from './src/pages/Details.page';
import {RootStackParamList} from './src/navigation/types';

const Stack = createSharedElementStackNavigator<RootStackParamList>({}, {});

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'hello', headerShown: false}}
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
              console.log('sharedElements', id);
              return [
                {
                  id,
                },
              ];
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
