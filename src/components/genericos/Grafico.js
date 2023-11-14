import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { VictoryPie } from "victory-native";

// --- Cores do Sistema ---
const colors = {
    verde: "#346c68",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff",
    cinza: "#545F71"
};

const data = [
    {x:"Concluídos" , y: 0 },
    {x:"Atrasadas" , y: 0 },
    {x:"Não Iniciadas" , y: 0 },
    {x:"Em Andamento" , y: 100 }
];

const dataPretendida = [
    {x:"Concluídos" , y: 25 },
    {x: "Atrasadas" , y: 10 },
    {x:"Não Iniciadas" , y: 25 },
    {x: "Em Andamento" , y: 40 }
];

const Grafico = (props) =>{
    const [graficoDados, setGraficoDados] = useState(data);
    useEffect(() => {
        setGraficoDados(dataPretendida); // Setting the data that we want to display
    }, []);

    return(
        <>
        <View style={styles.container}>       
                <VictoryPie  
                    animate={{ duration: 2000, easing: "expInOut" }}               
                    data={graficoDados}
                    width={300}
                    labels={({ datum }) => `${datum.y}`}
                    style={{ labels: { fontSize:18} }} 
                    innerRadius={50}
                    colorScale={props.colors}
                />
        </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: -30,
        width: 'auto',
        height: "auto",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        // borderColor:"red",
        // borderWidth:1
    }
});

export default Grafico;