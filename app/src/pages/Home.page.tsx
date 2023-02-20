import React, {useCallback} from 'react';

import {useGetCocktailWithOrWithoutAlchoolQuery} from '../store/thecocktaildb/filter';

import DrinkProductTemplate from '../components/templates/DrinkProduct.template';
import {RootStackScreenProps} from '../navigation/types';

const HomeScreen: React.FC<RootStackScreenProps<'Detail'>> = ({navigation}) => {
  const cocktail = useGetCocktailWithOrWithoutAlchoolQuery('Alcoholic');

  const onCocktailPress = useCallback(
    (id: string) => () => {
      console.log(
        'pressed',
        cocktail.data?.find(item => item.idDrink === id),
      );
      navigation.push('Detail', {
        id,
      });
    },
    [cocktail],
  );

  if (cocktail.isLoading || cocktail.isFetching) {
    return <></>;
  }

  return (
    <>
      <DrinkProductTemplate
        drinks={cocktail.data ?? []}
        onCocktailPress={onCocktailPress}
      />
    </>
  );
};

export default HomeScreen;
