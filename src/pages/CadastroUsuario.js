import React, {useState} from "react";
import {DefaultTheme, TextInput, Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import { View, Text, TouchableOpacity,  Image, StatusBar, StyleSheet} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { postUsuarios } from "../service/usuario";
import { getStorageItem } from "../functions/encryptedStorageFunctions";
import Toast from "react-native-toast-message";

const CadastroUsuario = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [checked, setChecked] = React.useState(false);

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

    const cadastrarUsuario = async () => {
        const data = {
            nome:nome,
            email:email,
            senha:senha
        }
        const token = await getStorageItem('token');   
        postUsuarios(data, token).then(async (res) => {
            Toast.show({
                type: 'success',
                text1: 'Usuário Criado com sucesso!',
            });
            setEmail("");
            setSenha("");
            setNome("");
            navigation.navigate('Login');
        }).catch(error => {
            Toast.show({
                type: 'error',
                text1: 'Algo está errado, Contate o Administrador!',
            });
            console.error('Erro', error.response);
        })
    }

    return(
        <View style={{ flex:1, backgroundColor: '#FFF' }}>
            <StatusBar backgroundColor='#FFF' barStyle={'dark-content'}/>
            <Image style={styles.userimg} source={require('../assets/images/User.png')}></Image>
            <PaperProvider theme={theme}>
                <TextInput
                    style={styles.usuario}
                    mode="outlined"
                    textColor="#545F71"
                    label="Usuário"
                    value={nome}
                    onChangeText={(e) => setNome(e)}>
                </TextInput>    
                <TextInput
                    style={styles.email}
                    mode="outlined"
                    textColor="#545F71"
                    label='E-mail'
                    placeholder="E-mail"
                    value={email}
                    onChangeText={(e) => setEmail(e)}>
                </TextInput>    
                <TextInput
                    style={styles.senha}
                    mode="outlined"
                    label="Senha"   
                    placeholder="Senha"
                    placeholderTextColor ="#9BA5B7"
                    textColor="#545F71"
                    secureTextEntry={!senhaVisivel} // Use o estado para controlar a visibilidade da senha
                    right={
                        <TextInput.Icon
                            icon='eye'
                            name={senhaVisivel ? 'eye' : 'eye-slash'} // Alterne o ícone com base no estado de visibilidade da senha
                            onPress={togglePasswordVisibility}
                        />
                    } 
                    onChangeText={(e) => setSenha(e)}>
                </TextInput>
                <View style={styles.termos}>
                    {/* <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}>
                    </Checkbox>
                    <Text>Eu aceito os termos de uso.</Text> */}
                </View>
                <TouchableOpacity
                    style={styles.btncadastro}
                    title="Cadastrar"
                    onPress={() =>{cadastrarUsuario()}}>
                    {/* onPress={() => navigation.navigate('Login')}> */}
                    <Text style={styles.textobtn}>Cadastrar</Text>
                </TouchableOpacity>               
            </PaperProvider>
        </View>

    )
};

CadastroUsuario.navigationOptions = {
    title:'Login'
}

const styles = StyleSheet.create({
    userimg:{        
        marginTop: 50,
        width: 120,
        height: 120,
        alignSelf:'center',        
    },
    usuario:{
        marginTop: 50,
        fontFamily: 'Inter',
        alignSelf: 'center',
        width: 325,
        backgroundColor:'transparent'
    },
    email:{
        marginTop: 20,
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
    termos:{
        marginTop:10,
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        alignSelf:'center',
    },
    btncadastro:{
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

export default CadastroUsuario;