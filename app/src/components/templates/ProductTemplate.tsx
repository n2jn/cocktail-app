import {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Drink} from '~api/drink/type';
import Title from '~components/atoms/Text/Title';
import NavHeader from '~components/organisms/NavHeader';
import gStyles from '~gStyles';
import ProductCard from '../molecules/ProductCard';
import {ProductList} from '../organisms/ProductList';

type TemplateProps = {
  title: string;
  drinks: Drink[];
  onPress: (id: string) => () => void;
};

const ProductTemplate: React.FC<TemplateProps> = ({drinks, onPress, title}) => {
  const renderCard = useCallback(({item}: {item: Drink}) => {
    return (
      <ProductCard
        id={item.idDrink}
        backgroundImage={item.strDrinkThumb}
        onPress={onPress(item.idDrink)}
        topLeft={{
          text: item.strDrink,
        }}
        topRight={{
          icon: 'heart',
          onPress: () => console.log('here'),
        }}
      />
    );
  }, []);

  const [image, setImage] = useState(
    'https://dummyimage.com/100x100/000/ffffff.jpg&text=hello',
  );

  const pressed = () => {
    setImage(
      `https://dummyimage.com/100x100/000/ffffff.jpg&text=${Math.random().toFixed(
        2,
      )}`,
    );
  };

  return (
    <SafeAreaView
      testID="product.template"
      style={[gStyles.f1, styles.container]}>
      <NavHeader
        middleLeft={{icon: 'align-justify', onPress: () => {}}}
        middleRight={{
          image: image,
          onPress: pressed,
        }}
      />
      <Title text={title} />
      <ProductList data={drinks} renderItem={renderCard} numColumns={2} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'purple',
  },
});

export default ProductTemplate;
