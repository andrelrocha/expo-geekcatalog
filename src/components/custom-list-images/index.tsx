    import { Alert, Animated, RefreshControl, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
    import { Swipeable } from 'react-native-gesture-handler';
    import Box from "../box";
    import TextWarning from "../text/text-warning";
    import ListCountReturn from "../../types/listsApp/ListReturnDTO";
    import { colors } from "../../utils/colors";
    import { useCallback, useState } from "react";
    import ImageTouchable from "../image/image-touchable";
    import { SquarePenIcon, TrashIcon } from "../icons";
import PaginationButtons from "../pagination-buttons";

    type CustomListProps = {
        title: string;
        data: Array<ListCountReturn>;
        keyExtractor: (item: any) => string;
        isLoading: boolean;
        decelerationRate?: string;
        renderFooter?: boolean;
        totalPages?: number;
        currentPage?: number;
        onPageChange?: (page: number) => void;
        onRefresh?: () => void;
        modalComponent?: boolean;
        modalContentService?: (key: string) => Promise<any>;
        modalItemTitle?: string;
        navigate?: (id: string, name: string) => void;
        addButton?: boolean;
        rightOptions?: boolean;
        onDelete?: (id: any) => void;
        onUpdate?: (id: any) => void;
    };

    const BUTTON_RIGHT_WIDTH = 70;

    export default function CustomListImage(props: CustomListProps) {
        const [refreshing, setRefreshing] = useState(false);

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

        const handleDeletePress = (itemId: string) => {
            Alert.alert(
            'Confirmation',
            'Are you sure you want to delete this item? This action cannot be undone.',
            [
                {
                text: 'Cancel',
                style: 'cancel',
                },
                {
                text: 'OK',
                onPress: () => props.onDelete && props.onDelete(itemId),
                },
            ],
            { cancelable: false }
            );
        };

        const renderRightActions = (progress: any, dragX: Animated.AnimatedInterpolation<number>, item: any) => {
            const translateX = dragX.interpolate({
                inputRange: [-(BUTTON_RIGHT_WIDTH*2), 0],
                outputRange: [0, BUTTON_RIGHT_WIDTH*2],
                extrapolate: 'clamp',
            });
        
            const opacity = dragX.interpolate({
                inputRange: [-100, -20, 0],
                outputRange: [1, 0.5, 0],
                extrapolate: 'clamp',
            });
        
            return (
                <Animated.View style={[styles.rightActionsContainer, { transform: [{ translateX }], opacity }]}>
                    <TouchableOpacity style={styles.updateAction} onPress={() => props.onUpdate && props.onUpdate(item.id)}>
                        <SquarePenIcon />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteAction} onPress={() => handleDeletePress(item.id)}>
                        <TrashIcon />
                    </TouchableOpacity>
                </Animated.View>
            );
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

        const renderListsView = (lists: ListCountReturn[]) => {
            return (
                <>
                    {lists.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.listItemContainer}
                            onPress={() => props.navigate && props.navigate(item.id, item.name)}
                        >
                            <Swipeable
                                {...(props.rightOptions ? { renderRightActions: (progress, dragX) => renderRightActions(progress, dragX, item) } : {})}
                                overshootRight={false}
                                friction={1}
                            >
                                    <View style={styles.listItemTopContainer}>
                                        <Text style={styles.listItemName}>{item.name}</Text>
                                        <Text style={styles.listItemCount}>{item.count} {props.title}</Text>
                                    </View>
                                    {item.latestUris && item.latestUris.length > 0 && (
                                        <View style={styles.listItemImagesContainer}>
                                            {item.latestUris.map((uri, index) => (
                                                <ImageTouchable 
                                                    key={index} 
                                                    w={90} h={90} br={10} bw={1}
                                                    source={{uri}} 
                                                    alt={`${props.title} image`}
                                                />
                                            ))}
                                        </View>
                                    )}
                                    
                                    <Text style={styles.listDescription}>{item.description}</Text>
                            </Swipeable>
                        </TouchableOpacity>
                    ))}
                </>
            );
        }
        
        return (
            <ScrollView 
                contentInsetAdjustmentBehavior="automatic"
                automaticallyAdjustKeyboardInsets={true}
                keyboardShouldPersistTaps="handled" 
                horizontal={false}
                refreshControl={props.onRefresh ? (
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            ) : undefined}>
                <Box style={styles.container}>
                    {props.isLoading ? (
                        <TextWarning mt={20} w={300} fs={20} h={40} fw="bold">Loading...</TextWarning>
                    ) : (
                        props.data.length > 0 ? (
                            renderListsView(props.data)
                        ) : (
                            <TextWarning mt={20} w={300} fs={18} h={35}>No list found, create a new one!</TextWarning>
                        )
                    )}
                </Box>

                {props.renderFooter && (
                    <Box alignItems="center">
                        {renderFooter()}
                    </Box>
                )}

            </ScrollView>
        )
    }

    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        },
        listItemContainer: {
            flexDirection: 'column',
            width: '100%',
            borderBottomWidth: 1, 
            borderBottomColor: colors.grayOpacity, 
        },
        listItemTopContainer: {
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
        },
        listItemImagesContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginVertical: 10,
            gap: 10,
            paddingHorizontal: 10,
        },
        listItemCount: {
            textAlign: 'right',
            textAlignVertical: 'center',
            alignSelf: 'center',
            paddingRight: 5,
        },
        listItemName: {
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'left',
        },
        listDescription: {
            marginVertical: 10,
            paddingHorizontal: 10,
        },
        rightActionsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            height: '100%',
        },
        deleteAction: {
            backgroundColor: colors.redStrong,
            justifyContent: 'center',
            alignItems: 'center',
            width: BUTTON_RIGHT_WIDTH,
            height: '100%',
        },
        updateAction: {
            backgroundColor: colors.buttonBlue,
            justifyContent: 'center',
            alignItems: 'center',
            width: BUTTON_RIGHT_WIDTH,
            height: '100%',
        },
    });