import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Modal, Text, DefaultTheme, PaperProvider } from 'react-native-paper';

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

const ModalEditarObjetivo = ({bororosca, setModalVisible}) => {
    const closeModal = () => {
    setModalVisible(false)
    }
    return(
        <Modal isVisible={bororosca} onBackdropPress={closeModal}>
            <PaperProvider theme={theme}>
            <View style={styles.modalContainer}>
            <View style={{marginTop: 20}}>         
                <TouchableOpacity onPress={() => {}} style={styles.botaoCriar}>
                    <Text style={styles.buttonText}>Criar</Text>
                </TouchableOpacity>
            </View>
            </View>
            </PaperProvider>
        </Modal>
    )
}

export default ModalEditarObjetivo;

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
    modalContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        
    },
})