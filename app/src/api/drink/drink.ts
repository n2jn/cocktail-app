import api from '../api';

const createDrinkParams = (config: Record<string, unknown>) => {
  if (
    config.hasOwnProperty('query') &&
    typeof config.query === 'string' &&
    config.hasOwnProperty('type') &&
    typeof config.type === 'string'
  ) {
    return {
      [config.type[0].toLocaleLowerCase()]: config.query,
    };
  }
  if (config.hasOwnProperty('type') && typeof config.type === 'string') {
    return {
      [config.type[0].toLocaleLowerCase()]: config.type,
    };
  }
  return {};
};

export const drinkFetcher = async ([url, config]: [
  url: string,
  config: Record<string, unknown>,
]) => {
  const params = createDrinkParams(config);
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
