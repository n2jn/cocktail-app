import DetailTemplate from '../components/templates/DetailTemplate';
import {RootStackScreenProps} from '../navigation/types';

const DetailsScreen: React.FC<RootStackScreenProps<'Detail'>> = ({
  route: {
    params: {id},
  },
}) => {
  // const cocktailDetail = useLookupCocktailByIdQuery(id);
  // if (cocktailDetail.isLoading || cocktailDetail.isFetching) {
  //   return <></>;
  // }
  // console.log('data', cocktailDetail.data);
  return <></>; //<DetailTemplate item={cocktailDetail.data} />;
};
export default DetailsScreen;
