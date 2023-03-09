import {StyleSheet} from 'react-native';
import {scaled12, scaled16, scaled24, scaled32, scaled8} from './size';

const fontFamily = 'Bradley Hand';

export default StyleSheet.create({
  /**
   * @alias 32
   */
  whiteBold32: {
    fontSize: scaled32,
    fontWeight: 'bold',
    fontFamily,
    color: 'white',
  },
  bold32: {
    fontSize: scaled32,
    fontWeight: 'bold',
    fontFamily,
  },
  regular32: {
    fontSize: scaled32,
    fontWeight: 'normal',
  },
  italic32: {
    fontSize: scaled32,
    fontWeight: 'normal',
    fontStyle: 'italic',
  },

  /**
   * @alias 24
   */
  bold24: {
    fontSize: scaled24,
    fontWeight: 'bold',
    fontFamily,
  },
  regular24: {
    fontSize: scaled24,
    fontWeight: 'normal',
  },
  italic24: {
    fontSize: scaled24,
    fontWeight: 'normal',
    fontStyle: 'italic',
  },

  /**
   * @alias 16
   */
  bold16: {
    fontSize: scaled16,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  regular16: {
    fontSize: scaled16,
    fontWeight: 'normal',
  },
  italic16: {
    fontSize: scaled16,
    fontWeight: 'normal',
    fontStyle: 'italic',
  },

  /**
   * @alias 12
   */
  bold12: {
    fontSize: scaled12,
    fontWeight: 'bold',
  },
  regular12: {
    fontSize: scaled12,
    fontWeight: 'normal',
  },
  italic12: {
    fontSize: scaled12,
    fontWeight: 'normal',
    fontStyle: 'italic',
  },

  /**
   * @alias 8
   */
  bold8: {
    fontSize: scaled8,
    fontWeight: 'bold',
  },
  regular8: {
    fontSize: scaled8,
    fontWeight: 'normal',
  },
  italic8: {
    fontSize: scaled8,
    fontWeight: 'normal',
    fontStyle: 'italic',
  },
});
