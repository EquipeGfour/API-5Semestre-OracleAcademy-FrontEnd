import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import PrioridadeTarefaWork from './PrioridadeTarefasWork';
import { postTarefa } from '../../../service/tarefa';


const colors = {
    verde: "#346c68",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff",
    cinza: "#BAC0CA"
};

const BottomBarTarefasWork = ({ onIconPress, id }) => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isInputFocused, setInputFocused] = useState(false);

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataEstimada, setDataEstimada] = useState("");
    const [prioridade, setPrioridade] = useState("");

    const criarObjetivo = () => {
        const obj = {
            titulo: nome,
            descricao: descricao,
            data_estimada: dataEstimada,
            prioridade: prioridade
        };
        postTarefa(id, obj)
            .then((res) => {
                setNome('')
                setDescricao('')
                setDataEstimada('')
                setPrioridade('')
                closeModal()
            })
            .catch(error => {
                console.error('Erro', error.response);
            });
    }

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setInputFocused(false);
    };

    const windowHeight = Dimensions.get('window').height;
    const modalHeight = 300; // Ajuste isso conforme necessário

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeWorkspaces')} style={styles.icon}>
                <Icon name="home" size={30} color={colors.roxo} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openModal} style={styles.icon}>
                <Icon name="plus-circle" size={30} color={colors.roxo} />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.icon}>
                <Icon name="chart-bar" size={30} color={colors.roxo} />
            </TouchableOpacity> */}

            <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
                <View style={[styles.modalContainer]}>
                    <TextInput
                        style={styles.usuario}
                        mode='outlined'
                        // textColor="#545F71"
                        placeholder="Insira o nome da Tarefa"
                        label={isInputFocused ? "Titulo" : ""}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onChangeText={(text) => setNome(text)}
                        value={nome}
                    />
                    <TextInput
                        style={styles.usuario}
                        mode='outlined'
                        // textColor="#545F71"
                        placeholder="Insira o nome da Descrição"
                        label={isInputFocused ? "Descrição" : ""}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onChangeText={(text) => setDescricao(text)}
                        value={descricao}
                    />
                    <TextInput
                        style={styles.usuario}
                        mode='outlined'
                        // textColor="#545F71"
                        placeholder="DD / MM / YYYY"
                        label={isInputFocused ? "Data Conclusão" : ""}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onChangeText={(text) => setDataEstimada(text)}
                        value={dataEstimada}
                    />
                    <PrioridadeTarefaWork setPrioridade={(value) => setPrioridade(value)}/>
                    <View style={{ marginTop: 30 }}>
                        <TouchableOpacity onPress={criarObjetivo} style={styles.botaoCriar}>
                            <Text style={styles.buttonText}>Criar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalText: {
        mode: 'flat',
        backgroundColor: 'white',
        width: 200,
        marginBottom: 30,
    },
    botaoCriar: {
        width: 150,
        borderRadius: 20,
        backgroundColor: colors.roxo,
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
    usuario: {
        marginTop: 20,
        alignSelf: 'center',
        width: 325,
        backgroundColor: 'transparent'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
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
        padding: 50, // tamanho modal
        borderRadius: 10,
        position: 'absolute',
        left: 0,
        right: 0,
        borderColor: colors.cinza, // Cor da borda modal
        borderWidth: 2, // Largura da borda modal
    },
});

export default BottomBarTarefasWork;
