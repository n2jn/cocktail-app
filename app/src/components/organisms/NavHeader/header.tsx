import {Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Grid from '~components/atoms/ViewGrid';
import {SectionProps} from '~components/type';
import gStyles from '~gStyles';
import {HeaderSection} from './section';

type NavHeaderProps = SectionProps & {};

export const NavHeader = ({
  middleRight,
  middleLeft,
  middle,
}: NavHeaderProps) => {
  return (
    <View style={[styles.container, gStyles.ph8]}>
      {!!middleLeft && (
        <Grid.Flex position="middleLeft">
          <HeaderSection dataToDisplay={middleLeft} />
        </Grid.Flex>
      )}
      {!!middle && (
        <Grid.Flex position="middle">
          <HeaderSection dataToDisplay={middle} />
        </Grid.Flex>
      )}
      {!!middleRight && (
        <Grid.Flex position="middleRight">
          <HeaderSection dataToDisplay={middleRight} />
        </Grid.Flex>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'red',
  },
});
