import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BemVindo from "./BemVindo";
import Login from "./Login";
import { StyleSheet, View } from 'react-native';
import { Text } from "react-native-paper";
import BottomBar from "../components/ModalBottomBarObjetivos";
import Recentes from "../components/AbaRecentes";
import Icon from 'react-native-vector-icons/FontAwesome5';


const Tab = createMaterialTopTabNavigator();

const Home = ({ }) => {
    return (
        <>
            <View style = {styles.nomeUsuario}>
                <Icon name = 'user' size={40}/>
                <Text style={styles.titulo1}>Olá,</Text>
                <Text style={styles.nome}>Daniela</Text>
            </View>

            <View style={styles.header}>
                <Text style={styles.texto}>Meus Objetivos</Text>
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
        alignItems: "center",
        paddingLeft: '7%',
        paddingTop: '10%'
    },
    container: {
        flex: 1,
    },
    header: {
        paddingTop: '15%',
    },
    texto: {
        fontSize: 20,
        paddingLeft: '7%',
        color: "#346c68"
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

