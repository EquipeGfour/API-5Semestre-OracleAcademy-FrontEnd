import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { postObjetivos } from '../../service/objetivo';
import { getStorageItem } from '../../functions/encryptedStorageFunctions';

const colors = {
    verde: "#346c68",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff",
    cinza: "#BAC0CA"
};

const BottomBarWorkspaces = ({ onIconPress }) => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isInputFocused, setInputFocused] = useState(false);

    const [nome, setNome] = useState("");

    const criarWorkspace = async () => {
        const obj = {
            titulo: nome,
            workspace:true
        };
        const token = await getStorageItem('token');
        console.log(token);
        postObjetivos(obj,token)
            .then((res) => {
                setNome('')
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
            {/* <TouchableOpacity onPress={() => navigation.navigate('')} style={styles.icon}>
                <Icon name="home" size={30} color={colors.roxo} />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={openModal} style={styles.icon}>
                <Icon name="plus-circle" size={30} color={colors.roxo} />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.icon}>
                <Icon name="chart-bar" size={30} color={colors.roxo} />
            </TouchableOpacity> */}

            <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
                <View style={[styles.modalContainer,]}>
                <Text style={styles.textoCriarWorkspace}>Criar Workspace</Text>
                    <TextInput
                        style={styles.usuario}
                        mode='outlined'
                        // textColor="#545F71"
                        placeholder="Insira o nome do Workspaces"
                        label={isInputFocused ? "Workspaces" : ""}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onChangeText={(text) => setNome(text)}
                        value={nome}
                    />
                    <View style={{ marginTop: 40 }}>
                        <TouchableOpacity onPress={criarWorkspace} style={styles.botaoCriar}>
                            <Text style={styles.buttonText}>Criar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    textoCriarWorkspace:{
        textAlign:'center',
        color:colors.roxo,
        fontSize: 18,
        fontWeight: 'bold'
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
        marginTop: 40,
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
        padding: 20,
        borderRadius: 10,
        position: 'absolute',
        left: 0,
        right: 0,
        borderColor: colors.cinza, // Cor da borda modal
        borderWidth: 2, // Largura da borda modal
    },
});

export default BottomBarWorkspaces;
