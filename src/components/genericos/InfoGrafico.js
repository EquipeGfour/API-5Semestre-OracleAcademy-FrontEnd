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

const InfoGrafico = (props) => {
    return (
        <> 
            <View style={{...styles.cardGrafico, borderColor:props.color}}>
                <Icon name={props.name} style={styles.icons} size={20} color={props.color} onPress={""} />
                <View style={styles.cardContent}>  
                    <Card.Title                     
                        title={props.title}
                        titleStyle={{color: props.color}}/>
                    <Text style={{...styles.textoValor, color:props.color}}>{props.value}</Text>
                </View>
            </View>
        </>
    )    
};

const styles = StyleSheet.create({
    cardGrafico:{
        marginTop: 15,
        width: '80%',
        height: "auto",
        backgroundColor: "transparent",
        borderColor:"black",
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
