import {Button} from '../button';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react-native';

describe('basic test', () => {
  test('Button renders correctly', () => {
    render(<Button text={''} />);
    expect(screen).toMatchSnapshot();
  });
});

describe('type tests', () => {
  test('Should render warning type correctly', () => {
    const tree = renderer
      .create(<Button type={'warning'} text={''} />)
      .toJSON();
    expect(tree).toHaveStyle({backgroundColor: 'orange'});
  });

  test('Should render error type correctly', () => {
    const tree = renderer.create(<Button type={'error'} text={''} />).toJSON();
    expect(tree).toHaveStyle({backgroundColor: 'red'});
  });

  test('Should render success type correctly', () => {
    const tree = renderer
      .create(<Button text={''} type={'success'} />)
      .toJSON();
    expect(tree).toHaveStyle({backgroundColor: 'green'});
  });
});
