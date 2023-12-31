import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, View } from 'react-native';
import { Text } from "react-native-paper";
import BottomBarObjetivos from "../components/objetivos/BottomBarObjetivos";
import Recentes from "../components/objetivos/AbaRecentes";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { clearStorageItem, getStorageItem } from "../functions/encryptedStorageFunctions";
import Concluidas from "../components/objetivos/AbaConcluidas";
import Atrasasdas from "../components/objetivos/AbaAtrasadas";



const Tab = createMaterialTopTabNavigator();
const colors = {
    verde: "#346c68",
    azul: "#4974a5",
    roxo: "#51336b"
};

const Home = ({ navigation }) => {
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
        <View style={{ flex:1, backgroundColor: '#FFF', zIndex: -1}}>
            <Icon name= 'sign-out-alt' style={styles.logout} onPress={logout}/>
            <View style = {styles.nomeUsuario}>
                <Icon name = 'user' size={40}/>
                <Text style={styles.titulo1}>Olá,</Text>
                <Text style={styles.nome}>{usuario}</Text>
            </View>
            <View style={styles.header}>
                <View style={styles.textoObjetivoContainer}>
                    <Text style={styles.textoObjetivo}>Meus Objetivos</Text>
                </View>
                <Icon name = 'chevron-right'size={25} style={styles.icone1} onPress={() => navigation.navigate('HomeWorkspaces')}/>
            </View>
            <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: '#51A8A2',
                tabBarInactiveTintColor: 'black',
                tabBarLabelStyle: { fontSize: 15 },
                tabBarStyle: { backgroundColor: 'transparent', elevation: 0 },
                tabBarIndicatorStyle: {
                    backgroundColor: "#51A8A2"
                },
            }}>
                <Tab.Screen name="Todas" component={Recentes} />               
            </Tab.Navigator>
            <BottomBarObjetivos style={styles.container}/>
        </View>
        </>
        
    );
}

const styles = StyleSheet.create({
    logout:{
        fontSize: 20,
        color:'#51A8A2',
        alignSelf:"flex-end",
        marginEnd: 20,
        marginTop: 15
    },
    nomeUsuario:{
        flexDirection:"row",
        alignItems: "center" ,
        paddingLeft: '7%',
        paddingTop: '10%'
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection:"row",
        paddingTop: '15%',
        justifyContent: "center",

    },

    textoObjetivoContainer: {
        flex: 1,  // Isso faz com que o contêiner do texto preencha o espaço disponível
    },
    textoObjetivo: {
        fontSize: 25,
        color: "#51A8A2",
        alignSelf:"center", // para ficar o texto no meio do icone
        marginLeft: 20,
        fontWeight: 'bold'
    },
    icone1:{
        marginTop: 5,
        color: '#bac0ca',
        marginRight: 20
    },
    titulo1:{
    
        marginLeft: 30,
        color: '#545F71',
        fontSize: 32,
        fontWeight: '700',        
    },
    nome:{
        marginLeft: 5,
        color: '#51A8A2',
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: '700',
        
        //letterSpacing: -0.48
    },

})
export default Home

