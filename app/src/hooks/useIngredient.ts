import useSWR from 'swr';
import {ingredientFetcher} from '~api/ingredient/ingredient';
import {AcceptedIngredientAction, IngredientConfig} from '~api/ingredient/type';

export const useIngredient = <Action extends AcceptedIngredientAction>(
  action: Action,
  config?: IngredientConfig[Action],
) => {
  const {data, isLoading, error} = useSWR(
    !!config && [`${action}.php`, config],
    ingredientFetcher,
  );

  return {
    data,
    isLoading,
    error,
  };
};
