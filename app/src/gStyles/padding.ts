import {StyleSheet} from 'react-native';
import {scaled16, scaled8} from './size';

export default StyleSheet.create({
  /**
   * @alias 16
   */
  p16: {
    padding: scaled16,
  },
  pr16: {
    paddingRight: scaled16,
  },
  pl16: {
    paddingLeft: scaled16,
  },
  ph16: {
    paddingHorizontal: scaled16,
  },
  pv16: {
    paddingVertical: scaled16,
  },

  /**
   * @alias 8
   */
  p8: {
    padding: scaled8,
  },
  pl8: {
    paddingLeft: scaled8,
  },
  pr8: {
    paddingRight: scaled8,
  },
  ph8: {
    paddingHorizontal: scaled8,
  },
  pv8: {
    paddingVertical: scaled8,
  },
});
