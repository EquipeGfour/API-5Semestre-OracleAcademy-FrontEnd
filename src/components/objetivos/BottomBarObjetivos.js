import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { TextInput, PaperProvider, DefaultTheme } from 'react-native-paper';
import DropdownComponent from './DropDownPrioridadeObjetivo';
import { postObjetivos } from '../../service/objetivo';
import { getStorageItem } from '../../functions/encryptedStorageFunctions';
import DataPicker from '../genericos/dataPicker';

const colors = {
    verde: "#51A8A2",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff",
    cinza: "#9BA5B7",
    black: "#0000"
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
    const [dataEstimada, setDataEstimada] = useState(new Date()); // Inicialize com a data atual
    const [prioridade, setPrioridade] = useState("");

    const criarObjetivo = async () => {
        const obj = { titulo: nome, descricao: descricao, data_estimada: dataEstimada, prioridade: prioridade, workspace: false };
        const token = await getStorageItem('token');
        postObjetivos(obj, token)
            .then((res) => {
                setNome('')
                setDescricao('')
                setDataEstimada(new Date()) // Reinicie a data para a atual
                setPrioridade('')
                closeModal(false)
            })
            .catch(error => {
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
            <TouchableOpacity onPress={openModal} style={styles.icon}>
                <Icon name="plus-circle" size={30} color={colors.verde} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Dashboard')}
                style={styles.icon}>
                <Icon name="chart-bar" size={30} color={colors.verde} />
            </TouchableOpacity>

            <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
                <View style={styles.modalContainer}>
                    <Text style={styles.textoCriarObjetivo}>Criar Objetivo</Text>
                    <TextInput
                        style={styles.modalText}
                        outlineColor='black'
                        outlineStyle={{ borderWidth: 0.65 }}
                        mode='outlined'
                        label='Nome'
                        placeholder='Nome'
                        value={nome}
                        theme={theme}
                        onChangeText={(e) => setNome(e)}
                    />
                    <TextInput
                        style={styles.modalText2}
                        outlineColor='black'
                        outlineStyle={{ borderWidth: 0.50 }}
                        mode='outlined'
                        label='Descrição'
                        multiline={true}
                        placeholder='Descrição'
                        value={descricao}
                        theme={theme}
                        onChangeText={(e) => setDescricao(e)}
                    />
                    <DataPicker
                        theme={theme}
                        selectedDate={dataEstimada}
                        onSelectDate={(date) => setDataEstimada(date)}
                    />
                    <DropdownComponent
                        prioridade={prioridade}
                        theme={theme}
                        setPrioridade={setPrioridade}
                    />

                    <View style={{ marginTop: 20 }}>
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
    data: {
        flex: 1,
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
        padding: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,

    },
    modalText: {
        backgroundColor: "white",
        width: 325,
        marginBottom: 20,

    },
    modalText2: {
        backgroundColor: "white",
        width: 325,
        marginBottom: 26.8,
    },
    textoCriarObjetivo: {
        textAlign: 'center',
        color: colors.verde,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 25,
        marginTop: 10,
    }


});
export default BottomBarObjetivos;
