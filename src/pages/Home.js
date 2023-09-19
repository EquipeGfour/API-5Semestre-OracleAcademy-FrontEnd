import React from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from "react-native-paper";
import BottomBar from "./BottomBar";

const Home = ({ }) => {
    return (
        <>
            <Text>Home</Text>
            <BottomBar style={{ flex: 1 }} />
            <ScrollView horizontal={true} contentContainerStyle={styles.container}>
                <View style={[styles.retangulo, styles.rosa]}></View>
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
        width: 150,
        height: 200,
        margin: 20,
        borderRadius: 20
    },
    rosa: {
        backgroundColor: 'pink', 
    },
    verde: {
        backgroundColor: 'green',
    },
});

export default Home;
