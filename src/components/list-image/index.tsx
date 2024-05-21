import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import ImageTouchable from "../image/image-touchable";
import Heading from "../heading";
import PageDefault from "../../screens/Default";
import PaginationButtons from "../pagination-buttons";
import { colors } from "../../utils/colors";
import Modal from "../modal/modal-popup";

type SectionListProps = {
    imageUris: ImageUri[];
    title: string;
    onRefresh?: () => void;
    alt: string;
    modalComponent?: boolean;
    modalContentService?: (key: string) => Promise<any>;
    modalItemTitle?: string;
    navigate?: (gameId: string) => void;
    totalPages?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    isLoading?: boolean;
};

type ImageUri = {
    id: string;
    uri: string;
}

export default function ListImage(props: SectionListProps) {
    const [refreshing, setRefreshing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState<any>(null);

    const imageRenderItem = () => {
        return (props.imageUris ?? []).map((item: any) => (
            <ImageTouchable 
                key={item.id}
                onPress={() => props.modalComponent && openModal(item) || props.navigate && props.navigate(item.id)}
                source={{ uri: item.uri }}
                alt={props.alt}
                br={10}
                w={150}
                h={200}
            />
        ));
    };

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
                if (value.length === 0) {
                    return null;
                }
                return (
                    <View key={key}>
                    <Text style={styles.modalItemLabel}>{capitalizeFirstLetter(key)}</Text>
                    {value.map((item: any, index: number) => (
                        <Text 
                            style={[
                                styles.modalListValue,
                                index === value.length - 1 ? { marginBottom: 10 } : { marginBottom: 5 }
                            ]} 
                            key={index}
                        >
                            {item}
                        </Text>
                    ))}
                </View>
                );
            } else {
                return (
                    <View key={key}>
                        <Text style={styles.modalItemLabel}>{capitalizeFirstLetter(key)}</Text>
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
        <View>
            <ScrollView 
                contentContainerStyle={styles.containerImage}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh} 
                    />
                }    
            >
                <Heading> {props.title} </Heading>
                {imageRenderItem()}
                {props.modalComponent && isOpen && !props.isLoading && (
                    <Modal
                        body={handleModalData(modalData)}
                        isOpen={isOpen}
                        onClose={closeModal}
                        title={props.modalItemTitle}
                    />
                )}
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    containerImage: {
        justifyContent: "center",
        alignItems: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        paddingTop: 20,
        overflow: 'hidden',
    },
    modalItemLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 5,
    },
    modalItemValue: {
        fontSize: 16,
        color: colors.black,
        marginBottom: 10,
    },
    modalListValue: {
        fontSize: 16,
        color: colors.black,
        marginBottom: 5,
    },
});