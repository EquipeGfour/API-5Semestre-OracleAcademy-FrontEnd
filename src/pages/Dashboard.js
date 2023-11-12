import React, { useEffect, useState } from "react";
import * as V from 'victory';
import Grafico from "../components/genericos/Grafico";
import InfoGrafico from "../components/genericos/InfoGrafico";
import { ScrollView, StyleSheet, View } from "react-native";

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

});

export default Dashboard;

