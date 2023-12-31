import React, { useEffect, useState, memo } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from "react-native-paper";
import BottomBarObjetivos from "./BottomBarObjetivos";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ProgressBar, Colors, Card, IconButton, Avatar } from 'react-native-paper';
import { getObjetivos } from "../../service/objetivo";
import { getStorageItem } from "../../functions/encryptedStorageFunctions";


const verdeEscuro = "#346c68";

const Recentes = ({ navigation }) => {

    const [tarefasConcluidas, setTarefasConcluidas] = useState(0);
    const [totalTarefas, setTotalTarefas] = useState(0);

    const formatarData = (data) => {
        if (data?.includes('/')) {
            return data
        }
        const dataFormatada = new Date(data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        return dataFormatada;
    };

    const [objetivos, setObjetivos] = useState([]);

    const buscarObjetivos = async () => {
        const token = await getStorageItem('token');
        getObjetivos(token).then((res) => {
            setObjetivos(res.data)
        }).catch(error => {
            console.error('Erro', error.response);
        });
    }

    const getPrioridadeTitle = (prioridade) => {
        if (prioridade === 1) {
            return "Urgente";
        }
        else if (prioridade === 2) {
            return "Alta";
        }
        else if (prioridade === 3) {
            return "Média";
        }
        else if (prioridade === 4) {
            return "Baixo";
        }
    }

    useEffect(() => {
        buscarObjetivos();
    }, [objetivos])


    

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#FFF', zIndex: -1 }}>
                <BottomBarObjetivos style={{ flex: 1 }} />
                <ScrollView horizontal={true} contentContainerStyle={styles.container}>
                    {objetivos.map((objetivo) => (
                        <TouchableOpacity key={objetivo._id} onPress={() => navigation.navigate('Lista-tarefas', objetivo)}>
                            <View style={[styles.retangulo, styles.verdeEscuro]}>
                                <Card.Title
                                    title={objetivo.titulo}
                                    titleStyle={{ color: 'white', fontWeight: 'bold', marginTop: 18, fontSize: 18, marginLeft: 5 }}
                                />
                                {/* <Card.Title
                                title={objetivo.data_estimada}
                                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                                left={(props) => <Icon name="clock" size={30} color="white" />}
                            /> */}
                                <Card.Title
                                    title={formatarData(objetivo.data_estimada)}
                                    titleStyle={{ color: 'white', fontWeight: 'bold', marginTop: 8, marginLeft: -8 }}
                                    left={(props) => <Icon name="clock" size={28} color="white" />}
                                />
                                <Card.Title
                                    title={getPrioridadeTitle(objetivo.prioridade)}
                                    titleStyle={{ color: 'white', fontWeight: 'bold', marginTop: 8, marginLeft: -8 }}
                                    left={(props) => <Icon name="flag" size={28} color="white" />}
                                />
                            </View>

                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </>
    );
}

const teste = memo(Recentes)
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
        height: 220,
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
        fontWeight: 'bold',
        marginTop: 8
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

export default teste;
