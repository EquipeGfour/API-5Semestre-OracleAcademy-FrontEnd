import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BemVindo from "./BemVindo";
import Login from "./Login";
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from "react-native-paper";
import BottomBar from "../components/ModalBottomBarObjetivos";
import Recentes from "../components/AbaRecentes";
import Icon from 'react-native-vector-icons/FontAwesome5';


const Tab = createMaterialTopTabNavigator();

const Home = ({ navigation}) => {
    return (
        <>
            <View style = {styles.nomeUsuario}>
                <Icon name = 'user' size={40}/>
                <Text style={styles.titulo1}>Olá,</Text>
                <Text style={styles.nome}>Daniela</Text>
            </View>

            <View style={styles.header}>
                <View style={styles.textoObjetivoContainer}>
                    <Text style={styles.textoObjetivo}>Meus Objetivos</Text>
                </View>
                <Icon name = 'chevron-right'size={30} style={styles.icone1} onPress={() => navigation.navigate('Login')}/>
            </View>
            <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarLabelStyle: { fontSize: 15 },
                tabBarStyle: { backgroundColor: 'transparent', elevation: 0 },
                tabBarIndicatorStyle: {
                    backgroundColor: "#346c68"
                },
            }}>
                <Tab.Screen name="Recentes" component={Recentes}/>
                {/* <Tab.Screen name="Concluidas" component={''} />
                <Tab.Screen name="Atrasadas" component={''} /> */}
            </Tab.Navigator>
            <BottomBar style={styles.container}/>
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
        color: "#346c68",
        alignSelf:"center", // para ficar o texto no meio do icone
        marginLeft: 20,
    },
    icone1:{
        color: '#bac0ca',
        marginRight: 20
    },
    titulo1:{
    
        marginLeft: 30,
        color: '#51A8A2',
        fontSize: 32,
        fontWeight: '700',        
    },
    nome:{
        marginLeft: 5,
        color: '#545F71',
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: '700',
        
        //letterSpacing: -0.48
    },

})
export default Home

