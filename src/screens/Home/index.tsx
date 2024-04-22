import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@gluestack-ui/themed';
import { styles } from './styles';
import gamerImg from '../../assets/gamer.png';
import PageDefault from '../Default';
import ButtonTouchable from '../../components/button/button-touchable';
import { colors } from '../../utils/colors';

export default function Home() {
    return (
        <PageDefault>
            <View style={styles.containerTitle}>
                <Text style={[styles.title]}>Welcome!</Text>
                <Text style={styles.subtitle}>What about change your gaming experience better managing your backlog? Join our app!</Text>
            </View>

            <View style={styles.containerButton}>
                <ButtonTouchable>Login</ButtonTouchable>
                <ButtonTouchable backgroundColor={colors.greenStrong}>Sign-Up</ButtonTouchable>
            </View>
            
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={gamerImg}/>
            </View>
        </PageDefault>
    );
}