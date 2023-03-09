import {StyleSheet} from 'react-native';
import {scaled16, scaled8} from './size';

export default StyleSheet.create({
  /**
   * @alias 16
   */
  m16: {
    margin: scaled16,
  },
  mr16: {
    marginRight: scaled16,
  },
  ml16: {
    marginLeft: scaled16,
  },
  mh16: {
    marginHorizontal: scaled16,
  },
  mv16: {
    marginVertical: scaled16,
  },

  /**
   * @alias 8
   */
  m8: {
    margin: scaled8,
  },
  ml8: {
    marginLeft: scaled8,
  },
  mr8: {
    marginRight: scaled8,
  },
  mh8: {
    marginHorizontal: scaled8,
  },
  mv8: {
    marginVertical: scaled8,
  },
});
