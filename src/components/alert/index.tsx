import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { CloseIcon } from "../icons";
import { colors } from '../../utils/colors';

type AlertOptions = {
    label: string;
    icon?: React.ReactNode;
    onPress: () => void;
};

type AlertProps = {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    alertOptions: AlertOptions[];
}

const CustomAlert = (props: AlertProps) => {
  const closeAlert = () => {
    props.setIsVisible(false);
  };

  return (
    <View>
      <Modal
        isVisible={props.isVisible}
        onBackdropPress={closeAlert}
        onBackButtonPress={closeAlert}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={closeAlert} style={styles.closeIcon}>
            <CloseIcon size={26}/>
          </TouchableOpacity>
          {props.alertOptions.map((option, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() => {
                  option.onPress();
                  closeAlert();
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{option.label}</Text>
                {option.icon}
              </TouchableOpacity>
              {index < props.alertOptions.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: '60%',
    backgroundColor: colors.whiteSmoke,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 4,
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    width: '70%',
  },
});

export default CustomAlert;
