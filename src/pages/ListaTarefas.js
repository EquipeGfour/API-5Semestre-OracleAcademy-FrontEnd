import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BemVindo from './BemVindo';
import { StyleSheet, View, Button } from 'react-native';
import { DefaultTheme, Text, Searchbar, IconButton, DataTable,Modal,TextInput, Provider, Menu } from 'react-native-paper';
import Login from './Login';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TodasTarefas from '../components/ModalVisualizarTarefa';
import BottomBar from '../components/ModalBottomBarObjetivos';
import BottomBarTarefas from '../components/ModalBottomBarTarefas';
import DropdownComponent from '../components/DropDownPrioridadeObjetivo'
import { deleteObjetivo } from "../service/objetivo"
import Toast from 'react-native-toast-message';

const verdeEscuro = "#346c68";

const Tab = createMaterialTopTabNavigator();

const ListaTarefas = ({route, navigation}) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [flagTarefa, setFlagTarefa] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const openModal = () => {
        setModalVisible(true);
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
                                <Menu.Item style={styles.opcoesMenu} onPress={() => {}}  title="Editar Tarefa" />
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

            <Modal visible={isModalVisible} onDismiss={closeModal}>
                <View style={styles.modalContainer}>
                <Text style = {{fontSize: 20}}>Editar Objetivo</Text>
                <TextInput style = {styles.modalText} multiline={true} placeholder='Nome'  />
                <TextInput style = {styles.modalText} multiline={true} placeholder='Descrição'  />
                <TextInput style = {styles.modalText} multiline={true} placeholder='DD-MM-AAAA'/>
                <DropdownComponent style = {styles.modalText}/>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>             
                    <Button title="Salvar" onPress={closeModal} color = {verdeEscuro}/>
                    <View style={{ width: '10%' }} />
                    <Button title="Fechar" onPress={closeModal} color = {verdeEscuro}/>
                </View>
                </View>
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
        padding: 50,
        borderRadius: 10,
        alignItems: 'center',
        
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    modalText: {
        elevation:3,
        zIndex: 3,
        mode:"flat",
        backgroundColor : "white",
        width: 200,
        marginBottom: 30
    },
    tab:{
        zIndex:-1,
        marginTop:-500
    }
});
export default ListaTarefas;