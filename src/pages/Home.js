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
                        titleStyle={{ color: 'white' ,  fontWeight: 'bold'}}
                    />
                    <Card.Title 
                        title ="11/10/2023"
                        titleStyle={{ color: 'white' ,  fontWeight: 'bold'}}
                        left={(props) => <Icon name="clock" size={30} color="white"/>}
                        />
                    <Card.Title 
                        title ="Alta"
                        titleStyle={{ color: 'white' , fontWeight: 'bold'}}
                        left={(props) => <Icon name="flag" size={30} color="white" />}
                        />

                    <Card.Content style={styles.cardContent}>
                        <View style={styles.textContainer}>
                            {/* <Text style={styles.textoNome}>Progresso</Text> */}
                            <Text style={styles.textoPorcentagem}>50%</Text>
                        </View>
                        <ProgressBar progress={0.5} color='#9BA5B7' style={{ backgroundColor: 'white' }} />
                    </Card.Content>
                </View>
 {/* ********************** Card 2 ****************************  */}
                <View style={[styles.retangulo, styles.verdeEscuro]}>
                    <Card.Title 
                        title ="Batatinhas"
                        titleStyle={{ color: 'white' ,  fontWeight: 'bold'}}
                    />
                    <Card.Title 
                        title ="09/10/2023"
                        titleStyle={{ color: 'white' ,  fontWeight: 'bold'}}
                        left={(props) => <Icon name="clock" size={30} color="white"/>}
                        />
                    <Card.Title 
                        title ="Baixa"
                        titleStyle={{ color: 'white' , fontWeight: 'bold'}}
                        left={(props) => <Icon name="flag" size={30} color="white" />}
                        />

                    <Card.Content style={styles.cardContent}>
                        <View style={styles.textContainer}>
                            {/* <Text style={styles.textoNome}>Progresso</Text> */}
                            <Text style={styles.textoPorcentagem}>40%</Text>
                        </View>
                        {/* <ProgressBar progress={0.7} color='#9BA5B7' style={{ backgroundColor: 'white' }} /> */}
                    </Card.Content>
                </View>

{/* ********************** Card 3 **************************** */}
                <View style={[styles.retangulo, styles.verdeEscuro]}>
                    <Card.Title 
                        title ="Pagina Home"
                        titleStyle={{ color: 'white' ,  fontWeight: 'bold'}}
                    />
                    <Card.Title 
                        title ="1/09/2023"
                        titleStyle={{ color: 'white' ,  fontWeight: 'bold'}}
                        left={(props) => <Icon name="clock" size={30} color="white"/>}
                        />
                    <Card.Title 
                        title ="Média"
                        titleStyle={{ color: 'white' , fontWeight: 'bold'}}
                        left={(props) => <Icon name="flag" size={30} color="white" />}
                        />

                    <Card.Content style={styles.cardContent}>
                        <View style={styles.textContainer}>
                            {/* <Text style={styles.textoNome}>Progresso</Text> */}
                            <Text style={styles.textoPorcentagem}>10%</Text>
                        </View>
                        {/* <ProgressBar progress={0.7} color='#9BA5B7' style={{ backgroundColor: 'white' }} /> */}
                    </Card.Content>
                </View>

                
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
    textoPorcentagem:{
        alignSelf:"flex-end",
        color: 'white',
        fontWeight: 'bold'
    },
    textoNome:{
        alignSelf: "flex-start",
        color: 'white',
        fontWeight: 'bold',
        
    },
    icon:{
        elevation: 0
    }
});

export default Home;
