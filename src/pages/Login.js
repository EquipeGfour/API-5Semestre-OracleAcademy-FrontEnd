import React from 'react';
import { View, Button, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';

const Login = ({ navigation }) =>(
    <View>
        <Text> Clique para retornar!</Text>
        <TouchableOpacity
            style={''}
            title="Login"
            onPress={() => navigation.navigate('Bem-vindo')}>
        <Text style={''}>Voltar</Text>
        </TouchableOpacity>
    </View>
);

Login.navigationOptions = {
    title: 'Home',
};
export default Login;

