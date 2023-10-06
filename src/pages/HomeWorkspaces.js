import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BemVindo from "./BemVindo";
import Login from "./Login";
import { ScrollView, StyleSheet, View,TouchableOpacity } from 'react-native';
import { Text } from "react-native-paper";
import BottomBar from "../components/ModalBottomBarObjetivos";
import Recentes from "../components/AbaRecentes";
import Icon from 'react-native-vector-icons/FontAwesome5';
import BottomBarWorkspaces from "../components/ModalBotomBarWorkspaces";
import { ProgressBar, Colors, Card, IconButton, Avatar } from 'react-native-paper';
import AbaWorkspaces from "../components/AbaWorkspaces";



const Tab = createMaterialTopTabNavigator();
const colors = {
    verde: "#346c68",
    azul: "#4974a5",
    roxo: "#21005d"
};

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
                tabBarActiveTintColor: colors.roxo,
                tabBarInactiveTintColor: 'black',
                tabBarLabelStyle: { fontSize: 15 },
                tabBarStyle: { backgroundColor: 'transparent', elevation: 0 },
                tabBarIndicatorStyle: {
                    backgroundColor: colors.roxo,
                },
            }}>
                <Tab.Screen name="Workspaces" component={AbaWorkspaces}/>                
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
        color: colors.roxo,
        alignSelf:"center", // para ficar o texto no meio do icone
        marginRight: 20,
        fontWeight: 'bold'
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
        color: colors.roxo,
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: 'bold'
        
        //letterSpacing: -0.48
    },

})
export default HomeWorkspaces

