import React, {useCallback} from 'react';
import ProductPageTemplate from '~components/templates/ProductTemplate';
import {useDrink} from '~hooks/useDrink';
import {RootStackScreenProps} from '../navigation/types';

const DrinkScreen: React.FC<RootStackScreenProps<'Drink'>> = ({navigation}) => {
  const {data: cocktail, isLoading} = useDrink('filter', {
    type: 'Alcoholic',
  });

  const onCocktailPress = useCallback(
    (id: string) => () => {
      navigation.push('Detail', {
        id,
      });
    },
    [cocktail],
  );

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <ProductPageTemplate
        title={'Cocktails'}
        drinks={cocktail ?? []}
        onPress={onCocktailPress}
      />
    </>
  );
};

export default DrinkScreen;
