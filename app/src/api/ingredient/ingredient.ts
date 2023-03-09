import api from '../api';

const createIngredientParams = (config: Record<string, unknown>) => {
  return {
    i: 'list',
  };
};

export const ingredientFetcher = async ([url, config]: [
  url: string,
  config: Record<string, unknown>,
]) => {
  const params = createIngredientParams(config);
  // get params based on filter
  const res = await api().get(url, {
    params,
    transformResponse: [
      data => {
        let resp;

        try {
          resp = JSON.parse(data);
        } catch (error) {
          throw Error(
            `[requestClient] Error parsing response JSON data - ${JSON.stringify(
              error,
            )}`,
          );
        } finally {
          return resp.drinks;
        }
      },
    ],
  });

  return res.data;
};
