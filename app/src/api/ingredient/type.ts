export type AcceptedIngredientAction = 'list';

export interface IngredientConfig
  extends Record<AcceptedIngredientAction, unknown> {
  list: {};
}

export type Ingredient = {
  idIngredient: string;
  strIngredient: string;
  strDescription: string;
  strType: string;
  strAlcohol: string;
  strABV: string;
};
