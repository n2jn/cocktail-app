import {useState} from 'react';
import {DimensionObject} from './type';

const useDimension = (w: number, h: number): DimensionObject => {
  const [width, setWidth] = useState(w);
  const [height, setHeight] = useState(h);

  const update = (w: number, h: number) => {
    setWidth(w);
    setHeight(h);
  };

  return {
    width,
    height,
    update,
  };
};

export default useDimension;
