import React, {useState} from 'react';

import { TextInput, Provider as PaperProvider } from 'react-native-paper';

import { View, Text, TouchableOpacity, Image, StatusBar, StyleSheet} from 'react-native';
const Login = ({ navigation }) => {
    // Dados do Usuário    
    // const [email, setEmail] = useState('');
    // const [senha, setSenha] = useState('');
    
    const theme = {
        colors: {
          primary: '#51A8A2', // Cor da borda quando o campo está focado (clicado)
        },
        roundness: 10,
    };

    return(
    <View style={{ flex:1, backgroundColor: '#FFF' }}>
        <StatusBar backgroundColor='#FFF' barStyle={'dark-content'}/>
        <Image style={styles.logo} source={require('../assets/images/logoApp.png')}></Image>
        <PaperProvider theme={theme}>
            <TextInput
                style={styles.usuario}
                mode="outlined"
                textColor="#545F71"
                placeholder="E-mail">
            </TextInput>    
            <TextInput
                style={styles.senha}
                mode="outlined"   
                placeholder="Senha"
                placeholderTextColor ="#9BA5B7"
                textColor="#545F71"
                secureTextEntry
                right={<TextInput.Icon icon="eye" />}>
            </TextInput>
            <TouchableOpacity
                style={styles.btnlogin}
                title="Login"
                onPress={() => navigation.navigate('')}>
                <Text style={styles.textobtn}>Login</Text>
            </TouchableOpacity>
        </PaperProvider>
    </View>
)};

Login.navigationOptions = {
    title: 'Home',
};

const styles = StyleSheet.create({
    logo:{
        marginTop:50,
        alignSelf: 'center'
    },
    usuario:{
        marginTop: 100,
        fontFamily: 'Inter',
        alignSelf: 'center',
        width: 325,
    },
    senha:{
        marginTop: 20,
        fontFamily: 'Inter',
        alignSelf: 'center',
        width: 325,
        borderRadius:200        
    },
    btnlogin:{
        marginTop: 100,
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
    textobtn:{
        color: '#fff',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle:'normal',
        fontWeight: '600',
        lineHeight: 20,
        letterSpacing: -0.32
    }   
});

export default Login;

