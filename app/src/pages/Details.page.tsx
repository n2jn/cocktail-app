import {View} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import UnitImage from '../components/atoms/RoundImage';
import DetailTemplate from '../components/templates/Detail.template';
import {RootStackScreenProps} from '../navigation/types';
import {useLookupCocktailByIdQuery} from '../store/thecocktaildb/lookup';

const DetailsScreen: React.FC<RootStackScreenProps<'Detail'>> = ({
  route: {
    params: {id},
  },
}) => {
  const cocktailDetail = useLookupCocktailByIdQuery(id);
  if (cocktailDetail.isLoading || cocktailDetail.isFetching) {
    return <></>;
  }
  console.log('data', cocktailDetail.data);
  return <DetailTemplate item={cocktailDetail.data} />;
};
export default DetailsScreen;
