import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { styles } from './styles';
import { DropdownData } from '../../types/utils/dropDownDTO';

type DropdownProps = typeof MultiSelect & {
    mt?: number 
    mb?: number
    w?: number
    h?: number
    br?: number
    dynamicPropStyle?: StyleProp<ViewStyle>
    data: DropdownData[];
    icon?: React.ReactNode;
    onChange: (item: DropdownData) => void;
    selected: string[];
    placeholder: string;
    label: string;
} 

const DropdownSelection = (props: DropdownProps) => {
    const dynamicDropdownStyles = {
        width: props.w || styles.dropdownContainer.width,
        height: props.h || styles.dropdownContainer.height,
        marginTop: props.mt || styles.dropdownContainer.marginTop,
        marginBottom: props.mb || styles.dropdownContainer.marginBottom,
        borderRadius: props.br || styles.dropdownContainer.borderRadius,
    };

    const renderItem = (item: DropdownData) => {
        return (
            <View style={styles.item}>
                <Text style={styles.selectedTextStyle}>{item.label}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <MultiSelect
                valueField="id"
                labelField="label"
                value={props.selected}
                {...props}
                placeholder={props.placeholder}
                search
                onChange={(value: string[]) => {
                    const selectedItem = props.data.find(item => item.id === value[0]);
                    if (selectedItem) {
                        props.onChange(selectedItem);
                    }
                }}
                searchPlaceholder="Search..."
                style={[styles.dropdown, dynamicDropdownStyles]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={props.data}
                renderRightIcon={() => (
                    <View style={styles.dropdownIconContainer}>
                        {props.icon}
                    </View>
                )}
                renderItem={renderItem}
                renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                      <View style={styles.selectedStyle}>
                        <Text style={styles.textSelectedStyle}>{item.label}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
            />

        </View>
    );
}

export default DropdownSelection;