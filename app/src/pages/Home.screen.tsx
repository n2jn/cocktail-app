import React, {useEffect} from 'react';
import {Button, FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGetRandomCocktailQuery} from '../api/thecocktaildb/random';
import {useSearchCocktailByNameQuery} from '../api/thecocktaildb/search';
import {Drink} from '../api/thecocktaildb/type';

const testData = [
  {id: 1, text: 'hello'},
  {id: 2, text: 'hello'},
];

const listItem = ({item}: {item: Drink}) => (
  <View
    style={{
      flexDirection: 'row',
      backgroundColor: 'red',
    }}>
    <Button title={item.strDrink}></Button>
  </View>
);

const HomeScreen = props =>  {
  const cocktails = useGetRandomCocktailQuery();
  useEffect(() => {}, []);
  const onFilterPress = () => () => {};

  console.log(cocktails.data);

  return (
    <SafeAreaView style={{flex: 1}}>
      {/** CARDS LIST TEST */}
      <FlatList
        style={{flexGrow: 1}}
        data={cocktails.data}
        renderItem={listItem}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
