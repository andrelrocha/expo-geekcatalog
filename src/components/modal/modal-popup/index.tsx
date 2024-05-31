import React, { ReactNode } from "react";
import { View, StyleSheet, ScrollView, Dimensions, Text } from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import ButtonTouchable from "../../button/button-touchable";
import { colors } from "../../../utils/colors";
import Heading from "../../heading";
import { CloseIcon } from "../../icons";

const { width, height } = Dimensions.get('window');
const modalWidth = 0.8 * width;
const modalHeight = 0.7 * height;

type CustomModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onPrimaryBtnPress?: () => void;
    onSecondaryBtnPress?: () => void;
    primaryBtnText?: string;
    secondaryBtnText?: string;
    title?: string;
    body?: string | ReactNode;
};

const Modal = (props: CustomModalProps) => {
    const closeHandler = () => {
        if (props.isOpen) {
            props.onClose();
        }
    };

    return (
        <TapGestureHandler onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
                const modalTop = height / 2 - modalHeight / 2;
                const modalBottom = height / 2 + modalHeight / 2;

                const isInsideModal = (
                    nativeEvent.absoluteX >= width / 2 - modalWidth / 2 && nativeEvent.absoluteX <= width / 2 + modalWidth / 2 &&
                    nativeEvent.absoluteY >= modalTop && nativeEvent.absoluteY <= modalBottom
                );
    
                if (!isInsideModal) {
                    closeHandler();
                }
            }
        }}>
            <View style={[styles.modalContainer, { display: props.isOpen ? "flex" : "none" }]}>
                <Animatable.View 
                    animation="slideInUp" 
                    duration={500} 
                    style={[styles.modalContent, { width: modalWidth, height: modalHeight }]}
                >
                    <ButtonTouchable
                      onPress={closeHandler}
                      style={styles.closeIconContainer}
                     >
                        <CloseIcon size={35} />
                    </ButtonTouchable>

                    <View style={styles.headingContainer}>
                        {props.title && <Heading mb={10}>{props.title}</Heading>}
                    </View>

                    <ScrollView contentContainerStyle={styles.bodyContainer} showsVerticalScrollIndicator={false}>
                        <View style={styles.body}>
                            <View style={styles.scrollIndicator} />
                            <View style={styles.bodyContent}>
                                <ScrollView nestedScrollEnabled={true}>
                                  {typeof props.body === "string" ? <Text>{props.body}</Text> : props.body}
                                </ScrollView>
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        {props.secondaryBtnText && (
                            <ButtonTouchable 
                                onPress={() => props.onSecondaryBtnPress && props.onSecondaryBtnPress()}
                                backgroundColor={colors.redStrong}
                                w={150}
                            >
                                {props.secondaryBtnText}
                            </ButtonTouchable>
                        )}
                        {props.primaryBtnText && (
                            <ButtonTouchable 
                                onPress={() => props.onPrimaryBtnPress && props.onPrimaryBtnPress()}
                                backgroundColor={colors.buttonBlue}
                                w={150}
                            >
                                {props.primaryBtnText}
                            </ButtonTouchable>
                        )}
                    </View>
                </Animatable.View>
            </View>
        </TapGestureHandler>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        zIndex: 10,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray,
    },
    modalContent: {
        backgroundColor: colors.whiteSmoke,
        borderRadius: 12,
        padding: 20,
        position: 'relative',
    },
    closeIconContainer: {
        backgroundColor: colors.whiteSmoke,
        shadowOpacity: 0,
        position: 'absolute',
        top: 10,
        left: 0,
        zIndex: 0,
        width: 30,
        height: 30,
        marginTop: 10,
        marginLeft: 10,
    },
    headingContainer: {
        maxHeight: modalHeight * 0.2,
        width: '100%',
        justifyContent: 'center',
        marginTop: 30,
    },
    bodyContainer: {
        flexGrow: 1,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        overflow: 'hidden',
    },
    scrollIndicator: {
        width: '100%',
        height: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    bodyContent: {
        flex: 1,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        maxWidth: modalWidth,
        gap: 10,
    },
});

export default Modal;
