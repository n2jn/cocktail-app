import {useCallback} from 'react';
import useDimension from '../../../hooks/useDimension';
import {Drink} from '../../../store/thecocktaildb/type';
import ProductCard from '../../molecules/ProductCard';

import Shared from '../../Shared';
import {DEFAULT_CARD_HEIGHT, DEFAULT_CARD_WIDTH} from './model';
import {CursorSVG} from '../../molecules/Slider/cursor';

type TemplateProps = {
  drinks: Drink[];
  onCocktailPress: (id: string) => () => void;
};

const SelectionPageTemplate: React.FC<TemplateProps> = ({
  drinks,
  onCocktailPress,
}) => {
  const padding = 0;

  const cardSize = useDimension(DEFAULT_CARD_WIDTH, DEFAULT_CARD_HEIGHT);

  // const listViewSize = useDimension(DEFAULT_LIST_WIDTH, DEFAULT_LIST_HEIGHT);

  // const sliderDimension = useDimension(DEFAULT_CARD_WIDTH, DEFAULT_CARD_HEIGHT);
  const cursorDimension = useDimension(50 - padding, 50);

  const renderCard = useCallback(
    ({item}: {item: Drink}) => {
      return (
        <ProductCard
          imageUrl={item.strDrinkThumb}
          dimension={cardSize}
          onPress={onCocktailPress(item.idDrink)}
        />
      );
    },
    [cardSize],
  );

  return (
    <>
      <Shared.Wrapper>
        {/** drink list  */}
        <Shared.List
          style={{height: '50%', width: '100%', backgroundColor: 'red'}}
          data={drinks}
          renderItem={renderCard}
          itemSize={cardSize}
        />
        <Shared.Slider
          style={{width: '100%', height: '10%', backgroundColor: 'green'}}>
          <CursorSVG />
        </Shared.Slider>
        {/** Slider component */}
        {/* <Slider containerSize={sliderDimension} cursorSize={cursorDimension} /> */}

        {/* <Shared.Slider>
        </Shared.Slider> */}
      </Shared.Wrapper>
    </>
  );
};

export default SelectionPageTemplate;
