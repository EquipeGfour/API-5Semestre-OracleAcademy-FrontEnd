import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BemVindo from "./BemVindo";
import Login from "./Login";
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from "react-native-paper";
import BottomBar from "../components/ModalBottomBarObjetivos";
import Recentes from "../components/AbaRecentes";
import Icon from 'react-native-vector-icons/FontAwesome5';
import BottomBarWorkspaces from "../components/ModalBotomBarWorkspaces";


const Tab = createMaterialTopTabNavigator();
const azulClaro = '#1BA7E2'
const HomeWorkspaces = ({ navigation}) => {
    return (
        <>
            <View style = {styles.nomeUsuario}>
                <Icon name = 'user' size={40}/>
                <Text style={styles.titulo1}>Olá,</Text>
                <Text style={styles.nome}>Daniela</Text>
            </View>

            <View style={styles.header}>
                <Icon name = 'chevron-left'size={30} style={styles.icone1} onPress={() => navigation.navigate('Home')}/>
                <View style={styles.textoObjetivoContainer}>
                    <Text style={styles.textoObjetivo}>Workspaces</Text>
                </View>
            </View>
            <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: '#1BA7E2',
                tabBarInactiveTintColor: 'black',
                tabBarLabelStyle: { fontSize: 15 },
                tabBarStyle: { backgroundColor: 'transparent', elevation: 0 },
                tabBarIndicatorStyle: {
                    backgroundColor: "#57C0ED",
                },
            }}>
                <Tab.Screen name="Workspaces" component={Recentes}/>
                <Tab.Screen name="Criados" component={Recentes} />
                <Tab.Screen name="Finalizados" component={Recentes} />
            </Tab.Navigator>
            <BottomBarWorkspaces style={styles.container}/>
        </>
    );
}

const styles = StyleSheet.create({
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
        color: "#1BA7E2",
        alignSelf:"center", // para ficar o texto no meio do icone
        marginRight: 20
    },
    icone1:{
        color: '#bac0ca',
        marginLeft: 20,
        
    },
    titulo1:{
    
        marginLeft: 30,
        fontSize: 32,
        fontWeight: '700',        
    },
    nome:{
        marginLeft: 5,
        color: "#1BA7E2",
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: '700',
        
        //letterSpacing: -0.48
    },

})
export default HomeWorkspaces

