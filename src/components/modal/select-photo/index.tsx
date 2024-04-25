import React from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import ButtonTouchable from "../../button/button-touchable";
import { colors } from "../../../utils/colors";
import { handleImageSelection } from "../../../services/image/getImageFromUser"; 

type PhotoSelectionModalProps = {
    visible: boolean;
    onRequestClose: () => void;
    onCameraPress?: () => void;
    onGalleryPress?: () => void;
};  

const PhotoSelectionModal = (props: PhotoSelectionModalProps) => {
  return (
    <Animatable.View 
      animation="slideInUp" 
      duration={500} 
      style={[styles.modalContainer, { display: props.visible ? "flex" : "none" }]}
    >
      <View style={styles.modalContent}>
        <View style={styles.buttonContainer}>
            <ButtonTouchable w={300} onPress={props.onCameraPress ? props.onCameraPress : () => handleImageSelection({ mode: 'camera' })}>
            Take a Picture
            </ButtonTouchable>
            <ButtonTouchable w={300} onPress={props.onGalleryPress ? props.onGalleryPress : () => handleImageSelection({ mode: 'gallery' })}>
            Select from Gallery
            </ButtonTouchable>
            <ButtonTouchable w={300} backgroundColor={colors.redStrong} onPress={props.onRequestClose}>
                Cancel
            </ButtonTouchable>
        </View>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        zIndex: 10,
        bottom: 0,
        left: 0,
        right: 0,
        height: '120%',
        backgroundColor: colors.grayOpacity,
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
        backgroundColor: colors.gray,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 100,
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'column', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        gap: 20,
    },
});

export default PhotoSelectionModal;
