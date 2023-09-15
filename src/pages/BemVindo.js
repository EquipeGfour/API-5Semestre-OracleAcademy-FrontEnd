import React from 'react';
import { View, Button, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';

const BemVindo = ({ navigation }) =>(
    <View>
        <Text> Bem vindo!</Text>
        <TouchableOpacity
            style={''}
            title="Login"
            onPress={() => navigation.navigate('Login')}>
        <Text style={''}>Login</Text>
        </TouchableOpacity>
    </View>
);

BemVindo.navigationOptions = {
    title: 'Login',
};

export default BemVindo;