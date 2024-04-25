import {StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import { styles } from "../styles";
import { Image } from "@gluestack-ui/themed";

type ButtonProps = TouchableOpacityProps & {
    mt?: number 
    mb?: number
    ml?: number
    mr?: number
    w?: number
    h?: number
    br?: number
    alt?: string
    dynamicPropStyle?: StyleProp<ViewStyle>
    onPress: () => void
    source: any
} 

const PicTouchable = (props: ButtonProps) => {
    const dynamicProfilePicStyles = {
        width: props.w || styles.imageContainer.width,
        height: props.h || styles.imageContainer.height,
        marginTop: props.mt || styles.imageContainer.marginTop,
        marginBottom: props.mb || styles.imageContainer.marginBottom,
        marginLeft: props.ml || styles.imageContainer.marginLeft,
        marginRight: props.mr || styles.imageContainer.marginRight,
        borderRadius: props.br || styles.imageContainer.borderRadius,
    };

    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.imageContainer, dynamicProfilePicStyles, props.style]}>
            <Image source={props.source} style={styles.image} alt={props.alt} />

        </TouchableOpacity>
    );
}

/*
const profileUser = require('../../assets/profile_user.png');
<ProfilePicTouchable 
                onPress={() => { console.log('ProfilePicTouchable pressed')}} 
                source={gamerImg || profileUser}   
                mt={20} 
                alt='Profile Picture'
            />
*/

export default PicTouchable;