import { StyleProp, View, ViewStyle } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { styles } from './styles';

interface DropdownData {
    id: string;
    name: string;
}

type DropdownProps = typeof MultiSelect & {
    mt?: number 
    mb?: number
    ml?: number
    mr?: number
    w?: number
    h?: number
    br?: number
    dynamicPropStyle?: StyleProp<ViewStyle>
    data: DropdownData[];
    icon?: React.ReactNode;
    onChange: (item: DropdownData) => void;
} 

const Dropdown = (props: DropdownProps) => {
    const dynamicDropdownStyles = {
        width: props.w || styles.dropdownContainer.width,
        height: props.h || styles.dropdownContainer.height,
        marginTop: props.mt || styles.dropdownContainer.marginTop,
        marginBottom: props.mb || styles.dropdownContainer.marginBottom,
        marginLeft: props.ml || styles.dropdownContainer.marginLeft,
        marginRight: props.mr || styles.dropdownContainer.marginRight,
        borderRadius: props.br || styles.dropdownContainer.borderRadius,
    };

    return (
        <MultiSelect
            labelField="name"
            valueField="id" 
            renderRightIcon={() => (
                <View style={styles.dropdownIconContainer}>
                    {props.icon}
                </View>
            )}
            {...props}
            style={[styles.dropdownContainer, dynamicDropdownStyles]}
        />
    );
}

export default Dropdown;