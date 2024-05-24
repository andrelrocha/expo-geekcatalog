import React, { useCallback, useState } from "react";
import { Dimensions, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImageTouchable from "../image/image-touchable";
import Heading from "../heading";
import PaginationButtons from "../pagination-buttons";
import { colors } from "../../utils/colors";
import Modal from "../modal/modal-popup";
import ImageUriList from "../../types/image/ImageUriListDTO";
import TextWarning from "../text/text-warning";
import { GalleryVerticalIcon, GridIcon } from "../icons";
import Box from "../box";

type SectionListProps = {
    imageUris: ImageUriList[];
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
    grid?: boolean;
    setGrid?: (grid: boolean) => void;
    displayName?: boolean;
};

export default function ListImage(props: SectionListProps) {
    const [refreshing, setRefreshing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState<any>(null);

    const imageRenderItemGrid = () => {
        return (props.imageUris ?? []).map((item: any) => (
            <ImageTouchable 
                key={item.id}
                onPress={() => props.modalComponent && openModal(item) || props.navigate && props.navigate(item.id)}
                source={{ uri: item.uri }}
                alt={props.alt}
                br={10}
                w={150}
                h={150}
            />
        ));
    };

    const imageRenderItemVertical = () => {
        return (props.imageUris ?? []).map((item: any) => (
            <Box alignItems="center" key={item.id}>
                <ImageTouchable 
                    key={item.id}
                    onPress={() => props.modalComponent && openModal(item) || props.navigate && props.navigate(item.id)}
                    source={{ uri: item.uri }}
                    alt={props.alt}
                    br={10}
                    w={250}
                    h={250}
                />
                {props.displayName && <Text style={styles.textImage}>{item.name}</Text>}
            </Box>
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

    const handleDisplay = () => {
        if (props.grid) {
            return <GalleryVerticalIcon color={colors.black} size={26}/>;
        } else {
            return <GridIcon color={colors.black} size={26}/>;
        }
    };

    const screenWidth = Dimensions.get('window').width;
    const headingWidth = (screenWidth / 2)*1.1;
    const otherElementWidth = screenWidth / 6;

    const renderHeader = () => (
        <View style={styles.containerHeader}>
            <View style={{ width: otherElementWidth }} />
            <Heading w={headingWidth} fs={32} mb={20} mt={20}>{props.title}</Heading>
            <TouchableOpacity style={{width: otherElementWidth}} onPress={() => props.setGrid && props.setGrid(!props.grid)}>
                {handleDisplay()}
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
        <View style={styles.container}>
            {props.isLoading ? (
                <TextWarning mt={50} w={300} fs={20} h={40} fw="bold">Loading...</TextWarning>
            ) : (
                <ScrollView 
                    contentContainerStyle={styles.containerImage}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh} 
                        />
                    }    
                >
                    {renderHeader()}

                    {props.grid ? (
                        imageRenderItemGrid()
                    ) : (
                        imageRenderItemVertical()
                    )}

                    <Box alignItems="center">
                        {renderFooter()}
                    </Box>

                </ScrollView>
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

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
    },
    containerImage: {
        justifyContent: "center",
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        paddingTop: 20,
        overflow: 'hidden',
    },
    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
    },
    textImage: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
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