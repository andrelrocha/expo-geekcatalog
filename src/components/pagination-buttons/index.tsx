import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../utils/colors';

type PaginationButtonsProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

type PaginationButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  isActive?: boolean;
  btnStyle?: object;
  textStyle?: object;
  activeBtnStyle?: object;
  activeTextStyle?: object;
};

const PaginationButton = ({
  onPress = () => {},
  children,
  isActive = false,
  btnStyle,
  textStyle,
  activeBtnStyle,
  activeTextStyle,
}: PaginationButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        btnStyle,
        isActive ? (activeBtnStyle ? activeBtnStyle : styles.buttonActive) : {},
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.text,
          textStyle,
          isActive
            ? activeTextStyle
              ? activeTextStyle
              : styles.activeText
            : {},
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const PaginationButtons = ({ totalPages, currentPage, onPageChange }: PaginationButtonsProps) => {
  const buttons = [];
  const maxButtonsToShow = 5;

  if (totalPages <= maxButtonsToShow) {
    for (let i = 0; i < totalPages; i++) {
      buttons.push(
        <PaginationButton
          key={i}
          onPress={() => onPageChange(i)}
          isActive={i === currentPage}
        >
          {i + 1}
        </PaginationButton>
      );
    }
  } else {
    if (currentPage > 2) {
      buttons.push(
        <PaginationButton key="first" onPress={() => onPageChange(0)}>
          1
        </PaginationButton>
      );
      if (currentPage > 3) {
        buttons.push(
          <Text key="left-ellipsis" style={styles.ellipsis}>
            ...
          </Text>
        );
      }
    }

    const startPage = Math.max(currentPage - 1, 0);
    const endPage = Math.min(currentPage + 1, totalPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PaginationButton
          key={i}
          onPress={() => onPageChange(i)}
          isActive={i === currentPage}
        >
          {i + 1}
        </PaginationButton>
      );
    }

    if (currentPage < totalPages - 3) {
      if (currentPage < totalPages - 4) {
        buttons.push(
          <Text key="right-ellipsis" style={styles.ellipsis}>
            ...
          </Text>
        );
      }
      buttons.push(
        <PaginationButton key="last" onPress={() => onPageChange(totalPages - 1)}>
          {totalPages}
        </PaginationButton>
      );
    }
  }

  return (
    <View style={styles.container}>
      {currentPage > 0 && (
        <>
          <PaginationButton onPress={() => onPageChange(0)}>{'<<'}</PaginationButton>
          <PaginationButton onPress={() => onPageChange(currentPage - 1)}>{'<'}</PaginationButton>
        </>
      )}
      {buttons}
      {currentPage < totalPages - 1 && (
        <>
          <PaginationButton onPress={() => onPageChange(currentPage + 1)}>{'>'}</PaginationButton>
          <PaginationButton onPress={() => onPageChange(totalPages - 1)}>{'>>'}</PaginationButton>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: colors.gray,
    padding: 8,
    paddingHorizontal: 14,
    borderColor: colors.black,
    borderRadius: 14,
    marginHorizontal: 4,
    alignContent: 'center',
    marginBottom: 8,
  },
  buttonActive: {
    backgroundColor: colors.buttonBlue,
  },
  text: {
    color: colors.whiteSmoke,
    fontSize: 16,
    alignSelf: 'center',
  },
  activeText: {
    fontWeight: 'bold',
  },
  ellipsis: {
    color: colors.gray,
    fontSize: 16,
    marginHorizontal: 4,
    alignSelf: 'center',
  },
});

export default PaginationButtons;
