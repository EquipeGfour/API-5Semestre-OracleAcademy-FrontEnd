import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import { StyleSheet } from 'react-native';


const BemVindo = ({ navigation }) => (
    <View style={{ flex:1, backgroundColor: '#FFF' }}>
        <StatusBar backgroundColor='#FFF' barStyle={'dark-content'}/>
        <Text style={styles.titulo1}>Be organized.</Text>
        <Text style={styles.titulo2}>Start now.</Text>
        <Image style={styles.logo} source={require('../assets/images/logoApp.png')}></Image>
        <TouchableOpacity
            style={styles.btnlogin}
            title="Login"
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textobtn}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.btncadastro}
            title="Cadastre-se"
            onPress={() => navigation.navigate('Cadastro-usuario')}>
            <Text style={styles.textobtn}>Cadastre-se</Text>
        </TouchableOpacity>
        <Text style={styles.empresa}>Desenvolvido por GFour Soluções Digitais</Text>

    </View>
);

BemVindo.navigationOptions = {
    title: 'Login',
};

const styles = StyleSheet.create({
    titulo1:{
        marginTop: 30,
        marginLeft: 35,
        color: '#51A8A2',
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 36,
        letterSpacing: -0.64
    },
    titulo2:{
        marginLeft: 35,
        color: '#545F71',
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 30,
        letterSpacing: -0.48
    },
    logo:{
        marginTop:100,
        alignSelf: 'center'
    },
    btnlogin:{
        marginTop: 200,
        width: 325,
        height: 48,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 20,
        border: 1,
        backgroundColor: '#51A8A2',  
    },
    btncadastro:{
        marginTop: 20,
        width: 325,
        height: 48,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 20,
        border: 1,
        backgroundColor: '#9CC9C9',
    },
    textobtn:{
        color: '#fff',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle:'normal',
        fontWeight: '600',
        lineHeight: 20,
        letterSpacing: -0.32
    },
    empresa:{
        marginTop: 50,
        textAlign: 'center',
        color: '#BAC0CA',
        fontFamily: 'Inter',
        fontSize: 12,
        fontStyle:'normal',
        fontWeight: '400',
        lineHeight: 20,
        letterSpacing: -0.24
    }
});

export default BemVindo;