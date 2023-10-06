import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from "react-native-paper";
import BottomBar from "./ModalBottomBarObjetivos";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ProgressBar, Colors, Card, IconButton, Avatar } from 'react-native-paper';
import { getObjetivos } from "../service/objetivo";


const verdeEscuro = "#346c68";

const Recentes = ({ navigation }) => {

    const [objetivos, setObjetivos] = useState([]);

    const buscarObjetivos = () => {
        getObjetivos().then((res) => {
            setObjetivos(res.data)
        }).catch(error => {
            console.error('Erro', error.response);
        });
    }

    const getPrioridadeTitle = (prioridade) => {
        if(prioridade === 1){
            return "Urgente";
        }
        else if (prioridade === 2){
            return "Alta";
        }
        else if (prioridade === 3){
            return "Média";
        }
        else if(prioridade === 4){
            return "Baixo";
        }
    }

    useEffect(() => {
        buscarObjetivos();
    }, [objetivos])

    return (
        <>
            <BottomBar style={{ flex: 1 }} />
            <ScrollView horizontal={true} contentContainerStyle={styles.container}>
                {objetivos.map((objetivo) => (
                    <TouchableOpacity key={objetivo.id} onPress={() => navigation.navigate('Lista-tarefas', objetivo)}>
                        <View style={[styles.retangulo, styles.verdeEscuro]}>
                            <Card.Title
                                title={objetivo.titulo}
                                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                            />
                            <Card.Title
                                title={objetivo.data_estimada}
                                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                                left={(props) => <Icon name="clock" size={30} color="white" />}
                            />
                            <Card.Title
                                title={getPrioridadeTitle(objetivo.prioridade)}
                                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                                left={(props) => <Icon name="flag" size={30} color="white" />}
                            />
                            <Card.Content style={styles.cardContent}>
                                <View style={styles.textContainer}>
                                    {/* <Text style={styles.textoNome}>Progresso</Text> */}
                                    <Text style={styles.textoPorcentagem}>{objetivo.progresso}%</Text>
                                </View>
                                <ProgressBar progress={0.5} color='#9BA5B7' style={{ backgroundColor: 'white' }} />
                            </Card.Content>
                        </View>

                        
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    cardContent: {
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'row',

    },
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
    }
});

export default Recentes;
