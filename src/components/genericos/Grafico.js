import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Svg } from "react-native-svg";
import { VictoryBar, VictoryChart, VictoryPie, VictoryTheme } from "victory-native";

// --- Cores do Sistema ---
const colors = {
    verde: "#346c68",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff"
};

const data = [
    { x: "Concluídas", y: 15 },
    { x: "Andamento", y: 65 },
    { x: "Atrasadas", y: 20 }
];

const Grafico = () =>{
    return(
        <>
        <View style={styles.container}>       
                <VictoryPie 
                    data={data} 
                    colorScale={["#51A8A2", "gray", "red", "cyan", "navy" ]}
                />
        </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff",
        borderColor:"red",
        borderWidth:1
    }
});

export default Grafico;