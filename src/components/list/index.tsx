import { FlatList as GLFlatList, SectionList as GLSectionList } from "@gluestack-ui/themed";
import React, { ComponentProps, useCallback, useState } from "react";
import { RefreshControl, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { styles } from "./styles";
import Heading from "../heading";
import PaginationButtons from "../pagination-buttons";
import TextWarning from "../text/text-warning";
import { GridIcon, GalleryVerticalIcon } from "../icons";
import { colors } from "../../utils/colors";
import Modal from "../modal/modal-popup";

type SectionListProps = {
    title: string;
    data: Array<any>;
    fields: Array<string>;
    fieldsLabels?: Array<string>;
    itemTitle: string;
    keyExtractor: (item: any) => string;
    isLoading: boolean;
    grid?: boolean;
    setGrid?: (grid: boolean) => void;
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
    onRefresh?: () => void;
    modalComponent?: boolean;
    modalContentService?: (key: string) => Promise<any>;
    modalItemTitle?: string;
} & ComponentProps<typeof GLSectionList>;

export default function List (props: SectionListProps) {
    const [refreshing, setRefreshing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState<any>(null);

    const onRefresh = useCallback(() => {
        setRefreshing(true); 
        if (props.onRefresh) {
            setTimeout(async () => {
                setRefreshing(false); 
                props.onRefresh && props.onRefresh(); 
                return;
            }, 2000);
        }
        setTimeout(async () => {
            setRefreshing(false); 
        }, 2000);
    }, []);

    const handleDisplay = () => {
        if (props.grid) {
            return <GalleryVerticalIcon color={colors.black} size={26}/>;
        } else {
            return <GridIcon color={colors.black} size={26}/>;
        }
    };

    const openModal = async (item: any) => {
        const itemId = item.id;

        const response = props.modalContentService && await props.modalContentService(itemId); 

        setModalData(response);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalData(null);
    };

    const defaultRenderItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity 
                style={styles.itemContainer}
                onPress={() => openModal(item)}
            >
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

    const gridRenderItem = ({ item }: { item: any }) => {
        const title = item[props.itemTitle].length > 25 ? `${item[props.itemTitle].substring(0, 25)}...` : item[props.itemTitle];

        return (
            <TouchableOpacity 
                style={styles.gridItemContainer}
                onPress={() => openModal(item)}    
            >
                <Text style={styles.gridItemTitle}>{title}</Text>
                {props.fields.map((field, index) => (
                    <Text key={index} style={styles.gridItemText}>
                        {item[field]}
                    </Text>
                ))}
            </TouchableOpacity>
        );
    };
    

    const renderHeader = () => (
        <View style={styles.containerHeader}>
            <View style={{width:50}}></View>
            <Heading w={250} fs={32} mb={20} mt={20}>{props.title}</Heading>
            <TouchableOpacity
                onPress={() => props.setGrid && props.setGrid(!props.grid)}
            >{handleDisplay()}
            </TouchableOpacity>
        </View>
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

    const handleModalData = (data: any) => {
        return Object.entries(data).map(([key, value]: any) => {
            if (Array.isArray(value)) {
                return (
                    <View key={key}>
                        <Text style={styles.modalItemLabel}>{capitalizeFirstLetter(key)}:</Text>
                        {value.map((item: any, index: number) => (
                            <Text key={index}>{item}</Text>
                        ))}
                    </View>
                );
            } else {
                return (
                    <View key={key}>
                        <Text style={styles.modalItemLabel}>{capitalizeFirstLetter(key)}:</Text>
                        <Text style={styles.modalItemValue}>{value}</Text>
                    </View>
                );
            }
        });
    };

    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <View style={styles.container}>
            {props.isLoading ? (
                <TextWarning w={200}>Carregando...</TextWarning>
            ) : (
                <>
                {!props.grid ? (
                    <GLSectionList
                        sections={[{ data: props.data }]}
                        renderItem={defaultRenderItem}
                        keyExtractor={(item: any) => item.id.toString()}
                        renderSectionHeader={() => null}
                        ListHeaderComponent={renderHeader}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={props.decelerationRate}
                        renderSectionFooter={renderFooter}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh} 
                            />
                        }
                    />
                ) : (
                    <GLFlatList
                        data={props.data}
                        renderItem={gridRenderItem}
                        keyExtractor={(item: any) => item.id.toString()}
                        numColumns={2}
                        ListHeaderComponent={renderHeader}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={props.decelerationRate}
                        ListFooterComponent={renderFooter}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh} 
                            />
                        }
                    />
                )}
             </>
            )}
     
            {props.modalComponent && isOpen && !props.isLoading && (
                <Modal
                    body={handleModalData(modalData)}
                    isOpen={isOpen}
                    onClose={closeModal}
                    title={props.modalItemTitle}
                />
            )}
        </View>

    );
}