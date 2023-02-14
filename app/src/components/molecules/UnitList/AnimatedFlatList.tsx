import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {FlatListProps, StyleSheet, View} from 'react-native';

import Animated, {
  runOnJS,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {DimensionObject} from '../../../hooks/useDimension';
import {SharedGestureObject} from '../../../hooks/useSharedGestureArray';
import {Drink} from '../../../store/thecocktaildb/type';
import {SharedGestureRef} from '../../organisms/Unit/types';
import UnitView, {UnitViewRef} from '../UnitView/UnitView';

export const UNPLUG_COLORS = {
  fill: 'rgb(167, 167, 174)',
  stroke: 'rgb(116, 114, 122)',
  icon: 'rgb(116, 124, 142)',
  iconFill: 'rgb(93, 90, 95)',
};

export type AnimatedFlatlistProps = Partial<FlatListProps<any>> & {
  data: Drink[] | null;
  itemDimension: DimensionObject;
  listDimension: DimensionObject;
  sharedGestureHandler: SharedGestureObject;
  onItemPress: () => void;
};

const AnimatedFlatlist = React.forwardRef<
  SharedGestureRef,
  AnimatedFlatlistProps
>(
  (
    {
      sharedGestureHandler: {translation, isGestureBeingUsed},
      data,
      onContentSizeChange,
      numColumns,
      viewabilityConfig,
      itemDimension,
      listDimension,
      onItemPress: onPress,
    },
    ref,
  ) => {
    /** FLATLIST */
    const flatlistRef = useAnimatedRef<Animated.FlatList<number>>();
    const itemRefs = useRef<(UnitViewRef | null)[]>([]);

    const numItems = useSharedValue(data?.length ?? 0);

    useEffect(() => {
      numItems.value = data?.length ?? 0;
    }, [data]);

    /*
     * TODO:
     * - fix translation, issue with first row and last column
     * - add Y translation
     */
    useDerivedValue(() => {
      const x0 = Math.floor(translation.x.value / itemDimension.width);
      const y0 = Math.floor(translation.x.value / itemDimension.width);

      const numItemsInWidth = Math.floor(
        listDimension.width / itemDimension.width,
      );
      const numItemInHeight = Math.floor(
        listDimension.height / itemDimension.height,
      );
      const numItemInRow = Math.ceil(numItems.value / numItemInHeight);

      for (let i = numItems.value; i >= 0; i--) {
        const rowId = Math.floor(i / numItemInRow);
        const refIndex = x0 + i;
        const maxXIndex = x0 + rowId * numItemInRow + numItemsInWidth;
        const minXIndex = x0 + rowId * numItemInRow;

        if (itemRefs.current[refIndex]) {
          if (refIndex >= minXIndex && refIndex < maxXIndex) {
            runOnJS(itemRefs.current[refIndex]?.isVisible)(true);
          } else {
            runOnJS(itemRefs.current[refIndex]?.isVisible)(false);
          }
        }
      }
    }, [itemRefs, translation, listDimension, numItems]);

    /** Ref function */
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
      x: translation.x.value,
      y: translation.y.value,
    });

    /** Scroll handler */
    const scrollHandler = useAnimatedScrollHandler({
      onScroll: event => {
        translation.y.value = event.contentOffset.y;
        translation.x.value = event.contentOffset.x;
      },
      onBeginDrag: e => {
        isGestureBeingUsed.value = true;
      },
      onEndDrag: e => {
        isGestureBeingUsed.value = false;
      },
      onMomentumBegin: () => {
        isGestureBeingUsed.value = true;
      },
      onMomentumEnd: e => {
        isGestureBeingUsed.value = false;
      },
    });

    /** UNIT INFO */
    const renderItem = useCallback(
      ({item, index}: {item: any; index: number}) => {
        return (
          <View style={itemDimension}>
            <UnitView
              key={index}
              ref={ref => (itemRefs.current[index] = ref)}
              dimension={itemDimension}
              unit={item}
              onPress={onPress}
            />
          </View>
        );
      },
      [itemDimension],
    );

    const getItemLayout = useCallback(
      (data, index) => ({
        length: itemDimension.width,
        offset: itemDimension.height * index,
        index,
      }),
      [itemDimension],
    );

    const keyExtractor = useCallback(
      (item: Drink, index: number) =>
        `${item.idDrink}${index}` ?? `${item.strIngredient}${index}`,
      [],
    );

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      setIsReady(true);
    }, []);

    if (!isReady) {
      return <></>;
    }

    return (
      <>
        <Animated.FlatList
          viewabilityConfig={viewabilityConfig}
          style={[styles.scrollContainer]}
          key={`${numColumns}`}
          maxToRenderPerBatch={4}
          ref={flatlistRef}
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
      </>
    );
  },
);

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
  },
});

export default AnimatedFlatlist;
