import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useVector} from 'react-native-redash';
import {SharedElement} from 'react-navigation-shared-element';
import {Drink} from '~api/drink/type';
import ThumbnailImage from '../atoms/Image/ThumbnaiImage';
import {SCREEN_WIDTH} from '../model';

type DetailTemplateProps = {
  item: Drink;
};

const DetailTemplate: React.FC<DetailTemplateProps> = ({item}) => {
  const navigation = useNavigation();
  const translate = useVector();

  const goBack = () => {
    navigation.goBack();
  };

  useAnimatedReaction(
    () => {
      return translate.y.value > 60;
    },
    isClosing => {
      if (isClosing) {
        runOnJS(goBack)();
      }
    },
    [translate, navigation],
  );

  const gestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: _ => {},
      onActive: event => {
        translate.x.value = event.translationX;
        translate.y.value = event.translationY;
      },
      onEnd: _ => {
        translate.x.value = 0;
        translate.y.value = 0;
      },
    });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translate.y.value}],
    };
  });

  const bodyAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translate.y.value}],
    };
  });
  const footerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translate.y.value}],
    };
  });

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/** HEADER */}
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.header_container, headerAnimatedStyle]}>
          <SharedElement id={item.idDrink} style={StyleSheet.absoluteFill}>
            <ThumbnailImage
              resizeMode="cover"
              blurRadius={3}
              image={item.strDrinkThumb}
              style={{height: '100%', width: '100%'}}
            />
          </SharedElement>
        </Animated.View>
      </PanGestureHandler>
      {/** BODY */}
      <Animated.View style={[styles.body_container, bodyAnimatedStyle]}>
        <Text>
          {item.strIngredient1}
          {item.strIngredient2}
          {item.strIngredient3}
          {item.strIngredient4}
        </Text>
      </Animated.View>
      {/** FOOTER */}
      <Animated.View style={footerAnimatedStyle}></Animated.View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          backgroundColor: 'red',
          top: '50%',
          height: 200,
          width: 100,
        }}></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
    position: 'absolute',
    top: 0,
    left: 0,
    minHeight: 200,
    width: SCREEN_WIDTH,
  },
  body_container: {
    position: 'absolute',
    top: 200,
    left: 0,
    minHeight: 200,
    backgroundColor: 'white',
    width: SCREEN_WIDTH,
  },
});

export default DetailTemplate;
