import {Text} from 'react-native';
import useDimension from '../../hooks/useDimension';
import {FilterDataType} from '../../store/thecocktaildb/list';
import {Drink} from '../../store/thecocktaildb/type';
import {SCREEN_WIDTH} from '../model';
import Wrapper from '../old/CollisionWrapper';
import Modal from '../old/modal/modal';
import Unit from '../organisms/Unit/Unit';

type TemplateProps = {
  cocktails: Drink[];
  ingredients: FilterDataType<'ingredient'>[];
  onCocktailPress: (id: string) => void;
  onIngredientPress: () => void;
};

const HomeTemplate: React.FC<TemplateProps> = ({
  ingredients,
  onIngredientPress,
  cocktails,
  onCocktailPress,
}) => {
  const padding = 0;

  const itemDimension_ingredients = useDimension(
    (SCREEN_WIDTH - padding) / 2,
    SCREEN_WIDTH / 2,
  );
  const listDimension_ingredients = useDimension(
    SCREEN_WIDTH - padding,
    SCREEN_WIDTH / 2,
  );

  const itemDimension_cocktails = useDimension(
    (SCREEN_WIDTH - padding) / 2,
    SCREEN_WIDTH / 4,
  );
  const listDimension_cocktails = useDimension(
    SCREEN_WIDTH - padding,
    SCREEN_WIDTH / 2,
  );
  const mapDimension_cocktails = useDimension(SCREEN_WIDTH, 50);

  return (
    <>
      {/* <Wrapper>
        <Text></Text>
        <Text></Text>
      </Wrapper> */}
      {/** Ingredients  */}
      <Unit
        itemDimension={itemDimension_ingredients}
        listDimension={listDimension_ingredients}
        data={ingredients}
        onItemPress={onIngredientPress}
      />

      {/** Cocktail Selection (alchool / nonAlchohol)  */}
      <Unit
        itemDimension={itemDimension_cocktails}
        listDimension={listDimension_cocktails}
        mapDimension={mapDimension_cocktails}
        data={cocktails}
        onItemPress={onCocktailPress}
      />
    </>
  );
};

export default HomeTemplate;
