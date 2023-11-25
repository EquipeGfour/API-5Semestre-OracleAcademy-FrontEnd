import React from "react";
import { StyleSheet, ScrollView, View } from 'react-native';
// import { Modal } from 'react-native-paper';
import Modal from 'react-native-modal';


const ModalGenerico = (props) => {
    return (
        <Modal isVisible={props.isModalVisible} transparent animationType="slide" onBackdropPress={props.closeModal} >
            <View style={[styles.modalContainer]}>
                <ScrollView style={[styles.modal, {maxHeight: props.altura || 450}]}>
                    {props.children}
                </ScrollView>
            </View>
        </Modal>
    )
}

export default ModalGenerico;


const styles = StyleSheet.create({
    modal: {
        borderRadius: 20,
        marginVertical: 10,
        merginHorizontal: 10,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 0,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
      },
})
/*
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
*/