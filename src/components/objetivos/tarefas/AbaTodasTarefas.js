import React, { useState, useEffect, memo } from 'react';
import { View, TouchableWithoutFeedback, Button, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Avatar, Card, IconButton, Checkbox, Text, Modal, Portal, PaperProvider, TextInput, DefaultTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropdownComponent from './DropDownPrioridadeTarefas';
import { deleteTarefa, getTarefas, editTarefa, getTarefaTime, updateTarefaTime } from '../../../service/tarefa';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { SafeAreaView } from 'react-native-safe-area-context';
import DataPicker from '../../genericos/dataPicker';
import FileUpload from '../../genericos/Upload';
import Cronometro from '../../genericos/cronometro';
import { UploadFile } from '../../../service/tarefa';
import { getStorageItem } from '../../../functions/encryptedStorageFunctions';
import { updateTarefaStatus, getTarefasPorStatus } from '../../../service/tarefa';
import ListaAnexos from '../../genericos/ListaAnexos';
import CardTarefa from '../../genericos/cardTarefa';



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

const AbaTodasTarefas = ({ id, flagTarefa, setFlagTarefa = () => { }, status }) => {

    const [editingTitle, setEditingTitle] = useState("");
    const [editingDescription, setEditingDescription] = useState("");
    const [editingEstimatedDate, setEditingEstimatedDate] = useState(new Date());
    const [editingPriority, setEditingPriority] = useState(1);

    // ----- Timer -----
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [tempoDecorrido, setTempoDecorrido] = useState(0)

    const [visible, setVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [checked, setChecked] = useState(false);
    const [tarefas, setTarefas] = useState([]);
    const [tarefa, setTarefa] = useState("");
    const [tarefaStatus, setTarefaStatus] = useState({});

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
    const hideModal = () => { setVisible(false); buscarTarefas(); setTarefa("") };


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

    // --- Status das Tarefas ---
    const data = [
        { label: 'Completo', value: 1 },
        { label: 'Em Andamento', value: 2 },
        { label: 'Não Iniciado', value: 3 },
        { label: 'Atrasado', value: 4 },
        { label: 'Aguardando Validação', value: 5 },
    ];

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
        if(status){
            getTarefasPorStatus(id, status).then((res) => {
                const novaLista = res.data.map((tarefa) => ({
                    ...tarefa,
                    checked: false,
                }))
                setTarefas(novaLista)
            }).catch(error => {
                console.error(error)
            });
        }
        else{
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
    }

    // --- Cronometro ---
    const putTime = () => {
        updateTarefaTime(tarefa._id).then((res) => {
        }).catch(error => {
            console.error(error.response, 'tem ')
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

    const [selectedFileName, setSelectedFileName] = useState('');
    const handleFileSelected = async (file) => {
        if (file && Array.isArray(file) && file.length > 0 && file[0].name) {
            const token = await getStorageItem('token');
            setSelectedFileName(file[0]);
            UploadFile(tarefa._id, file[0], token).then((res) => {
            }).catch((error) => {
            })
        } else {
            setSelectedFileName('Nome do arquivo não disponível');
        }
    };

    const handleClearAttachment = () => {
        setSelectedFileName('');
    };

    const atualizarStatusTarefa = async (tarefaId, novoStatus) => {
        try {
            const response = await updateTarefaStatus(tarefaId, novoStatus)
            setTarefaStatus((prevStatus) => ({
                ...prevStatus,
                [tarefaId]: !prevStatus[tarefaId],
            }));
        } catch (error) {
            console.error('Erro ao atualizar o status da tarefa', error);
        }
    };

    return (
        <>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
                <SafeAreaView >
                    <ScrollView style={styles.listWrapper}>
                        {tarefas.map((tarefa, index) => (
                           <View style={{ flex: 1 }} key={tarefa.id}>
                            <CardTarefa 
                                tarefa={tarefa}
                                checkboxDisabled={tarefaStatus[tarefa._id] || tarefa.status === 1}
                                checkboxStatus={tarefaStatus[tarefa._id] || tarefa.status === 1 ? 'checked' : 'unchecked'}
                                onCheckboxChange={() => {
                                    atualizarStatusTarefa(tarefa._id, 1);
                                }}
                                subtitle={`Data Conclusão: ${formatarData(tarefa.data_estimada)}`}
                                onCardPress={() => getSelectedTarefas(index)}
                            />
                            </View>   
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>

            <Modal visible={visible} onDismiss={hideModal}>
                <ScrollView style={[styles.modal, { maxHeight: 400 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ ...styles.iconContainer, width: '75%' }} >
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                                color={colors.verde}
                            />
                            <Text style={styles.textoCheck}>{tarefa.titulo}</Text>
                        </View>
                        <View style={styles.iconContainerTittle}>
                            <View style={styles.icons}>
                                <FileUpload 
                                    btnColor={colors.verde}
                                    onFileSelected={handleFileSelected} />
                            </View>
                            <Icon name="edit" style={styles.icons} size={20} color={colors.verde} onPress={openEditModal} />
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


                    <View style={styles.espacamentoTimer}>
                        <View style={styles.iconContainer}>
                            {tarefa !== "" ? (<Cronometro
                                play={tarefa.play || false}
                                btnColor={colors.verde}
                                tempoInicial={tarefa.cronometro || 0}
                                getTarefaTime={putTime}
                            >
                            </Cronometro>) : <></>}
                        </View>
                    </View>
                    <View style={styles.espacamento}>
                        <Text style={styles.fileNameText}>Arquivo selecionado:</Text>
                        {selectedFileName?.name && <Text style={styles.textos}>{selectedFileName?.name}</Text>}
                        {selectedFileName?.name && (
                            <TouchableOpacity onPress={handleClearAttachment}>
                                <Icon name="times-circle" size={20} color='red' marginLeft={10} />
                            </TouchableOpacity>
                        )}
                    </View>
                    <ListaAnexos tarefa={tarefa} />        
                    {/* <View style={{marginLeft:10}}>
                        <Text style= {styles.fileNameText}>Anexos: </Text>
                        <View style= {styles.viewAnexos}>
                        {tarefa?.arquivos?.map((arquivo, index)=>(
                            <Text style={[styles.textos, styles.textoAnexo, index===tarefa.arquivos.length -1?{width:'45%'}:null]}>{arquivo?.nome}</Text>
                        ))}
                        </View>
                    </View> */}
                </ScrollView>
            </Modal>

            <Modal visible={isModalVisible} onDismiss={closeModal} style={{ zIndex: 3 }}>
                <PaperProvider theme={theme}>
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
                            <DataPicker
                                selectedDate={editingEstimatedDate}
                                onSelectDate={(e) => setEditingEstimatedDate(e)}
                                stylesProps={{ container: { borderWidth: 0.5, marginBottom: 25 } }}
                            />
                            <DropdownComponent
                                style={styles.modalText}
                                prioridade={editingPriority}
                                setPrioridade={setEditingPriority}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={saveEditedTarefa} style={styles.botaoCriar}>
                                    <Text style={styles.buttonText}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </PaperProvider>
            </Modal>

        </>
    );
};

const teste = memo(AbaTodasTarefas)
const styles = StyleSheet.create({
    viewAnexos: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: 200,
        width: '100%',
        flexWrap: 'wrap'
    },

    anexoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    detailsContainer: {
        flexDirection: 'column',
    },
    fileNameText: {
        marginTop:-35,
        color: 'black',
        fontSize: 14,
    },
    drop: {
        paddingTop: 20
    },
    listWrapper: {
        flexGrow: 1,
        width: '100%',
        height: 600,
        paddingTop: '5%'

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
        marginLeft:-50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
    },
    espacamento: {
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    espacamentoTimer: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 0
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
        marginLeft: 10,
        flexWrap: 'wrap',
        flex: 1
    },
    textoAnexo: {
        borderColor: colors.verde,
        backgroundColor: colors.verde,
        marginTop: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
        color: 'white',
        borderStyle: 'solid',
        borderWidth: 1,
        flex: 1,
        borderRadius: 50,
        flexBasis: '40%'
    },
    btncolor: {
        color: verdeEscuro
    },
    icons: {
        padding: 12,
        textAlign: 'left',
        // textAlign: 'right',
        // marginRight:-40
    },
    textoEditarTarefa: {
        textAlign: 'center',
        color: colors.verde,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    }

});

export default teste;
