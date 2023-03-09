import React, {useCallback} from 'react';
import {RootStackScreenProps} from '../navigation/types';
import Shared from 'react-native-shared-gesture';
import {Icon} from '~components/atoms/Icon';
import {CARD_HEIGHT, CARD_WIDTH} from '~components/molecules/ProductCard/model';
import {useIngredient} from '~hooks/useIngredient';
import {PlaceholderCard} from '~components/molecules/PlaceholderCard';

export const IngredientScreen: React.FC<RootStackScreenProps<'Ingredient'>> = ({
  navigation,
}) => {
  const {data: Ingredient, isLoading} = useIngredient('list', {});

  const cardDimension = {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  };

  const renderitem = useCallback(() => {
    return <PlaceholderCard cardSize={cardDimension} />;
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <Shared.Wrapper>
        <Shared.List
          itemSize={cardDimension}
          style={{backgroundColor: 'red'}}
          data={Ingredient}
          renderItem={renderitem}
        />
        <Shared.Slider style={{width: '100%', height: 32}}>
          <Icon size={16} name={'heart'} />
        </Shared.Slider>
      </Shared.Wrapper>
    </>
  );
};

export default IngredientScreen;
