import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Button  } from 'react-native';
import { Avatar, Card, IconButton, Checkbox, Text, Modal, Portal, PaperProvider, TextInput,  } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropdownComponent from './DropDownPrioridadeTarefas';
import Login from '../pages/Login';

const verdeEscuro = "#346c68";

const TodasTarefas = ({id}) => { 

    const [visible, setVisible] = React.useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [checked, setChecked] = React.useState(false);

    const openModal = () => {setModalVisible(true)};
    const closeModal = () => {setModalVisible(false)};

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    return (
        <>
            <TouchableWithoutFeedback onPress={showModal}>
                <View style={styles.container}>
                    <View style={styles.itemContainer}>
                        <Checkbox style={styles.iconCheck}
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                        />
                        <Card.Title
                            title="Financeiro 1"
                            subtitle="Data Conclusão: 21/09/2013"
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            
            <Modal visible={visible} onDismiss={hideModal}>
                <View style={styles.modal}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox 
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                        />
                        <View style={styles.iconContainer}>
                            <Text style={styles.textoCheck}>Financeiro 1</Text>
                            <Icon name="edit" size={20} onPress={openModal}/>
                            <Icon name="trash" size={20} marginLeft={10} color={'red'}/>
                        </View>
                        
                    </View>
                    <View style={styles.espacamento}>
                        <View style={styles.iconContainer}>
                            <Icon name="bars" size={20} style={styles.icon} />
                            <Text>Relatório de Conta Semanal</Text>
                        </View>
                    </View>
                    <View style={styles.espacamento}>
                        <View style={styles.iconContainer}>
                            <Icon name="clock" size={20} style={styles.icon} />
                            <Text>21/09/2023</Text>
                        </View>
                    </View>
                    <View style={styles.espacamento}>
                        <View style={styles.iconContainer}>
                            <Icon name="flag" size={20} style={styles.icon} />
                            <Text>Urgente</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={isModalVisible} onDismiss={closeModal}>
                <View style={styles.modalContainer}>
                <Text style = {{fontSize: 20}}>Editar Tarefa</Text>
                <TextInput style = {styles.modalText} multiline={true} placeholder='Nome Tarefa'  />
                <TextInput style = {styles.modalText} multiline={true} placeholder='Descrição'  />
                <TextInput style = {styles.modalText} multiline={true} placeholder='DD-MM-AAAA'/>
                <DropdownComponent style = {styles.modalText}/>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>             
                    <Button title="Salvar" onPress={closeModal} color = {verdeEscuro}/>
                    <View style={{ width: '10%' }} />
                    <Button title="Fechar" onPress={closeModal} color = {verdeEscuro}/>
                </View>
                </View>
            </Modal> 

            
        </>
    );
};

const styles = StyleSheet.create({
    textoCheck:{
        marginRight: '50%'
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    espacamento: {
        marginTop: 45,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    modal: {
        backgroundColor: 'white',
        margin: 10,
        padding: 20,
        borderRadius: 20,
        elevation: 10,
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1
    },
    container: {
        width: 355,
        height: 80,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,
        marginLeft: '5%',
        marginTop: '5%',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        
    },
    modalText: {
        mode:"flat",
        backgroundColor : "white",
        width: 200,
        marginBottom: 30
    },
    btncolor:{
        color: verdeEscuro
    }
});

export default TodasTarefas;
