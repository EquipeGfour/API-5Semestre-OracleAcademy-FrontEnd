import React, {useState} from "react";
import {TextInput, Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text, TouchableOpacity,  Image, StatusBar, StyleSheet} from 'react-native';
import { Checkbox } from 'react-native-paper';

const CadastroUsuário = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [checked, setChecked] = React.useState(false);

    const theme = {
        colors: {
            primary: '#51A8A2', // Cor da borda quando o campo está focado (clicado)

        },
        roundness: 10,

    };

    return(
        <View style={{ flex:1, backgroundColor: '#FFF' }}>
            <StatusBar backgroundColor='#FFF' barStyle={'dark-content'}/>
            <Image style={styles.userimg} source={require('../assets/images/User.png')}></Image>
            <PaperProvider theme={theme}>
                <TextInput
                    style={styles.usuario}
                    mode="outlined"
                    textColor="#545F71"
                    label="Usuário">
                </TextInput>    
                <TextInput
                    style={styles.email}
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
                <View style={styles.termos}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}>
                    </Checkbox>
                    <Text>Eu aceito os termos de uso.</Text>
                </View>
                <TouchableOpacity
                    style={styles.btncadastro}
                    title="Cadastrar"
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.textobtn}>Cadastrar</Text>
                </TouchableOpacity>               
            </PaperProvider>
        </View>

    )
};

CadastroUsuário.navigationOptions = {
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
    },
    email:{
        marginTop: 20,
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

export default CadastroUsuário;