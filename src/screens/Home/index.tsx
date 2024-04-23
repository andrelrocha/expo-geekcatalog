import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@gluestack-ui/themed';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './styles';
import PageDefault from '../Default';
import ButtonTouchable from '../../components/button/button-touchable';
import { colors } from '../../utils/colors';

const gamerImg = require('../../assets/gamer.png');

export default function Home({ navigation }: NativeStackScreenProps<ParamListBase>) {
    return (
        <PageDefault>
            <View style={styles.containerTitle}>
                <Text style={[styles.title]}>Welcome!</Text>
                <Text style={styles.subtitle}>What about change your gaming experience better managing your backlog? Join our app!</Text>
            </View>

            <View style={styles.containerButton}>
                <ButtonTouchable 
                    onPress={() => {navigation.navigate('UserStack', { screen: 'Login' })}} 
                    mt={30}
                >Login
                </ButtonTouchable>
                <ButtonTouchable 
                    backgroundColor={colors.greenStrong}
                    mt={20}
                    onPress={() => {navigation.navigate('UserStack', { screen: 'SignUp' })}}
                >Sign-Up
                </ButtonTouchable>
            </View>
            
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={gamerImg}/>
            </View>
        </PageDefault>
    );
}