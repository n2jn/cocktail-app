import {StyleSheet, TouchableOpacity} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {Drink} from '../../../store/thecocktaildb/type';
import ThumbnailImage from '../../atoms/ThumbnaiImage';

type ContentProps = {
  content: Drink;
  onPress: (id: string) => void;
};

export const Content: React.FC<ContentProps> = ({content, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress(content.idDrink)}>
      <ThumbnailImage image={content.strDrinkThumb} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});
