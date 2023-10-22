import React, {useState} from 'react';

import { DefaultTheme,TextInput, Provider as PaperProvider } from 'react-native-paper';

import { View, Text, TouchableOpacity, Image, StatusBar, StyleSheet, Pressable} from 'react-native';
import { postLogin } from '../service/login';
import Toast from 'react-native-toast-message';
import { storageItem } from '../functions/encryptedStorageFunctions';


const Login = ({ navigation }) => {
    // Dados do Usuário    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isInputFocused, setInputFocused] = useState(false);

    handleDoubleTap = () => {
        setEmail('raniel.santos@email.com');
        setSenha('123456');
    }

    const [senhaVisivel, setSenhaVisivel] = useState(false); // Estado para controlar a visibilidade da senha

    const togglePasswordVisibility = () => {
      setSenhaVisivel(!senhaVisivel); // Inverte o estado de visibilidade da senha
    };

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
          primary: '#51A8A2', // Cor de foco
        },
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
                console.log(res.data.usuario)
                const usuario = res.data.usuario
                await storageItem('nome', usuario.nome);
                await storageItem("id", usuario._id)
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

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setInputFocused(false);
    };



    

    return(
    <View style={{ flex:1, backgroundColor: '#FFF' }}>
        <StatusBar backgroundColor='#FFF' barStyle={'dark-content'}/>
        <Pressable onLongPress={handleDoubleTap}><Image style={styles.logo} source={require('../assets/images/logoApp.png')}></Image></Pressable>
        <PaperProvider theme={theme} >
            <TextInput
                style={styles.usuario}
                mode="outlined"
                textColor="#545F71"
                label="Usuário"
                placeholder="E-mail"
                selectionColor='#545f71'
                value={email}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChangeText={(e) => setEmail(e)}>                
            </TextInput>    
            <TextInput
                style={styles.senha}
                mode="outlined"
                value={senha}
                label="Senha"   
                placeholder="Senha"
                placeholderTextColor ="#9BA5B7"
                textColor="#545F71"
                secureTextEntry={!senhaVisivel} // Use o estado para controlar a visibilidade da senha
                right={
                    <TextInput.Icon
                        icon="eye"
                        name={senhaVisivel ? 'eye-off' : 'eye'} // Alterne o ícone com base no estado de visibilidade da senha
                        onPress={togglePasswordVisibility}
                    />
                }
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
        backgroundColor:'transparent'
    },
    senha:{
        marginTop: 20,
        fontFamily: 'Inter',
        alignSelf: 'center',
        width: 325,
        borderRadius:200,   
        backgroundColor:'transparent'     
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

