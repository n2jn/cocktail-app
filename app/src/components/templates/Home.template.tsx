import {useCallback} from 'react';
import {Text, View} from 'react-native';
import useDimension from '../../hooks/useDimension';
import {useSharedGestureArray} from '../../hooks/useSharedGestureArray';
import {Drink} from '../../store/thecocktaildb/type';
import {SCREEN_WIDTH} from '../model';
import DrinkCard from '../molecules/AnimatedCard';
import DrinkCardList from '../organisms/DrinkCardList';

type TemplateProps = {
  drinks: Drink[];
  onCocktailPress: (id: string) => void;
  onIngredientPress: () => void;
};

const HomeTemplate: React.FC<TemplateProps> = ({drinks, onCocktailPress}) => {
  const padding = 0;

  const cardDimension = useDimension(50, 50);

  const cardListDimension = useDimension(
    SCREEN_WIDTH - padding,
    SCREEN_WIDTH / 2,
  );

  const sliderDimension = useDimension(
    SCREEN_WIDTH - padding,
    SCREEN_WIDTH / 2,
  );

  const cursorDimension = useDimension(
    (SCREEN_WIDTH - padding) / 2,
    SCREEN_WIDTH / 4,
  );

  const [sgCardList, sgSlider] = useSharedGestureArray(2);

  const renderCard = useCallback(
    ({item}: {item: Drink}) => {
      return (
        <View style={cardDimension}>
          <DrinkCard
            dimension={cardDimension}
            drink={item}
            onPress={onCocktailPress}
          />
        </View>
      );
    },
    [cardDimension],
  );

  return (
    <>
      {/** drink list  */}
      <DrinkCardList
        dimension={cardListDimension}
        cardDimension={cardDimension}
        data={drinks}
        sharedGesture={sgCardList}
        renderItem={renderCard}
        numColumns={5}
      />

      {/** Slider component */}
      {/* <Slider
        dimension={sliderDimension}
        sharedGesture={sgSlider}
        cursorDimension={cursorDimension}></Slider> */}
    </>
  );
};

export default HomeTemplate;
