import {useCallback} from 'react';
import {View} from 'react-native';
import useDimension from '../../hooks/useDimension';
import {useSharedGestureArray} from '../../hooks/useSharedGestureArray';
import {Drink} from '../../store/thecocktaildb/type';
import {Neumorphism} from '../molecules/Neumorphism';
import ProductCard from '../molecules/ProductCard';
import {
  PRODUCT_CARD_HEIGHT,
  PRODUCT_CARD_WIDTH,
} from '../molecules/ProductCard/model';
import ProductList from '../organisms/ProductList';
import {
  PRODUCT_LIST_HEIGHT,
  PRODUCT_LIST_WIDTH,
} from '../organisms/ProductList/model';

type TemplateProps = {
  drinks: Drink[];
  onCocktailPress: (id: string) => () => void;
};

const DrinkProductTemplate: React.FC<TemplateProps> = ({
  drinks,
  onCocktailPress,
}) => {
  const padding = 0;

  const cardDimension = useDimension(PRODUCT_CARD_WIDTH, PRODUCT_CARD_HEIGHT);

  const cardListDimension = useDimension(
    PRODUCT_LIST_WIDTH - padding,
    PRODUCT_LIST_HEIGHT,
  );

  const [sgCardList, sgSlider] = useSharedGestureArray(2);

  const renderCard = useCallback(
    ({item}: {item: Drink}) => {
      return (
        // <View style={cardDimension}>
        <Neumorphism
          {...cardDimension}
          // onPress={onCocktailPress(item.idDrink)}
          // dimension={cardDimension}
          // imageUrl={item.strDrinkThumb}
        />
        // </View>
      );
    },
    [cardDimension],
  );

  return (
    <>
      {/** drink list  */}
      <ProductList
        dimension={cardListDimension}
        cardDimension={cardDimension}
        data={drinks}
        sharedGesture={sgCardList}
        renderItem={renderCard}
        numColumns={5}
      />
      {/* <Neumorphism {...cardDimension}></Neumorphism> */}
      {/** Slider component */}
      {/* <Slider
        dimension={sliderDimension}
        sharedGesture={sgSlider}
        cursorDimension={cursorDimension}></Slider> */}
    </>
  );
};

export default DrinkProductTemplate;
