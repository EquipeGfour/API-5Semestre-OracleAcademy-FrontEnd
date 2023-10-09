import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from "react-native-paper";
import BottomBarObjetivos from "./ModalBottomBarObjetivos";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ProgressBar, Colors, Card, IconButton, Avatar } from 'react-native-paper';
import { getObjetivos } from "../service/objetivo";
import BottomBarTarefas from "./ModalBottomBarTarefas";

const colors = {
    verde: "#346c68",
    azul: "#4974a5",
    roxo: "#21005d",
    branco: "#ffffff"
};

const AbaWorkspaces = ({ navigation }) => {


    return (
        <>
            <ScrollView horizontal={true} contentContainerStyle={styles.container}>
            <View style={[styles.retangulo, styles.verdeEscuro2, styles.marginRightNegative]}>
            <Card.Title
                title="API"
                titleStyle={{ color: 'white', fontWeight: 'bold', textAlign: "center", fontSize: 20, lineHeight: 50, marginTop: 10 }}
            />

                <Card.Title
                    title={'Dono:'}
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    left={(props) => <Icon name="user" size={25} color="white" />}
                />
                <Text style={styles.tituloMembros}>Membros</Text>

                <View style={styles.circulosContainer}>
                    <View style={styles.circulo}>
                        <Text style={styles.circuloTexto}>NB</Text>
                    </View>
                    <View style={styles.circulo}>
                        <Text style={styles.circuloTexto}>NB</Text>
                    </View>
                    <View style={styles.circulo}>
                        <Text style={styles.circuloTexto}>NB</Text>
                    </View>
                    <View style={styles.circulo}>
                        <Icon name= 'plus'/>
                    </View>
                </View>
            </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    marginRightNegative: {
        marginRight: 5, // Ajuste o valor conforme necessário
    },
    
    centeredTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tituloRetangulo: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardContent: {
        alignItems: 'center',
    },
    container: {
        flexDirection: 'row',
    },
    retangulo: {
        width: 250,
        height: 300,
        margin: 30,
        borderRadius: 20,
    },
    verdeEscuro2:{
        backgroundColor: colors.roxo
    },
    textoNome: {
        alignSelf: "flex-start",
        color: 'white',
        fontWeight: 'bold',

    },
    tituloMembros: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: 40,
    },
    circulosContainer: {
        flexDirection: 'row',
        marginVertical: 45, //sobe desce
        marginTop: 20,
        justifyContent: 'flex-start', // Alterado para 'flex-start'
        alignItems: 'center', // Centraliza verticalmente
    },
    circulo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.branco,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginHorizontal: -10,
    },
    circuloTexto: {
        color: 'black',
        fontWeight: 'bold',
    },

});

export default AbaWorkspaces;