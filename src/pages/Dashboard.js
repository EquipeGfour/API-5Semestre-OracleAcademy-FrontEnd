import { useEffect, useState } from "react";
import Grafico from "../components/genericos/Grafico";
import InfoGrafico from "../components/genericos/InfoGrafico";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropdwnGenerico from "../components/genericos/DropdownGenerico";
import DataPickerDashboard from "../components/genericos/DataPickerDashboard";
import BottomBarDashboard from "../components/genericos/BottomBarDashboard";
import { useNavigation } from '@react-navigation/native';
import { getStorageItem } from "../functions/encryptedStorageFunctions";
import axios from "axios";
import { getDadosGraficoByMonthObj, getHorasTrabalhadasObjetivos } from "../service/grafico";

// --- Cores do Sistema ---
const colors = {
    verde: "#51A8A2",
    azul: "#4974a5",
    roxo: "#51336b",
    branco: "#ffffff",
    cinza: " #545F71"
};


const Dashboard = (props) =>{
const navigation = useNavigation();
const [infoGrafico, setInfoGrafico] = useState([]);
const [dataEstimada, setDataEstimada] = useState(new Date());
const [dataAtual, setDataAtual] = useState(new Date());
// --- Info Cards ---
const [totalAndamento, setTotalAndamento] = useState(0);
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
    getHorasTrabalhadasObjetivos(token,dataFinalFormatada).then(async (res) => {
        setTotalHoras(res.data);
    }).catch(error => {
        console.error('Erro', error.response);
    })

    getDadosGraficoByMonthObj(dataFinalFormatada,token).then(async (res) => {
        const data = [{x:"Concluídos" , y: res.data['1']},
        {x:"Em Andamento" , y: res.data['3'] },
        {x:"Atrasadas" , y: res.data['4'] }]
        setTotalConcluidas(res.data['1']);
        setTotalAndamento(res.data['3']);
        setTotalAtrasadas(res.data['4']);
        setInfoGrafico(data)
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
                        <View style={styles.textoObjetivoContainer}>
                            <Text style={styles.textoObjetivo}>Objetivos</Text>
                        </View>
                        <Icon name = 'chevron-right'size={25} style={styles.icone1} onPress={() => navigation.navigate('DashboardWorkspace')}/>
                </View>
                <View style={styles.menuData}>
                    <DataPickerDashboard
                        selectedDate={dataEstimada}
                        onSelectDate={(date) => setDataEstimada(date)}
                    ></DataPickerDashboard>
                </View>                
                    <Grafico 
                        data={infoGrafico}
                        colors={["#51A8A2",  "#545F71", "red"]}>
                    </Grafico>
                    <InfoGrafico
                        title={"Atrasadas"}
                        name={"exclamation-triangle"}
                        value={totalAtrasadas}
                        total={totalAndamento + totalAtrasadas + totalConcluidas}
                        barra={true}
                        color={"red"}>                        
                    </InfoGrafico>
                    <InfoGrafico
                        title={"Em Andamento"}
                        name={"road"}
                        value={totalAndamento}
                        total={totalAndamento + totalAtrasadas + totalConcluidas}
                        barra={true}
                        color={"#545F71"}>
                    </InfoGrafico>
                    <InfoGrafico
                        title={"Concluidas"}
                        name={"check"}
                        value={totalConcluidas}
                        total={totalAndamento + totalAtrasadas + totalConcluidas}
                        barra={true}
                        color={colors.verde}>
                    </InfoGrafico>
                    <InfoGrafico
                        title={"Total de Horas"}
                        name={"clock"}
                        value={totalHoras}
                        color={"black"}>
                    </InfoGrafico>
            </ScrollView>
            <BottomBarDashboard
                onPress={() => navigation.navigate('Home')}
                color={colors.verde}>
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
    textoObjetivoContainer: {
        flex: 1,  // Isso faz com que o contêiner do texto preencha o espaço disponível
    },
    textoObjetivo: {
        fontSize: 20,
        color: "#51A8A2",
        alignSelf:"center", // para ficar o texto no meio do icone
        fontWeight: 'bold',
        marginTop:-30,
        marginLeft: 40
    },
    icone1:{
        marginTop: -25,
        color: '#bac0ca',
        marginRight: 30
    },
    textoDashboard: {
        marginTop: 30,
        fontSize: 25,
        color: "#51A8A2",
        alignSelf:"center", // para ficar o texto no meio do icone
        fontWeight: 'bold'
    },
    menuData:{
        flexDirection:"row",
        justifyContent: "space-between",
        marginRight: 20,
        marginTop: 20,
        marginBottom: -50
    }

});

export default Dashboard;

