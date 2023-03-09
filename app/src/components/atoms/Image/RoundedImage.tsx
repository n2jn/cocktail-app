import React from 'react';
import {Image, ImageProps, StyleSheet, View} from 'react-native';
import {useImageProps} from './hooks/useImageProps';

type AcceptableImageSize = 8 | 16 | 24 | 32 | 64;

type RoundedImageProps = Omit<ImageProps, 'source'> & {
  image: string;
  size: AcceptableImageSize;
};

export const RoundedImage = ({
  image,
  size,
  ...imageProps
}: RoundedImageProps) => {
  const {onError, source, style} = useImageProps(image, size);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        testID="image"
        source={source}
        onError={onError}
        style={style}
        {...imageProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: 'black',
    overflow: 'hidden',
  },
});
