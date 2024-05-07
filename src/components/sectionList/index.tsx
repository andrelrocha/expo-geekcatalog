import { SectionList as GLSectionList } from "@gluestack-ui/themed";
import { ComponentProps, ReactNode } from "react";
import { colors } from "../../utils/colors";
import { styles } from "./styles";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import Heading from "../heading";
import TextWarning from "../text/text-warning";
import Text from "../text/text";


type SectionListProps = {
    children: ReactNode;
    title: string;
    data: Array<any>;
    fields: Array<string>;
    key: string;
    isLoading: boolean;
    mt?: number;
    mb?: number;
    fs?: number;
    color?: string;
    textAlign?: string;
    w?: number;
} & ComponentProps<typeof GLSectionList>;

export default function SectionList (props: SectionListProps) {
    const defaultRenderItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                {props.fields.map((field, index) => (
                    <Text key={index} style={styles.itemText as ViewStyle}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}: {item[field]}
                    </Text>
                ))}
            </TouchableOpacity>
        );
    };

    const renderHeader = () => (
        <Heading fs={32} mb={20}>{props.title}</Heading>
    );

    const id = props.key;

    return (
        <View style={styles.container}>
            {props.isLoading ? (
                <TextWarning w={200}>Carregando...</TextWarning>
            ) : (
                <GLSectionList
                    sections={[{ data: props.data }]}
                    renderItem={({ item }) => defaultRenderItem({ item })}
                    renderSectionHeader={() => null}
                    keyExtractor={(item: any) => item[id].toString()}
                    ListHeaderComponent={renderHeader}
                    showsVerticalScrollIndicator={false}
                    decelerationRate="fast"
                    //renderSectionFooter={() => <View style={{ height: 20 }} />  - FALTA IMPLEMENTAR PAGINAÇÃO
                />
            )}
        </View>
    );
}