import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppStarRating from '../star-rating';
import { colors } from '../../utils/colors';
import GameCommentReturnDTO from "../../types/gameComment/GameCommentReturnDTO";

interface CommentBoxProps {
    data: GameCommentReturnDTO[];
}

const CommentBox: React.FC<CommentBoxProps> = ({ data }) => {
    return (
        <>
            {data.map(comment => (
                <View key={comment.id} style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.username}>{comment.username}</Text>
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
