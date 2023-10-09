import React, {useState} from 'react';

import { TextInput, Provider as PaperProvider } from 'react-native-paper';

import { View, Text, TouchableOpacity, Image, StatusBar, StyleSheet, Pressable} from 'react-native';
import { postLogin } from '../service/login';
import Toast from 'react-native-toast-message';
import { storageItem } from '../functions/encryptedStorageFunctions';


const Login = ({ navigation }) => {
    // Dados do Usuário    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    handleDoubleTap = () => {
        setEmail('nichollaslimma734@gmail.com');
        setSenha('senha');
    }
    
    const theme = {
        colors: {
            primary: '#51A8A2',
        },
        roundness: 10,
    };

    const login = () =>{
        const data = {
            email:email,
            senha:senha
        }
        
        postLogin(data).then(async (res) => {
            const token = res.headers.authorization;
            try {
                await storageItem('token', token);
                setEmail('');
                setSenha('');
                navigation.navigate('Home');
            } catch (error) {
                console.error('Erro ao salvar token:', error);
            }
            
        }).catch(error => {
            Toast.show({
                type: 'error',
                text1: 'Usuario ou senha invalido...',
            });
            console.error('Erro', error.response);
        })
    }

    return(
    <View style={{ flex:1, backgroundColor: '#FFF' }}>
        <StatusBar backgroundColor='#FFF' barStyle={'dark-content'}/>
        <Pressable onLongPress={handleDoubleTap}><Image style={styles.logo} source={require('../assets/images/logoApp.png')}></Image></Pressable>
        <PaperProvider theme={theme}>
            <TextInput
                style={styles.usuario}
                mode="outlined"
                textColor="#545F71"
                placeholder="E-mail"
                value={email}
                onChangeText={(e) => setEmail(e)}>                
            </TextInput>    
            <TextInput
                style={styles.senha}
                mode="outlined"
                value={senha}   
                placeholder="Senha"
                placeholderTextColor ="#9BA5B7"
                textColor="#545F71"
                secureTextEntry
                right={<TextInput.Icon icon="eye" />}
                onChangeText={(e) => setSenha(e)}>
            </TextInput>
            <TouchableOpacity
                style={styles.btnlogin}
                title="Entrar"
                onPress={() =>{login()}}>
                <Text style={styles.textobtn}>Entrar</Text>
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

