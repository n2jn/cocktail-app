import {useCallback, useRef} from 'react';
import {View} from 'react-native';
import {useDerivedValue} from 'react-native-reanimated';
import useDimension from '../../../hooks/useDimension';
import {useSharedGestureArray} from '../../../hooks/useSharedGestureArray';
import {SharedGestureRef} from '../../../old/Unit/types';
import {Drink} from '../../../store/thecocktaildb/type';
import {Neumorphism} from '../../molecules/Neumorphism';
import ProductCard from '../../molecules/ProductICard';

import {Slider} from '../../molecules/Slider/slider';
import {ProductList} from '../../organisms/ProductList';
import {middleware, SharedWrapper} from './middleware';
import {
  DEFAULT_CARD_HEIGHT,
  DEFAULT_CARD_WIDTH,
  DEFAULT_LIST_HEIGHT,
  DEFAULT_LIST_WIDTH,
} from './model';

type TemplateProps = {
  drinks: Drink[];
  onCocktailPress: (id: string) => () => void;
};

const SelectionPageTemplate: React.FC<TemplateProps> = ({
  drinks,
  onCocktailPress,
}) => {
  const padding = 0;

  const cardSize = useDimension(DEFAULT_CARD_WIDTH, DEFAULT_CARD_HEIGHT);

  const listViewSize = useDimension(DEFAULT_LIST_WIDTH, DEFAULT_LIST_HEIGHT);

  const sliderDimension = useDimension(DEFAULT_CARD_WIDTH, DEFAULT_CARD_HEIGHT);
  const cursorDimension = useDimension(50 - padding, 50);

  const [sgCardList, sgSlider] = useSharedGestureArray(2);

  const renderCard = useCallback(
    ({item}: {item: Drink}) => {
      return (
        <ProductCard
          imageUrl={item.strDrinkThumb}
          dimension={cardSize}
          onPress={onCocktailPress(item.idDrink)}
        />
      );
    },
    [cardSize],
  );

  return (
    <>
      <SharedWrapper>
        {/** drink list  */}
        <ProductList
          containerSize={listViewSize}
          cardSize={cardSize}
          data={drinks}
          sharedGesture={sgCardList}
          renderItem={renderCard}
          numColumns={5}
        />
        {/* <Neumorphism {...cardDimension}></Neumorphism> */}
        {/** Slider component */}
        <Slider
          containerSize={sliderDimension}
          sharedGesture={sgSlider}
          cursorSize={cursorDimension}
        />
      </SharedWrapper>
    </>
  );
};

export default SelectionPageTemplate;
