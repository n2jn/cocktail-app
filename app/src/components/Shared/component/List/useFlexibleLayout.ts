import {useCallback, useMemo} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {DimensionObject} from '../../../../hooks/type';
import useDimension from '../../../../hooks/useDimension';

type FlexibleLayoutConfigObject = {
  numberOfItems: number;
  itemSize: DimensionObject;
  defaultNumColumns?: number;
};

const useFlexibleLayout = (config: FlexibleLayoutConfigObject) => {
  const {
    width: layoutWidth,
    height: layoutHeight,
    update: lUpdate,
  } = useDimension(0, 0);

  const flexibleNumColumns = useMemo(() => {
    // console.log('layoutSize', {width, height});
    const {numberOfItems, itemSize} = config;
    const numLine = Math.floor(layoutHeight / itemSize.height);
    const minNumColumns = Math.ceil(layoutWidth / itemSize.width);
    const maxNumColumns = Math.ceil(numberOfItems / numLine);

    return minNumColumns > maxNumColumns ? minNumColumns : maxNumColumns;
  }, [layoutWidth, layoutHeight, config.numberOfItems, config.itemSize]);

  const numColumns = useMemo(
    () => config.defaultNumColumns ?? flexibleNumColumns,
    [config.defaultNumColumns, flexibleNumColumns],
  );

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const {height: h, width: w} = e.nativeEvent.layout;
    const lHeight = parseInt(h.toFixed(0));
    const lWidth = parseInt(w.toFixed(0));

    lUpdate(lWidth, lHeight);
  }, []);

  return {
    onLayout,
    numColumns,
    key: `${numColumns}`,
  };
};

export default useFlexibleLayout;
