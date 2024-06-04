import React from 'react';
import { StyleSheet, View, Switch, Text } from 'react-native';
import { colors } from '../../utils/colors';

type SwipeToggleProps = {
    isEnabled: boolean;
    setIsEnabled: (isEnabled: any) => void;
    label?: string;
    activeColor?: string;
    inactiveColor?: string;
}

const SwipeToggle = (props: SwipeToggleProps) => {
    const toggleSwitch = () => props.setIsEnabled((previousState: any) => !previousState);

    const toggleColors = {
        trackColor: {
            false: props.inactiveColor ? props.inactiveColor : colors.grayOpacity,
            true: props.activeColor ? props.activeColor : colors.buttonBlue
        },
        thumbColor: colors.whiteSmoke
    }

    return (
        <View style={styles.container}>
            <Switch
                trackColor={toggleColors.trackColor}
                thumbColor={toggleColors.thumbColor}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={props.isEnabled}
            />
            <Text style={styles.text}>{props.label}</Text>
        </View>
    );   
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12
    },
    text: {
        fontSize: 16,
    }
  });

export default SwipeToggle;
