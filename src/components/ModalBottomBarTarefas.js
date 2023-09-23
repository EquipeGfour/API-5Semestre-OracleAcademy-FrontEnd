import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button, DataPikerIOS } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import DropdownComponent from './DropDownPrioridadeTarefas';
import BemVindo from '../pages/BemVindo';
import { postTarefa } from '../service/tarefa';

const verdeEscuro = "#346c68";

const BottomBarTarefas = ({ onIconPress, id }) => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [text, setText] = React.useState('');

    const criarTarefa = () =>{
        const data = {titulo: nome, descricao:descricao, data_estimada: dataFinal, prioridade:prioridade}
        postTarefa(id, data).then((res) => {
            closeModal(false)
        }).catch(error => {
            console.error('Erro', error.response);
        })
    }

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataFinal, setDataFinal] = useState("");
    const [prioridade, setPrioridade] = useState("");

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const [choseDate, setChosenDate] = useState(new Date())

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.icon}>
                <Icon name="home" size={30} color={verdeEscuro} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openModal} style={styles.icon}>
                <Icon name="plus-circle" size={30} color={verdeEscuro} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onIconPress('Login')} style={styles.icon}>
                <Icon name="chart-bar" size={30} color={verdeEscuro} />
            </TouchableOpacity>

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContainer}>
                <Text style = {{fontSize: 20}}>Criar Tarefas</Text>
                <TextInput style = {styles.modalText} multiline={true} placeholder='Nome Tarefa' value={nome} onChangeText={(e) => setNome(e)} />
                <TextInput style = {styles.modalText} multiline={true} placeholder='Descrição' value={descricao} onChangeText={(e) => setDescricao(e)} /> 
                <TextInput style = {styles.modalText} multiline={true} placeholder='DD-MM-AAAA' value={dataFinal} onChangeText={(e) => setDataFinal(e)} />
                <DropdownComponent style = {styles.modalText} prioridade = {prioridade} setPrioridade = {setPrioridade}/>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>             
                    <Button title="Adicionar" onPress={criarTarefa} color = {verdeEscuro}/>
                    <View style={{ width: '10%' }} />
                    <Button title="Fechar" onPress={closeModal} color = {verdeEscuro}/>
                </View>
                </View>
            </Modal> 
        </View>
    );
};

const styles = StyleSheet.create({
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
        alignItems: 'center',
        
    },
    modalText: {
        mode:"flat",
        backgroundColor : "white",
        width: 200,
        marginBottom: 30
    },
    
});

export default BottomBarTarefas;
