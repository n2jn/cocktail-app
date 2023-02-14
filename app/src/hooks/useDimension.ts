import {useState} from 'react';

export type DimensionObject = {
  width: number;
  height: number;
  /**   *
   * update the width and/or height of the view
   * @param w width of the view
   * @param h height of the view
   * @todo play with typescript to make it dynamic with one argument
   */
  update: (w: number, h: number) => void;
};

/**
 *
 * @param w width of the view
 * @param h height of the view
 * @returns dimension object so width and height can be changed and accessed on the fly
 */

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
