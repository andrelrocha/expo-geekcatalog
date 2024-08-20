import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PageDefault from "../../Default";
import { StyleSheet, View } from "react-native";
import { Box, CustomListImage, Heading, ImageTouchable, Text } from "../../../components";
import usePublicProfile from "../../../context/hooks/user/usePublicProfile";
import { colors } from "../../../utils/colors";

type PublicProfileParams = {
    userId: string;
};

type RenderListProps = {
    lists: any;
    loadData: () => void;
    paginationInfo: any;
    buttonBottom: boolean;
};

type Props = NativeStackScreenProps<ParamListBase, 'PublicProfile'>;

export default function PublicProfile({navigation, route}: Props) {
    const { userId } = route.params as PublicProfileParams;

    const {profilePicUri, publicUserInfo, fetchProfilePic, isLoading, paginationPublicListInfo, setPaginationPublicListInfo, publicLists} = usePublicProfile(userId);

    const handlePageChange = (newPage: number) => {
        setPaginationPublicListInfo((prev) => {
            const { currentPage, pageSize, totalPages, totalElements } = prev;
    
            const updatedPage = newPage < 0 ? 0 : newPage >= totalPages ? totalPages - 1 : newPage;
    
            return {
                currentPage: updatedPage,
                pageSize,
                totalPages,
                totalElements,
            };
        });
    };
    
    const handleUserAge = () => {
        if (publicUserInfo?.birthday) {
            const birthDate = new Date(publicUserInfo.birthday);
            const ageDifMs = Date.now() - birthDate.getTime();
            const ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
        return '';
    }

    const handleNavigateToListsAppTab = (listId: string, listName: string) => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'ListsApp', params: { screen: 'ListAllListsApp' } }],
        });
    
        setTimeout(() => {
            navigation.navigate('ListGamesList', { listId, listName });
        }, 0);
    };

    const renderLists = ({lists, loadData, paginationInfo, buttonBottom}: RenderListProps) => {
        return (
            <View style={[styles.listContainer, buttonBottom && {paddingBottom: 60}]}>
                <CustomListImage
                    title="games"
                    data={lists}
                    keyExtractor={(item) => item.id.toString()}
                    isLoading={isLoading}
                    onRefresh={() => loadData()}
                    currentPage={paginationInfo?.currentPage}
                    totalPages={paginationInfo?.totalPages}
                    renderFooter={true}
                    decelerationRate="fast"
                    onPageChange={(page) => handlePageChange(page)}
                    navigate={(id, name) => handleNavigateToListsAppTab(id, name)}
                />
            </View>
        );  
    };

    return (
        <PageDefault
            onRefresh={() => {fetchProfilePic();}}
        >

            <Box w={400} mt={20} alignItems="center" >
                <ImageTouchable alt='Profile Picture' source={{uri: profilePicUri}} bw={5}/>
                <Heading mt={20} textAlign="center" fs={26} mb={5}>{publicUserInfo?.name || "User"}</Heading>
                <Box mt={10} alignItems="center" flexDirection="row" wrap="wrap">
                    <Text fs={18} color={colors.buttonBlue}>{publicUserInfo?.countryName + " - " + handleUserAge() + "y"}</Text>
                </Box>
                {publicLists.length > 0 && renderLists({lists: publicLists, loadData: fetchProfilePic, paginationInfo: paginationPublicListInfo, buttonBottom: false})}
            </Box>
        </PageDefault>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        width: '100%',
        paddingBottom: 0,
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        backgroundColor: colors.whiteSmoke,
        paddingTop: 5,
    },
    addButton: {
        alignItems: 'center',
    },
});
