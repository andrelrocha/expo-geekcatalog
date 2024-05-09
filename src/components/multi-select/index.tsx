import React, { useEffect, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import MultiSelect from 'react-native-multiple-select';
import { StyleProp, ViewStyle } from 'react-native';
import { styles } from './styles';
import { DropdownData } from '../../types/utils/dropDownDTO';

import { convertArrayToDropdown } from '../../services/utils/convertArrayToDropdown';

type DropdownProps<T extends FieldValues> = {
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
    name: Path<T>;
    data: any[];
    label: string;
    value: string;
    inputProps?: any; // Alterado para aceitar qualquer propriedade
    valueField?: string;
    labelField?: string;
    onChange?: (item: unknown) => void;
};

const MultiSelectDropdown = <T extends FieldValues>({
    control,
    name,
    icon,
    inputProps,
    placeholder,
    labelField, 
    valueField,
    onChange,
    label,
    value,
    ...props
}: DropdownProps<T>): React.ReactElement<any, string | React.JSXElementConstructor<any>> | null => {
    
    const dynamicDropdownStyles = {
        width: props.w || styles.dropdownContainer.width,
        height: props.h || styles.dropdownContainer.height,
        marginTop: props.mt || styles.dropdownContainer.marginTop,
        marginBottom: props.mb || styles.dropdownContainer.marginBottom,
        borderRadius: props.br || styles.dropdownContainer.borderRadius,
        shadowOpacity: props.shadowOpacity || styles.dropdown.shadowOpacity,
    };

    const [isFocus, setIsFocus] = useState(false);

    const [data, setData] = useState<DropdownData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const convertedData = convertArrayToDropdown(props.data, labelField || label, valueField || value);
                setData(convertedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [props.data]);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <MultiSelect
                    {...props}
                    style={[styles.dropdown, dynamicDropdownStyles, isFocus && { borderColor: styles.dropdown.borderColor }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    containerStyle={styles.itemStyle}
                    itemContainerStyle={styles.separatorStyle}
                    data={data}
                    hideTags={false}
                    fixedHeight={true}
                    hideDropdown={false}
                    hideSubmitButton={true}
                    onSelectedItemsChange={(selectedItems) => {
                        onChange(selectedItems);
                        setIsFocus(false);
                    }}
                    selectedItems={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    selectedItemTextColor={styles.selectedItemTextColor}
                    selectedItemIconColor={styles.selectedItemIconColor}
                    single={true}
                    searchInputPlaceholderText={placeholder}
                    searchInputPlaceholderColor={styles.inputSearchStyle}
                    selectText={placeholder}
                    styleDropdownMenu={styles.styleDropdownMenu}
                    styleInputGroup={styles.styleInputGroup}
                    styleItemsContainer={styles.styleItemsContainer}
                    styleSelectorContainer={styles.styleSelectorContainer}
                    styleTextDropdown={styles.styleTextDropdown}
                    styleTextDropdownSelected={styles.styleTextDropdownSelected}
                    styleTextTag={styles.styleTextTag}
                    styleTextInput={styles.styleTextInput}
                    styleRowList={styles.styleRowList}
                    styleRowListText={styles.styleRowListText}
                    styleItem={styles.itemStyle}
                    {...inputProps}
                />
            )}
        />
    );
}

export default MultiSelectDropdown;
