import React from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { StyleSheet } from 'react-native';
import BottomBar from './BottomBar';

const Login = ({ navigation }) =>(
    <View style={styles.container}>
        <Text> Clique para retornar!</Text>
        <TouchableOpacity
            style={''}
            title="Login"
            onPress={() => navigation.navigate('Bem-vindo')}>
        <Text style={''}>Voltar</Text>
        </TouchableOpacity>
        <BottomBar/>
    </View>
);

Login.navigationOptions = {
    title: 'Home',
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default Login;

