import React from 'react';
import { View, Text, TouchableOpacity,  } from 'react-native';
import { StyleSheet } from 'react-native';
import BottomBar from './BottomBar';

const BemVindo = ({ navigation }) => (
    <View style={styles.container}>
        <Text> Bem vindo!</Text>
        <TouchableOpacity
            style={''}
            title="Login"
            onPress={() => navigation.navigate('Login')}>
            <Text style={''}>Logiiin</Text>
        </TouchableOpacity>
        <BottomBar />
    </View>
);

BemVindo.navigationOptions = {
    title: 'Login',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default BemVindo;
