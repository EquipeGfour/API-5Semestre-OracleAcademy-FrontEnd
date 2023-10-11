import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button, DataPikerIOS } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { TextInput, PaperProvider, Provider,DefaultTheme  } from 'react-native-paper';
import DropdownComponent from './DropDownPrioridadeObjetivo';
import BemVindo from '../pages/BemVindo';
import { postObjetivos } from '../service/objetivo';
import { getStorageItem } from '../functions/encryptedStorageFunctions';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const colors = {
    verde: "#51A8A2",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff",
    cinza: "#9BA5B7"
};

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
      primary: colors.verde, // Cor de foco
    },
};

const BottomBarObjetivos = ({ onIconPress }) => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isInputFocused, setInputFocused] = useState(false);

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataEstimada, setDataEstimada] = useState("");
    const [prioridade, setPrioridade] = useState("");

    const criarObjetivo = async () =>{
        const obj = {titulo: nome, descricao:descricao, data_estimada: dataEstimada, prioridade:prioridade, workspace:false}
        const token = await getStorageItem('token');       
        postObjetivos(obj,token).then((res) => {
            setNome('')
            setDescricao('')
            setDataEstimada('')
            setPrioridade('')
            closeModal(false)
        }).catch(error => {
            console.error('Erro', error);
        });
    }

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };


    return (
        <View style={styles.container}>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.icon}>
                <Icon name="home" size={30} color={colors.verde} />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={openModal} style={styles.icon}>
                <Icon name="plus-circle" size={30} color={colors.verde} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onIconPress('Login')} style={styles.icon}>
                <Icon name="chart-bar" size={30} color={colors.verde} />
            </TouchableOpacity>

            <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
            <PaperProvider theme={theme}>
                <View style={styles.modalContainer}>
                    {/* <Text style = {{fontSize: 20}}>Criar Objetivos</Text> */}
                    <TextInput style = {styles.modalText}
                        mode='outlined'
                        label= 'Nome'
                        multiline={true} 
                        placeholder='Nome'
                        value={nome} onChangeText={(e) => setNome(e)}/>
                    <TextInput style = {styles.modalText}  
                        mode='outlined'
                        label= 'Descrição'
                        multiline={true} 
                        placeholder='Descrição' 
                        value={descricao} onChangeText={(e) => setDescricao(e)}/>
                    <TextInput style = {styles.modalText}
                        mode='outlined'
                        label= 'DD/MM/AAAA'
                        multiline={true} 
                        placeholder='DD/MM/AAAA'
                        value={dataEstimada} onChangeText={(e) => setDataEstimada(e)}
                    />
                    <DropdownComponent prioridade={prioridade} setPrioridade={setPrioridade} style = {styles.modalText}/>
                
                
                    <View style={{marginTop: 20}}>         
                        <TouchableOpacity onPress={criarObjetivo} style={styles.botaoCriar}>
                            <Text style={styles.buttonText}>Criar Objetivos</Text>
                        </TouchableOpacity>
                        {/* <Button title="Adicionar Objetivo" onPress={criarObjetivo} color = {colors.verde}/> */}
                    </View>
                </View>
            </PaperProvider>
            </Modal> 
        </View>
    );
};

const styles = StyleSheet.create({
    botaoCriar: {
        width: 150,
        borderRadius: 20,
        backgroundColor: colors.verde,
        alignSelf: 'center', // Centraliza o botão horizontalmente
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    data:{
        flex:1,
        justifyContent: 'center'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderColor: 'lightgray',        
    },
    icon: {
        padding: 10,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        
    },
    modalText: {
        backgroundColor : "white",
        width: 325,
        marginBottom: 30,
        borderColor: colors.cinza,
        
    },
    
    
});

export default BottomBarObjetivos;
