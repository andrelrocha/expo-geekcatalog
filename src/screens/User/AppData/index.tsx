import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useUserAppData from "../../../context/hooks/user/useUserAppData";
import { Box, Heading, List, TextWarning } from "../../../components";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";


export default function UserAppData({ navigation }: NativeStackScreenProps<ParamListBase>) {
    const [currentPageUser, setCurrentPageUser] = useState(0);
    const { genresCount, getGameListGenres, fields, fieldsLabels, isLoading, paginationInfo } = useUserAppData({ page: currentPageUser });

    const reloadAppData = async () => {
        setCurrentPageUser(0);
        getGameListGenres();
    };

    useEffect(() => {
        reloadAppData();
    }, []);

    return (
        <View style={styles.container}>
            <Heading mt={20} textAlign="center" fs={26} mb={5}>Your App Data</Heading>

            {genresCount && genresCount.length === 0 ? (
                <Box>
                    <TextWarning mt={50} w={300} fs={20} h={40} fw="bold">No data found</TextWarning>
                </Box>
            ) : (
            <List
                data={genresCount}
                fields={fields}
                fieldsLabels={fieldsLabels}
                keyExtractor={(item) => item.id}
                isLoading={isLoading}
                title={'Your App Data'}
                itemTitle="genreName"
                headerShown={false}
                decelerationRate="fast"
                totalPages={paginationInfo.totalPages}
                currentPage={currentPageUser}
                onPageChange={setCurrentPageUser}
                onRefresh={reloadAppData}
                itemStyle={styles.itemStyle}
            />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingBottom: 40,
    },
    itemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
});
