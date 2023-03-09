import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {StackParamList} from './types';

const Stack = createSharedElementStackNavigator<StackParamList>({});

export default Stack;
