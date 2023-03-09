import {useCallback, useEffect, useMemo, useState} from 'react';
import {ImageSourcePropType} from 'react-native';
import {scale} from '~gStyles/size';

export const useImageProps = (image: string, size: number) => {
  const imageSource = useMemo(() => ({uri: image}), [image]);

  const [source, setSource] = useState<ImageSourcePropType>(imageSource);
  const scaledSize = useMemo(() => scale(size), [size]);

  useEffect(() => {
    setSource(imageSource);
  }, [image]);

  const onError = useCallback((_: any) => {
    setSource(placholderSource);
  }, []);

  const placholderSource = useMemo(
    () => ({
      uri: `https://dummyimage.com/${scaledSize}x${scaledSize}/000/ffffff.jpg&text=??`,
    }),
    [scaledSize],
  );

  const style = useMemo(() => {
    return {
      width: scaledSize,
      height: scaledSize,
    };
  }, [scaledSize]);

  return {
    onError,
    source,
    style,
  };
};
