import React from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from "react-native-paper";
import BottomBar from "./BottomBar";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ProgressBar, Colors, Card,IconButton, Avatar } from 'react-native-paper'

const verdeEscuro = "#346c68";

const Home = ({ }) => {
    return (
        <>
            <BottomBar style={{ flex: 1 }} />
            <ScrollView horizontal={true} contentContainerStyle={styles.container}>
                <View style={[styles.retangulo, styles.verdeEscuro]}>
                    <Card.Title 
                        title ="Relatorio"
                    />
                    <Card.Title 
                        title ="11/10/2023"
                        left={(props) => <Avatar.Icon {... props} icon = "clock"/>}
                        />
                    <Card.Title 
                        title ="Alta"
                        left={(props) => <Avatar.Icon {... props} icon = "flag"/>}
                        />

                        <Card.Content>
                            <Text style = {styles.textoNome}>Progresso</Text>
                            <Text style = {styles.textoPorcentagem}>40%</Text>
                            <ProgressBar progress={0.5} color='#9BA5B7' style={{ backgroundColor: 'white' }} />
                        </Card.Content>
                    </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    retangulo: {
        width: 200,
        height: 250,
        margin: 15,
        borderRadius: 20,
        
    },
    verdeEscuro: {
        backgroundColor: "#51A8A2",
    },
    informacoes: {
        alignSelf: "stretch",
        paddingTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    informacoes2: {
        alignSelf: "stretch",
        paddingTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    progressBar: {
        alignSelf: "stretch",
        width: '80%',

    },
    tituloRetangulo: {
        fontSize: 20,
        marginTop: '10%',
        paddingRight: 40,
        color: 'white',
    },
    textoIcone: {
        color: 'white'
    },
    textoPorcentagem:{
        alignSelf:"flex-end"
    },
    textoNome:{
        alignSelf: "flex-start"
    }
});

export default Home;
