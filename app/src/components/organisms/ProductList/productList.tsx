import React, {useCallback, useImperativeHandle, useMemo} from 'react';
import {FlatListProps, StyleSheet, View} from 'react-native';
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {useVector} from 'react-native-redash';
import {SharedGestureObject} from '../../../hooks/type';
import useAnimatedDimension, {
  AnimatedDimensionObject,
} from '../../../hooks/useAnimatedDimension';
import useDimension, {DimensionObject} from '../../../hooks/useDimension';
import {Drink} from '../../../store/thecocktaildb/type';

// works only for DRINK (change that)
type ProductListPropsType = FlatListProps<Drink> & {
  containerSize: DimensionObject;
  cardSize: DimensionObject;
  sharedGesture: SharedGestureObject;
};

type ProductListRefType = {
  setTranslation: (x: number, y: number) => void;
  getContentSize: () => AnimatedDimensionObject;
};

export const ProductList = React.forwardRef<
  ProductListRefType,
  ProductListPropsType
>(
  (
    {
      sharedGesture: sg,
      data,
      cardSize,
      numColumns: staticNumColumns,
      containerSize,
      ...flatlistProps
    },
    ref,
  ) => {
    const flexibleNumColumns = useMemo(() => {
      // calcuate number of lines is showable based on the dimension given in props
      const numLine = Math.floor(containerSize.height / cardSize.height);
      const minNumColumns = Math.ceil(containerSize.width / cardSize.width);
      const maxNumColumns = Math.ceil(data.length / numLine);

      return minNumColumns > maxNumColumns ? minNumColumns : maxNumColumns;
    }, [cardSize, containerSize, data]);

    const numColumns = useMemo(
      () => staticNumColumns ?? flexibleNumColumns,
      [staticNumColumns, flexibleNumColumns],
    );

    const flatlistRef = useAnimatedRef<Animated.FlatList<Drink>>();
    const contentSize = useAnimatedDimension();

    useImperativeHandle(
      ref,
      () => ({
        setTranslation: (x: number, y: number) => {
          'worklet';
          scrollTo(flatlistRef, x, y, true);
        },
        getContentSize: () => contentSize,
      }),
      [flatlistRef],
    );

    const onContentSizeChange = useCallback(
      (w: number, h: number) => {
        const cHeight = parseInt(h.toFixed(0));
        const cWidth = parseInt(w.toFixed(0));
        const {width, height} = containerSize;

        if (contentSize.width.value !== cWidth) {
          contentSize.width.value = cWidth <= width ? width : cWidth;
        }
        if (contentSize.height.value !== cHeight) {
          contentSize.height.value = cHeight <= height ? height : cHeight;
        }
        return flatlistProps.onContentSizeChange?.(w, h);
      },
      [containerSize],
    );

    const keyExtractor = useCallback(
      (item: Drink, index: number) => `${item.idDrink}${index}`,
      [],
    );

    const getItemLayout = useCallback(
      (_: any, index: number) => ({
        length: cardSize.width,
        offset: cardSize.height * index,
        index,
      }),
      [cardSize],
    );

    const scrollHandler = useAnimatedScrollHandler({
      onScroll: event => {
        sg.translation.y.value = event.contentOffset.y;
        sg.translation.x.value = event.contentOffset.x;
      },
      onBeginDrag: e => {
        sg.isGestureBeingUsed.value = true;
      },
      onEndDrag: e => {
        sg.isGestureBeingUsed.value = false;
      },
      onMomentumBegin: () => {
        sg.isGestureBeingUsed.value = true;
      },
      onMomentumEnd: e => {
        sg.isGestureBeingUsed.value = false;
      },
    });

    return (
      <View style={containerSize}>
        <Animated.FlatList
          style={styles.scrollContainer}
          numColumns={numColumns}
          key={`${numColumns}`}
          maxToRenderPerBatch={4}
          ref={flatlistRef}
          data={data}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          onScroll={scrollHandler}
          onContentSizeChange={onContentSizeChange}
          {...flatlistProps}
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
