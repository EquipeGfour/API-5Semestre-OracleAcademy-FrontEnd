import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Card, IconButton, Checkbox, Text, Modal, Portal, PaperProvider  } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Login from './Login';

const verdeEscuro = "#346c68";

const TodasTarefas = ({}) => { 

    const [visible, setVisible] = React.useState(false);
    const [secondModalVisible, setSecondModalVisible] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const showSecondModal = () => setSecondModalVisible(true);
    const hideSecondModal = () => setSecondModalVisible(false);

    return (
        <>
            <TouchableWithoutFeedback onPress={showModal}>
                <View style={styles.container}>
                    <View style={styles.itemContainer}>
                        <Checkbox style={styles.iconCheck}
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                        />
                        <Card.Title
                            title="Financeiro 1"
                            subtitle="21/09/2013"
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            
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
                            <Text style={styles.textoCheck}>Financeiro 1</Text>
                            <Icon name="edit" size={20} onPress={showSecondModal}/>
                        </View>
                    </View>
                    <View style={styles.espacamento}>
                        <View style={styles.iconContainer}>
                            <Icon name="bars" size={20} style={styles.icon} />
                            <Text>Relatório de Conta Semanal</Text>
                        </View>
                    </View>
                    <View style={styles.espacamento}>
                        <View style={styles.iconContainer}>
                            <Icon name="clock" size={20} style={styles.icon} />
                            <Text>21/09/2023</Text>
                        </View>
                    </View>
                    <View style={styles.espacamento}>
                        <View style={styles.iconContainer}>
                            <Icon name="flag" size={20} style={styles.icon} />
                            <Text>Urgente</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={secondModalVisible} onDismiss={hideSecondModal}>
                <View style={styles.modal2}>
                    <Text style={styles.modalText}  >Editar Tarefa</Text>
                    <Text style={ { marginTop: 20 }}>Excluir Tarefa</Text>

                </View>
            </Modal>

            
        </>
    );
};

const styles = StyleSheet.create({
    textoCheck:{
        marginRight: '60%'

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
        margin: 20,
        padding: 20,
        borderRadius: 20,
        elevation: 10,
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1
    },
    modal2: {
        backgroundColor: 'white',
        margin: 70, //Tamanho do modal
        padding: 40, //Tamanho do modal
        alignItems:'center',
        borderRadius: 10,
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
});

export default TodasTarefas;
