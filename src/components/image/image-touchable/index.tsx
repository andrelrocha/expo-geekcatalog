import {Animated, Easing, Image, StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import { styles } from "../styles";

type ButtonProps = TouchableOpacityProps & {
    mt?: number 
    mb?: number
    ml?: number
    mr?: number
    w?: number
    h?: number
    br?: number
    alt?: string
    bw?: number
    dynamicPropStyle?: StyleProp<ViewStyle>
    onPress?: () => void
    onLongPress?: () => void
    source: any
} 

const ImageTouchable = (props: ButtonProps) => {
    const tiltAnim = new Animated.Value(0);

  const handleLongPress = () => {
    const trembleIntensity = 5; 
    const trembleDuration = 500; 

    Animated.sequence([
        Animated.timing(tiltAnim, {
            toValue: trembleIntensity,
            duration: trembleDuration / 4,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
        }),
        Animated.timing(tiltAnim, {
            toValue: -trembleIntensity,
            duration: trembleDuration / 4,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }),
        Animated.timing(tiltAnim, {
            toValue: trembleIntensity / 2,
            duration: trembleDuration / 4,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
        }),
        Animated.timing(tiltAnim, {
            toValue: -trembleIntensity / 2,
            duration: trembleDuration / 4,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }),

        Animated.timing(tiltAnim, {
            toValue: 0,
            duration: trembleDuration / 4,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
        }),
    ]).start();

    props.onLongPress?.();
    };

    const dynamicProfilePicStyles = {
        width: props.w || styles.imageContainer.width,
        height: props.h || styles.imageContainer.height,
        marginTop: props.mt || styles.imageContainer.marginTop,
        marginBottom: props.mb || styles.imageContainer.marginBottom,
        marginLeft: props.ml || styles.imageContainer.marginLeft,
        marginRight: props.mr || styles.imageContainer.marginRight,
        borderRadius: props.br || styles.imageContainer.borderRadius,
        borderWidth: props.bw || styles.imageContainer.borderWidth,
    };

    const interpolatedTilt = tiltAnim.interpolate({
        inputRange: [0, 10],
        outputRange: ['0deg', '10deg'], 
      });

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.imageContainer, dynamicProfilePicStyles, props.style]}
            onLongPress={handleLongPress}
        >
            {props.onLongPress ? (
                <Animated.Image
                    source={props.source}
                    style={[styles.image, { transform: [{ rotateZ: interpolatedTilt }] }]}
                    alt={props.alt}
                />
            ) : (
                <Image source={props.source} style={styles.image} alt={props.alt} />
            )}
        </TouchableOpacity>
        );
}

export default ImageTouchable;