import React, {useRef, useState} from "react";
import { Animated, Pressable, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
    onPress: Function
    style?: object
    liked?: Boolean
}

const AnimatedHeartButton = (props: Props) => {
    const animatedValue = useRef(new Animated.Value(1)).current;
    const [liked, setLiked] = useState<Boolean>(props.liked ? props.liked : false);
  
    const handleLikePress = () => {
        Animated.spring(animatedValue, {
          toValue: 1.1,
          friction: 5,
          useNativeDriver: true,
        }).start(() => {
          Animated.spring(animatedValue, {
            toValue: 1,
            friction: 20,
            useNativeDriver: true,
          }).start();
        })
      setLiked(!liked)
      props.onPress()
    };
    
  
    const animatedHeartStyle = {
      transform: [{ scale: animatedValue }],
    };
  
    return (
      <Pressable onPress={handleLikePress} style={props.style}>
        <Animated.View style={[animatedHeartStyle, {flexDirection: 'row', alignItems: 'center'}]}>
          <Icon name={liked ? 'ios-heart' : 'ios-heart-outline'} size={25} color={liked ? '#006B54' : 'black'} />
          <Text> {liked ? ' Liked' : ' Like'}</Text>
        </Animated.View>
      </Pressable>
    );
  };
  
  export default AnimatedHeartButton;
  