import useSWR from 'swr';
import {drinkFetcher} from '~api/drink/drink';
import {AcceptedDrinkAction, DrinkConfig} from '~api/drink/type';

export const useDrink = <Action extends AcceptedDrinkAction>(
  action: Action,
  config?: DrinkConfig[Action],
) => {
  const {data, isLoading, error} = useSWR(
    !!config && [`${action}.php`, config],
    drinkFetcher,
  );

  return {
    data,
    isLoading,
    error,
  };
};
