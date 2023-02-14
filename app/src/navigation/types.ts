import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeParamList>;
  Detail: {id: string}; // change this
  NotFound: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type HomeParamList = {
  Popular: undefined;
  Latest: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
