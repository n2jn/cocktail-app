import {useState} from 'react';

export type DimensionObject = {
  width: number;
  height: number;
  update: (w: number, h: number) => void;
};

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
