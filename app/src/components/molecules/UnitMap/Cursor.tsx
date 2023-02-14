import {SFSymbol} from 'react-native-sfsymbols';
import {Circle, Line, Rect, Svg} from 'react-native-svg';

const Cursor = () => {
  return (
    <Svg height="100%" width="100%" viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="50"
        r="45"
        stroke="blue"
        strokeWidth="2.5"
        fill="green"></Circle>
      <Line
        x={'0'}
        y={'25'}
        x2="100"
        y2="0"
        stroke="blue"
        strokeWidth="5"></Line>
      <Line
        x={'0'}
        y={'50'}
        x2="100"
        y2="0"
        stroke="blue"
        strokeWidth="5"></Line>
      <Line
        x={'0'}
        y={'75'}
        x2="100"
        y2="0"
        stroke="blue"
        strokeWidth="5"></Line>
      {/* <Circle
        cx="50"
        cy="50"
        r="45"
        stroke="blue"
        strokeWidth="2.5"
        fill="green"
      /> */}
    </Svg>
  );
};

export default Cursor;
