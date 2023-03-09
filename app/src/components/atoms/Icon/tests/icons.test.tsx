import renderer from 'react-test-renderer';
import {Icon} from '../Icon';

jest.mock('react-native-vector-icons/Feather');
test('Should render correctly', () => {
  const tree = renderer.create(<Icon size={16} name={''} />).toJSON();
  expect(tree).toMatchSnapshot();
});
