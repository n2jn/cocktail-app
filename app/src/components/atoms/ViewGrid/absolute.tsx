import {StyleSheet, View} from 'react-native';
import {SectionType} from '~components/type';

export const AbsoluteGrid: React.FC<{
  position: SectionType;
  children: React.ReactNode;
}> = ({position, children}) => {
  return <View style={styles[position]}>{children}</View>;
};
const styles = StyleSheet.create({
  bottomLeft: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomRight: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  topRight: {
    position: 'absolute',
    right: 8,
    //  top: 8,
  },
  topLeft: {
    position: 'absolute',
    left: 8,
    top: 8,
  },
  middle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  middleLeft: {
    position: 'absolute',
    //right: 0,
    left: 0,
  },
  middleRight: {
    position: 'absolute',
    right: 0,
  },
});
