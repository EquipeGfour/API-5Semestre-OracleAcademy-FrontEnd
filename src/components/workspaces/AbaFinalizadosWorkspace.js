import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card, Avatar } from 'react-native-paper';
import { getStorageItem } from "../../functions/encryptedStorageFunctions";
import { getWorkspaceCriados, getWorkspaceFinalizados } from "../../service/workspace";
import UserAvatar from "../genericos/UserAvatar";
import { useIsFocused } from "@react-navigation/native";

const colors = {
    verde: "#346c68",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff"
};
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


const AbaFinalizadosWorkspace = ({ navigation }) => {

    const [workspaces, setWorkspaces] = useState([]);

    const isFocused = useIsFocused();


    const buscarWorkspace = async () => {
        const token = await getStorageItem('token');
        // TODO verificar erro ao chamar a rota
        getWorkspaceFinalizados(token).then((res) => {
            setWorkspaces(res.data)
        }).catch(error => {
            console.error('Erro buscarWorkspace AbaFinalizadosWorkspace', error.response);
        });
    }

    useEffect(() => {
        buscarWorkspace();
    }, [isFocused])



    return (
        <>
            <ScrollView horizontal={true} contentContainerStyle={styles.container}>
                {workspaces.map((workspace) => (
                    <TouchableOpacity key={workspace._id} onPress={() => navigation.navigate('ListaTarefaWorkspace', workspace)}>
                        <View style={[styles.retangulo, styles.roxo, styles.marginRightNegative]}>
                            <Card.Title
                                title={workspace.titulo}
                                titleStyle={{ color: 'white', fontWeight: 'bold', textAlign: "center", fontSize: 20, lineHeight: 50, marginTop: 10 }}
                            />
                            <Card.Title
                                title={'Responsavel:'}
                                subtitle={workspace.proprietario.nome}
                                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                                subtitleStyle={{ color: 'white', fontWeight: 'bold' }}
                                left={(props) => <Icon name="user-circle" size={40} color="white" />}
                            />
                            <Text style={styles.tituloMembros}>Membros</Text>

                            <View style={{...styles.circulosContainer, flexWrap: 'wrap'}} >
                                {workspace.usuarios.map((usuario) => (
                                    <UserAvatar key={usuario.usuario._id} name={usuario.usuario.nome} color={colors.branco} colorText={colors.roxo} />
                                ))}

                                <View style={styles.circulo}>
                                    <Icon name='plus' />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

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
    roxo: {
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
        color: '#545F71',
        fontWeight: 'bold',
    },

});

export default AbaFinalizadosWorkspace;