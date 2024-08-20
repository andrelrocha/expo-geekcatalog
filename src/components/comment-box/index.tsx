import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AppStarRating from '../star-rating';
import { colors } from '../../utils/colors';
import GameCommentReturnDTO from "../../types/gameComment/GameCommentReturnDTO";

interface CommentBoxProps {
    data: GameCommentReturnDTO[];
    navigateToProfile?: (userId: string) => void;
}

const CommentBox: React.FC<CommentBoxProps> = ({ data, navigateToProfile }) => {
    return (
        <>
            {data.map(comment => (
                <View key={comment.id} style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigateToProfile && navigateToProfile(comment.userId)}>
                            <Text style={styles.username}>{comment.username}</Text>
                        </TouchableOpacity>
                        <AppStarRating
                            initialRating={comment.rating} 
                            rating={comment.rating}
                            maxStars={5}
                            starSize={20}
                            color={colors.buttonBlue}
                            emptyColor={colors.grayOpacity}
                            interactive={false}
                            style={styles.starRating}
                        />
                    </View>
                    <Text style={styles.comment}>{comment.comment}</Text>
                    <Text style={styles.timestamp}>
                        {`${new Date(comment.createdAt).toLocaleString()}`}
                    </Text>
                </View>
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: colors.grayOpacity,
        borderRadius: 8,
        backgroundColor: 'white',
        marginTop: 10,
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.buttonBlue,
    },
    starRating: {
        alignSelf: 'flex-end',
    },
    comment: {
        fontSize: 14,
        marginBottom: 5,
    },
    timestamp: {
        fontSize: 12,
        color: colors.gray,
    },
});

export default CommentBox;
