import React, {useImperativeHandle, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, View, ViewProps} from 'react-native';
import {DimensionObject} from '../../../hooks/type';
import {useSharedViewRef} from '../../Shared/hooks/useSharedVewRef';
import {SharedRefType} from '../../Shared/type';
import {PlaceholderCard} from '../PlaceholderCard';
import {Cursor} from './cursor';

type SliderProps = ViewProps & {
  containerSize: DimensionObject;
  cursorSize: DimensionObject;
};

export const Slider = React.forwardRef<SharedRefType, SliderProps>(
  ({containerSize, cursorSize, onLayout}, ref) => {
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const viewRef = useSharedViewRef<View>(ref, {type: '', gesture: 'Pan'});

    return (
      <View
        onLayout={onLayout}
        ref={viewRef}
        style={[containerSize, styles.container]}>
        {showPlaceholder && <PlaceholderCard cardSize={containerSize} />}
        <Cursor dimension={cursorSize} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'red',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
  },
});
