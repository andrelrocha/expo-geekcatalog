import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import Box from "../box";
import TextWarning from "../text/text-warning";
import ListCountReturn from "../../types/listsApp/ListReturnDTO";
import { colors } from "../../utils/colors";
import { useCallback, useState } from "react";
import ImageTouchable from "../image/image-touchable";

type CustomListProps = {
    title: string;
    data: Array<ListCountReturn>;
    keyExtractor: (item: any) => string;
    isLoading: boolean;
    decelerationRate?: string;
    totalPages?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    onRefresh?: () => void;
    modalComponent?: boolean;
    modalContentService?: (key: string) => Promise<any>;
    modalItemTitle?: string;
    navigate?: (gameId: string) => void;
};

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

    const renderListsView = (lists: ListCountReturn[]) => {
        return (
            <>
                {lists.map((item) => (
                    <View key={item.id} style={styles.listItemContainer}>
                        <View style={styles.listItemTopContainer}>
                            <Text style={styles.listItemName}>{item.name}</Text>
                            <Text style={styles.listItemCount}>{item.count} {props.title}</Text>
                        </View>
                        {item.latestUris && item.latestUris.length > 0 && (
                            <View style={styles.listItemImagesContainer}>
                                {item.latestUris.map((uri, index) => (
                                    <ImageTouchable 
                                        key={index} 
                                        w={100} h={100} br={10} bw={1}
                                        source={{uri}} 
                                        alt={`${props.title} image`}
                                    />
                                ))}
                            </View>
                        )}
                        
                        <Text style={styles.listDescription}>{item.description}</Text>
                    </View>
                ))}
            </>
        );
    }
    
    
    return (
        <ScrollView 
            contentInsetAdjustmentBehavior="automatic"
            automaticallyAdjustKeyboardInsets={true}
            keyboardShouldPersistTaps="handled" 
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
        paddingHorizontal: 10,
        borderBottomWidth: 1, 
        borderBottomColor: colors.grayOpacity, 
    },
    listItemTopContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItemImagesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 10,
    },
    listItemCount: {
        textAlign: 'right',
        textAlignVertical: 'center',
        alignSelf: 'center',
    },
    listItemName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    listDescription: {
        marginVertical: 10
    },
});