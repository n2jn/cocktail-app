import {fireEvent, render, screen} from '@testing-library/react-native';
import {scale} from '~gStyles/size';
import {RoundedImage} from '../RoundedImage';

const renderComponent = () => {
  const image = '';
  const size = 8;

  render(<RoundedImage image={image} size={size} />);
  return {
    image,
    size,
  };
};

describe('Image with error', () => {
  test('Should have placeholder image', async () => {
    const {size} = renderComponent();
    const source = await screen.findByTestId('image');
    fireEvent(source, 'error');
    const scaledSize = scale(size);
    expect(source).toHaveProp('source', {
      uri: `https://dummyimage.com/${scaledSize}x${scaledSize}/000/ffffff.jpg&text=??`,
    });
  });
});
