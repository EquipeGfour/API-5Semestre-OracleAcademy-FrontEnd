import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { DefaultTheme, Text, IconButton, DataTable,TextInput, Provider, Menu, PaperProvider } from 'react-native-paper';
import TodasTarefas from '../components/objetivos/tarefas/AbaTodasTarefas';
import BottomBarTarefas from '../components/objetivos/tarefas/BottomBarTarefas';
import DropdownComponent from '../components/objetivos/DropDownPrioridadeObjetivo'
import { deleteObjetivo, editObjetivo } from "../service/objetivo"
import Toast from 'react-native-toast-message';
import DataPicker from '../components/genericos/dataPicker';
import Modal from 'react-native-modal';

const Tab = createMaterialTopTabNavigator();

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

const ListaTarefas = ({route, navigation}) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalEditarObjectiveVisible, setModalEditarObjectiveVisible] = useState(false);
    const [flagTarefa, setFlagTarefa] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const [editingTitle, setEditingTitle] = useState("");
    const [editingEstimatedDate, setEditingEstimatedDate] = useState(new Date());
    const [editingPriority, setEditingPriority] = useState(1);

    const openEditModal = () => {
        //titulo, descricao, data_estimada, prioridade, _id
        setEditingTitle(titulo);

        setEditingEstimatedDate(new Date(data_estimada));
        setEditingPriority(prioridade);

        setModalVisible(true);

    };

    const saveEditedObjetivo = () => {
        // Obtém o ano, mês e dia do objeto Date
        // const dataUTC = editingEstimatedDate.toISOString();
        const dataUTC = new Date(editingEstimatedDate.getTime() + editingEstimatedDate.getTimezoneOffset() * 60000);
        const ano = dataUTC.getFullYear();
        const mes = String(dataUTC.getMonth() + 1).padStart(2, '0'); // Adiciona um zero à esquerda, se necessário
        const dia = String(dataUTC.getDate()).padStart(2, '0'); // Adiciona um zero à esquerda, se necessário

        // Formata a data no formato "yyyy-mm-dd"
        const dataFormatada = `${ano}-${mes}-${dia}`;
        const editedObjetivo = {
            titulo: editingTitle,
            data_estimada: dataFormatada,
            prioridade: editingPriority,
        };
        console.log(editedObjetivo, _id)
        editObjetivo(_id, editedObjetivo)
            .then((res) => {
                console.log(res.data)
                Toast.show({
                    type: 'success',
                    text1: 'Objetivo editado com sucesso!',
                });
                closeModal();
                // buscarTarefas();
            })
            .catch((error) => {
                console.log(error)
                Toast.show({
                    type: 'error',
                    text1: 'Ocorreu algum problema...',
                });
            });

    }; 


    const getPrioridadeTitle = (prioridade) => {
        if(prioridade === 1){
            return "Urgente";
        }
        else if (prioridade === 2){
            return "Alta";
        }
        else if (prioridade === 3){
            return "Média";
        }
        else if(prioridade === 4){
            return "Baixo";
        }
    }


    const closeModal = () => {
       setModalVisible(false);
    };


    const deletarObjetivo = (_id) =>{
        deleteObjetivo(_id).then(res => {
            Toast.show({
                type: 'success',
                text1: 'Objetivo excluida com sucesso!',
            });
            navigation.navigate('Home')
        }).catch(error => {
            Toast.show({
                type: 'error',
                text1: 'Ocorreu algum problema...',
            });
            console.error('Erro', error);
        })
    }

    const criouTarefa = () =>{
        setFlagTarefa(true)
    }

    const { titulo, descricao, data_estimada, prioridade, _id } = route.params;

    return (
        <View style={{ flex:1, backgroundColor: '#FFF' }}>
            <Provider>
                <DataTable style={styles.dataTable}>
                    <DataTable.Header style={styles.editar}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.nomeObjetivo}>{titulo}</Text>
                        </View>

                        <Menu 
                            visible={visible}
                            onDismiss={closeMenu}
                            style={{ backgroundColor: 'white' }} // Defina a cor de fundo desejada aqui
                            anchor={<IconButton style={styles.menuObjetivos} icon="dots-vertical"  iconColor={'#51A8A2'} onPress={openMenu}/>}>
                                <Menu.Item style={styles.opcoesMenu} onPress={openEditModal}  title="Editar Objetivo"/>
                                <Menu.Item style={styles.opcoesMenu2} titleStyle={{color:'red'}} onPress={() => {deletarObjetivo(_id)}}   title="Excluir Objetivo" />
                        </Menu> 

                        {/* <IconButton style={styles.icones} icon="dots-vertical" size={20} marginLeft={10} color={'red'} onPress={() =>{deletarObjetivo(_id), navigation.navigate('Home')}}/> */}
                    </DataTable.Header>
                    <DataTable.Header>
                        <DataTable.Title>Data Final: {data_estimada}</DataTable.Title>
                        <DataTable.Title numeric>Prioridade: {getPrioridadeTitle(prioridade)}</DataTable.Title>
                    </DataTable.Header>                
                </DataTable>
            </Provider>
            <Modal visible={isModalVisible} onBackdropPress={closeModal} style={styles.modal}>
            <PaperProvider theme={theme}>
                <View style={styles.modalContainer}>
                    <Text style = {styles.textoEditarObjetivo}>Editar Objetivo</Text>
                    <TextInput 
                        mode='outlined'
                        outlineColor='gray'
                        outlineStyle={{ borderWidth: 0.5 }}
                        style={styles.modalText}
                        value={editingTitle}
                        onChangeText={(e) => setEditingTitle(e)}
                    />
                    <DataPicker
                        selectedDate={editingEstimatedDate}
                        onSelectDate={(e) => setEditingEstimatedDate(e)}
                        stylesProps={{ container: { borderWidth: 0.5, marginBottom: 25 } }}
                    />
                    <DropdownComponent style = {styles.modalText} prioridade={editingPriority} setPrioridade={setEditingPriority}/>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>             
                        <TouchableOpacity onPress={saveEditedObjetivo} style={styles.botaoSalvar}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                        {/* <View style={{ width: '10%' }} /> */}
                        {/* <Button title="Fechar" onPress={closeModal} color = {colors.verde}/> */}
                    </View>
                </View>
            </PaperProvider>
            </Modal> 

            <Tab.Navigator
                style={styles.tab}
                screenOptions={{
                    tabBarActiveTintColor: '#51A8A2',
                    tabBarLabelStyle: { fontSize: 11 },
                    tabBarStyle: { backgroundColor: 'white'},
                    tabBarIndicatorStyle: {
                        backgroundColor: '#51A8A2',
                    },
                }}>
                <Tab.Screen name="Todas">
                    {() => <TodasTarefas flagTarefa={flagTarefa} setflagTarefa={setFlagTarefa} id={_id} />}
                </Tab.Screen>
                {/* <Tab.Screen name="Todas" component={Login} /> */}
                {/* <Tab.Screen name="Atrasadas" component={BemVindo} />
                <Tab.Screen name="Concluídas" component={BemVindo} /> */}
            </Tab.Navigator>
            <BottomBarTarefas criouTarefa={criouTarefa} objetivo={{titulo, descricao, data_estimada, prioridade, _id}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    dataTable:{
        backgroundColor: 'white',
    }, 
    header: {
        paddingTop: '50%',
    },
    nomeObjetivo:{
        color:'#51A8A2',
        fontSize:20,
        fontWeight: 'bold'
    },
    menu:{
        backgroundColor:'#fff',
        zIndex:2
    },
    menuObjetivos:{
        paddingLeft: 20,
        zIndex:3,

    },
    opcoesMenu:{
        marginTop:-8,
        backgroundColor:'white',  
    },
    opcoesMenu2:{
        marginTop:-10,
        backgroundColor:'white',
        color:'red',
        marginBottom:-8 
    },
    texto: {
        fontSize: 20,
        paddingLeft: '7%',
        color: '#346c68',
    },
    editar:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    edit:{
        marginLeft:'55%'
    },
    icones:{
        marginTop:10,
        position:"absolute",
        justifyContent:'space-between',
        textAlign:'right',
        width:'100%',
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
      },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    modalText: {
        backgroundColor : "white",
        width: 325,
        marginBottom: 30
    },
    botaoSalvar: {
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
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    tab:{
        zIndex:-1,
        marginTop:-500
    },
    textoEditarObjetivo:{
        textAlign:'center',
        color:colors.verde,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 35,
      }
});
export default ListaTarefas;