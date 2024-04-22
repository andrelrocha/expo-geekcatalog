import React from 'react';
import { Text, Image, View, Platform, StatusBar } from 'react-native';
import { styles } from './styles';

const logo = require('../../assets/controller-xbox.png');

const Header = (props: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.name}</Text>
            <Image source={logo} style={styles.logo} />
        </View>
    );
}

export default Header;