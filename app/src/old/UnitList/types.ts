import {Dimensions, View} from 'react-native';
import {FilterDataType, Filters} from '../../store/thecocktaildb/list';
import {Drink} from '../../store/thecocktaildb/type';

export type UnitDataInfo = {
  color: {
    fill: string;
    stroke: string;
    icon: string;
    iconFill: string;
  };
  data: FilterDataType<Filters>;
};

export type UnitCoords = {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
};
export type UnitInfoType = {
  inputUnits: UnitCoords[];
  outputUnits: UnitCoords[];
};
export type UnitViewRefs = {
  input: Array<View | null>;
  output: Array<View | null>;
};

export const UNPLUG_COLORS = {
  fill: 'rgb(167, 167, 174)',
  stroke: 'rgb(116, 114, 122)',
  icon: 'rgb(116, 124, 142)',
  iconFill: 'rgb(93, 90, 95)',
};
