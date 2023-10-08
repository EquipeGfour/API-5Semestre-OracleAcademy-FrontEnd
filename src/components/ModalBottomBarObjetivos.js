import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button, DataPikerIOS } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import DropdownComponent from './DropDownPrioridadeObjetivo';
import BemVindo from '../pages/BemVindo';
import { postObjetivos } from '../service/objetivo';

const colors = {
    verde: "#346c68",
    azul: "#4974a5",
    roxo: "#21005d",
    branco: "#ffffff"
};


const BottomBarObjetivos = ({ onIconPress }) => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataEstimada, setDataEstimada] = useState("");
    const [prioridade, setPrioridade] = useState("");

    const criarObjetivo = () =>{
        const obj = {titulo: nome, descricao:descricao, data_estimada: dataEstimada, prioridade:prioridade}
        postObjetivos(obj).then((res) => {
            setNome('')
            setDescricao('')
            setDataEstimada('')
            setPrioridade('')
            closeModal(false)
        }).catch(error => {
            console.error('Erro', error.response);
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
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.icon}>
                <Icon name="home" size={30} color={colors.verde} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openModal} style={styles.icon}>
                <Icon name="plus-circle" size={30} color={colors.verde} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onIconPress('Login')} style={styles.icon}>
                <Icon name="chart-bar" size={30} color={colors.verde} />
            </TouchableOpacity>

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContainer}>
                <Text style = {{fontSize: 20}}>Criar Objetivos</Text>
                <TextInput style = {styles.modalText} multiline={true} placeholder='Nome' value={nome} onChangeText={(e) => setNome(e)}/>
                <TextInput style = {styles.modalText} multiline={true} placeholder='Descrição' value={descricao} onChangeText={(e) => setDescricao(e)}/>
                <TextInput style = {styles.modalText} multiline={true} placeholder='DD/MM/AAAA' value={dataEstimada} onChangeText={(e) => setDataEstimada(e)}/>
                <DropdownComponent prioridade={prioridade} setPrioridade={setPrioridade} style = {styles.modalText}/>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>             
                    <Button title="Adicionar" onPress={criarObjetivo} color = {colors.verde}/>
                    <View style={{ width: '10%' }} />
                    <Button title="Fechar" onPress={closeModal} color = {colors.verde}/>
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

export default BottomBarObjetivos;
