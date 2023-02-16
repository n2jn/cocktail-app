import React, {useImperativeHandle} from 'react';
import {FlatListProps, StyleSheet} from 'react-native';
import Animated, {scrollTo, useAnimatedRef} from 'react-native-reanimated';
import {SharedGestureObject} from '../../../hooks/type';
import {DimensionObject} from '../../../hooks/useDimension';
import {Drink} from '../../../store/thecocktaildb/type';

type CardListProps = FlatListProps<Drink> & {
  dimension: DimensionObject;
  sharedGesture: SharedGestureObject;
};

type CardListRefType = {
  setTranslation: (x: number, y: number) => void;
};

export const CardListRef = React.forwardRef<CardListRefType, CardListProps>(
  ({sharedGesture: sg, ...props}, ref) => {
    const flatlistRef = useAnimatedRef<Animated.FlatList<number>>();

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
      <CardListComponent
        ref={flatlistRef}
        sharedGesture={sg}
        {...props}/>
  },
);

const CardListComponent = React.forwardRef<
  Animated.FlatList<number>,
  CardListProps
>((props, ref) => {
  return (
    <Animated.FlatList
      viewabilityConfig={viewabilityConfig}
      style={[styles.scrollContainer]}
      key={`${numColumns}`}
      maxToRenderPerBatch={4}
      ref={ref}
      onContentSizeChange={onContentSizeChange}
      data={data}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      numColumns={numColumns}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      renderItem={renderItem}
      onScroll={scrollHandler}
    />
  );
});

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
  },
});
