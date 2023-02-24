import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {FlatListProps, StyleSheet, View} from 'react-native';
import Animated, {useAnimatedScrollHandler} from 'react-native-reanimated';
import {DimensionObject} from '../../../hooks/type';
import {Drink} from '../../../store/thecocktaildb/type';
import {PlaceholderCard} from '../../molecules/PlaceholderCard';
import {useSharedListRef} from '../../Shared/hooks/useSharedListRef';
import {SharedRefType} from '../../Shared/type';

// works only for DRINK (change that)
type ProductListPropsType = FlatListProps<Drink> & {
  containerSize: DimensionObject;
  cardSize: DimensionObject;
  sharedType?: string;
};

export const ProductList = React.forwardRef<
  SharedRefType,
  ProductListPropsType
>(
  (
    {
      data,
      cardSize,
      numColumns: staticNumColumns,
      containerSize,
      renderItem,
      ...flatlistProps
    },
    ref,
  ) => {
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const flatlistRef = useSharedListRef<Animated.FlatList<Drink>>(ref, {
      showContent: () => setShowPlaceholder(false),
    });

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

    const renderPlaceholder = useCallback(() => {
      return <PlaceholderCard cardSize={cardSize} />;
    }, [cardSize]);

    return (
      <View style={containerSize}>
        <Animated.FlatList
          scrollEnabled={!showPlaceholder}
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
          // onContentSizeChange={onContentSizeChange}
          renderItem={showPlaceholder ? renderPlaceholder : renderItem}
          {...flatlistProps}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexWrap: 'wrap',
  },
});
