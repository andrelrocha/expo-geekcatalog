import { StyleProp, View, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ComponentProps, JSXElementConstructor, useEffect, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { InfoIcon } from "lucide-react-native";
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
    inputProps?: ComponentProps<typeof Dropdown>;
    valueField?: string;
    labelField?: string;
    onChange?: (item: unknown) => void;
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
    ...props
}: DropdownProps<T>): React.ReactElement<any, string | JSXElementConstructor<any>> | null => {
    
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
                <Dropdown
                    {...props}
                    style={[styles.dropdown, dynamicDropdownStyles, isFocus && { borderColor: styles.dropdown.borderColor }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    containerStyle={styles.itemStyle}
                    itemContainerStyle={styles.separatorStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField={"label"}
                    valueField={"value"}
                    placeholder={!isFocus ? placeholder : ''}
                    searchPlaceholder="Search"
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={async (item: DropdownData) => {
                        onChange(item.value);
                        setIsFocus(false);
                    }}
                    renderRightIcon={() => (
                        <View style={styles.dropdownIconContainer}>
                            {icon || <InfoIcon/>}
                        </View>
                    )}
                    
                />
            )}
        />
    );
}

export default DropdownSelection;