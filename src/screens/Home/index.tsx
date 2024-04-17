import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import gamerImg from '../../assets/gamer.png';

export default function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={[styles.title]}>Welcome!</Text>
                <Text style={styles.subtitle}>What about change your gaming experience better managing your backlog? Join our app!</Text>
            </View>

            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign-In</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={gamerImg}/>
            </View>
        </View>
    );
}