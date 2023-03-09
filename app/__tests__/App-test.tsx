/**
 * @format
 */
import '@testing-library/jest-native/extend-expect';

import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';

import Apps from '../App';
import FavoritePage from '../src/screens/IngredientScreen';

describe('Screen 1', () => {
  it('navigates on button press', () => {
    const push = jest.fn();
    // const {getByText} = render(<FavoritePage navigation={{push}} />);

    // fireEvent.press(getByText('Go to Screen 2'));
    // expect(push).toHaveBeenCalledWith('Screen2');
  });
});
