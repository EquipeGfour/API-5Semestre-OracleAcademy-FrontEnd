import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from "react-native-paper";
import BottomBar from "./ModalBottomBarObjetivos";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ProgressBar, Colors, Card, IconButton, Avatar } from 'react-native-paper';
import { getObjetivos } from "../service/objetivo";

const colors = {
    verde: "#346c68",
    azul: "#4974a5",
    roxo: "#21005d",
    branco: "#ffffff"
};

const AbaWorkspaces = ({ navigation }) => {


    return (
        <>
            <BottomBar style={{ flex: 1 }} />
            <ScrollView horizontal={true} contentContainerStyle={styles.container}>
            <View style={[styles.retangulo, styles.verdeEscuro2]}>
                <Card.Title
                    title={'Api - Oracle'}
                    titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 20  }}
                />
                <Card.Title
                    title={'Gersu'}
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    left={(props) => <Icon name="user" size={25} color="white" />}
                />
                <Card.Title
                    title={'11/07/1992'}
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    left={(props) => <Icon name="clock" size={25} color="white" />}
                />
                <Card.Title
                    title={'ALTA'}
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    left={(props) => <Icon name="flag" size={25} color="white" />}
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
                        <Text style={styles.circuloTexto}>NB</Text>
                    </View>
                    <View style={styles.circulo}>
                        <Text style={styles.circuloTexto}>NB</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.retangulo, styles.verdeEscuro2]}>
                <Card.Title
                    title={'Api - Oracle'}
                    titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 20  }}
                />
                <Card.Title
                    title={'Gersu'}
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    left={(props) => <Icon name="user" size={25} color="white" />}
                />
                <Card.Title
                    title={'11/07/1992'}
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    left={(props) => <Icon name="clock" size={25} color="white" />}
                />
                <Card.Title
                    title={'ALTA'}
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    left={(props) => <Icon name="flag" size={25} color="white" />}
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
                        <Text style={styles.circuloTexto}>NB</Text>
                    </View>
                    <View style={styles.circulo}>
                        <Text style={styles.circuloTexto}>NB</Text>
                    </View>
                    </View>
            </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    cardContent: {
        alignItems: 'center',
    },
    container: {
        flexDirection: 'row',
    },
    retangulo: {
        width: 300,
        height: 350,
        margin: 30,
        borderRadius: 20,
    },
    verdeEscuro: {
        backgroundColor: colors.verde,
    },
    verdeEscuro2:{
        backgroundColor: colors.roxo
    },
    progressBar: {
        alignSelf: "stretch",
        width: '80%',
    },
    textoPorcentagem: {
        alignSelf: "flex-end",
        color: 'white',
        fontWeight: 'bold'
    },
    textoNome: {
        alignSelf: "flex-start",
        color: 'white',
        fontWeight: 'bold',

    },
    icon: {
        elevation: 0
    },
    tituloMembros: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: 10,
    },
    circulosContainer: {
        flexDirection: 'row',
        marginVertical: 10, //sobe desce
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
