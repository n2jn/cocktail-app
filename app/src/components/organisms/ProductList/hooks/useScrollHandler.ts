import { useAnimatedScrollHandler } from "react-native-reanimated";
import { SharedGestureObject } from "../../../../hooks/type";

export const useScrollHandler = (
    {translation, isGestureBeingUsed}: SharedGestureObject,
  ) => {
    const scrollHandler = useAnimatedScrollHandler({
      onScroll: event => {
        translation.y.value = event.contentOffset.y;
        translation.x.value = event.contentOffset.x;
      },
      onBeginDrag: e => {
        isGestureBeingUsed.value = true;
      },
      onEndDrag: e => {
        isGestureBeingUsed.value = false;
      },
      onMomentumBegin: () => {
        isGestureBeingUsed.value = true;
      },
      onMomentumEnd: e => {
        isGestureBeingUsed.value = false;
      },
    });
  
    return scrollHandler;
  };
  