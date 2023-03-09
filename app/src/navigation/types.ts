import {NavigatorScreenParams} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

export type StackParamList = {
  Drink: NavigatorScreenParams<{}>;
  Ingredient: NavigatorScreenParams<{}>;
  Settings: NavigatorScreenParams<{}>;
  Detail: {id: string}; // change this
  NotFound: undefined;
};

export type RootStackScreenProps<T extends keyof StackParamList> =
  StackScreenProps<StackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
