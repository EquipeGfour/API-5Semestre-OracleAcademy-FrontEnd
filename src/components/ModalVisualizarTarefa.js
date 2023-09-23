import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Button } from 'react-native';
import { Avatar, Card, IconButton, Checkbox, Text, Modal, Portal, PaperProvider, TextInput, } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropdownComponent from './DropDownPrioridadeTarefas';
import Login from '../pages/Login';
import { getTarefas } from '../service/tarefa';
import axios from "axios"

const verdeEscuro = "#346c68";

const TodasTarefas = ({ id }) => {

    const [visible, setVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [checked, setChecked] = useState(false);
    const [tarefas, setTarefas] = useState([]);
    const [tarefa, setTarefa] = useState("");

    const openModal = () => { setModalVisible(true) };
    const closeModal = () => { setModalVisible(false) };

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const getPrioridadeTitle = (prioridade) => {
        if (prioridade === 1) {
            return "Urgente";
        }
        else if (prioridade === 2) {
            return "Alta";
        }
        else if (prioridade === 3) {
            return "Média";
        }
        else if (prioridade === 4) {
            return "Baixo";
        }
    }
    const buscarTarefas = () => {
        axios.get(`http://10.0.2.2:3004/tarefa/buscarTarefas/${id}`).then((res) => {
            const novaLista = res.data.map((tarefa) => ({
                ...tarefa,
                checked: false,
            }))
            setTarefas(novaLista)
        }).catch(error => {
            console.log(error)
        });
    }

    const toggleSelection = (index) => {
        const updatedProdutos = tarefas.map((tarefa, i) => {
            if (i === index) {
                return {
                    ...tarefa,
                    checked: !tarefa.checked
                };
            }
            return tarefa;
        });
        setTarefas(updatedProdutos);
    };

    const getSelectedTarefas = (i) => {
        const tarefa = tarefas[i];
        setTarefa(tarefa)
        showModal()
    };


    useEffect(() => {
        buscarTarefas();
    }, [])

    return (
        <>
            {tarefas.map((tarefa, index) => (
                <View>
                    <TouchableWithoutFeedback onPress={() => getSelectedTarefas(index)}>
                        <View>
                            <View key={tarefa.id} style={styles.container}>
                                <View style={styles.itemContainer}>
                                    <Checkbox
                                        style={styles.iconCheck}
                                        status={tarefa.checked ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            toggleSelection(index);
                                        }}
                                    />
                                    <Card.Title
                                        title={tarefa.titulo}
                                        subtitle={`Data Conclusão: ${tarefa.data_estimada}`}
                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            ))}

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
                            <Text style={styles.textoCheck}>{tarefa.titulo}</Text>
                            <Icon name="edit" size={20} onPress={openModal} />
                            <Icon name="trash" size={20} marginLeft={10} color={'red'} />
                        </View>

                    </View>
                    <View style={styles.espacamento}>
                        <View style={styles.iconContainer}>
                            <Icon name="bars" size={20} style={styles.icon} />
                            <Text>{tarefa.descricao}</Text>
                        </View>
                    </View>
                    <View style={styles.espacamento}>
                        <View style={styles.iconContainer}>
                            <Icon name="clock" size={20} style={styles.icon} />
                            <Text>{tarefa.data_estimada}</Text>
                        </View>
                    </View>
                    <View style={styles.espacamento}>
                        <View style={styles.iconContainer}>
                            <Icon name="flag" size={20} style={styles.icon} />
                            <Text>{getPrioridadeTitle(tarefa.prioridade)}</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={isModalVisible} onDismiss={closeModal}>
                <View style={styles.modalContainer}>
                    <Text style={{ fontSize: 20 }}>Editar Tarefa</Text>
                    <TextInput style={styles.modalText} multiline={true} placeholder='Nome Tarefa' />
                    <TextInput style={styles.modalText} multiline={true} placeholder='Descrição' />
                    <TextInput style={styles.modalText} multiline={true} placeholder='DD-MM-AAAA' />
                    <DropdownComponent style={styles.modalText} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button title="Salvar" onPress={closeModal} color={verdeEscuro} />
                        <View style={{ width: '10%' }} />
                        <Button title="Fechar" onPress={closeModal} color={verdeEscuro} />
                    </View>
                </View>
            </Modal>


        </>
    );
};

const styles = StyleSheet.create({
    textoCheck: {
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
        mode: "flat",
        backgroundColor: "white",
        width: 200,
        marginBottom: 30
    },
    btncolor: {
        color: verdeEscuro
    }
});

export default TodasTarefas;
