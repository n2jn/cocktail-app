import React, {useCallback} from 'react';

import {useGetCocktailWithOrWithoutAlchoolQuery} from '../store/thecocktaildb/filter';

import HomeTemplate from '../components/templates/Home.template';
import {useGetIngredientsFilterDataQuery} from '../store/thecocktaildb/list';
import {View} from 'react-native';
import {RootStackScreenProps} from '../navigation/types';

const HomeScreen: React.FC<RootStackScreenProps<'Detail'>> = ({navigation}) => {
  const cocktail = useGetCocktailWithOrWithoutAlchoolQuery('Alcoholic');
  const ingredients = useGetIngredientsFilterDataQuery();

  console.log('ingredients', ingredients.data);

  const onCocktailPress = useCallback(
    (id: string) => {
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

  const onIngredientPress = () => {};

  if (cocktail.isLoading || cocktail.isFetching) {
    return <></>;
  }

  return (
    <>
      <HomeTemplate
        drinks={cocktail.data ?? []}
        onCocktailPress={onCocktailPress}
        onIngredientPress={onIngredientPress}
      />
    </>
  );
};

export default HomeScreen;
