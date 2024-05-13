import { StyleProp, View, ViewStyle } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { ComponentProps, JSXElementConstructor, useEffect, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { styles } from './styles';
import { DropdownData } from '../../types/utils/dropDownDTO';
import { convertArrayToDropdown } from '../../services/utils/convertArrayToDropdown';
import { colors } from '../../utils/colors';

type MultiSelectProps<T extends FieldValues> = {
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
    valuesSelected?: string[];
    inputProps?: ComponentProps<typeof MultiSelect>;
    valueField?: string;
    labelField?: string;
    search?: boolean;
    displayInput?: string;
    disabled?: boolean;
    onChange?: (item: unknown) => void;
    itemBackgroundColor?: string;
};

const DropdownSelection = <T extends FieldValues>({
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
    search,
    disabled=false,
    ...props
}: MultiSelectProps<T>): React.ReactElement<any, string | JSXElementConstructor<any>> | null => {

    const dynamicDropdownStyles = {
        width: props.w || styles.dropdownContainer.width,
        height: props.h || styles.dropdownContainer.height,
        marginTop: props.mt || styles.dropdownContainer.marginTop,
        marginBottom: props.mb || styles.dropdownContainer.marginBottom,
        borderRadius: props.br || styles.dropdownContainer.borderRadius,
        shadowOpacity: props.shadowOpacity || styles.dropdown.shadowOpacity,
    };

    const dynamicItemStyle = {
        backgroundColor: props.itemBackgroundColor 
    };

    const [isFocus, setIsFocus] = useState(false);

    const [data, setData] = useState<DropdownData[]>([]);

    const [selected, setSelected] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const convertedData = convertArrayToDropdown(props.data, labelField || label, valueField || value);
                setData(convertedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        setSelected(props.valuesSelected || []);

        fetchData();
    }, [props.data, props.valuesSelected]);

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
                    search={search}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? placeholder : ''}
                    searchPlaceholder="Search"
                    value={selected}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(selectedItems: any) => {
                        setSelected(selectedItems);
                        onChange(selectedItems);
                        setIsFocus(false);
                    }}
                    renderRightIcon={() => (
                        <View style={styles.dropdownIconContainer}>
                            {icon}
                        </View>
                    )}
                    selectedStyle={[styles.selectedStyle, dynamicItemStyle]}
                    activeColor={colors.sage}
                    alwaysRenderSelectedItem={true}
                    disable={disabled}
                />
            )}
        />
    );
}

export default DropdownSelection;