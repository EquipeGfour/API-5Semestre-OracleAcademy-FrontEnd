import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BemVindo from "./BemVindo";
import Login from "./Login";
import { ScrollView, StyleSheet, View,TouchableOpacity } from 'react-native';
import { Text } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome5';
import BottomBarWorkspaces from "../components/workspaces/BotomBarWorkspaces";
import { ProgressBar, Colors, Card, IconButton, Avatar } from 'react-native-paper';
import AbaWorkspaces from "../components/workspaces/AbaTodasWorkspaces";
import BottomBarTarefasWork from "../components/workspaces/tarefas/BottomBarTarefasWork";
import { clearStorageItem, getStorageItem } from "../functions/encryptedStorageFunctions";
import AbaCriadosWorkspace from "../components/workspaces/AbaCriadosWorkspace";
import AbaFinalizadosWorkspace from "../components/workspaces/AbaFinalizadosWorkspace";



const Tab = createMaterialTopTabNavigator();
const colors = {
    verde: "#346c68",
    azul: "#4974a5",
    roxo: "#51336b"
};

const HomeWorkspaces = ({ navigation }) => {

    const [usuario, setUsuario] = useState('');
    const logout = async ()=>{ 
        await clearStorageItem('token')
        navigation.navigate('Bem-vindo')    
    }

    useEffect(async () => {
        let usuario = await getStorageItem("nome");
        setUsuario(usuario);
    }, []);

    return (
        <>
            <Icon name= 'sign-out-alt' style={styles.logout} onPress={logout}/>
            <View style = {styles.nomeUsuario}>
                <Icon name = 'user' size={40}/>
                <Text style={styles.titulo1}>Olá,</Text>
                <Text style={styles.nome}>{usuario}</Text>
            </View>

            <View style={styles.header}>
                <Icon name = 'chevron-left'size={25} style={styles.iconeSeta} onPress={() => navigation.navigate('Home')}/>
                <View style={styles.textoWorkContainer}>
                    <Text style={styles.textoWorkspace}>Workspaces</Text>
                </View>
            </View>
            <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: colors.roxo,
                tabBarInactiveTintColor: '#545F71',
                tabBarLabelStyle: { fontSize: 15 },
                tabBarStyle: { backgroundColor: 'transparent', elevation: 0 },
                tabBarIndicatorStyle: {
                backgroundColor: colors.roxo,
                },
            }}>
                <Tab.Screen name="Todos" component={AbaWorkspaces}/>                
                <Tab.Screen name="Meus Workspaces" component={AbaCriadosWorkspace} />
                <Tab.Screen name="Workspaces faço parte" component={AbaFinalizadosWorkspace} />
            </Tab.Navigator>
            <BottomBarWorkspaces/>
        </>
    );
}

const styles = StyleSheet.create({
    logout:{
        fontSize: 20,
        color: colors.roxo,
        alignSelf:"flex-end",
        marginEnd: 20,
        marginTop: 15
    },
    nomeUsuario:{
        flexDirection:"row",
        alignItems: "center" ,
        paddingLeft: '7%',
        paddingTop: '4%'
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection:"row",
        paddingTop: '10%',
        justifyContent: "center",
    },
    textoWorkContainer: {
        flex: 1,
    },
    textoWorkspace: {
        fontSize: 25,
        color: colors.roxo,
        alignSelf:"center", // para ficar o texto no meio do icone
        marginRight: 20,
        fontWeight: 'bold'
    },
    iconeSeta:{
        marginTop:5,
        color: '#bac0ca',
        marginLeft: 20,
        
    },
    titulo1:{
        color:"#545F71",
        marginLeft: 30,
        fontSize: 32,
        fontWeight: '700',       
    },
    nome:{
        marginLeft: 5,
        color: colors.roxo,
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: 'bold'
        //letterSpacing: -0.48
    },

})
export default HomeWorkspaces

