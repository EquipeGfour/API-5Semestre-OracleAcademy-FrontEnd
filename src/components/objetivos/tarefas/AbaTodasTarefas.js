import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Button, ScrollView } from 'react-native';
import { Avatar, Card, IconButton, Checkbox, Text, Modal, Portal, PaperProvider, TextInput, } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropdownComponent from './DropDownPrioridadeTarefas';
import Login from '../../../pages/Login';
import { deleteTarefa, getTarefas, editTarefa } from '../../../service/tarefa';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { SafeAreaView } from 'react-native-safe-area-context';


const verdeEscuro = "#346c68";

const AbaTodasTarefas = ({ id, flagTarefa, setFlagTarefa = () => { } }) => {

    const [editingTitle, setEditingTitle] = useState("");
    const [editingDescription, setEditingDescription] = useState("");
    const [editingEstimatedDate, setEditingEstimatedDate] = useState("");
    const [editingPriority, setEditingPriority] = useState(1);

    const [visible, setVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [checked, setChecked] = useState(false);
    const [tarefas, setTarefas] = useState([]);
    const [tarefa, setTarefa] = useState("");

    const openModal = () => { setModalVisible(true) };
    const abrirModal = () => { setModalVisible(true) };
    const fecharModal = () => { setModalVisible(false) };

    const openEditModal = () => {
        setEditingTitle(tarefa.titulo);
        setEditingDescription(tarefa.descricao);
        setEditingEstimatedDate(tarefa.data_estimada);
        setEditingPriority(tarefa.prioridade);
        setModalVisible(true);
    };

    const saveEditedTarefa = () => {
        const editedTarefa = {
            titulo: editingTitle,
            descricao: editingDescription,
            data_estimada: editingEstimatedDate,
            prioridade: editingPriority,
        };
        console.log(editedTarefa)
        editTarefa(tarefa._id, editedTarefa)
            .then((res) => {
                Toast.show({
                    type: 'success',
                    text1: 'Tarefa editada com sucesso!',
                });
                closeModal();
                buscarTarefas();
            })
            .catch((error) => {
                console.error('Erro ao editar tarefa:', JSON.stringify(error)); // Adicione esta linha para exibir o erro no console
                Toast.show({
                    type: 'error',
                    text1: 'Ocorreu algum problema...',
                });
            });

    };

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

    const deletarTarefa = (id) => {
        deleteTarefa(id).then(res => {
            Toast.show({
                type: 'success',
                text1: 'Tarefa excluida com sucesso!',
            });
            buscarTarefas();
            setVisible(false);
        }).catch(error => {
            Toast.show({
                type: 'error',
                text1: 'Ocorreu algum problema...',
            });
            console.error('Erro', error);
        })
    }

    const buscarTarefas = () => {
        setFlagTarefa(false)
        getTarefas(id).then((res) => {
            const novaLista = res.data.map((tarefa) => ({
                ...tarefa,
                checked: false,
            }))
            setTarefas(novaLista)
        }).catch(error => {
            console.error(error)
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

    useEffect(() => {
        if (flagTarefa) {
            buscarTarefas();
        }
    }, [flagTarefa])

    const formatarData = (data) => {
        if (data) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const formattedDate = new Date(data).toLocaleDateString('pt-BR', options);
            return formattedDate;
        }
        return '';
    };

    return (
        <>
        <SafeAreaView >
        <ScrollView style={styles.listWrapper}>
            {tarefas.map((tarefa, index) => (
                <View style={{flex:1}} key={tarefa.id}>
                    <TouchableWithoutFeedback onPress={() => getSelectedTarefas(index)}>
                        <View>
                            <View style={styles.container}>
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
                                        // subtitle={`Data Conclusão: ${tarefa.data_estimada}`}
                                        subtitle={`Data Conclusão: ${formatarData(tarefa.data_estimada)}`}


                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            ))}
        </ScrollView>
        </SafeAreaView>

            <Modal visible={visible} onDismiss={hideModal}>
                <View style={styles.modal}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ ...styles.iconContainer, width: '75%' }} >
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                            />
                            <Text style={styles.textoCheck}>{tarefa.titulo}</Text>
                        </View>
                        <View style={styles.iconContainerTittle}>
                            <Icon name="edit" style={styles.icons} size={20} onPress={openEditModal} />
                            <Icon name="trash" style={styles.icons} size={20} color={'red'} onPress={() => deletarTarefa(tarefa._id)} />
                        </View>
                    </View>
                    <View style={styles.espacamento}>
                        <View style={styles.iconContainer}>
                            <Icon name="bars" size={20} style={styles.icon} />
                            <Text style={styles.textos}>{tarefa.descricao}</Text>
                        </View>
                    </View>
                    <View style={styles.espacamento}>
                        <View style={styles.iconContainer}>
                            <Icon name="clock" size={20} style={styles.icon} />
                            <Text style={styles.textos}>{formatarData(tarefa.data_estimada)}</Text>
                        </View>
                    </View>
                    <View style={styles.espacamento}>
                        <View style={styles.iconContainer}>
                            <Icon name="flag" size={20} style={styles.icon} />
                            <Text style={styles.textos}>{getPrioridadeTitle(tarefa.prioridade)}</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={isModalVisible} onDismiss={closeModal}>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -88
                }}>
                    <View style={styles.modalContainer}>
                        <Text style={{ fontSize: 25, marginBottom: 25 }}>Editar Tarefa</Text>
                        <TextInput
                            mode='outlined'
                            outlineColor='gray'
                            outlineStyle={{ borderWidth: 0.5 }}
                            style={styles.modalText}
                            placeholder={tarefa.titulo}
                            onChangeText={(e) => setEditingTitle(e)}
                        />
                        <TextInput
                            mode='outlined'
                            outlineColor='gray'
                            outlineStyle={{ borderWidth: 0.5 }}
                            style={styles.modalText}
                            placeholder={tarefa.descricao}
                            onChangeText={(e) => setEditingDescription(e)}
                        />
                        <TextInput
                            mode='outlined'
                            outlineColor='gray'
                            outlineStyle={{ borderWidth: 0.5 }} 
                            style={styles.modalText}
                            placeholder={tarefa.data_estimada} 
                            onChangeText={(e) => setEditingEstimatedDate(e)} 
                        />
                        <DropdownComponent
                            style={styles.modalText}
                            prioridade={editingPriority}
                            setPrioridade={setEditingPriority}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button title="Salvar" onPress={saveEditedTarefa} color={verdeEscuro} />
                            <View style={{ width: '10%' }} />
                            <Button title="Fechar" onPress={closeModal} color={verdeEscuro} />
                        </View>
                    </View>
                </View>
            </Modal>

        </>
    );
};

const styles = StyleSheet.create({
    listWrapper: {
        flexGrow: 1,
        width: '100%',
        height: 600,
    },
    textoCheck: {
        marginRight: '40%',
        marginTop: 8
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
    },
    iconContainerTittle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
    },
    icons: {
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
        elevation: 8,
        borderColor: 'black',
        borderWidth: 1,
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
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: "96%",
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
    },
    modalText: {
        mode: "flat",
        backgroundColor: "white",
        width: 325,
        marginBottom: 25,
        borderRadius: 3,
    },
    textos: {
        marginLeft: 10
    },
    btncolor: {
        color: verdeEscuro
    },
    icons: {
        padding: 5,
        textAlign: 'right',
        // textAlign: 'right',
        // marginRight:-40
    }

});

export default AbaTodasTarefas;
