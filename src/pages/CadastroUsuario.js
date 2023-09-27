import React, {useState} from "react";
import { TextInput, Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text, TouchableOpacity, Image, StatusBar, StyleSheet} from 'react-native';

const CadastroUsuário = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');

    return(
        <View style={{ flex:1, backgroundColor: '#FFF' }}>
            <Text>Teste</Text>
        </View>

    )
};

CadastroUsuário.navigationOptions = {
    title:'Login'
}

const styles = StyleSheet.create({

});

export default CadastroUsuário;