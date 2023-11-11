import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const colors = {
    verde: "#51A8A2",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff",
    cinza: "#9BA5B7"
};
const ListaAnexos = (props) => {
    return (
        <View style={{marginTop:10}}>
            <Text style= {[styles.fileNameText]}>Anexos: </Text>
            <View style= {[styles.viewAnexos, {borderStyle:'solid'}]}>
            {props.tarefa?.arquivos?.map((arquivo, index)=>(
                <Text style={[styles.textos, styles.textoAnexo, props.workspace ? styles.anexoWorkspace : styles.anexoObjetivo]}>{arquivo?.nome}</Text>
            ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewAnexos:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:50,
        width:'100%',
        flexWrap:'wrap'
    },
    fileNameText:{
        color: 'black',
        fontSize: 14,
        marginLeft: 10
    },
    textos: {
        marginLeft: 10,
        flexWrap: 'wrap',
        flex: 1
    },
    anexoWorkspace: {
        borderColor: colors.roxo,
        backgroundColor: colors.roxo,
    },
    anexoObjetivo: {
        borderColor: colors.verde,
        backgroundColor: colors.verde,
    },
    textoAnexo:{
        marginTop:4,
        paddingHorizontal:10,
        paddingVertical:4,
        color:'white',
        borderStyle:'solid',
        borderWidth: 1,
        flex:1,
        borderRadius:50,
        flexBasis:'40%'
    },
})

export default ListaAnexos