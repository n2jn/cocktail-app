import {render, screen} from '@testing-library/react-native';
jest.mock('react-native-gesture-handler');
import DrinkScreen from '~screens/DrinkScreen';
import {createMockServer} from '../../mocks/server';

describe('Home page with Mocked calls', () => {
  createMockServer([
    {
      method: 'get',
      path: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php',
      res: (req, res, ctx) => {
        return [
          {
            id: 'testID',
            idDrink: 'testID',
            strDrink: 'Test Drink',
          },
        ];
      },
    },
  ]);

  const renderComponent = () => {
    render(<DrinkScreen />);
    return {};
  };

  test('Should render a list with one element', async () => {
    renderComponent();
    // wait for data to load
    const list = await screen.findByTestId('product.flatlist');
    expect(list).toBeDefined();
    expect(list.children.length).toBe(1);
  });
});
describe('Home Tests', () => {});
