import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { VictoryPie } from "victory-native";

// --- Cores do Sistema ---
const colors = {
    verde: "#346c68",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff",
    cinza: " #545F71"
};

const data = [
    { x: "Concluidas.", y: 47 },
    { x: "Andamento.", y: 43 },
    { x: "Atrasadas", y: 10 }
];

const Grafico = () =>{
    return(
        <>
        <View style={styles.container}>       
                <VictoryPie                 
                    data={data}
                    width={300}
                    labels={({ datum }) => `${datum.y}`}
                    style={{ labels: { fontSize:18}}} 
                    innerRadius={50}
                    colorScale={["#51A8A2", "#545F71", "red" ]}
                />
        </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        width: 'auto',
        height: "auto",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        // borderColor:"red",
        // borderWidth:1
    }
});

export default Grafico;