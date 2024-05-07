import { SectionList as GLSectionList } from "@gluestack-ui/themed";
import React, { ComponentProps, ReactNode } from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { styles } from "./styles";
import Heading from "../heading";
import PaginationButtons from "../pagination-buttons";
import TextWarning from "../text/text-warning";


type SectionListProps = {
    title: string;
    data: Array<any>;
    fields: Array<string>;
    fieldsLabels?: Array<string>;
    itemTitle: string;
    keyExtractor: (item: any) => string;
    isLoading: boolean;
    decelerationRate?: string;
    totalPages?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
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
                <Text style={styles.itemTitle}>{item[props.itemTitle]}</Text>
                {props.fields.map((field, index) => (
                    <Text key={index} style={styles.itemText as ViewStyle}>
                        {props.fieldsLabels && props.fieldsLabels[index]
                            ? `${props.fieldsLabels[index]}: ${item[field]}`
                            : `${field.charAt(0).toUpperCase() + field.slice(1)}: ${item[field]}`}
                    </Text>
                ))}
            </TouchableOpacity>
        );
    };

    const renderHeader = () => (
        <Heading fs={32} mb={20}>{props.title}</Heading>
    );

    const renderFooter = () => {        
        return (
            <PaginationButtons 
                totalPages={props.totalPages as number} 
                currentPage={props.currentPage as number} 
                onPageChange={props.onPageChange as (page: number) => void}
            />
        );
    };

    return (
        <View style={styles.container}>
            {props.isLoading ? (
                <TextWarning w={200}>Carregando...</TextWarning>
            ) : (
                <GLSectionList
                    sections={[{ data: props.data }]}
                    renderItem={({ item }: { item: any }) => defaultRenderItem({ item })}
                    renderSectionHeader={() => null}
                    keyExtractor={(item: any) => item.id.toString()}
                    ListHeaderComponent={renderHeader}
                    showsVerticalScrollIndicator={false}
                    decelerationRate={props.decelerationRate}
                    renderSectionFooter={renderFooter}
                />
            )}
        </View>
    );
}