import React, { useEffect, useState} from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

// --- Cores do Sistema ---
const colors = {
    verde: "#51A8A2",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff"
};

const InfoGrafico = () => {
    return (
        <> 
            {/* --- Atrasadas --- */}
            <View style={{...styles.cardGrafico, borderColor:"red"}}>
                <Icon name="exclamation" style={styles.icons} size={20} color={"red"} onPress={""} />
                <View style={styles.cardContent}>  
                    <Card.Title                     
                        title={"Atrasadas"}
                        titleStyle={{color: "red"}}
                    />
                    <Text style={{...styles.textoValor, color:"red"}}>10/100</Text>
                </View>
            </View>
            {/* --- Em Andamento --- */}
            <View style={{...styles.cardGrafico, borderColor:"black"}}>
                <Icon name="play" style={styles.icons} size={20} color={"black"} onPress={""} />
                <View style={styles.cardContent}>  
                    <Card.Title                     
                        title={"Em Andamento"}
                        titleStyle={{color: "black"}}
                    />
                    <Text style={{...styles.textoValor, color:"black"}}>43/100</Text>
                </View>
            </View>
            {/* --- Concluidas --- */}
            <View style={{...styles.cardGrafico, borderColor:colors.verde}}>
                <Icon name="check" style={styles.icons} size={20} color={colors.verde} onPress={""} />
                <View style={styles.cardContent}>  
                    <Card.Title                     
                        title={"Concluídos"}
                        titleStyle={{color: colors.verde}}
                    />
                    <Text style={{...styles.textoValor, color:colors.verde}}>47/100</Text>
                </View>
            </View>
            {/* --- Total de Horas --- */}
            <View style={{...styles.cardGrafico, borderColor:"gray"}}>
                <Icon name="clock" style={styles.icons} size={20} color={"gray"} onPress={""} />
                <View style={styles.cardContent}>  
                    <Card.Title                     
                        title={"Total de Horas"}
                        titleStyle={{color: "gray"}}
                    />
                    <Text style={{...styles.textoValor, color:"gray"}}>144h</Text>
                </View>
            </View>   
        </>
    )
    
};

const styles = StyleSheet.create({
    cardGrafico:{
        marginTop: 15,
        width: '80%',
        height: "8%",
        backgroundColor: "#f5fcff",
        borderWidth:1,
        borderRadius: 10,
        alignSelf: "center",
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    icons: {
        marginLeft: 15,
        alignItems: 'center',
        alignSelf   : 'center',

    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        marginRight: 80,
        marginTop: 8,
        alignSelf   : 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    textoValor: {
        marginBottom: 5
    }   

});

export default InfoGrafico;
