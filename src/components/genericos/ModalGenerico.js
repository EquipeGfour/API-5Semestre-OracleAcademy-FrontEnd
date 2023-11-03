import React from "react";
import { StyleSheet, ScrollView, View } from 'react-native';
import { Modal } from 'react-native-paper';


const ModalGenerico = (props) => {
    return (
        <Modal visible={props.isModalVisible} transparent animationType="slide" onDismiss={props.closeModal} >
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
        marginHorizontal: 10,
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 20,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        paddingHorizontal: 5
    },
})
/*
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
*/