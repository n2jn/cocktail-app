import {useCallback, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDerivedValue} from 'react-native-reanimated';
import {useVector} from 'react-native-redash';
import useDimension, {DimensionObject} from '../../../hooks/useDimension';
import {downScale, upScale} from '../../helper';
import UnitList from '../../molecules/UnitList';
import UnitMap from '../../molecules/UnitMap';
import AnimatedBackground from '../../molecules/AnimatedBackground/AnimatedBackground';
import {useSharedGestureArray} from '../../../hooks/useSharedGestureArray';
import {SharedGestureRef} from './types';

type UnitProps = {
  itemDimension: DimensionObject;
  listDimension: DimensionObject;
  mapDimension?: DimensionObject;
  data: any[];
  onItemPress: (id: string) => void;
};

/**
 *
 * @todo
 * - make it dynamic, maybe a wrapper ? (Have number of shared object based on children props)
 * - look into panGesture handler's context/storage feature for other ideas
 * - too many props for dimension, look into making it easier to use
 *
 * @param itemDimension height and width of the view inside the animated flatlist
 * @param mapDimension height and width of the map
 * @param listDimension height and width of the animated flatlist
 * @param data content for the flatlist
 * @param onItemPress callback for when pressing on an item
 */

const Unit: React.FC<UnitProps> = ({
  itemDimension,
  listDimension,
  mapDimension,
  onItemPress,
  data,
}) => {
  /**
   * Calculate dimensions
   */
  const contentDimension = useVector();

  const viewDimension = useDimension(
    listDimension.width,
    listDimension.height + (mapDimension?.height ?? 0),
  );

  const onContentSizeChange = useCallback((w: number, h: number) => {
    const cHeight = parseInt(h.toFixed(0));
    const cWidth = parseInt(w.toFixed(0));
    const {width, height} = listDimension;

    if (contentDimension.x.value !== cWidth) {
      contentDimension.x.value = cWidth <= width ? width : cWidth;
    }
    if (contentDimension.y.value !== cHeight) {
      contentDimension.y.value = cHeight <= height ? height : cHeight;
    }
  }, []);

  const scaleDown = useDerivedValue(
    () =>
      downScale(
        mapDimension?.width ?? 0,
        mapDimension?.height ?? 0,
        contentDimension.x.value,
        contentDimension.y.value,
      ),
    [contentDimension, mapDimension],
  );

  const scaleUp = useDerivedValue(
    () =>
      upScale(
        listDimension.width,
        listDimension.height,
        contentDimension.x.value,
        contentDimension.y.value,
      ),
    [contentDimension, listDimension],
  );

  const getNumColumns = useCallback(() => {
    if (!data) {
      return 1;
    }

    const numLine = Math.floor(listDimension.height / itemDimension.height);
    const minNumColumns = Math.ceil(listDimension.width / itemDimension.width);
    const maxNumColumns = Math.ceil(data.length / numLine);

    return minNumColumns > maxNumColumns ? minNumColumns : maxNumColumns;
  }, [listDimension, itemDimension, data]);

  /**
   * Gesture handler
   */
  const [sgList, sgMap] = useSharedGestureArray(2);
  const mRef = useRef<SharedGestureRef>(null);
  const lRef = useRef<SharedGestureRef>(null);

  useDerivedValue(() => {
    if (sgList.isGestureBeingUsed.value) {
      mRef.current?.setTranslation(
        sgList.translation.x.value * scaleDown.value.x,
        sgList.translation.y.value * scaleDown.value.y,
      );
      // console.log('list upatae', sgList.translation);
    }
  }, [sgList.translation, sgList.isGestureBeingUsed, mRef]);

  useDerivedValue(() => {
    if (sgMap.isGestureBeingUsed.value) {
      lRef.current?.setTranslation(
        sgMap.translation.x.value * scaleUp.value.x,
        sgMap.translation.y.value * scaleUp.value.y,
      );
      // console.log('map update', sgMap.translation);
    }
  }, [sgMap.translation, sgMap.translation, lRef]);

  /**
   *  Render
   */
  return (
    <View style={[viewDimension, {flex: 1, justifyContent: 'center'}]}>
      <AnimatedBackground viewDimension={viewDimension} />
      <View style={[listDimension]}>
        <UnitList
          ref={lRef}
          sharedGestureHandler={sgList}
          itemDimension={itemDimension}
          listDimension={listDimension}
          numColumns={getNumColumns()}
          onContentSizeChange={onContentSizeChange}
          data={data || []}
          onItemPress={onItemPress}
        />
      </View>
      {mapDimension && (
        <UnitMap
          ref={mRef}
          scale={scaleDown}
          listDimension={listDimension}
          mapDimension={mapDimension}
          sharedGestureHandler={sgMap}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Unit;
