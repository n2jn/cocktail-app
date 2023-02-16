import React, {useCallback, useImperativeHandle} from 'react';
import {FlatListProps, StyleSheet, View} from 'react-native';
import Animated, {scrollTo, useAnimatedRef} from 'react-native-reanimated';
import {SharedGestureObject} from '../../../hooks/type';
import {DimensionObject} from '../../../hooks/useDimension';
import {Drink} from '../../../store/thecocktaildb/type';
import {useScrollHandler} from './hooks/useScrollHandler';

type DrinkCardListProps = FlatListProps<Drink> & {
  dimension: DimensionObject;
  cardDimension: DimensionObject;
  sharedGesture: SharedGestureObject;
};

type DrinkCardListRefType = {
  setTranslation: (x: number, y: number) => void;
};

export const DrinkCardListRef = React.forwardRef<
  DrinkCardListRefType,
  DrinkCardListProps
>(({sharedGesture: sg, ...props}, ref) => {
  const flatlistRef = useAnimatedRef<Animated.FlatList<Drink>>();

  useImperativeHandle(
    ref,
    () => ({
      setTranslation,
      getTranslation,
    }),
    [flatlistRef],
  );

  const setTranslation = (x: number, y: number) => {
    'worklet';
    scrollTo(flatlistRef, x, y, true);
  };

  const getTranslation = () => ({
    x: sg.translation.x.value,
    y: sg.translation.y.value,
  });

  return (
    <DrinkCardListComponent ref={flatlistRef} sharedGesture={sg} {...props} />
  );
});

const DrinkCardListComponent = React.forwardRef<
  Animated.FlatList<Drink>,
  DrinkCardListProps
>(
  (
    {
      sharedGesture,
      data,
      cardDimension,
      numColumns,
      dimension,
      renderItem,
      onContentSizeChange,
    },
    ref,
  ) => {
    const scrollHandler = useScrollHandler(sharedGesture);

    const keyExtractor = useCallback(
      (item: Drink, index: number) => `${item.idDrink}${index}`,
      [],
    );

    const getItemLayout = useCallback(
      (_: any, index: number) => ({
        length: cardDimension.width,
        offset: cardDimension.height * index,
        index,
      }),
      [cardDimension],
    );

    return (
      <View style={dimension}>
        <Animated.FlatList
          style={styles.scrollContainer}
          numColumns={numColumns}
          key={`${numColumns}`}
          maxToRenderPerBatch={4}
          ref={ref}
          onContentSizeChange={onContentSizeChange}
          data={data}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          renderItem={renderItem}
          onScroll={scrollHandler}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  scrollContainer: {
    // backgroundColor: 'red',
    flexWrap: 'wrap',
  },
});
