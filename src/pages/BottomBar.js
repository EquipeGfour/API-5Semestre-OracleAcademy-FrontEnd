import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

verdeEscuro = "#346c68"

const BottomBar = ({ onIconPress }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Bem-vindo')} style={styles.icon}>
                <Icon name="home" size={30} color={verdeEscuro} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onIconPress('icon2')} style={styles.icon}>
                <Icon name="plus-circle" size={30} color= {verdeEscuro} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onIconPress('icon3')} style={styles.icon}>
                <Icon name="chart-bar" size={30} color= {verdeEscuro} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderColor: 'lightgray',
    },
    icon: {
        padding: 10,
    },
});


export default BottomBar;
