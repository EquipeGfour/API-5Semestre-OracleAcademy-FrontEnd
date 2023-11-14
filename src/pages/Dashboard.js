import React, { useEffect, useState } from "react";
import Grafico from "../components/genericos/Grafico";
import InfoGrafico from "../components/genericos/InfoGrafico";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropdwnGenerico from "../components/genericos/DropdownGenerico";
import DataPickerDashboard from "../components/genericos/DataPickerDashboard";
import BottomBarDashboard from "../components/genericos/BottomBarDashboard";
import { useNavigation } from '@react-navigation/native';

// --- Cores do Sistema ---
const colors = {
    verde: "#51A8A2",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff",
    cinza: " #545F71"
};

const data = [
    { label: 'Todos', value: 1 },
    { label: 'Obj1', value: 2 },
    { label: 'Obj2', value: 3 },
];

const Dashboard = (props) =>{
    const navigation = useNavigation();
    return(
        <>
        <View style={{ flex:1, backgroundColor: '#FFF' }}>
            <Text style={styles.textoDashboard}>Dashboard</Text>
            <ScrollView style={styles.listWrapper}>
                <View style={styles.header}>
                        <View style={styles.textoObjetivoContainer}>
                            <Text style={styles.textoObjetivo}>Objetivos</Text>
                        </View>
                        <Icon name = 'chevron-right'size={25} style={styles.icone1} onPress={() => navigation.navigate('DashboardWorkspace')}/>
                </View>
                <View style={styles.menuData}>
                    <DataPickerDashboard></DataPickerDashboard>
                    {/* <DropdwnGenerico
                        data={data}
                        width={150}
                        status={props.status}
                        setStatus={props.setStatus}
                    >                    
                    </DropdwnGenerico> */}
                </View>                
                    <Grafico 
                        colors={["#51A8A2", "red" , "gray", "#545F71"]}>
                    </Grafico>
                    <InfoGrafico
                        title={"Atrasadas"}
                        name={"exclamation-triangle"}
                        value={"10/100"}
                        color={"red"}>                        
                    </InfoGrafico>
                    <InfoGrafico
                        title={"Não Iniciadas"}
                        name={"pause"}
                        value={"25/100"}
                        color={"gray"}>
                    </InfoGrafico>
                    <InfoGrafico
                        title={"Em Andamento"}
                        name={"road"}
                        value={"40/100"}
                        color={"#545F71"}>
                    </InfoGrafico>
                    <InfoGrafico
                        title={"Concluidas"}
                        name={"check"}
                        value={"25/100"}
                        color={colors.verde}>
                    </InfoGrafico>
                    <InfoGrafico
                        title={"Total de Horas"}
                        name={"clock"}
                        value={"144h"}
                        color={"black"}>
                    </InfoGrafico>
            </ScrollView>
            <BottomBarDashboard
                onPress={() => navigation.navigate('Home')}
                color={colors.verde}>
            </BottomBarDashboard>
        </View>
        </>
    )
};

const styles = StyleSheet.create({
    listWrapper: {
        flexGrow: 1,
        width: '100%',
        height: 900,
        marginBottom:70
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
    menuData:{
        flexDirection:"row",
        justifyContent: "space-between",
        marginRight: 20,
        marginTop: 20,
        marginBottom: -50
    }

});

export default Dashboard;

