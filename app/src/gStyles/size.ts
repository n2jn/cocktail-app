import {Dimensions} from 'react-native';

// https://medium.com/react-native-training/scaling-react-native-apps-for-tablets-211de8399cf1

const guidelineBaseWidth = 320;
const guidelineBaseHeight = 680;

// will be used for width !
export const scale = (size: number) => {
  const {width} = Dimensions.get('window');
  return Math.round((width / guidelineBaseWidth) * size);
};

// will be used for height !
export const verticalScale = (size: number) => {
  const {height} = Dimensions.get('window');
  return Math.round((height / guidelineBaseHeight) * size);
};

// will be used for padding / margin !
export const moderateScale = (size: number, factor: number = 0.5) =>
  Math.round(size + (scale(size) - size) * factor);

export const scaled64 = scale(64);
export const scaled32 = scale(32);
export const scaled24 = scale(24);
export const scaled16 = scale(16);
export const scaled12 = scale(12);
export const scaled8 = scale(8);
