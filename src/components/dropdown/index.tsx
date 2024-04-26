import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from './styles';
import { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import data from "./data";

type DropdownProps<T extends FieldValues> = typeof Dropdown & {
    control: Control<T>;
    mt?: number 
    mb?: number
    w?: number
    h?: number
    br?: number
    shadowOpacity?: number
    dynamicPropStyle?: StyleProp<ViewStyle>
    icon?: React.ReactNode;
    placeholder: string;
    label: string;
    name: Path<T>;
} 

const DropdownSelection = <T extends FieldValues>({
    control,
    name,
    icon,
    label,
    placeholder,
    ...props
}: DropdownProps<T>) => {
    
    const dynamicDropdownStyles = {
        width: props.w || styles.dropdownContainer.width,
        height: props.h || styles.dropdownContainer.height,
        marginTop: props.mt || styles.dropdownContainer.marginTop,
        marginBottom: props.mb || styles.dropdownContainer.marginBottom,
        borderRadius: props.br || styles.dropdownContainer.borderRadius,
        shadowOpacity: props.shadowOpacity || styles.dropdown.shadowOpacity,
    };

    const [isFocus, setIsFocus] = useState(false);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <Dropdown
                    {...props}
                    style={[styles.dropdown, dynamicDropdownStyles, isFocus && { borderColor: 'black' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? placeholder : ''}
                    searchPlaceholder="Search"
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item: { label: string; value: string }) => {
                        console.log(item);
                        onChange(item.value);
                        setIsFocus(false);
                    }}
                    renderRightIcon={() => (
                        <View style={styles.dropdownIconContainer}>
                            {icon}
                        </View>
                    )}
                />
            )}
        />
    );
}

export default DropdownSelection;