import {StyleSheet, View} from 'react-native';
import {SectionType} from '~components/type';

export const FlexGrid: React.FC<{
  position: SectionType;
  children: React.ReactNode;
}> = ({position, children}) => {
  return <View style={styles[position]}>{children}</View>;
};

const styles = StyleSheet.create({
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  middleRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
