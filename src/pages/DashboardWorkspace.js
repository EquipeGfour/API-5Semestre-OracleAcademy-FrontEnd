import React, { useEffect, useState } from "react";
import Grafico from "../components/genericos/Grafico";
import InfoGrafico from "../components/genericos/InfoGrafico";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome5';
import DataPickerDashboard from "../components/genericos/DataPickerDashboard";
import BottomBarDashboard from "../components/genericos/BottomBarDashboard";
import { useNavigation } from '@react-navigation/native';
import { getStorageItem } from "../functions/encryptedStorageFunctions";
import { getDadosGraficoByMonthWork, getHorasTrabalhadasWork } from "../service/grafico";

// --- Cores do Sistema ---
const colors = {
    verde: "#51A8A2",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff",
    cinza: " #545F71"
};

const DashboardWorkspace = (props) =>{
const navigation = useNavigation();
const [infoGrafico, setInfoGrafico] = useState([]);
const [dataEstimada, setDataEstimada] = useState(new Date());
const [dataAtual, setDataAtual] = useState(new Date());
// --- Info Cards ---
const [totalAndamento, setTotalAndamento] = useState(0);
const [totalNaoIniciadas, setTotalNaoIniciadas] = useState(0);
const [totalAtrasadas, setTotalAtrasadas] = useState(0);
const [totalConcluidas, setTotalConcluidas] = useState(0);
const [totalHoras, setTotalHoras] = useState(0);

const buscarDadosGraficoByMonth = async () => {
    const token = await getStorageItem('token');
    // - Fomatando Data - 
    var dia = dataEstimada.getDate();
    var mes = dataEstimada.getMonth() + 1; 
    var ano = dataEstimada.getFullYear() % 100; 
    mes = mes < 10 ? '0' + mes : mes;
    ano = ano < 10 ? '0' + ano : ano;
    const dataFinalFormatada = dia + '/' + mes + '/' + '20' +  ano;

    // - Busca Horas -
    getHorasTrabalhadasWork(token).then(async (res) => {
        setTotalHoras(res.data);
    }).catch(error => {
        console.error('Erro', error.response);
    })

    getDadosGraficoByMonthWork(dataFinalFormatada,token).then(async (res) => {
        const data = [{x:"Concluídos" , y: res.data['1']},
        {x:"Em Andamento" , y: res.data['2'] },
        {x:"Não Iniciadas" , y: res.data['3']},
        {x:"Atrasadas" , y: res.data['4'] }]
        setTotalConcluidas(res.data['1']);
        setTotalAndamento(res.data['2']);
        setTotalNaoIniciadas(res.data['3']);
        setTotalAtrasadas(res.data['4']);
        setInfoGrafico(data);
    }).catch(error => {
        console.error('Erro', error.response);
    })
}

useEffect (() => {
    buscarDadosGraficoByMonth(dataAtual);
},[dataEstimada]);

    return(
        <>
            <View style={{ flex:1, backgroundColor: '#FFF' }}>
            <Text style={styles.textoDashboard}>Dashboard</Text>
            <ScrollView style={styles.listWrapper}>
                <View style={styles.header}>
                        <Icon name = 'chevron-left' size={25} style={styles.icone1} onPress={() => navigation.navigate('Dashboard')}/>
                        <View style={styles.textoWorkspaceContainer}>
                            <Text style={styles.textoWorkspace}>Workspaces</Text>
                        </View>
                </View>
                <View style={styles.menuData}>
                    <DataPickerDashboard
                        selectedDate={dataEstimada}
                        onSelectDate={(date) => setDataEstimada(date)}>
                    </DataPickerDashboard>

                </View>                
                    <Grafico 
                        data={infoGrafico}
                        colors={[colors.roxo, "#545F71", "gray", "red"]}>
                    </Grafico>
                    <InfoGrafico
                        title={"Atrasadas"}
                        name={"exclamation-triangle"}
                        value={totalAtrasadas}
                        total={totalNaoIniciadas + totalAndamento + totalAtrasadas + totalConcluidas}
                        barra={true}
                        color={"red"}>                        
                    </InfoGrafico>
                    <InfoGrafico
                        title={"Não Iniciadas"}
                        name={"pause"}
                        value={totalNaoIniciadas}
                        total={totalNaoIniciadas + totalAndamento + totalAtrasadas + totalConcluidas}
                        barra={true}
                        color={"gray"}>
                    </InfoGrafico>
                    <InfoGrafico
                        title={"Em Andamento"}
                        name={"road"}
                        value={totalAndamento}
                        total={totalNaoIniciadas + totalAndamento + totalAtrasadas + totalConcluidas}
                        barra={true}
                        color={"#545F71"}>
                    </InfoGrafico>
                    <InfoGrafico
                        title={"Concluidas"}
                        name={"check"}
                        value={totalConcluidas}
                        total={totalNaoIniciadas + totalAndamento + totalAtrasadas + totalConcluidas}
                        barra={true}
                        color={colors.roxo}>
                    </InfoGrafico>
                    <InfoGrafico
                        title={"Total de Horas"}
                        name={"clock"}
                        value={totalHoras}
                        color={"black"}>
                    </InfoGrafico>
            </ScrollView>
            <BottomBarDashboard
                color={colors.roxo}
                onPress={() => navigation.navigate('HomeWorkspaces')}>
            </BottomBarDashboard>
        </View>        
        </>
    )
};

const styles = StyleSheet.create({
    listWrapper: {
        flexGrow: 1,
        width: '100%',
        height: 900,
        marginBottom:70
    },
    header: {
        flexDirection:"row",
        paddingTop: '15%',
        justifyContent: "center",
    },
    textoWorkspaceContainer: {
        flex: 1,  // Isso faz com que o contêiner do texto preencha o espaço disponível
    },
    textoWorkspace: {
        fontSize: 20,
        color: colors.roxo,
        alignSelf:"center", // para ficar o texto no meio do icone
        fontWeight: 'bold',
        marginTop:-30,
        marginRight: 40,
        alignItems:'center'
    },
    icone1:{
        marginTop: -30,
        color: '#bac0ca',
        marginLeft: 30
    },
    textoDashboard: {
        marginTop: 30,
        fontSize: 25,
        color: colors.roxo,
        alignSelf:"center", // para ficar o texto no meio do icone
        fontWeight: 'bold',
        alignItems:'center'
    },
    menuData:{
        flexDirection:"row",
        justifyContent: "space-between",
        marginRight: 20,
        marginTop: 20,
        marginBottom: -50
    }
});

export default DashboardWorkspace;