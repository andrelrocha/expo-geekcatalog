import React, { useCallback, useState } from "react";
import { Dimensions, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImageTouchable from "../image/image-touchable";
import Heading from "../heading";
import PaginationButtons from "../pagination-buttons";
import { colors } from "../../utils/colors";
import ImageUriList from "../../types/image/ImageUriListDTO";
import TextWarning from "../text/text-warning";
import { GalleryVerticalIcon, GridIcon, EllipsisIcon } from "../icons";
import Box from "../box";

type SectionListProps = {
    imageUris: ImageUriList[];
    title: string;
    elementsName?: string;
    onRefresh?: () => void;
    alt: string;
    onPressLoadStates?: (id: string) => void;
    navigate?: (id: string) => void;
    totalPages?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    isLoading?: boolean;
    grid?: boolean;
    setGrid?: (grid: boolean) => void;
    onLongPress?: (id: string) => void;
    displayName?: boolean;
    headingTop?: number;
    ellipsis?: boolean;
    ellipsisLoadStates?: () => void;
};

export default function ListImage(props: SectionListProps) {
    const [refreshing, setRefreshing] = useState(false);

    const imageRenderItemGrid = () => {
        return (props.imageUris ?? []).map((item: any) => (
            <ImageTouchable 
                key={item.id}
                onPress={() => props.onPressLoadStates && props.onPressLoadStates(item.id) || props.navigate && props.navigate(item.id)}
                onLongPress={() => props.onLongPress && props.onLongPress(item.id)}
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
                    onPress={() => props.onPressLoadStates && props.onPressLoadStates(item.id) || props.navigate && props.navigate(item.id)}
                    onLongPress={() => props.onLongPress && props.onLongPress(item.id)}
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
    
    const headingTop = props.headingTop !== undefined ? props.headingTop : 30;

    const renderHeader = () => (
        <View style={[styles.containerHeader, { marginTop: headingTop }]} >
            {props.ellipsis ? (
                <TouchableOpacity style={{width: otherElementWidth, alignItems: 'flex-end'}} 
                    onPress={() => props.ellipsisLoadStates && props.ellipsisLoadStates()}>
                    <EllipsisIcon color={colors.black} size={26}/>
                </TouchableOpacity>
            ): (
                <View style={{ width: otherElementWidth }} />
            )}
            <Heading w={headingWidth} fs={32}>{props.title}</Heading>
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
            {props.isLoading && props.imageUris.length != 0 ? (
                <TextWarning mt={50} w={300} fs={20} h={40} fw="bold">Loading...</TextWarning>
            ) : (
                props.imageUris.length === 0 ? (
                    <TextWarning backgroundColor={colors.whiteSmoke} mt={50} w={300} fs={20} h={40} fw="bold">Empty list. Add new {props.elementsName as string  || "entities"}!</TextWarning>
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
            ))}        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    containerImage: {
        justifyContent: "center",
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        paddingTop: 0,
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
    modalEllipsis: {
        position: 'absolute',
        zIndex: 10,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray,
    },
});