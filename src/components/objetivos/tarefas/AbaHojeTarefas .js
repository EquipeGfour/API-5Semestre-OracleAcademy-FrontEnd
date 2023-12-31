import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Button, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Avatar, Card, IconButton, Checkbox, Text, Modal, Portal, PaperProvider, TextInput, DefaultTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropdownComponent from './DropDownPrioridadeTarefas';
import Login from '../../../pages/Login';
import { deleteTarefa, editTarefa, getTarefasHoje } from '../../../service/tarefa';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { SafeAreaView } from 'react-native-safe-area-context';
import DataPicker from '../../genericos/dataPicker';
import { useIsFocused } from '@react-navigation/native';
import ModalGenerico from '../../genericos/ModalGenerico';

const verdeEscuro = "#346c68";
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

const AbaHojeTarefas = ({ id, flagTarefa, setFlagTarefa = () => { } }) => {

    const [editingTitle, setEditingTitle] = useState("");
    const [editingDescription, setEditingDescription] = useState("");
    const [editingEstimatedDate, setEditingEstimatedDate] = useState(new Date());
    const [editingPriority, setEditingPriority] = useState(1);

    const [visible, setVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [checked, setChecked] = useState(false);
    const [tarefas, setTarefas] = useState([]);
    const [tarefa, setTarefa] = useState("");

    const isFocused = useIsFocused();

    const openModal = () => { setModalVisible(true) };
    const abrirModal = () => { setModalVisible(true) };
    const fecharModal = () => { setModalVisible(false) };

    const openEditModal = () => {
        setEditingTitle(tarefa.titulo);
        setEditingDescription(tarefa.descricao);
        setEditingEstimatedDate(new Date(tarefa.data_estimada));
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
        getTarefasHoje(id).then((res) => {
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
        if (isFocused) buscarTarefas();
    }, [isFocused])

    useEffect(() => {
        if (flagTarefa) {
            buscarTarefas();
        }
    }, [flagTarefa])

    const formatarData = (data) => {
        if (data?.includes('/')) {
            return data
        }
        if (data) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const formattedDate = new Date(data).toLocaleDateString('pt-BR', options);
            return formattedDate;
        }
        return '';
    };

    return (
        <>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
                <SafeAreaView >
                    <ScrollView style={styles.listWrapper}>
                        {tarefas.map((tarefa, index) => (
                            <View style={{ flex: 1 }} key={tarefa.id}>
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
            </KeyboardAvoidingView>

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

            <ModalGenerico isModalVisible={isModalEditarTarefaVisible} closeModal={closeModalEditarHandler} altura={400}>
                <View style={{
                    position: 'absolute',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -200,
                }}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.textoEditarTarefa}>Editar Tarefa</Text>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View>
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
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.dataPickerContainer}>
                            <DataPicker
                                selectedDate={editingEstimatedDate}
                                onSelectDate={(e) => setEditingEstimatedDate(e)}
                                stylesProps={{ container: { borderWidth: 0.5, marginBottom: 25 } }}
                            />
                        </View>
                        <View style={styles.prioridadeContainer}>
                            <DropdownComponent
                                style={styles.modalText}
                                prioridade={editingPriority}
                                setPrioridade={setEditingPriority}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={saveEditedTarefa} style={styles.botaoCriar}>
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </ModalGenerico>

        </>
    );
};

const styles = StyleSheet.create({
    drop: {
        paddingTop: 20
    },
    listWrapper: {
        flexGrow: 1,
        width: '100%',
        height: 600,

    },
    textoCheck: {
        marginRight: '40%',
        marginTop: 8
    },
    botaoCriar: {
        width: 100,
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
    },
    textoEditarTarefa: {
        textAlign: 'center',
        color: colors.verde,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    prioridadeContainer: {
        marginTop: -15,
        marginLeft: 30,
        backgroundColor: 'transparent'
    },
    dataPickerContainer: {
        left: -23,
        padding: 25,

    },

});

export default AbaHojeTarefas;
