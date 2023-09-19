import React from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from "react-native-paper";
import BottomBar from "./BottomBar";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ProgressBar , Colors} from 'react-native-paper'


const verdeEscuro = "#346c68";

const Home = ({ }) => {
    return (
        <>
            <BottomBar style={{ flex: 1 }} />
            <ScrollView horizontal={true} contentContainerStyle={styles.container}>
                <View style={[styles.retangulo, styles.rosa]}>
                    <Text>Relátorios</Text>
                    <View style = {styles.informacoes}>
                        <Icon name="clock" size={30} color={verdeEscuro}/>
                        <View style={{ width: 10 }} /> 
                        <Text>20/10/2013</Text>
                    </View>
                    <View style = {styles.informacoes2}>
                        <Icon name="flag" size={30} color={verdeEscuro} />
                        <Text>Alta</Text>
                        <View style={{ width: 60 }}  />
                    </View>
                        <ProgressBar style= {styles.progressBar} progress={0.5} color = {verdeEscuro} style= {{backgroundColor: 'red'}}/>
                </View>
                <View style={[styles.retangulo, styles.verde]}></View>
                <View style={[styles.retangulo, styles.rosa]}></View>
                <View style={[styles.retangulo, styles.verde]}></View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
    },
    retangulo: {
        width: 153,
        height: 200,
        margin: 15,
        borderRadius: 20
    },
    rosa: {
        backgroundColor: 'pink', 
    },
    verde: {
        backgroundColor: 'green',
    },
    informacoes:{
        justifyContent:"center",
        paddingTop: '30%',
        flexDirection: 'row', alignItems: "center"
        
    },
    informacoes2:{
        justifyContent:"center",
        paddingTop: '5%',
        flexDirection: 'row', alignItems: "center"
        
    },
    progressBar:{
        

    }
});

export default Home;
