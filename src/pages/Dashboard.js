import React, { useEffect, useState } from "react";
import Grafico from "../components/genericos/Grafico";
import InfoGrafico from "../components/genericos/InfoGrafico";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome5';

// --- Cores do Sistema ---
const colors = {
    verde: "#346c68",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff",
    cinza: " #545F71"
};

const Dashboard = () =>{
    return(
        <>
        <View style={{ flex:1, backgroundColor: '#FFF' }}>
            <Text style={styles.textoDashboard}>Dashboard</Text>
            <View style={styles.header}>
                    <View style={styles.textoObjetivoContainer}>
                        <Text style={styles.textoObjetivo}>Objetivos</Text>
                    </View>
                    <Icon name = 'chevron-right'size={25} style={styles.icone1} onPress={() => navigation.navigate('HomeWorkspaces')}/>
                </View>                
            <ScrollView style={styles.listWrapper}>
                <Grafico></Grafico>
                <InfoGrafico></InfoGrafico>
            </ScrollView>
        </View>
        </>
    )
};

const styles = StyleSheet.create({
    listWrapper: {
        flexGrow: 1,
        width: '100%',
        height: 600,
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
        fontSize: 20,
        color: "#51A8A2",
        alignSelf:"center", // para ficar o texto no meio do icone
        fontWeight: 'bold',
        marginTop:-30,
        marginLeft: 40
    },
    icone1:{
        marginTop: -25,
        color: '#bac0ca',
        marginRight: 30
    },
    textoDashboard: {
        marginTop: 30,
        fontSize: 25,
        color: "#51A8A2",
        alignSelf:"center", // para ficar o texto no meio do icone
        fontWeight: 'bold'
    },

});

export default Dashboard;

