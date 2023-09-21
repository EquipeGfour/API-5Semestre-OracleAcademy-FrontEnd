import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button, DataPikerIOS } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import ModalObjetivo from './Modal';
import { Dropdown } from 'react-native-element-dropdown';
import DropdownComponent from './dropDown';

const verdeEscuro = "#346c68";

const BottomBar = ({ onIconPress }) => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [text, setText] = React.useState('');

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const [choseDate, setChosenDate] = useState(new Date())

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('TabMenu')} style={styles.icon}>
                <Icon name="home" size={30} color={verdeEscuro} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openModal} component={ModalObjetivo} style={styles.icon}>
                <Icon name="plus-circle" size={30} color={verdeEscuro} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onIconPress('icon3')} style={styles.icon}>
                <Icon name="chart-bar" size={30} color={verdeEscuro} />
            </TouchableOpacity>

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContainer}>
                <TextInput style = {styles.modalText} multiline={true} placeholder='Nome'  />
                <TextInput style = {styles.modalText} multiline={true} placeholder='Descrição'  />
                <TextInput style = {styles.modalText} multiline={true} placeholder='DD-MM-AAAA'/>
                <DropdownComponent style = {styles.modalText}/>                
                <Button title="Fechar" onPress={closeModal} color = {verdeEscuro}/>
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

export default BottomBar;
