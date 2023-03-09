import React from 'react';
import {FlatList, FlatListProps} from 'react-native';

type AcceptedProductObject = {
  id: string | number;
};

type ProductListPropsType<T extends Record<string, unknown>> =
  FlatListProps<T> & {};

export const ProductList = <T extends AcceptedProductObject>({
  data,
  renderItem,
  ...flatlistProps
}: ProductListPropsType<T>) => {
  return (
    <FlatList
      testID="product.flatlist"
      maxToRenderPerBatch={4}
      data={data}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      {...flatlistProps}
    />
  );
};
