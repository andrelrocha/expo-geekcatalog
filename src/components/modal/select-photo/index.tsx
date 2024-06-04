import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { TapGestureHandler, State, PanGestureHandler } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import ButtonTouchable from "../../button/button-touchable";
import { MinusLineIcon } from "../../icons";
import { colors } from "../../../utils/colors";

type ImageSelectionModalProps = {
    visible: boolean;
    onRequestClose: () => void;
    onCameraPress?: () => void;
    onGalleryPress?: () => void;
    onRemovePress?: () => void; 
};  

const ImageSelectionModal = (props: ImageSelectionModalProps) => {
    const [translateY, setTranslateY] = useState(0);

    const closeHandler = () => {
        if (props.visible) {
            props.onRequestClose();
        }
    };

    useEffect(() => {
      if (props.visible) {
        Keyboard.dismiss();
      }
    }, [props.visible]);

    const handleGestureEvent = ({ nativeEvent }: { nativeEvent: any }) => {
        if (nativeEvent.translationY > 0) {
            setTranslateY(nativeEvent.translationY);
        }
    };

    const handleStateChange = ({ nativeEvent }: { nativeEvent: any }) => {
        if (nativeEvent.state === State.END) {
            if (nativeEvent.translationY > 50) {
                closeHandler();
            } else {
                setTranslateY(0);
            }
        }
    };

    const handleBackgroundPress = () => {
        closeHandler();
    };
  
    return (
      <TapGestureHandler onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          closeHandler();
        }
      }}>
        <PanGestureHandler onGestureEvent={handleGestureEvent} onHandlerStateChange={handleStateChange}>
              <View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
                  <Animatable.View 
                      animation="slideInUp" 
                      duration={500} 
                      style={styles.modalContent}
                  >
                    <View style={styles.buttonContainer}>
                        <View style={{ height: 40 }}>
                          <MinusLineIcon size={60} color={colors.black} />
                        </View> 
                        <ButtonTouchable w={350} onPress={props.onCameraPress}>
                            Take a Picture
                        </ButtonTouchable>
                        <ButtonTouchable w={350} onPress={props.onGalleryPress}>
                            Select from Gallery
                        </ButtonTouchable>
                        {props.onRemovePress && (
                            <ButtonTouchable w={350} backgroundColor={colors.redStrong} onPress={props.onRemovePress}>
                                Remove Picture
                            </ButtonTouchable>
                        )}
                        <ButtonTouchable w={350} backgroundColor={colors.redStrong} onPress={props.onRequestClose}>
                            Cancel
                        </ButtonTouchable>
                    </View>
                  </Animatable.View>
                  </View>
          </PanGestureHandler>
      </TapGestureHandler>

    );
  };
  

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        zIndex: 10,
        bottom: 0,
        left: 0,
        right: 0,
        height: '150%',
        backgroundColor: colors.grayOpacity,
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '25%',
        backgroundColor: colors.gray,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        paddingBottom: 80,
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'column', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        gap: 20,
    },
});

export default ImageSelectionModal;